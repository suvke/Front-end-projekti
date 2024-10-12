import React, { useState } from 'react';
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemIcon, AppBar, Toolbar, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import CreateIcon from '@mui/icons-material/Create';

function Sivupalkki() {

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (

    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpen}><MenuIcon /></IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Koirarodut
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor='left' open={open} onClick={handleClose}>
        <List>
          <ListItem component={Link} to='/'>
            <ListItemButton>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary='Koirarotuvalitsin' />
            </ListItemButton>
          </ListItem>

          <ListItem component={Link} to='lista'>
            <ListItemButton>
              <ListItemIcon><PetsIcon /></ListItemIcon>
              <ListItemText primary='Koiralista' />
            </ListItemButton>
          </ListItem>

          <ListItem component={Link} to='lisaa'>
            <ListItemButton>
              <ListItemIcon><CreateIcon /></ListItemIcon>
              <ListItemText primary='Lisää koira' />
            </ListItemButton>
          </ListItem>

        </List>
      </Drawer>
      <Outlet />

    </Box>
  );
}

export default Sivupalkki;