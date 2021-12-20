import * as React from "react";
import { createStyles, makeStyles } from "@mui/styles";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Stack,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import EMobiledataIcon from "@mui/icons-material/EMobiledata";
import MenuIcon from "@mui/icons-material/Menu";

const useStyles = makeStyles((theme) =>
  createStyles({
    ereaErrorCount: {
      width: "60px",
      padding: theme.spacing(1),
    },
  })
);

export default function ListUses({ players, selectedPlayerIndex, onSelectUser, onDeleteUser }) {
  const classes = useStyles();

  return (
    <List dense="true">
      {players.map((player, index) => {
        return (
          <ListItem
            key={index}
            disablePadding
            secondaryAction={
              <div>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    onDeleteUser(index);
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </div>
            }
            onClick={() => onSelectUser(index)}
          >
            <ListItemButton selected={index === selectedPlayerIndex}>
              <ListItemAvatar sx={{ minWidth: 36 }}>
                {player.isDropped() ? (
                  <BlockIcon sx={{ color: "gray" }} />
                ) : player.rank === 1 ? (
                  <LooksOneIcon />
                ) : player.rank === 2 ? (
                  <LooksTwoIcon />
                ) : player.rank === 3 ? (
                  <Looks3Icon />
                ) : (
                  <></>
                )}
              </ListItemAvatar>
              <ListItemText
                primary={player.name}
                primaryTypographyProps={{
                  variant: "h4",
                  fontWeight: index === selectedPlayerIndex ? "bold" : "normal",
                  color: player.isDropped() ? "gray" : "normal",
                  marginY: 0.5,
                }}
              />
              <Typography
                variant="h4"
                fontWeight={index === selectedPlayerIndex ? "bold" : "normal"}
                color={player.isDropped() ? "gray" : "normal"}
              >
                {player.score}
              </Typography>
              <Typography
                variant="h6"
                fontWeight={index === selectedPlayerIndex ? "bold" : "normal"}
                sx={{ mx: 0.5 }}
                color={player.isDropped() ? "gray" : "normal"}
              >{`/${player.scoreMax}`}</Typography>
              <Stack direction="row" className={classes.error} className={classes.ereaErrorCount}>
                {new Array(player.error).fill().map((value, index) => (
                  <EMobiledataIcon color="error" key={index} />
                ))}
              </Stack>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
