import React, { useMemo, useState } from 'react';
import MainLayout from '../layout/MainLayout';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormDialog from '../components/Dialog';

function RegisterPage() {

  const [gridApi, setGridApi] = useState()

  const [open, setOpen] = React.useState(true);

  const [formData, setFormDate] = useState({name:"", quantity:"", price:"", measurement:""});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columnDefs = [
    { headerName: 'ID', field: 'id', checkboxSelection: true, headerCheckboxSelection: true },
    { headerName: 'Product Name', field: 'productName', tooltipField: 'productPrice' },
    { headerName: 'Quantity', field: 'quantity' },
    { headerName: 'Product Price', field: 'productPrice' },
    { headerName: 'Measurement', field: 'measurement' },
    { headerName: 'Actions', field: 'actions' }
  ];

  // const [rowData, setRowData] = useState([]);

  // useEffect(() => {
  //   fetch('/api/Products/GetProducts')
  //     .then(result => result.json())
  //     .then(rowData => setRowData(rowData))
  // }, []);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
    editable: true
  }), []);

  const onGridReady = (params) => {
    setGridApi(params)
    fetch('/api/Products/GetProducts').then(resp => resp.json())
      .then(resp => {
        params.api.applyTransaction({ add: resp }) //adding API data to grid
        // params.api.paginationGoToPage(10)
      })
  }

  const onChange = (e) => {
    const {value,id} = e.target;
    // console.log(value,id);
    setFormDate({...formData,[id]:value});
  }

  const handleFormSubmit = (formData) => {
    // debugger;
    fetch('AddProducts', {
      method:"POST",
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)})
    .then(response => response.json())
    .then(response => console.log(response));
  }

  const rowSelectionType = 'multiple';
  const onSelectionChanged = (event) => {
    console.log(event.api.getSelectedRows());
  }


  return (
    <MainLayout>
      <div>
        <h2>Register Page</h2>
      </div>
      {/* <br></br> */}
      <div>
        <Grid align='right'>
          <Button variant='contained' color='primary' onClick={handleClickOpen}>Add Product</Button>
        </Grid>
        <div className='ag-theme-alpine-dark' style={{ height: 400 }}>
          <AgGridReact
            columnDefs={columnDefs}
            // rowData={rowData}
            rowSelection={rowSelectionType}
            animateRows={true}
            defaultColDef={defaultColDef}
            enableBrowserTooltips={true}
            onGridReady={onGridReady}
            onSelectionChanged={onSelectionChanged}
            rowMultiSelectWithClick={true}
            pagination={true}
            paginationPageSize={5}
            paginationAutoPageSize={true}
          />
        </div>
        <FormDialog open={open} handleClose={handleClose} data={formData} onChange={onChange} 
        handleFormSubmit={handleFormSubmit} />
      </div>
    </MainLayout>
  )
}

export default RegisterPage;