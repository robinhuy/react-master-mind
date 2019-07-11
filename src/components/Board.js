import React from 'react';
import { Paper, List, ListItem, Grid, Button } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';

import KeyPegs from './KeyPegs';
import CodePegs from './CodePegs';
import ColorPegs from './ColorPegs';
import HiddenPegs from './HiddenPegs';

export default function Board(props) {
  const { isMobile, numberOfRows, numberOfPegsInRow, codes, rows, keys, currentRow, currentPeg, colors, isWin, onRestartGame } = props
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
          {i === 0 ? (
            <Grid
              item xs={2}
              data-intro="Feedback of your guess: Green icon is correct in both color and position, Orange icon is correct color but wrong position."
              data-step="4"
              data-disable-interaction="4"
            >
              <KeyPegs keys={keys} numberOfPegsInRow={numberOfPegsInRow} rowIndex={i} isMobile={isMobile} />
            </Grid>
          ) : (
              <Grid item xs={2}>
                <KeyPegs keys={keys} numberOfPegsInRow={numberOfPegsInRow} rowIndex={i} isMobile={isMobile} />
              </Grid>
            )}

          {i === 0 ? (
            <Grid
              item xs={isMobile ? 6 : 7}
              data-intro="Your guess in each turn."
              data-step="3"
              data-disable-interaction="3"
            >
              <CodePegs
                rows={rows}
                numberOfPegsInRow={numberOfPegsInRow}
                rowIndex={i}
                currentRow={currentRow}
                currentPeg={currentPeg}
                isMobile={isMobile}
                onChangePeg={props.onChangePeg} />
            </Grid>
          ) : (
              <Grid item xs={isMobile ? 6 : 7}>
                <CodePegs
                  rows={rows}
                  numberOfPegsInRow={numberOfPegsInRow}
                  rowIndex={i}
                  currentRow={currentRow}
                  currentPeg={currentPeg}
                  isMobile={isMobile}
                  onChangePeg={props.onChangePeg} />
              </Grid>
            )}

          <Grid item xs={isMobile ? 4 : 3}>
            {isCurrentRow && isWin === null &&
              <ColorPegs
                colors={colors}
                isWin={isWin}
                isMobile={isMobile}
                onChooseColor={props.onChooseColor}
                onSubmit={props.onSubmit} />
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
          <div className="Step-Number">{currentRow}</div>
        </Grid>

        <Grid
          item xs={7}
          data-intro="Result of the game, display at the end game."
          data-step="5"
          data-disable-interaction="5"
        >
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
    <Paper
      data-intro={`Try to guess the pattern, in both order and color, within ${numberOfRows} turns.`}
      data-step="1"
      data-disable-interaction="1"
    >
      <List>{listItems}</List>
    </Paper>
  );
}