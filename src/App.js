import React from 'react';
import { Container, AppBar, List, ListItem, ListItemAvatar, ListItemIcon, Divider, Popper, Paper, Typography } from '@material-ui/core';
import { Lens, PanoramaFishEye, CheckCircleOutline, SwapHorizontalCircleOutlined, HighlightOff } from '@material-ui/icons';
import './App.css';

import ChooseColor from './components/ChooseColor'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ['#FFB400', '#FF5A5F', '#8CE071', '#00D1C1', '#007A87', '#7B0051']
    };
  }

  _onChooseColor(i) {
    console.log(i);
  }

  render() {
    return (
      <Container maxWidth="sm">
        <AppBar color="primary" position="static">
          <h1>Master Mind</h1>
        </AppBar>

        <List component="nav">
          <ListItem>
            <ListItemAvatar>
              <div>
                <div><SwapHorizontalCircleOutlined /><CheckCircleOutline /></div>
                <div><HighlightOff /><PanoramaFishEye /></div>
              </div>
            </ListItemAvatar>
            <ListItemIcon>
              <Lens style={{ fontSize: '2.5em' }} />
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


            <ChooseColor color={this.state.colors[1]} onChooseColor={() => this._onChooseColor(1)} />
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
}

export default App;
