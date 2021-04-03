import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { dateDisplayFormat } from '../../utils/momentUtils';

import useStyles from './Card.style';
import mdbPlaceholder from '../../assets/images/png/mtb-placeholder.png';

const Card = (props) => {
  const classes = useStyles();

  const {
    imageUrl,
    title,
    address,
    description,
    stolenDate,
    reportedDate
  } = props;

  const renderedImage = (
    <div className={classes.imageWrapper}>
      <img
        src={imageUrl ? imageUrl : mdbPlaceholder}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `${mdbPlaceholder}`;
        }}
        className={classes.image}
        alt="mtb-bike"
      />
    </div>
  );

  const renderedHeading = (
    <>
      <Typography variant="h6" color="primary" className="font-bold">
        {title}
      </Typography>
      {Boolean(address) && (
        <Box display="flex" mt={0.5}>
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            size="sm"
            className="text-muted inline-block mr-2"
          />
          <Typography variant="subtitle2" className="text-muted">
            {address}
          </Typography>
        </Box>
      )}
    </>
  );

  const renderedBody = (
    <Box mt={1.5}>
      <Typography variant="subtitle1" color="primary">
        {description}
      </Typography>
      <Box mt={1}>
        <Typography variant="subtitle1" className="text-muted inline mr-2">
          Stolen:
        </Typography>
        <Typography variant="subtitle1" className="inline" color="secondary">
          {stolenDate ? dateDisplayFormat(stolenDate) : 'N/A'}
        </Typography>
        <Typography variant="subtitle1" className="text-muted inline ml-4 mr-2">
          Reported:
        </Typography>
        <Typography variant="subtitle1" className="inline" color="secondary">
          {reportedDate ? dateDisplayFormat(reportedDate) : 'N/A'}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box p={2} className={classes.card}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          {renderedImage}
        </Grid>
        <Grid item xs={12} md={9}>
          {renderedHeading}
          {renderedBody}
        </Grid>
      </Grid>
    </Box>
  );
};

Card.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  stolenDate: PropTypes.number.isRequired,
  reportedDate: PropTypes.number.isRequired
};

export default Card;
