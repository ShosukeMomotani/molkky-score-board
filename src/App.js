import * as React from "react";
import { createStyles, makeStyles } from "@mui/styles";

import { AppBar, Toolbar, Container, Typography, Button, IconButton, Grid, Stack, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";

import Div100vh from "react-div-100vh";
import ListUsers from "./components/list-users";
import DialogEditUser from "./components/dialog-edit-user";

import Player from "./player";

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

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const App = () => {
  const classes = useStyles();

  const [players, setPlayers] = React.useState([]);
  const [selectedPlayer, setSelectedPlayer] = React.useState(0);
  const [passedUserCount, setPassedUserCount] = React.useState(0);
  const [openAddUserDialog, setOpenAddUserDialog] = React.useState(false);
  const [isGameFinished, setIsGameFinished] = React.useState(true);
  const [anchorMenu, setAnchorMenu] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };

  const handleSufflePlayers = () => {
    handleCloseMenu();
    setPlayers(shuffle(players));
    selectedPlayer(0);
  };

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

  React.useEffect(() => {
    setIsGameFinished(players.filter((player) => player.isPlaying()).length < 2);
  }, [players]);

  const handleAddPlayer = () => {
    setOpenAddUserDialog(true);
  };

  const handleCloseAddUserDialog = (player) => {
    setOpenAddUserDialog(false);
    if (player) {
      const newPlayers = [...players, player];
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
      if (players.filter((player) => player.isPlaying()).length === 1) {
        players.filter((player) => player.isPlaying())[0].setRank(passedUserCount + 2);
      }
    }
    setPlayers([...players]);
    moveToNextUser();
  };

  const handleError = () => {
    players[selectedPlayer].doError();
    if (players.filter((player) => player.isPlaying()).length === 1) {
      players.filter((player) => player.isPlaying())[0].setRank(passedUserCount + 1);
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

  // onload
  React.useEffect(() => {
    setPlayers(loadUsersStorage().map((name) => new Player(name)));
  }, []);

  return (
    <Container className={classes.root} maxWidth="xs">
      <Div100vh>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleOpenMenu}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorMenu} open={Boolean(anchorMenu)} onClose={handleCloseMenu}>
              <MenuItem onClick={handleSufflePlayers}>シャッフル</MenuItem>
            </Menu>
            <Typography variant="h4" component="div">
              Molkky Score Board
            </Typography>
          </Toolbar>
        </AppBar>
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
              onDeleteUser={deleteUser}
              onSortUsers={(sortedUsers) => {
                setPlayers(sortedUsers);
                setSelectedPlayer(-1);
                saveUsersStorage(sortedUsers.map((player) => player.name));
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
            columns={3}
            className={classes.scoreButtons}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
              <Grid item key={value} xs={1} sm={1} md={1}>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => handleScore(value)}
                  disabled={isGameFinished}
                  size="large"
                  fullWidth
                >
                  {value}
                </Button>
              </Grid>
            ))}
            {
              <Grid item xs={2} sm={2} md={2}>
                <Button variant="outlined" color="error" onClick={handleError} disabled={isGameFinished} fullWidth>
                  ERROR
                </Button>
              </Grid>
            }
            {
              <Grid item xs={1} sm={1} md={1}>
                <Button variant="outlined" color="primary" onClick={handleResetAll} fullWidth>
                  RESET ALL
                </Button>
              </Grid>
            }
          </Grid>
        </Stack>
      </Div100vh>
      <DialogEditUser open={openAddUserDialog} onClose={handleCloseAddUserDialog} />
    </Container>
  );
};

export default App;
