import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';

import clover from './clover.png';
import cup from './cup.png';
import blackRaven from './black-raven.png';
import tinyBrain from './tiny-brain.jpg';

export default function ResultDialog(props) {
  const { openDialog, isWin, currentRow, onCloseDialog, onRestartGame, hasRestartedGame } = props

  let textContent = '';
  let image = null;

  if (isWin) {
    if (currentRow < 2) {
      textContent = 'You are the luckies person in the world!';
      image = clover;
    } else {
      textContent = 'You are the champion!';
      image = cup;
    }
  } else {
    if (!hasRestartedGame) {
      textContent = 'Better luck next time!';
      image = blackRaven;
    } else {
      textContent = 'You must think harder!';
      image = tinyBrain;
    }
  }

  return (
    <Dialog
      open={openDialog}
      maxWidth="xs"
      fullWidth={true}
      style={{ textAlign: 'center' }}
    >
      <DialogTitle>
        {isWin ? 'Congratulation' : 'Game Over'}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          <img src={image} alt="result" />
          <div>{textContent}</div>
        </DialogContentText>
      </DialogContent>

      <DialogActions style={{ justifyContent: 'center' }}>
        <Button onClick={onRestartGame} color="primary" autoFocus>
          <Refresh fontSize="small" /> Play Again
        </Button>

        <Button onClick={onCloseDialog} color="secondary">
          Review Board
        </Button>
      </DialogActions>
    </Dialog>
  )
}