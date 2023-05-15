import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const DialogBox = (props: any) => {
  const { open, setOpen } = props;
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>This is my Dialog Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is my content text. Can you confirm if you want to accept the
            request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Accept</Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogBox;
