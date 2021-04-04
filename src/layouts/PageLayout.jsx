import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Container, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const APP_BAR_MIN_HEIGHT = '4.5rem';
const BODY_PADDING_TOP_DESKTOP = '6.5rem';
const BODY_PADDING_TOP_IPAD = '20rem';
const BODY_PADDING_TOP_IPAD_PRO = '12rem';
const BODY_PADDING_TOP_MOBILE = '2rem';

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh'
  },
  appBar: {
    backgroundColor: theme.palette.background.white,
    minHeight: APP_BAR_MIN_HEIGHT,
    boxShadow: theme.shadows[0]
  },
  body: {
    paddingTop: BODY_PADDING_TOP_MOBILE,
    [theme.breakpoints.up('md')]: {
      paddingTop: BODY_PADDING_TOP_IPAD
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: BODY_PADDING_TOP_IPAD_PRO
    },
    [theme.breakpoints.up('xl')]: {
      paddingTop: BODY_PADDING_TOP_DESKTOP
    }
  },
  footer: {
    textAlign: 'center',
    paddingBottom: '1rem'
  },
  author: {
    textDecoration: 'none',
    color: theme.palette.text.light,
    fontWeight: 700
  }
}));

const PageLayout = ({ header, children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <div className={classes.background}>
        <AppBar
          position={isMobile ? 'relative' : 'fixed'}
          className={classes.appBar}>
          {header}
        </AppBar>
        <div className={classes.body}>
          <Container maxWidth="md">{children}</Container>
        </div>
      </div>
      <div className={classes.footer}>
        <Typography variant="subtitle2" className="text-muted">
          Crafted with &hearts; by&nbsp;
          <a
            href="https://ayushbajra.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className={classes.author}>
            Ayush Bajracharya
          </a>
        </Typography>
      </div>
    </>
  );
};

PageLayout.propTypes = {
  header: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default PageLayout;
