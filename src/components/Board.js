import React from 'react';
import { List, ListItem, Grid, Divider } from '@material-ui/core';

import KeyPegs from './KeyPegs'
import CodePegs from './CodePegs'
import ChooseCodePegs from './ChooseCodePegs'

export default function Board(props) {
  const { numberOfRows, numberOfPegsInRow, rows, keys, currentRow, currentPeg, colors } = props
  let board = [];

  for (let i = 0; i < numberOfRows; i++) {
    board.push(
      <div key={i}>
        <ListItem disableGutters={true}>
          <Grid container alignContent="center" alignItems="center">
            <Grid item xs={2}>
              <KeyPegs keys={keys} numberOfPegsInRow={numberOfPegsInRow} rowIndex={i} />
            </Grid>

            <Grid item xs={7}>
              <CodePegs
                rows={rows}
                numberOfPegsInRow={numberOfPegsInRow}
                rowIndex={i}
                currentRow={currentRow}
                currentPeg={currentPeg}
                onChangePeg={props.onChangePeg} />
            </Grid>

            <Grid item xs={3}>
              {currentRow === i &&
                <ChooseCodePegs
                  colors={colors}
                  onChooseColor={props.onChooseColor}
                  onSubmit={props.onSubmit} />
              }
            </Grid>
          </Grid>
        </ListItem>

        <Divider />
      </div>
    );
  }

  return (
    <List>{board}</List>
  );
}