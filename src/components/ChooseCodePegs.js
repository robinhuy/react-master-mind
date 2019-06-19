import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { Lens } from '@material-ui/icons';

export default function ChooseCodePegs(props) {
  return (
    <Paper>
      <Grid container spacing={3}>
        {props.colors.map(color =>
          <Grid item xs={4} key={color}>
            <Lens style={{ fontSize: '2.5em', color: color }} onClick={() => props.onChooseColor(color)} />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}