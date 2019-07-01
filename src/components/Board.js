import React from 'react';
import { List, ListItem, ListItemAvatar, Divider } from '@material-ui/core';

import KeyPegs from './KeyPegs'
import CodePegs from './CodePegs'
import ChooseCodePegs from './ChooseCodePegs'

export default function Board(props) {
  const { numberOfRows, numberOfPegsInRow, rows, keys, currentRow, currentPeg, colors } = props
  let board = [];

  for (let i = 0; i < numberOfRows; i++) {
    board.push(
      <div key={i}>
        <ListItem>
          <ListItemAvatar>
            <KeyPegs keys={keys} numberOfPegsInRow={numberOfPegsInRow} rowIndex={i} />
          </ListItemAvatar>

          <CodePegs
            rows={rows}
            numberOfPegsInRow={numberOfPegsInRow}
            rowIndex={i}
            currentPeg={currentPeg}
            onChangePeg={props.onChangePeg} />

          {currentRow === i &&
            <ChooseCodePegs
              colors={colors}
              onChooseColor={props.onChooseColor}
              onSubmit={props.onSubmit} />
          }
        </ListItem>

        <Divider />
      </div>
    );
  }

  return (
    <List>{board}</List>
  );
}