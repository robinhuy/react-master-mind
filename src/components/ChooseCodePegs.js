import React from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { Lens, Check } from '@material-ui/icons';

import './Main.css';

export default function ChooseCodePegs(props) {
  return (
    <Paper className="Choose-Peg">
      <Grid container alignContent="center" alignItems="center">
        {props.colors.map(color =>
          <Grid item xs={4} key={color}>
            <Lens fontSize="large" style={{ cursor: 'pointer', color: color }} onClick={() => props.onChooseColor(color)} />
          </Grid>
        )}
      </Grid>

      <Button variant="outlined" size="small" color="primary" onClick={props.onSubmit}>
        <Check fontSize="small" /> Submit
      </Button>
    </Paper>
  );
}