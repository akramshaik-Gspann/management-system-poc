import React, { useCallback,
  useState,
  useEffect,
  useMemo,
  useRef } from 'react';
import '../App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Grid, Button } from '@material-ui/core';
import FormDialog from '../Component/dialog';
import { Data } from '../Component/Uplod/Data';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import * as XLSX from 'xlsx';
const initialValue = { catalogId: "", catalogType: "", itemName: "", priceNumber: "", color: "", Stock: "", lastUpdated: "", }
function Gridtable() {
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "400px", padding: "50px" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "400px", width: "100%" }), []);
  const [gridApi, setGridApi] = useState(useRef());
  const gridRef = useRef();
  const [gridData, setGridData] = useState([])
  const [tableData, setTableData] = useState(null)
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue)
  };
  const url = `http://localhost:4000/users`
  const columnDefs = [
    { headerName: "Item No", field: "id" },
    { headerName: "Catalog ID", field: "catalogId" },
    { headerName: "Catalog Type", field: "catalogType" },
    { headerName: "Item Name", field: "itemName" },
    { headerName: "Price", field: "priceNumber", },
    { headerName: "Color", field: "color" },
    { headerName: "Stock", field: "Stock" },
    { headerName: "Last Updated", field: "lastUpdated" },
    {
      headerName: "Actions", field: "id", cellRendererFramework: (params) => <div>
        <CreateIcon className='edit' onClick={() => handleUpdate(params.data)} />
        {/* <DeleteOutlineIcon className='delete' onClick={() => handleDelete(params.value)} /> */}
      </div>
    }
  ]
  useEffect(() => {
    // calling getUsers function for first time
    setGridData(gridData)
  }, [gridData])
  useEffect(() => {
    getUsers()
  }, [])
  //fetching user data from server
  const getUsers = () => {
    fetch(url).then(resp => resp.json()).then(resp => setTableData(resp))
  }
  const onChange = (e) => {
    const { value, id } = e.target
    // console.log(value,id)
    setFormData({ ...formData, [id]: value })
  }
  const onGridReady = (params) => {
    setGridApi(params)
  }
  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setFormData(oldData)
    handleClickOpen()
  }
  //deleting a user
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure, you want to delete this row", id)
    if (confirm) {
      fetch(url + `/${id}`, { method: "DELETE" }).then(resp => resp.json()).then(resp => getUsers())
    }
  }
  const handleFormSubmit = () => {
    if (formData.id) {
      //updating a user
      const confirm = window.confirm("Are you sure, you want to update this row ?")
      confirm && fetch(url + `/${formData.id}`, {
        method: "PUT", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()
        })
    } else {
      // adding new user
      fetch(url, {
        method: "POST", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()
        })
    }
  }
  const defaultColDef = {
    // sortable: true,
    flex: 1,
    onFirstDataRendered: onFirstDataRendered,
  }

  
  function onFirstDataRendered(params) {
    params.data.sizeColumnsToFit();
  }


  //Filter by Catalog Type - Starts
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
    console.log(gridRef, "gridRef");
  }, []);
  function ImportData() {
    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);
    const [excelData, setExcelData] = useState(null);
    const fileType = ['application/vnd.ms-excel'];
    const handleFile = (e) => {
      let selectedFile = e.target.files[0];
      if (selectedFile) {
        if (selectedFile && fileType.includes(selectedFile.type)) {
          let reader = new FileReader();
          reader.readAsArrayBuffer(selectedFile);
          reader.onload = (e) => {
            setExcelFileError(null);
            setExcelFile(e.target.result);
            const workbook = XLSX.read(e.target.result, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data);
            alert("imported Succefully")
          }
        }
        else {
          setExcelFileError('Please select only excel file types');
          setExcelFile(null);
        }
      }
      else {
        console.log('plz select your file');
      }
    }
    return (
      <div className="container uplodedata">
        <div className='form'>
          <form className='form-group' autoComplete="off">
            {/* <label><h5>Upload Excel file</h5></label> */}
            <br></br>
            <input type='file' className='form-control'
              onChange={handleFile} required></input>
            {excelFileError && <div className='text-danger'
              style={{ marginTop: 5 + 'px' }}>{excelFileError}</div>}
          </form>
        </div>
        <br></br>
        {/* <hr></hr> */}
        {/* <h5>View Excel file</h5> */}
        <div className='viewer'>
          {/* {excelData===null&&<>No file selected</>} */}
          {excelData !== null && (
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Account</th>
                    <th scope='col'>Call</th>
                    <th scope='col'>Minutes</th>
                    <th scope='col'>Child</th>
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
    );
  }
  return (
    <div className="App container">
      <Grid align="left" className='grid-table'>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>Add Product</Button>
        <ImportData />
      </Grid>
      <Grid align="right">
            <select id="filter-text-box" onChange={onFilterTextBoxChanged}>
              <option value="All">Filter by Catalog type</option>
              <option value="Jeans">Jeans</option>
              <option value="Shirts">Shirts</option>
              <option value="Trousers">Trousers</option>
              <option value="Jumpers">Jumpers</option>
            </select>
          </Grid>
      <div className="ag-theme-alpine" style={{ height: '400px' }}>
        <AgGridReact
          ref={gridRef}
          rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
      </div>
      <FormDialog open={open} handleClose={handleClose}
        data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
    </div>
  );
}
export default Gridtable;