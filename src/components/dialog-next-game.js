import * as React from "react";
import { createStyles, makeStyles, styled } from "@mui/styles";

import {
  Dialog,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  Button,
  IconButton,
  DialogTitle,
  Grid,
  Typography,
  Badge,
} from "@mui/material";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -14,
    top: 14,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidh: "xs",
    },
  })
);

export default function DialogNextGame({ players, open, onNext, onClose }) {
  const classes = useStyles();

  const [winPoints, setWinPoints] = React.useState(players.map(() => 0));

  React.useEffect(() => {
    setWinPoints([...winPoints, ...new Array(Math.max(players.length - winPoints.length, 0)).fill(0)]);
  }, [players]);

  return (
    <Dialog onClose={onClose} open={open} className={classes.root}>
      <DialogTitle variant="h4">獲得ポイント</DialogTitle>
      <DialogContent dividers>
        <Stack>
          {players.map((player, index) => {
            return (
              <Grid container alignItems="center" justifyContent="center" key={player.name}>
                <Grid item xs={5}>
                  <StyledBadge badgeContent={player.win} color="success">
                    <Typography
                      variant="h4"
                      marginY={0.5}
                    >
                      {player.name}
                    </Typography>
                  </StyledBadge>
                </Grid>
                <Grid item xs={1} m={1}>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      const newWinPoints = [...winPoints];
                      newWinPoints[index] -= 1;
                      setWinPoints(newWinPoints);
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={2} m={1}>
                  <TextField
                    variant="outlined"
                    value={winPoints[index] > 0 ? `+${winPoints[index]}` : winPoints[index]}
                    inputProps={{ style: { textAlign: "center" } }}
                    size="small"
                    mergin="dense"
                    fullWidth
                    disabled
                  ></TextField>
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      const newWinPoints = [...winPoints];
                      newWinPoints[index] += 1;
                      setWinPoints(newWinPoints);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            );
          })}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            const newPlayers = [...players];
            newPlayers.forEach((player, index) => {
              player.win += winPoints[index];
            });
            onNext(newPlayers);
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
