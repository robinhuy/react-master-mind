import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { Lens } from '@material-ui/icons';

export default function ChooseColor(props) {
  return (
    <Paper>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Lens style={{ fontSize: '2.5em', color: props.color }} onClick={props.onChooseColor} />
        </Grid>
      </Grid>
    </Paper>
  );
}