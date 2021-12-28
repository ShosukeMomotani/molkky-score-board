import * as React from "react";
import { createStyles, makeStyles, styled } from "@mui/styles";

import DialogEditUser from "./dialog-edit-user";

import {
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Stack,
  ListItemAvatar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  Badge,
} from "@mui/material";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import EMobiledataIcon from "@mui/icons-material/EMobiledata";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";

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
    ereaErrorCount: {
      width: "60px",
      padding: theme.spacing(1),
    },
  })
);

export default function ListItemUser({ player, selected, onSelect, onDelete, onEditPlayer }) {
  const classes = useStyles();

  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const handleCloseMenu = () => {
    setAnchorMenu(null);
    setOpenEditDialog(false);
  };

  const handleCloseEditDialog = (player) => {
    handleCloseMenu();
    if (player) onEditPlayer(player);
  };

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <div>
          <IconButton
            edge="end"
            id="button-user-menu"
            ariea-aria-controls="user-menu"
            ariea-has-popup="true"
            ariea-expanded={Boolean(anchorMenu) ? "true" : undefined}
            onClick={(event) => {
              setOpenEditDialog(false);
              setAnchorMenu(event.currentTarget);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu id="user-menu" anchorEl={anchorMenu} open={Boolean(anchorMenu)} onClose={handleCloseMenu}>
            <MenuItem
              onClick={() => {
                setOpenEditDialog(true);
              }}
            >
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
              <DialogEditUser player={player} open={openEditDialog} onClose={handleCloseEditDialog} />
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                onDelete();
              }}
            >
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Remove</ListItemText>
            </MenuItem>
          </Menu>
        </div>
      }
      onClick={onSelect}
    >
      <ListItemButton selected={selected}>
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
          disableTypography
          primary={
            <StyledBadge badgeContent={player.win} color="success">
              <Typography
                variant="h4"
                fontWeight={selected ? "bold" : "normal"}
                color={player.isDropped() ? "gray" : "normal"}
                marginY={0.5}
              >
                {player.name}
              </Typography>
            </StyledBadge>
          }
        />
        <Typography
          variant="h4"
          fontWeight={selected ? "bold" : "normal"}
          color={player.isDropped() ? "gray" : "normal"}
        >
          {player.score}
        </Typography>
        <Typography
          variant="h6"
          fontWeight={selected ? "bold" : "normal"}
          sx={{ mx: 0.5 }}
          color={player.isDropped() ? "gray" : "normal"}
        >{`/${player.scoreMax}`}</Typography>
        <Stack direction="row" className={classes.ereaErrorCount}>
          {new Array(player.error).fill().map((value, index) => (
            <EMobiledataIcon color="error" key={index} />
          ))}
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}
