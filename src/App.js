import React from 'react';
import { Container, AppBar, Toolbar, Typography } from '@material-ui/core';
import introJs from 'intro.js';
import 'intro.js/minified/introjs.min.css';

import Board from './components/Board';
import ResultDialog from './components/dialogs/ResultDialog';
import IntroDialog from './components/dialogs/IntroDialog';

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
      openIntroDialog: false,
      openResultDialog: false,
      isWin: null,
      hasRestartedGame: false,
      isMobile: false
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
      openResultDialog: false,
      isWin: null
    });
  }

  componentDidMount() {
    this._initGame();

    if (window.matchMedia && window.matchMedia('(max-width: 500px)').matches) {
      this.setState({ isMobile: true })
    }

    // Only show intro dialog if it's the first time visiting page
    const isVisited = localStorage.getItem('isVisited');
    if (!isVisited) {
      this.setState({ openIntroDialog: true })
    }
  }

  _showIntro = () => {
    this.setState({ openIntroDialog: false })
    introJs().setOption('showStepNumbers', false).start();
    localStorage.setItem('isVisited', '1');
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
        openResultDialog: true,
        isWin: true
      })
    } else if (currentRow === numberOfRows - 1) {
      this.setState({
        openResultDialog: true,
        isWin: false
      })
    } else {
      this.setState({
        currentPeg: (currentRow + 1) * numberOfPegsInRow
      });
    }

    // Increase step
    this.setState({ currentRow: currentRow + 1 })
  }

  _onCloseIntroDialog = () => {
    this.setState({ openIntroDialog: false })
  }

  _onCloseResultDialog = () => {
    this.setState({ openResultDialog: false })
  }

  _onRestartGame = () => {
    this.setState({ hasRestartedGame: true });

    this._initGame();

    var body = document.body;
    var html = document.documentElement;
    body.scrollTop = 0;
    html.scrollTop = 0;
  }

  render() {
    const { openIntroDialog, openResultDialog, isWin, hasRestartedGame, currentRow } = this.state

    return (
      <Container
        maxWidth="sm"
        style={{ marginTop: '15px' }}
      >
        <AppBar color="primary" position="static">
          <Toolbar style={{ justifyContent: 'center' }}>
            <Typography variant="h3" component="h1">
              Master Mind
          </Typography>
          </Toolbar>
        </AppBar>

        <Board
          {...this.state}
          onChangePeg={this._onChangePeg}
          onChooseColor={this._onChooseColor}
          onSubmit={this._onSubmit}
          onRestartGame={this._onRestartGame}
        />

        <ResultDialog
          openDialog={openResultDialog}
          currentRow={currentRow}
          isWin={isWin}
          hasRestartedGame={hasRestartedGame}
          onCloseDialog={this._onCloseResultDialog}
          onRestartGame={this._onRestartGame} />

        <IntroDialog
          openDialog={openIntroDialog}
          onCloseDialog={this._onCloseIntroDialog}
          showIntro={this._showIntro} />
      </Container>
    );
  }
}

export default App;
