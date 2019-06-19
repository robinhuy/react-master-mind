import React from 'react';
import { Container, AppBar, Grid, List, ListItem, ListItemAvatar, ListItemIcon, Divider } from '@material-ui/core';
import { Lens } from '@material-ui/icons';
import './App.css';

import KeyPegs from './components/KeyPegs'
import ChooseCodePegs from './components/ChooseCodePegs'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ['#FFB400', '#FF5A5F', '#8CE071', '#00D1C1', '#007A87', '#7B0051'],
      codes: [],
      rows: [],
      pegsInRow: 4,
      numberOfRows: 10,
      currentRow: 0
    };
  }

  _onChooseColor = (i) => {
    console.log(i);
  }

  _generateRandomCodes = () => {
    const { colors, pegsInRow } = this.state
    let codes = [];

    for (let i = 0; i < pegsInRow; i++) {
      codes.push(colors[Math.floor(Math.random() * colors.length)])
    }

    return codes;
  }

  componentDidMount() {
    this.setState({ codes: this._generateRandomCodes() })
  }

  _renderCodePeg = () => {
    const { pegsInRow } = this.state
    let codePegs = [];

    for (let i = 0; i < pegsInRow; i++) {
      codePegs.push(
        <ListItemIcon key={i}>
          <Lens fontSize="large" style={{ color: 'gray' }} />
        </ListItemIcon>
      );
    }

    return codePegs;
  }

  _renderDecodingBoard = () => {
    let rows = [];

    for (let i = 0; i < this.state.numberOfRows; i++) {
      rows.push(
        <div key={i}>
          <ListItem>
            <ListItemAvatar>
              <KeyPegs />
            </ListItemAvatar>

            {this._renderCodePeg()}

            <ChooseCodePegs colors={this.state.colors} onChooseColor={this._onChooseColor} />
          </ListItem>

          <Divider />
        </div>
      );
    }
  }

  render() {
    return (
      <Container maxWidth="sm">
        <AppBar color="primary" position="static">
          <h1>Master Mind</h1>
        </AppBar>

        <List>
          {this._renderDecodingBoard()}
        </List>
      </Container>
    );
  }
}

export default App;
