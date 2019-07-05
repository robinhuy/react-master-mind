import React from 'react';
import { Container, AppBar, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { Refresh, Mood, MoodBad } from '@material-ui/icons';

import Board from './components/Board'

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
      isWin: false
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
      openDialog: false
    });
  }

  componentDidMount() {
    this._initGame();
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
    const { currentRow, numberOfRows, numberOfPegsInRow } = this.state;
    const startIndex = currentRow * numberOfPegsInRow;
    let newCodes = Array.from(this.state.codes);
    let newRows = Array.from(this.state.rows);
    let newKeys = Array.from(this.state.keys);
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

  _handleCloseDialog = () => {
    this.setState({ openDialog: false })
  }

  _restartGame = () => {
    this._initGame();

    var body = document.body;
    var html = document.documentElement;
    body.scrollTop = 0;
    html.scrollTop = 0;
  }

  render() {
    return (
      <Container maxWidth="sm">
        <AppBar color="primary" position="static">
          <Typography variant="h3" component="h1" align="center">
            MASTERMIND
          </Typography>
        </AppBar>

        <Board
          {...this.state}
          onChangePeg={this._onChangePeg}
          onChooseColor={this._onChooseColor}
          onSubmit={this._onSubmit} />

        <Dialog
          open={this.state.openDialog}
          maxWidth="xs"
          fullWidth={true}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          <DialogTitle id="dialog-title">
            {this.state.isWin ? 'Congratulation' : 'Game Over'}
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="dialog-description">
              {this.state.isWin ? (
                <span>You are the champion!</span>
              ) : (
                  <span>Better luck next time!</span>
                )}
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={this._restartGame} color="primary" autoFocus>
              <Refresh fontSize="small" /> Play Again
            </Button>

            <Button onClick={this._handleCloseDialog} color="secondary">
              Review Board
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
}

export default App;
