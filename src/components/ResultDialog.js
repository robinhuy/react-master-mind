import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';

export default function ResultDialog(props) {
  const { openDialog, isWin, onCloseDialog, onRestartGame } = props
  return (
    <Dialog
      open={openDialog}
      maxWidth="xs"
      fullWidth={true}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">
        {isWin ? 'Congratulation' : 'Game Over'}
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="dialog-description">
          {isWin ? (
            <span>You are the champion!</span>
          ) : (
              <span>Better luck next time!</span>
            )}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
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