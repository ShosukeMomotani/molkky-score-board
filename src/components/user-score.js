import * as React from "react";
import { createStyles, makeStyles } from "@mui/styles";

import { Button, Stack, Typography, IconButton, Grid } from "@mui/material";
import EMobiledataIcon from "@mui/icons-material/EMobiledata";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";

const useStyles = makeStyles((theme) =>
  createStyles({
    playerName: {
      padding: theme.spacing(1),
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

export default function UserScore({ player, selected, deleteUser }) {
  const classes = useStyles();

  return (
    <Grid container spacing={0} alignItems="center" justifyContent="center">
      <div style={{ width: "50px" }}>
        {player.isDropped() ? (
          <BlockIcon />
        ) : player.rank === 1 ? (
          <LooksOneIcon />
        ) : player.rank === 2 ? (
          <LooksTwoIcon />
        ) : player.rank === 3 ? (
          <Looks3Icon />
        ) : (
          <></>
        )}
      </div>
      <Typography className={classes.playerName} variant="h4" style={{ fontWeight: selected ? "bold" : "normal" }}>
        {player.name}
      </Typography>
      <Typography
        className={classes.score}
        variant="h5"
        style={{ fontWeight: selected ? "bold" : "normal" }}
      >{`${player.score} / ${player.scoreMax}`}</Typography>
      <Stack direction="row" className={classes.error}>
        {new Array(player.error).fill().map((value, index) => (
          <EMobiledataIcon color="error" key={index} />
        ))}
      </Stack>
      <IconButton onClick={deleteUser} disabled={player.isPassed()}>
        <DeleteIcon />
      </IconButton>
    </Grid>
  );
}
