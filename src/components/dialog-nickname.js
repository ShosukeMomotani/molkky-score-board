import * as React from "react";
import { createStyles, makeStyles } from "@mui/styles";

import { Dialog, DialogContentText, DialogContent, DialogActions, TextField, Button } from "@mui/material";

const useStyles = makeStyles((theme) =>
  createStyles({
    dialogNickname: {},
  })
);

export default function DialogNickname({ onClose, open }) {
  const classes = useStyles();

  const [inputName, setInputName] = React.useState(null);

  const handleClose = (value) => {
    setInputName(null);
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} className={classes.dialogNickname}>
      <DialogContent dividers>
        <DialogContentText>Player Name</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          variant="standard"
          onChange={(e) => setInputName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(null)}>Cancel</Button>
        <Button onClick={() => handleClose(inputName)} disabled={!inputName}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
