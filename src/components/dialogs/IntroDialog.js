import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

export default function IntroDialog(props) {
  const { openDialog, onCloseDialog, showIntro } = props
  return (
    <Dialog
      open={openDialog}

    >
      <DialogTitle>Welcome to the Mastermind Game</DialogTitle>

      <DialogContent>
        <DialogContentText>
          If you don't know the rule of the game, please check <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Mastermind_(board_game)">here</a>!
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCloseDialog} color="primary">
          Play Now
        </Button>

        <Button onClick={showIntro} color="secondary">
          View Tutorial
        </Button>
      </DialogActions>
    </Dialog>
  )
}