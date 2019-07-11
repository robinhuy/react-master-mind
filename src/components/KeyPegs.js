import React from 'react';
import { Grid } from '@material-ui/core';
import { SwapHorizontalCircle, CheckCircle, PanoramaFishEye } from '@material-ui/icons';

export default function KeyPegs(props) {
  const { isMobile, keys, numberOfPegsInRow, rowIndex } = props;
  const fontSize = isMobile ? 'small' : 'default';
  let gridItem = [];

  for (let i = 0; i < props.numberOfPegsInRow; i++) {
    const index = rowIndex * numberOfPegsInRow + i;

    gridItem.push(
      <Grid item xs={6} key={i}>
        <Grid container justify="center" alignItems="center">
          {keys[index] === 'black' ? (
            <CheckCircle fontSize={fontSize} style={{color: 'green'}} />
          ) : keys[index] === 'white' ? (
            <SwapHorizontalCircle fontSize={fontSize} style={{color: 'orange'}} />
          ) : (
                <PanoramaFishEye fontSize={fontSize} />
              )}
        </Grid>
      </Grid >
    )
  }

  return (
    <Grid container style={{ maxWidth: '55px', margin: 'auto' }}>
      {gridItem}
    </Grid>
  );
}