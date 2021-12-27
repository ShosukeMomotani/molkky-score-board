import * as React from "react";
// import { createStyles, makeStyles } from "@mui/styles";

import { Drawer, Box, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import ClearAllIcon from "@mui/icons-material/ClearAll";

// const useStyles = makeStyles((theme) => createStyles({}));

export default function MenuDrawer({ open, onClose, onShuffle, onReset }) {
  // const classes = useStyles();

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          <ListItem
            button
            onClick={() => {
              onShuffle();
              onClose();
            }}
          >
            <ListItemIcon>
              <ShuffleIcon />
            </ListItemIcon>
            <ListItemText primary={"シャッフル"}></ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              onReset();
              onClose();
            }}
          >
            <ListItemIcon>
              <ClearAllIcon />
            </ListItemIcon>
            <ListItemText primary={"リセット"}></ListItemText>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
