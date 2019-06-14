import React from 'react';
import { Container, AppBar, List, ListItem, ListItemAvatar, ListItemIcon, Divider } from '@material-ui/core';
import { Lens, PanoramaFishEye, CheckCircleOutline, SwapHorizontalCircleOutlined, HighlightOff } from '@material-ui/icons';
import './App.css';

function App() {
  return (
    <Container maxWidth="sm">
      <AppBar color="primary" position="static">
        <h1>Master Mind</h1>
      </AppBar>

      <List component="nav" aria-label="Main mailbox folders">
        <ListItem>
          <ListItemAvatar>
            <div>
              <div><SwapHorizontalCircleOutlined /><CheckCircleOutline /></div>
              <div><HighlightOff /><PanoramaFishEye /></div>
            </div>
          </ListItemAvatar>
          <ListItemIcon>
            <Lens />
          </ListItemIcon>
          <ListItemIcon>
            <Lens />
          </ListItemIcon>
          <ListItemIcon>
            <Lens />
          </ListItemIcon>
          <ListItemIcon>
            <Lens />
          </ListItemIcon>
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemIcon>
            <Lens />
          </ListItemIcon>
          <ListItemIcon>
            <Lens />
          </ListItemIcon>
          <ListItemIcon>
            <Lens />
          </ListItemIcon>
          <ListItemIcon>
            <Lens />
          </ListItemIcon>
        </ListItem>
      </List>
    </Container>
  );
}

export default App;
