import React from 'react';
import { Grid } from '@material-ui/core';
import { SwapHorizontalCircleOutlined, CheckCircleOutline, HighlightOff, PanoramaFishEye } from '@material-ui/icons';

export default function KeyPegs(props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <SwapHorizontalCircleOutlined />
      </Grid>
      <Grid item xs={6}>
        <CheckCircleOutline />
      </Grid>
      <Grid item xs={6}>
        <HighlightOff />
      </Grid>
      <Grid item xs={6}>
        <PanoramaFishEye />
      </Grid>
    </Grid>
  );
}