import React from 'react';
import { Container, AppBar, Toolbar, Typography } from '@material-ui/core';
import introJs from 'intro.js';
import 'intro.js/minified/introjs.min.css';

import Board from './components/Board';
import ResultDialog from './components/ResultDialog';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ['#FFB400', '#FF5A5F', '#8CE071', '#00D1C1', '#007A87', '#7B0051'],
      numberOfRows: 8,
      numberOfPegsInRow: 4,
      codes: [],
      rows: [],
      keys: [],
      currentRow: 0,
      currentPeg: 0,
      openDialog: false,
      isWin: null
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

  _initGame = () => {
    const { numberOfPegsInRow, numberOfRows } = this.state;
    const length = numberOfRows * numberOfPegsInRow;

    this.setState({
      codes: this._generateRandomCodes(),
      rows: Array(length).fill('gray'),
      keys: Array(length).fill('gray'),
      currentRow: 0,
      currentPeg: 0,
      openDialog: false,
      isWin: null
    });
  }

  componentDidMount() {
    this._initGame();

    // Only show intro if it's the first time visiting page
    introJs().start();
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
    const { codes, rows, keys, currentRow, numberOfRows, numberOfPegsInRow } = this.state;
    const startIndex = currentRow * numberOfPegsInRow;
    let newCodes = Array.from(codes);
    let newRows = Array.from(rows);
    let newKeys = Array.from(keys);
    let numberOfBlackPegs = 0;
    let numberOfWhitePegs = 0;

    // Count black pegs
    for (let i = 0; i < numberOfPegsInRow; i++) {
      const index = startIndex + i;

      if (newRows[index] === newCodes[i]) {
        numberOfBlackPegs++;
        delete (newRows[index]);
        delete (newCodes[i]);
      }
    }

    // Count white pegs
    for (let i = 0; i < numberOfPegsInRow; i++) {
      const index = startIndex + i;
      const indexOfPeg = newCodes.indexOf(newRows[index])

      if (indexOfPeg !== -1) {
        numberOfWhitePegs++;
        delete (newRows[index]);
        delete (newCodes[indexOfPeg])
      }
    }

    // Update key pegs
    for (let i = 0; i < numberOfBlackPegs; i++) {
      newKeys[startIndex + i] = 'black';
    }
    for (let i = numberOfBlackPegs; i < numberOfBlackPegs + numberOfWhitePegs; i++) {
      newKeys[startIndex + i] = 'white';
    }
    this.setState({ keys: newKeys });

    // Check win
    if (numberOfBlackPegs === numberOfPegsInRow) {
      this.setState({
        openDialog: true,
        isWin: true
      })
    } else if (currentRow === numberOfRows - 1) {
      this.setState({
        openDialog: true,
        isWin: false
      })
    } else {
      this.setState({
        currentRow: currentRow + 1,
        currentPeg: (currentRow + 1) * numberOfPegsInRow
      });
    }
  }

  _onCloseDialog = () => {
    this.setState({ openDialog: false })
  }

  _onRestartGame = () => {
    this._initGame();

    var body = document.body;
    var html = document.documentElement;
    body.scrollTop = 0;
    html.scrollTop = 0;
  }

  render() {
    return (
      <Container
        maxWidth="sm"
        style={{ marginTop: '15px' }}
        data-intro="Welcome to the MasterMind game! Try to guess the pattern, in both order and color, within eight turns." 
        data-step="1"
      >
        <AppBar color="primary" position="static">
          <Toolbar style={{ justifyContent: 'center' }}>
            <Typography variant="h3" component="h1">
              MASTERMIND
          </Typography>
          </Toolbar>
        </AppBar>

        <Board
          {...this.state}
          onChangePeg={this._onChangePeg}
          onChooseColor={this._onChooseColor}
          onSubmit={this._onSubmit}
          onRestartGame={this._onRestartGame} />

        <ResultDialog
          openDialog={this.state.openDialog}
          isWin={this.state.isWin}
          onCloseDialog={this._onCloseDialog}
          onRestartGame={this._onRestartGame} />
      </Container>
    );
  }
}

export default App;
