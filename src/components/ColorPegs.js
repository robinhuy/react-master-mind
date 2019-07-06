import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Lens, Check } from '@material-ui/icons';

import './Main.css';

export default function ColorPegs(props) {
  return (
    <div className="Color-Pegs">
      <Grid container alignContent="center" alignItems="center">
        {props.colors.map(color =>
          <Grid item xs={4} key={color}>
            <Lens
              className="Color-Peg"
              fontSize="large"
              style={{ color: color }}
              onClick={() => props.onChooseColor(color)} />
          </Grid>
        )}
      </Grid>

      <Button variant="outlined" size="small" color="primary" onClick={props.onSubmit}>
        <Check fontSize="small" /> Submit
      </Button>
    </div>
  );
}