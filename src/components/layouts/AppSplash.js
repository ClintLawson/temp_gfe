import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
    '& > * + *': {
        marginTop: theme.spacing(2),
    },
    margin: 'auto',
    marginTop: '35vh'
  },
  logo:{
    textAlign: 'center',
    fontSize: '5vw',
    marginBottom: '5vh'
  }
}));

export default function LinearIndeterminate() {
  const classes = useStyles();

  // console.log(theme)

  return (
    <div className={classes.root} color='primary'>
      {/* have to use box to help control CSS for typography */}
      <Box color='primary.main'>
        <Typography class={classes.logo} variant='h1'  >Agristor App</Typography>
      </Box>
      <LinearProgress color='primary' />
    </div>
  );
}