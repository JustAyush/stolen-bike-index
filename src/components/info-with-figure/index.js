import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

import useStyles from './InfoWithFigure.style';

const InfoWithFigure = (props) => {
  const classes = useStyles();
  const { imageUrl, text } = props;
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={12}>
      <img src={imageUrl} alt="fig" className={classes.image} />
      <Typography
        variant="subtitle1"
        className={classes.text}
        data-testid="info-text">
        {text}
      </Typography>
    </Box>
  );
};

InfoWithFigure.propTypes = {
  imageUrl: PropTypes.string,
  text: PropTypes.string
};

InfoWithFigure.defaultProps = {
  imageUrl: '',
  text: ''
};

export default InfoWithFigure;
