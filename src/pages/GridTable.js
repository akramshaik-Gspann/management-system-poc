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
import { Grid} from "@material-ui/core";
import FormDialog from "../Component/dialog";
// import { Data } from "../Component/Uplod/Data";
import CreateIcon from "@material-ui/icons/Create";
import * as XLSX from "xlsx";
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
  const [gridData, setGridData] = useState([]);
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
  const simpleComp = params => {
    console.log(params, 'checking')
    return (
      <div className="sctockMain">
        <div className="sctockValue">{params.value}</div>
        <div className={params.value < 5 ? 'stcokRed stockCommon' : (params.value > 30 ? ' stcokgreen stockCommon' : 'stcokyellow stockCommon')} > </div>
      </div>
    )
  }
  const url = `http://localhost:4000/users`;
  const columnDefs = [
    { headerName: "Item No", field: "id", sortable: true },
    { headerName: "Catalog ID", field: "catalogId" },
    { headerName: "Catalog Type", field: "catalogType" },
    { headerName: "Item Name", field: "itemName" },
    { headerName: "Price", field: "priceNumber", sortable: true },
    { headerName: "Color", field: "color" },
    { headerName: "Stock", field: "Stock",cellRenderer: simpleComp},
    { headerName: "Last Updated", field: "lastUpdated", sortable: true },
    {
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params) => (
        <div>
          <CreateIcon
            className="edit"
            onClick={() => handleUpdate(params.data)}
          />
          {/* <DeleteOutlineIcon className='delete' onClick={() => handleDelete(params.value)} /> */}
        </div>
      ),
    },
  ];
  useEffect(() => {
    // calling getUsers function for first time
    setGridData(gridData);
  }, [gridData]);
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
    console.log(value, id)
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
  // const handleDelete = (id) => {
  //   const confirm = window.confirm(
  //     "Are you sure, you want to delete this row",
  //     id
  //   );
  //   if (confirm) {
  //     fetch(url + `/${id}`, { method: "DELETE" })
  //       .then((resp) => resp.json())
  //       .then((resp) => getUsers());
  //   }
  // };
  const handleFormSubmit = () => {
    console.log(formData);
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
    // sortable: true,
    flex: 1,
    onFirstDataRendered: onFirstDataRendered,
  };

  function onFirstDataRendered(params) {
    params.data.sizeColumnsToFit();
  }

  //Filter by Catalog Type - Starts
  const onFilterTextBoxChanged = useCallback((event) => {
    if (event.target.value === "All") {
      gridRef.current.api.setQuickFilter();
    } else {
      gridRef.current.api.setQuickFilter(
        document.getElementById("filter-text-box").value
      );
    }
  }, []);
  //Filter by Catalog Type - Ends
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const onFiletedBySearchFn = (e) => {
    console.log(e.target.value, 'e.target.value')
    gridRef.current.api.setQuickFilter(e.target.value);
  }
  function ImportData() {
    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);
    const fileType = ["application/vnd.ms-excel"];
    const handleFile = (e) => {
      let selectedFile = e.target.files[0];
      if (selectedFile) {
        if (selectedFile && fileType.includes(selectedFile.type)) {
          let reader = new FileReader();
          reader.readAsArrayBuffer(selectedFile);
          reader.onload = (e) => {
            setExcelFileError(null);
            setExcelFile(e.target.result);
            const workbook = XLSX.read(e.target.result, { type: "buffer" });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            if (tableData.length !== 0) {
              let mergeddata = [...data, ...tableData];
              setTableData(mergeddata);
            }
            else {
              setTableData(data);
            }

            console.log([data]);
            alert("imported Succefully");
          };
        } else {
          setExcelFileError("Please select only excel file types");
          setExcelFile(null);
        }
      } else {
        console.log("plz select your file");
      }
    };
    return (
      <div>
        {/* <label for="fileupload">Select a file to upload </label> */}
        <input
          id="fileupload"
          type="file"
          className=""
          onChange={handleFile}
          required
        ></input>

        {excelFileError && (
          <div className="text-danger" style={{ marginTop: 5 + "px" }}>
            {excelFileError}
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="App container main-form">
      <Grid align="left" className="grid-table">
        <button className="px-4 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ..." onClick={handleClickOpen}>
          Add New
        </button>
        <ImportData />
        <h3 className="input-text">Search :
          <input
            type="text"
            className="input-search"
            placeholder="Search..."
            onChange={onFiletedBySearchFn}
          />
        </h3>
        {/* <Menu
          as="div"
          onChange={onFilterTextBoxChanged}
          className="relative inline-block text-left"
        >
          <div>
            <Menu.Button
              value="All"
              className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              Filter by Catalog type
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                      value="Jeans"
                    >
                      Jeans
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                      value="Shirts"
                    >
                      Shirts
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                      value="Trousers"
                    >
                      Trousers
                    </a>
                  )}
                </Menu.Item>
                <form method="POST" action="#">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="submit"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block w-full px-4 py-2 text-left text-sm"
                        )}
                        value="Jumpers"
                      >
                        Jumpers
                      </button>
                    )}
                  </Menu.Item>
                </form>
              </div>
            </Menu.Items>
          </Transition>
        </Menu> */}
        <select className="filter-dropdown" id="filter-text-box" onChange={onFilterTextBoxChanged}>
          <option value="All">Filter by Catalog type</option>
          <option value="Jeans">Jeans</option>
          <option value="Shirts">Shirts</option>
          <option value="Trousers">Trousers</option>
          <option value="Jumpers">Jumpers</option>
        </select>
      </Grid>

      <div className="ag-theme-alpine" style={{ height: "400px" }}>
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
        totalItems={tableData ? tableData.length : 0}
      />
    </div>
  );
}
export default Gridtable;
