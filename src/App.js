import * as React from "react";
import { createStyles, makeStyles } from "@mui/styles";

import { Container, Box, Typography, Button, Stack, IconButton, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import UserScore from "./components/user-score";
import DialogNickname from "./components/dialog-nickname";

import Player from "./player";

// スタイルを適用する
// 引数に作成したthemeを受け取る
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      textAlign: "center",
    },
    scoreButtons: {},
  })
);

const STORAGRE_USERS_KEY = "USERS";
const saveUsersStorage = (users) => {
  localStorage.setItem(STORAGRE_USERS_KEY, JSON.stringify(users));
};
const loadUsersStorage = () => {
  return JSON.parse(localStorage.getItem(STORAGRE_USERS_KEY) || "[]");
};

const App = () => {
  const classes = useStyles();

  const [players, setPlayers] = React.useState([]);
  const [selectedPlayer, setSelectedPlayer] = React.useState(0);
  const [passedUserCount, setPassedUserCount] = React.useState(0);
  const [openNicknameDialog, setOpenNicknameDialog] = React.useState(false);

  const moveToNextUser = () => {
    if (players.filter((player) => player.isPlaying()).length < 1) return;

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
    saveUsersStorage(newPlayers.map((player) => player.name));
  };

  const isGameFinished = () => {
    return players.filter((player) => player.isPlaying()).length < 1;
  };

  const handleAddPlayer = () => {
    setOpenNicknameDialog(true);
  };

  const handleCloseDialogNickname = (value) => {
    setOpenNicknameDialog(false);
    if (value) {
      const newPlayers = [...players, new Player(value)];
      setPlayers(newPlayers);
      saveUsersStorage(newPlayers.map((player) => player.name));
    }
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

  // onload
  React.useEffect(() => {
    setPlayers(loadUsersStorage().map((name) => new Player(name)));
  }, []);

  return (
    <Container className={classes.root} maxWidth="xs">
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
              disabled={isGameFinished()}
              size="large"
              fullWidth
            >
              {value}
            </Button>
          </Grid>
        ))}
        {
          <Grid item xs={2} sm={2} md={2}>
            <Button variant="contained" color="error" onClick={handleError} disabled={isGameFinished()} fullWidth>
              ERROR
            </Button>
          </Grid>
        }
        {
          <Grid item xs={1} sm={1} md={1}>
            <Button variant="contained" color="primary" onClick={handleResetAll} fullWidth>
              RESET ALL
            </Button>
          </Grid>
        }
      </Grid>
      <DialogNickname open={openNicknameDialog} onClose={handleCloseDialogNickname} />
    </Container>
  );
};

export default App;
