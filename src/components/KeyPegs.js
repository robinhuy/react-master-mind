import React from 'react';
import { Grid } from '@material-ui/core';
import { SwapHorizontalCircleOutlined, CheckCircleOutline, PanoramaFishEye } from '@material-ui/icons';

export default function KeyPegs(props) {
  const { keys, numberOfPegsInRow, rowIndex } = props;
  let gridItem = [];

  for (let i = 0; i < props.numberOfPegsInRow; i++) {
    const index = rowIndex * numberOfPegsInRow + i;

    gridItem.push(
      <Grid item xs={6} key={i}>
        {keys[index] === 'black' ? (
          <CheckCircleOutline />
        ) : keys[index] === 'white' ? (
          <SwapHorizontalCircleOutlined />
        ) : (
              <PanoramaFishEye />
            )}
      </Grid>
    )
  }

  return (
    <Grid container spacing={2}>
      {gridItem}
    </Grid>
  );
}