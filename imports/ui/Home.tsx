import React from 'react';
import {Grid, Button} from '@mui/material';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
      <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{minHeight: '60vh'}}
      >
        <Grid item>
          <Link to="/tournaments" className="orange-link">Tournaments</Link>
        </Grid>
        <Grid item>
          <Link to="https://walrus-app-7ttua.ondigitalocean.app" target="_blank" className="orange-link">Game Report</Link>
        </Grid>
        <Grid item>
          <Link to="/home" className="orange-link">Analyse Your Games</Link>
        </Grid>
      </Grid>
  );
}
