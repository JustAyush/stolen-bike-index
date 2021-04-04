import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Container } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const APP_BAR_MIN_HEIGHT = '4.5rem';
const BODY_PADDING_TOP_DESKTOP = '6.5rem';
const BODY_PADDING_TOP_IPAD = '20rem';
const BODY_PADDING_TOP_IPAD_PRO = '12rem';
const BODY_PADDING_TOP_MOBILE = '2rem';

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: theme.palette.background.default
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
  }
}));

const PageLayout = ({ header, children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
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
