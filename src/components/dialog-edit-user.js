import * as React from "react";
import { createStyles, makeStyles } from "@mui/styles";

import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  DialogTitle,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import Player from "../player";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidh: "xs",
    },
  })
);

export default function DialogEditUser({ player = new Player(""), onClose, open }) {
  const classes = useStyles();

  const [name, setName] = React.useState(player.name);
  const [score, setScore] = React.useState(player.score);
  const [scoreMax, setScoreMax] = React.useState(player.scoreMax);
  const [scoreRestart, setScoreRestart] = React.useState(player.scoreRestart);
  const [disqualification, setDisqualification] = React.useState(player.disqualification);
  const [error, setError] = React.useState(player.error);

  const handleClose = (update, reason) => {
    // diable backdrop escape
    if (reason) return;

    onClose(update ? new Player(name, { score, scoreMax, scoreRestart, disqualification, error }) : null);

    setName("");
    setScore(0);
    setScoreMax(50);
    setScoreRestart(25);
    setError(0);
  };

  return (
    <Dialog onClose={handleClose} open={open} className={classes.root}>
      <DialogTitle>プレーヤー設定</DialogTitle>
      <DialogContent dividers>
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              id="name"
              variant="standard"
              label="名前"
              fullWidth
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="score"
              variant="standard"
              label="得点"
              fullWidth
              type="number"
              inputProps={{ max: scoreMax, min: 0, step: 1 }}
              value={String(score)}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setScore(Number(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="score-max"
              variant="standard"
              label="ゴールの点数"
              fullWidth
              type="number"
              inputProps={{ max: 100, min: 0, step: 5 }}
              value={String(scoreMax)}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setScoreMax(Number(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="score-restart"
              variant="standard"
              label="ドボン時の点数"
              fullWidth
              type="number"
              inputProps={{ max: scoreMax - 5, min: 0, step: 5 }}
              value={String(scoreRestart)}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setScoreRestart(Number(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={disqualification}
                    onChange={(event) => {
                      setDisqualification(event.target.checked);
                    }}
                  />
                }
                label="連続失敗で失格にする"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="error"
              variant="standard"
              label="連続エラー回数"
              fullWidth
              type="number"
              inputProps={{ max: 3, min: 0, step: 1 }}
              value={String(error)}
              disabled={!disqualification}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setError(Number(e.target.value));
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleClose(true);
          }}
          disabled={!name}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
