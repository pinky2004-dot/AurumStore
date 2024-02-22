import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

export default function FormDialog({open, handleClose, data, onChange, handleFormSubmit}) {

    const {name, quantity, price, measurement} = data;

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Create a new product
        </DialogTitle>
        <DialogContent>
            <form>
                <TextField id='name' value={name} onChange={e=>onChange(e)} placeholder='Enter Product Name' label='Name' margin='dense' fullWidth />
                <TextField id='quantity' value={quantity} onChange={e=>onChange(e)} placeholder='Enter Quantity' label='Quantity' margin='dense' fullWidth />
                <TextField id='price' value={price} onChange={e=>onChange(e)} placeholder='Enter Product Price' label='Price' margin='dense' fullWidth />
                <TextField id='measurement' value={measurement} onChange={e=>onChange(e)} placeholder='Enter Measurement' label='Measurement' margin='dense' fullWidth />
            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary' varient='outlined'>Cancel</Button>
          <Button color='primary' onClick={()=>handleFormSubmit()} varient='contained'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
