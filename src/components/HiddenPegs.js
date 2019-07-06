import React from 'react';
import { Grid } from '@material-ui/core';
import { Lens, HelpOutline } from '@material-ui/icons';

import './Main.css';

export default function HiddenPegs(props) {
  const { codes, isWin } = props;
  let codePegs = [];

  for (let i = 0; i < codes.length; i++) {
    if (isWin === null) {
      codePegs.push(
        <HelpOutline
          key={i}
          fontSize="large"
          style={{ color: '#555555' }} />
      );
    } else {
      codePegs.push(
        <Lens
          key={i}
          fontSize="large"
          className={isWin ? 'Code-Peg--win' : 'Code-Peg--lose'}
          style={{ color: codes[i] }} />
      );
    }
  }

  return (
    <Grid container justify="space-evenly">
      {codePegs}
    </Grid>
  );
}