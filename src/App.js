import React from 'react';
import { Container, AppBar, List, ListItem, ListItemAvatar, ListItemIcon, Divider } from '@material-ui/core';
import { Lens } from '@material-ui/icons';
import './App.css';

import KeyPegs from './components/KeyPegs'
import ChooseCodePegs from './components/ChooseCodePegs'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ['#FFB400', '#FF5A5F', '#8CE071', '#00D1C1', '#007A87', '#7B0051'],
      numberOfRows: 10,
      numberOfPegsInRow: 4,
      codes: [],
      rows: [],
      currentRow: 0,
      currentPeg: 0,
    };
  }

  _generateRandomCodes = () => {
    const { colors, numberOfPegsInRow } = this.state;
    let codes = [];

    for (let i = 0; i < numberOfPegsInRow; i++) {
      codes.push(colors[Math.floor(Math.random() * colors.length)]);
    }

    return codes;
  }

  componentDidMount() {
    const { numberOfPegsInRow, numberOfRows } = this.state;

    this.setState({
      codes: this._generateRandomCodes(),
      rows: Array(numberOfRows * numberOfPegsInRow).fill('gray')
    });
  }

  _onChooseColor = (color) => {
    const { rows, currentPeg, numberOfPegsInRow } = this.state;
    let newRows = Array.from(rows);
    newRows[currentPeg] = color;

    this.setState({ rows: newRows });

    // Only change the current peg when it is not the final peg in row
    if ((currentPeg + 1) % numberOfPegsInRow !== 0) {
      this.setState({ currentPeg: currentPeg + 1 });
    }
  }

  _onChangePeg = (index) => {
    this.setState({ currentPeg: index });
  }

  _onSubmit = () => {
    const currentPeg = this.state.currentPeg;
    this.setState({ currentPeg: currentPeg + 1 });
  }

  _renderCodePeg = (rowIndex) => {
    const { numberOfPegsInRow, rows, currentPeg } = this.state;
    let codePegs = [];

    for (let i = 0; i < numberOfPegsInRow; i++) {
      const index = rowIndex * numberOfPegsInRow + i;

      codePegs.push(
        <ListItemIcon
          key={i}
          className={currentPeg === index ? "Peg--active" : ""}
          onClick={() => this._onChangePeg(index)}>
          <Lens fontSize="large" style={{ color: rows[index] }} />
        </ListItemIcon>
      );
    }

    return codePegs;
  }

  _renderDecodingBoard = () => {
    const { numberOfRows, colors } = this.state
    let board = [];

    for (let i = 0; i < numberOfRows; i++) {
      board.push(
        <div key={i}>
          <ListItem>
            <ListItemAvatar>
              <KeyPegs />
            </ListItemAvatar>

            {this._renderCodePeg(i)}

            <ChooseCodePegs colors={colors} onChooseColor={this._onChooseColor} onSubmit={this._onSubmit} />
          </ListItem>

          <Divider />
        </div>
      );
    }

    return board;
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
