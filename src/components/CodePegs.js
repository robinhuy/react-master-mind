import React from 'react';
import { ListItemIcon } from '@material-ui/core';
import { Lens } from '@material-ui/icons';

export default function CodePegs(props) {
  const { numberOfPegsInRow, rows, rowIndex, currentPeg } = props;
  let codePegs = [];

  for (let i = 0; i < numberOfPegsInRow; i++) {
    const index = rowIndex * numberOfPegsInRow + i;

    codePegs.push(
      <ListItemIcon
        key={i}
        className={currentPeg === index ? "Peg--active" : ""}
        onClick={() => props.onChangePeg(index)}>
        <Lens fontSize="large" style={{ color: rows[index] }} />
      </ListItemIcon>
    );
  }

  return codePegs;
}