import * as React from "react";
import { createStyles, makeStyles } from "@mui/styles";

import { Dialog, DialogTitle, DialogActions, TextField, Button } from "@mui/material";

const useStyles = makeStyles((theme) =>
  createStyles({
    // playerName: {
    //   padding: theme.spacing(1),
    //   textAlign: "right",
    //   width: "150px",
    //   overflow: "hidden",
    //   textOverflow: "ellipsis",
    // },
    playerName: {
      padding: theme.spacing(1),
      // textAlign: "right",
      width: "100px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    score: {
      padding: theme.spacing(1),
      textAlign: "center",
      width: "80px",
    },
    error: {
      width: "60px",
    },
  })
);

const emails = ["username@gmail.com", "user02@gmail.com"];

export default function DialogNickname({ onClose, open }) {
  const classes = useStyles();

  const [inputName, setInputName] = React.useState(null);

  const handleClose = (value) => {
    setInputName(null);
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Name</DialogTitle>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        fullWidth
        variant="standard"
        onChange={(e) => setInputName(e.target.value)}
      />
      <DialogActions>
        <Button onClick={() => handleClose(null)}>Cancel</Button>
        <Button onClick={() => handleClose(inputName)} disabled={!inputName}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
