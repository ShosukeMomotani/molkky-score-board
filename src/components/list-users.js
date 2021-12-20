import * as React from "react";
// import { createStyles, makeStyles } from "@mui/styles";

import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";
import { List } from "@mui/material";

import ListItemUser from "./list-item-user";

// const useStyles = makeStyles((theme) => createStyles({}));

export default function ListUsers({ players, selectedPlayerIndex, onSelectUser, onDeleteUser, onSortUsers }) {
  // const classes = useStyles();

  const onDrop = ({ removedIndex, addedIndex }) => {
    const newPlayers = arrayMoveImmutable(players, removedIndex, addedIndex);
    onSortUsers(newPlayers);
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
                  onDeleteUser(index);
                }}
                onEditPlayer={(player) => {
                  console.log(player);
                  const newPlayers = [...players];
                  newPlayers.splice(index, 1, player);
                  onSortUsers(newPlayers);
                }}
              ></ListItemUser>
            </Draggable>
          );
        })}
      </Container>
    </List>
  );
}
