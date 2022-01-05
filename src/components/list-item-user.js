import * as React from "react";
import { createStyles, makeStyles, styled } from "@mui/styles";

import DialogEditUser from "./dialog-edit-user";

import {
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  ListItemAvatar,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  Badge,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";

import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import Battery60Icon from "@mui/icons-material/Battery60";
import Battery30Icon from "@mui/icons-material/Battery30";
import PersonIcon from "@mui/icons-material/Person";

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
      disabled={player.isDropped()}
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
        <ListItemAvatar sx={{ minWidth: 45 }}>
          {player.rank > 0 ? (
            <Badge color="secondary" overlap="circular" badgeContent={player.rank}>
              <Avatar sx={{ width: 30, height: 30, bgcolor: "gray" }}>
                <PersonIcon />
              </Avatar>
            </Badge>
          ) : (
            <Avatar sx={{ width: 30, height: 30, bgcolor: "gray" }}>
              <PersonIcon />
            </Avatar>
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
          variant="h3"
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
        {!player.disqualification ? (
          <BatteryChargingFullIcon color="info" />
        ) : player.error === 0 ? (
          <BatteryFullIcon color="success" />
        ) : player.error === 1 ? (
          <Battery60Icon color="warning" />
        ) : player.error === 2 ? (
          <Battery30Icon color="error" />
        ) : (
          <BatteryFullIcon color="disabled" />
        )}
      </ListItemButton>
    </ListItem>
  );
}
