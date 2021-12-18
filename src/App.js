import * as React from "react";
import { createStyles, makeStyles } from "@mui/styles";

import { Container, Box, Typography, Button, ButtonGroup, Stack, IconButton, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import UserScore from "./components/user-score";

import Player from "./player";

// スタイルを適用する
// 引数に作成したthemeを受け取る
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      textAlign: "center",
      maxWidth: "500px",
    },
    scoreButtons: {
    },
  })
);

const App = () => {
  const classes = useStyles();

  const [players, setPlayers] = React.useState(["aaaa", "bbbb", "cccc", "ddddd"].map((name) => new Player(name)));
  const [selectedPlayer, setSelectedPlayer] = React.useState(0);
  const [passedUserCount, setPassedUserCount] = React.useState(0);

  const moveToNextUser = () => {
    let newSelectedPlayer = selectedPlayer;
    do {
      newSelectedPlayer = (newSelectedPlayer + 1) % players.length;
    } while (!players[newSelectedPlayer].isPlaying());
    setSelectedPlayer(newSelectedPlayer);
  };

  const deleteUser = (index) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);
  };

  const handleAddPlayer = () => {
    setPlayers([...players, new Player("eeee")]);
  };

  const handleScore = (value) => {
    if (players[selectedPlayer].isPassed()) return;

    players[selectedPlayer].addScore(value);
    if (players[selectedPlayer].isPassed()) {
      players[selectedPlayer].setRank(passedUserCount + 1);
      setPassedUserCount(passedUserCount + 1);
    }
    setPlayers([...players]);
    moveToNextUser();
  };

  const handleError = () => {
    players[selectedPlayer].doError();
    setPlayers([...players]);
    moveToNextUser();
  };

  const handleResetAll = () => {
    players.forEach((player) => player.reset());
    setPlayers([...players]);
    setSelectedPlayer(0);
    setPassedUserCount(0);
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h2" component="h2">
        Molkky Score Board
      </Typography>
      <Box m={2}></Box>
      <Stack spacing={1}>
        {players.map((player, i) => (
          <div
            key={i}
            onClick={() => {
              setSelectedPlayer(i);
            }}
          >
            <UserScore
              player={player}
              selected={i === selectedPlayer}
              deleteUser={() => {
                deleteUser(i);
              }}
            ></UserScore>
          </div>
        ))}
      </Stack>
      <IconButton onClick={handleAddPlayer}>
        <AddIcon />
      </IconButton>
      <Box m={2}></Box>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        columns={3}
        xs={3}
        className={classes.scoreButtons}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
          <Grid key={value} item xs={1} sm={1} md={1}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleScore(value)}
              disabled={passedUserCount === players.length - 1}
              fullWidth
            >
              {value}
            </Button>
          </Grid>
        ))}
        {
          <Grid item xs={3} sm={3} md={3}>
            <Button
              variant="contained"
              color="error"
              onClick={handleError}
              disabled={passedUserCount === players.length - 1}
              fullWidth
            >
              ERROR
            </Button>
          </Grid>
        }
        {
          <Grid item xs={3} sm={3} md={3}>
            <Button variant="contained" color="primary" onClick={handleResetAll} fullWidth>
              RESET ALL
            </Button>
          </Grid>
        }
      </Grid>
    </Container>
  );
};

export default App;
