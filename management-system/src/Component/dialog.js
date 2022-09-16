import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
 const {id,catalogId,catalogType,itemName,priceNumber,color,Stock,lastUpdated}=data

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{id?"Update product":"Add new product"}</DialogTitle>
        <DialogContent>
         <form>
             <TextField id="catalogId" value={catalogId} onChange={e=>onChange(e)} placeholder="Enter catalogId" label="Name" variant="outlined" margin="dense" fullWidth />
             <TextField id="catalogType" value={catalogType} onChange={e=>onChange(e)} placeholder="Enter catalogType" label="catalogType" variant="outlined" margin="dense" fullWidth />
             <TextField id="itemName" value={itemName} onChange={e=>onChange(e)} placeholder="Enter Item Name" label="Item Name" variant="outlined" margin="dense" fullWidth />
             <TextField id="priceNumber" value={priceNumber} onChange={e=>onChange(e)} placeholder="Enter Price Number" label="Price" variant="outlined" margin="dense" fullWidth />
             <TextField id="color" value={color} onChange={e=>onChange(e)} placeholder="Enter color" label="color" variant="outlined" margin="dense" fullWidth />
             <TextField id="Stock" value={Stock} onChange={e=>onChange(e)} placeholder="Enter Stock" label="Stock" variant="outlined" margin="dense" fullWidth />
             <TextField id="lastUpdated" value={lastUpdated} onChange={e=>onChange(e)} placeholder="Date" label="Date" variant="outlined" margin="dense" fullWidth />
         </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button  color="primary" onClick={()=>handleFormSubmit()} variant="contained">
            {id?"Update":"Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
