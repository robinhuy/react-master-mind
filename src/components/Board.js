import React from 'react';
import { Paper, List, ListItem, Grid, Button } from '@material-ui/core';
import { VpnKey, Refresh } from '@material-ui/icons';

import KeyPegs from './KeyPegs';
import CodePegs from './CodePegs';
import ColorPegs from './ColorPegs';
import HiddenPegs from './HiddenPegs';

export default function Board(props) {
  const { numberOfRows, numberOfPegsInRow, codes, rows, keys, currentRow, currentPeg, colors, isWin, onRestartGame } = props
  let listItems = [];

  for (let i = 0; i < numberOfRows; i++) {
    const isCurrentRow = (currentRow === i);

    listItems.push(
      <ListItem
        key={i}
        disableGutters={true}
        className={isCurrentRow ? 'Board-Row Board-Row--active' : 'Board-Row'}
      >
        <Grid container alignContent="center" alignItems="center">
          {i == 0 ? (
            <Grid item xs={2} data-intro="Feedback" data-step="3">
              <KeyPegs keys={keys} numberOfPegsInRow={numberOfPegsInRow} rowIndex={i} />
            </Grid>
          ) : (
              <Grid item xs={2}>
                <KeyPegs keys={keys} numberOfPegsInRow={numberOfPegsInRow} rowIndex={i} />
              </Grid>
            )}

          {i == 0 ? (
            <Grid item xs={7} data-intro="Guess the pattern by choose color from the right." data-step="2">
              <CodePegs
                rows={rows}
                numberOfPegsInRow={numberOfPegsInRow}
                rowIndex={i}
                currentRow={currentRow}
                currentPeg={currentPeg}
                onChangePeg={props.onChangePeg} />
            </Grid>
          ) : (
              <Grid item xs={7}>
                <CodePegs
                  rows={rows}
                  numberOfPegsInRow={numberOfPegsInRow}
                  rowIndex={i}
                  currentRow={currentRow}
                  currentPeg={currentPeg}
                  onChangePeg={props.onChangePeg} />
              </Grid>
            )}

          <Grid item xs={3}>
            {isCurrentRow && isWin === null &&
              <ColorPegs
                colors={colors}
                isWin={isWin}
                onChooseColor={props.onChooseColor}
                onSubmit={props.onSubmit}
                data-intro="Choose the colors here. After submit you'll get feedback of the guess." />
            }
          </Grid>
        </Grid>
      </ListItem>
    );
  }

  const hiddenRowIndex = numberOfRows + 1
  listItems.push(
    <ListItem
      disableGutters={true}
      key={hiddenRowIndex}
      className={'Board-Row'}
      style={{ paddingTop: '15px' }}
    >
      <Grid container alignContent="center" alignItems="center">
        <Grid item xs={2}>
          <Grid container justify="center" alignItems="center">
            <VpnKey className="Key" />
          </Grid>
        </Grid>

        <Grid item xs={7} data-intro="Here is the result which display at the end game.">
          <HiddenPegs codes={codes} isWin={isWin} />
        </Grid>

        <Grid item xs={3}>
          <Grid container justify="center" alignItems="center">
            <Button onClick={onRestartGame} color="primary">
              <Refresh fontSize="small" /> Restart
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  )

  return (
    <Paper>
      <List>{listItems}</List>
    </Paper>
  );
}