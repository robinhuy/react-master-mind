import React from 'react';
import { Grid } from '@material-ui/core';
import { Lens } from '@material-ui/icons';

import './Main.css';

export default function CodePegs(props) {
  const { numberOfPegsInRow, rows, rowIndex, currentRow, currentPeg } = props;
  let codePegs = [];

  for (let i = 0; i < numberOfPegsInRow; i++) {
    const index = rowIndex * numberOfPegsInRow + i;

    codePegs.push(
      <Lens
        key={i}
        fontSize="large"
        className={index === currentPeg ? "Code-Peg--active" : rowIndex === currentRow ? "Code-Peg" : ""}
        onClick={() => props.onChangePeg(index)}
        style={{ color: rows[index] }} />
    );
  }

  return (
    <Grid container justify="space-evenly">
      {codePegs}
    </Grid>
  );
}