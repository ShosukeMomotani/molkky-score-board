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
  Slider,
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
  const [disqualification, setDisqualification] = React.useState(player.disqualification);
  const [error, setError] = React.useState(player.error);
  const [scoreSettings, setScoreSettings] = React.useState([player.scoreRestart, player.scoreMax]);

  const handleChangeScoreSettings = (event, newValues, activeThumb) => {
    if (!Array.isArray(newValues)) {
      return;
    }
    if (activeThumb === 0) {
      setScoreSettings([Math.min(newValues[0], scoreSettings[1] - 5), scoreSettings[1]]);
    } else {
      setScoreSettings([scoreSettings[0], Math.max(newValues[1], scoreSettings[0] + 5)]);
    }
  };

  const handleClose = (update, reason) => {
    // diable backdrop escape
    if (reason) return;

    onClose(
      update
        ? new Player(name, {
            score,
            scoreMax: scoreSettings[1],
            scoreRestart: scoreSettings[0],
            disqualification,
            error: disqualification ? error : 0,
          })
        : null
    );

    setName("");
    setScore(0);
    setError(0);
    setScoreSettings([25, 50]);
  };

  return (
    <Dialog onClose={handleClose} open={open} className={classes.root}>
      <DialogTitle>プレーヤー設定</DialogTitle>
      <DialogContent dividers>
        <Grid container rowSpacing={3} columnSpacing={2} alignItems="center">
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
          <Grid item xs={6}>
            <TextField
              id="score"
              variant="standard"
              label="得点"
              fullWidth
              type="number"
              inputProps={{ max: scoreSettings[1], min: 0, step: 1 }}
              value={String(score)}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setScore(Number(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={6}>
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
          <Grid item xs={2}>
            ゴール設定
          </Grid>
          <Grid item xs={9} style={{ marginTop: 20 }}>
            <Slider
              min={0}
              max={80}
              step={5}
              value={scoreSettings}
              onChange={handleChangeScoreSettings}
              valueLabelDisplay="on"
              disableSwap
              valueLabelFormat={(value, index) => (index === 0 ? `ドボン時：${value}` : `ゴール：${value}`)}
            ></Slider>
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
