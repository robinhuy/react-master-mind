import React from 'react';
import { Container, AppBar } from '@material-ui/core';
import './App.css';

import Board from './components/Board'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // colors: ['#FFB400', '#FF5A5F', '#8CE071', '#00D1C1', '#007A87', '#7B0051'],
      colors: ['red', 'green', 'black', 'brown', 'yellow', 'blue'],
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
    const { rows, currentRow, numberOfRows, numberOfPegsInRow } = this.state;
    const startIndex = currentRow * numberOfPegsInRow;
    let newCodes = Array.from(this.state.codes);
    let newKeys = Array.from(this.state.keys);
    let numberOfBlackPegs = 0;
    let numberOfWhitePegs = 0;
    
    for (let i = 0; i < numberOfPegsInRow; i++) {
      const index = startIndex + i;

      if (rows[index] === newCodes[i]) {
        numberOfBlackPegs++;
        delete(newCodes[i]);
      }
    }

    for (let i = 0; i < numberOfPegsInRow; i++) {
      const index = startIndex + i;

      if (newCodes.indexOf(rows[index]) !== -1) {
        numberOfWhitePegs++;
        delete(newCodes[newCodes.indexOf(rows[index])])
      }
    }

    if (numberOfBlackPegs === numberOfPegsInRow) {
      alert('win');
    } else if (currentRow === numberOfRows - 1) {
      alert('lose');
    }
    
    for (let i = 0; i < numberOfBlackPegs; i++) {
      newKeys[startIndex + i] = 'black';
    }

    for (let i = numberOfBlackPegs; i < numberOfBlackPegs + numberOfWhitePegs; i++) {
      newKeys[startIndex + i] = 'white';
    }

    this.setState({
      keys: newKeys,
      currentRow: currentRow + 1,
      currentPeg: (currentRow + 1) * numberOfPegsInRow
    });
  }

  render() {
    return (
      <Container maxWidth="sm">
        <AppBar color="primary" position="static">
          <h1>Master Mind</h1>
        </AppBar>

        <Board
          {...this.state}
          onChangePeg={this._onChangePeg}
          onChooseColor={this._onChooseColor}
          onSubmit={this._onSubmit} />
      </Container>
    );
  }
}

export default App;
