import * as React from "react";
import { createStyles, makeStyles } from "@mui/styles";

import { AppBar, Toolbar, Container, Typography, Button, IconButton, Grid, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";

import Div100vh from "react-div-100vh";
import MenuDrawer from "./components/menu-drawer";
import ListUsers from "./components/list-users";
import DialogEditUser from "./components/dialog-edit-user";
import DialogNextGame from "./components/dialog-next-game";

import {
  savePlayersStorage,
  loadPlayersStorage,
  saveSelectedPlayerStorage,
  loadSelectedPlayerStorage,
  savePassedPlayerCountStorage,
  loadPassedPlayerCountStorage,
} from "./util/storage";

// スタイルを適用する
// 引数に作成したthemeを受け取る
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      textAlign: "center",
    },
    toolbarMargin: {
      height: "60px",
    },
    body: {
      height: `calc(100% - 60px)`,
      paddingBottom: theme.spacing(2),
    },
  })
);

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const App = () => {
  const classes = useStyles();

  const [players, setPlayers] = React.useState(loadPlayersStorage());
  const [selectedPlayer, setSelectedPlayer] = React.useState(loadSelectedPlayerStorage());
  const [passedUserCount, setPassedUserCount] = React.useState(loadPassedPlayerCountStorage());
  const [openAddUserDialog, setOpenAddUserDialog] = React.useState(false);
  const [openNextGameDialog, setOpenNextGameDialog] = React.useState(false);
  const [isGameFinished, setIsGameFinished] = React.useState(true);
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleSufflePlayers = () => {
    setPlayers(shuffle(players));
    setSelectedPlayer(0);
  };

  const moveToNextUser = () => {
    if (players.filter((player) => player.isPlaying()).length < 1) return;

    let newSelectedPlayer = selectedPlayer;
    do {
      newSelectedPlayer = (newSelectedPlayer + 1) % players.length;
    } while (!players[newSelectedPlayer].isPlaying());
    setSelectedPlayer(newSelectedPlayer);
  };

  React.useEffect(() => {
    savePlayersStorage(players);
    setIsGameFinished(players.filter((player) => player.isPlaying()).length < 2);
  }, [players]);

  React.useEffect(() => {
    saveSelectedPlayerStorage(selectedPlayer);
  }, [selectedPlayer]);

  React.useEffect(() => {
    savePassedPlayerCountStorage(passedUserCount);
  }, [passedUserCount]);

  const handleAddPlayer = () => {
    setOpenAddUserDialog(true);
  };

  const handleCloseAddUserDialog = (player) => {
    setOpenAddUserDialog(false);
    if (player) {
      const newPlayers = [...players, player];
      setPlayers(newPlayers);
      savePlayersStorage(newPlayers);
    }
  };

  const handleNextGame = () => {
    setOpenNextGameDialog(true);
  };

  const handleCancelNextGameDialog = () => {
    setOpenNextGameDialog(false);
  };

  const handleCloseNextGameDialog = (newPlayers) => {
    setOpenNextGameDialog(false);
    newPlayers.forEach((player) => player.newGame());
    setPlayers([...newPlayers.reverse()]);
    setSelectedPlayer(0);
    setPassedUserCount(0);
  };

  const handleScore = (value) => {
    if (players[selectedPlayer].isPassed()) return;

    players[selectedPlayer].addScore(value);
    if (players[selectedPlayer].isPassed()) {
      players[selectedPlayer].setRank(passedUserCount + 1);
      setPassedUserCount(passedUserCount + 1);
      if (players.filter((player) => player.isPlaying()).length === 1) {
        players.filter((player) => player.isPlaying())[0].setRank(passedUserCount + 2);
        setPassedUserCount(passedUserCount + 2);
      }
    }
    setPlayers([...players]);
    moveToNextUser();
  };

  const handleError = () => {
    players[selectedPlayer].doError();
    if (players.filter((player) => player.isPlaying()).length === 1) {
      players.filter((player) => player.isPlaying())[0].setRank(passedUserCount + 1);
      setPassedUserCount(passedUserCount + 1);
    }
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
    <Container className={classes.root} maxWidth="xs">
      <Div100vh>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleOpenMenu}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" component="div">
              Molkky Score Board
            </Typography>
          </Toolbar>
        </AppBar>
        <MenuDrawer
          open={openMenu}
          onClose={handleCloseMenu}
          onShuffle={handleSufflePlayers}
          onReset={handleResetAll}
        ></MenuDrawer>
        <div className={classes.toolbarMargin} />
        <Stack
          direction="column"
          justifyContent={{ xs: "space-between", sm: "flex-start" }}
          alignItems="stretch"
          className={classes.body}
        >
          <div>
            <ListUsers
              players={players}
              selectedPlayerIndex={selectedPlayer}
              onSelectUser={setSelectedPlayer}
              onUpdateUsers={(updateUsers) => {
                setPlayers([...updateUsers]);
              }}
            />
            <IconButton onClick={handleAddPlayer}>
              <AddIcon />
            </IconButton>
          </div>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            rowSpacing={1.5}
            columns={3}
            className={classes.scoreButtons}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
              <Grid item key={value} xs={1} sm={1} md={1}>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => handleScore(value)}
                  size="large"
                  sx={{ fontWeight: 600 }}
                  fullWidth
                  disabled={isGameFinished}
                >
                  {value}
                </Button>
              </Grid>
            ))}
            {
              <Grid item xs={2} sm={2} md={2}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleError}
                  size="large"
                  sx={{ fontWeight: 600 }}
                  fullWidth
                  disabled={isGameFinished}
                >
                  ERROR
                </Button>
              </Grid>
            }
            {
              <Grid item xs={1} sm={1} md={1}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleNextGame}
                  size="large"
                  sx={{ fontWeight: 600, fontSize: "0.7rem" }}
                  fullWidth
                  disabled={passedUserCount === 0}
                >
                  NEXT GAME
                </Button>
              </Grid>
            }
          </Grid>
        </Stack>
      </Div100vh>
      <DialogEditUser open={openAddUserDialog} onClose={handleCloseAddUserDialog} />
      <DialogNextGame
        open={openNextGameDialog}
        players={[...players].sort((a, b) => (a.rank || Number.MAX_SAFE_INTEGER) - (b.rank || Number.MAX_SAFE_INTEGER))}
        onClose={handleCancelNextGameDialog}
        onNext={handleCloseNextGameDialog}
      />
    </Container>
  );
};

export default App;
