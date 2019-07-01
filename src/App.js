import React from 'react';
import { Container, AppBar } from '@material-ui/core';
import './App.css';

import Board from './components/Board'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ['#FFB400', '#FF5A5F', '#8CE071', '#00D1C1', '#007A87', '#7B0051'],
      numberOfRows: 10,
      numberOfPegsInRow: 4,
      codes: [],
      rows: [],
      keys: [],
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
    const length = numberOfRows * numberOfPegsInRow;

    this.setState({
      codes: this._generateRandomCodes(),
      rows: Array(length).fill('gray'),
      keys: Array(length).fill('gray')
    });
  }

  _checkCode(rowIndex) {
    const numberOfBlackPeg = 1;
    const numberOfWhitePeg = 0;
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
    const { currentRow, numberOfPegsInRow } = this.state;
    const startIndex = currentRow * numberOfPegsInRow;
    const endIndex = startIndex + numberOfPegsInRow;

    if (index >= startIndex && index < endIndex) {
      this.setState({ currentPeg: index });
    }
  }

  _onSubmit = () => {
    const { currentRow, numberOfPegsInRow } = this.state;

    this.setState({
      currentRow: currentRow + 1,
      currentPeg: (currentRow + 1) * numberOfPegsInRow
    });
  }

  render() {
    const { numberOfRows, numberOfPegsInRow, rows, keys, currentRow, currentPeg, colors } = this.state

    return (
      <Container maxWidth="sm">
        <AppBar color="primary" position="static">
          <h1>Master Mind</h1>
        </AppBar>

        <Board
          numberOfRows={numberOfRows}
          numberOfPegsInRow={numberOfPegsInRow}
          rows={rows}
          keys={keys}
          currentRow={currentRow}
          currentPeg={currentPeg}
          colors={colors}
          onChangePeg={this._onChangePeg}
          onChooseColor={this._onChooseColor}
          onSubmit={this._onSubmit} />
      </Container>
    );
  }
}

export default App;
