import React from 'react';
import { Container, Grid, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import {
  PlaceAutocomplete,
  SimpleTextField,
  DatePicker
} from '../../components';

const useStyles = makeStyles((theme) => ({
  searchBtn: {
    marginLeft: theme.spacing(1.5),
    boxShadow: theme.shadows[0],
    paddingTop: theme.spacing(2.1),
    paddingBottom: theme.spacing(2.1),
    marginTop: theme.spacing(0.8),
    [theme.breakpoints.down('lg')]: {
      marginLeft: 0,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      width: '100%'
    },
    '& p': {
      color: theme.palette.background.white,
      marginLeft: theme.spacing(2),
      fontSize: '1rem',
      textTransform: 'capitalize'
    }
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      flexWrap: 'wrap'
    }
  }
}));

const Form = () => {
  const classes = useStyles();
  const isSmallerThanLg = useMediaQuery('(max-width:992px)');
  return (
    <Container maxWidth="xl">
      <div className={classes.wrapper}>
        <Grid container spacing={isSmallerThanLg ? 0 : 2}>
          <Grid item xs={12} lg={4}>
            <PlaceAutocomplete />
          </Grid>
          <Grid item xs={12} lg={3}>
            <SimpleTextField />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <DatePicker />
              </Grid>
              <Grid item xs={6}>
                <DatePicker />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          className={classes.searchBtn}>
          <FontAwesomeIcon icon={faSearch} size="lg" />
          {isSmallerThanLg && (
            <Typography variant="subtitle1" color="textWhite">
              Search
            </Typography>
          )}
        </Button>
      </div>
    </Container>
  );
};

export default Form;
