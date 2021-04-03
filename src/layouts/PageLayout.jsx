import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const APP_BAR_MIN_HEIGHT = '4.5rem';
const BODY_PADDING_TOP = '5.5rem';

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
    paddingTop: BODY_PADDING_TOP
  }
}));

const PageLayout = ({ header, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.background}>
      <AppBar position="fixed" className={classes.appBar}>
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
