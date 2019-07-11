import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Lens, Check } from '@material-ui/icons';

import './Main.css';

export default function ColorPegs(props) {
  const isMobile = props.isMobile;

  return (
    <div
      className="Color-Pegs"
      data-intro="Choose color here and Submit your guess."
      data-step="2"
      data-disable-interaction="2"
    >
      <Grid container alignContent="center" alignItems="center">
        {props.colors.map(color =>
          <Grid item xs={4} key={color}>
            <Lens
              className="Color-Peg"
              fontSize={isMobile ? 'default' : 'large'}
              style={{ color: color }}
              onClick={() => props.onChooseColor(color)} />
          </Grid>
        )}
      </Grid>

      <Button variant="outlined" size="small" color="primary" onClick={props.onSubmit}>
        <Check fontSize="small" /><span style={isMobile ? { display: 'none' } : {}}> Submit</span>
      </Button>
    </div>
  );
}