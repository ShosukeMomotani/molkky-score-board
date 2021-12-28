import * as React from "react";
// import { createStyles, makeStyles } from "@mui/styles";

import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";
import { List } from "@mui/material";

import ListItemUser from "./list-item-user";

// const useStyles = makeStyles((theme) => createStyles({}));

export default function ListUsers({ players, selectedPlayerIndex, onSelectUser, onUpdateUsers }) {
  // const classes = useStyles();

  const onDrop = ({ removedIndex, addedIndex }) => {
    const newPlayers = arrayMoveImmutable(players, removedIndex, addedIndex);
    onUpdateUsers(newPlayers);
  };

  return (
    <List dense>
      <Container lockAxis="y" onDrop={onDrop}>
        {players.map((player, index) => {
          return (
            <Draggable key={player.name}>
              <ListItemUser
                player={player}
                selected={index === selectedPlayerIndex}
                onSelect={() => {
                  onSelectUser(index);
                }}
                onDelete={() => {
                  const newPlayers = [...players];
                  newPlayers.splice(index, 1);
                  onUpdateUsers(newPlayers);
                }}
                onEditPlayer={(player) => {
                  const newPlayers = [...players];
                  newPlayers.splice(index, 1, player);
                  onUpdateUsers(newPlayers);
                }}
              ></ListItemUser>
            </Draggable>
          );
        })}
      </Container>
    </List>
  );
}
