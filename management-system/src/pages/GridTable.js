import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import "../App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Grid, Button } from "@material-ui/core";
import FormDialog from "../Component/dialog";
import CreateIcon from "@material-ui/icons/Create";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const initialValue = {
  catalogId: "",
  catalogType: "",
  itemName: "",
  priceNumber: "",
  color: "",
  Stock: "",
  lastUpdated: "",
};

function Gridtable() {
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "400px", padding: "50px" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "400px", width: "100%" }), []);
  const [gridApi, setGridApi] = useState(useRef());
  const gridRef = useRef();
  const [tableData, setTableData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };
  const url = `http://localhost:4000/users`;
  const columnDefs = [
    { headerName: "Item No", field: "id" },
    { headerName: "Catalog ID", field: "catalogId" },
    { headerName: "Catalog Type", field: "catalogType" },
    { headerName: "Item Name", field: "itemName" },
    { headerName: "Price", field: "priceNumber" },
    { headerName: "Color", field: "color" },
    { headerName: "Stock", field: "Stock" },
    { headerName: "Last Updated", field: "lastUpdated" },
    {
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params) => (
        <div>
          <CreateIcon onClick={() => handleUpdate(params.data)} />
          &nbsp;&nbsp;
          <DeleteOutlineIcon onClick={() => handleDelete(params.value)} />
        </div>
      ),
    },
  ];
  // calling getUsers function for first time
  useEffect(() => {
    getUsers();
  }, []);

  //fetching user data from server
  const getUsers = () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => setTableData(resp));
  };
  const onChange = (e) => {
    const { value, id } = e.target;
    // console.log(value,id)
    setFormData({ ...formData, [id]: value });
  };
  const onGridReady = (params) => {
    setGridApi(params);
  };

  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setFormData(oldData);
    handleClickOpen();
  };
  //deleting a user
  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete this row",
      id
    );
    if (confirm) {
      fetch(url + `/${id}`, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((resp) => getUsers());
    }
  };
  const handleFormSubmit = () => {
    if (formData.id) {
      //updating a user
      const confirm = window.confirm(
        "Are you sure, you want to update this row ?"
      );
      confirm &&
        fetch(url + `/${formData.id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "content-type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((resp) => {
            handleClose();
            getUsers();
          });
    } else {
      // adding new user
      fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          handleClose();
          getUsers();
        });
    }
  };

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    // floatingFilter: true
  };

  //Filter by Catalog Type - Starts

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
    console.log(gridRef, "gridRef");
  }, []);

  //Filter by Catalog Type - Ends

  return (
    <div className="App">
      <div class="grid-wrapper">
        <div className="ag-theme-alpine" style={containerStyle}>
          <Grid align="left">
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Add Product
            </Button>{" "}
            &nbsp; &nbsp; &nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Upload
            </Button>
          </Grid>{" "}
          <Grid align="right">
            <select id="filter-text-box" onChange={onFilterTextBoxChanged}>
              <option value="All">Filter by Catalog type</option>
              <option value="Jeans">Jeans</option>
              <option value="Shirts">Shirts</option>
              <option value="Trousers">Trousers</option>
              <option value="Jumpers">Jumpers</option>
            </select>
          </Grid>
          <div className="ag-theme-alpine">
            <div id="myGrid" className="grid-wrapper" style={gridStyle}>
              <AgGridReact
                ref={gridRef}
                rowData={tableData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
              />
            </div>
            <FormDialog
              open={open}
              handleClose={handleClose}
              data={formData}
              onChange={onChange}
              handleFormSubmit={handleFormSubmit}
            />
          </div>
        </div>

        <br></br>
        {/* <hr></hr> */}

        {/* <h5>View Excel file</h5> */}
        <div className="viewer">
          {/* {excelData===null&&<>No file selected</>} */}
          {excelData !== null && (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Account</th>
                    <th scope="col">Call</th>
                    <th scope="col">Minutes</th>
                    <th scope="col">Child</th>
                    {/* <th scope='col'>Age</th>
                    <th scope='col'>Date</th>                   */}
                  </tr>
                </thead>
                <tbody>
                  <Data excelData={excelData} />
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gridtable;
