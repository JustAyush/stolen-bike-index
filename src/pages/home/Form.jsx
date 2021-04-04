import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import {
  Container,
  Grid,
  Button,
  Typography,
  TextField
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import {
  useshadeInputBaseStyles,
  useshadeInputLabelStyles,
  usePlaceAutocompleteStyles,
  useStyles
} from './Form.style';
import config from '../../config';

const Form = (props) => {
  const classes = useStyles();
  const inputBaseStyles = useshadeInputBaseStyles();
  const inputLabelStyles = useshadeInputLabelStyles();
  const placeAutocompleteStyles = usePlaceAutocompleteStyles();
  const theme = useTheme();
  const isSmallerThanLg = useMediaQuery('(max-width:992px)');

  const placeAutocompleteRef = useRef();

  const {
    location,
    setLocation,
    title,
    setTitle,
    occurredBefore,
    setOccurredBefore,
    occurredAfter,
    setOccurredAfter,
    error,
    setError,
    isLoading,
    handleFormSubmit
  } = props;

  const handleSelectLocation = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setLocation({ address: value, lat: latLng.lat, lng: latLng.lng });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFormSubmit();
  };

  useEffect(() => {
    if (error.address) {
      placeAutocompleteRef.current.focus();
    }
  }, [error.address]);

  return (
    <Container maxWidth="xl">
      <form className={classes.wrapper} onSubmit={handleSubmit}>
        <Grid container spacing={isSmallerThanLg ? 0 : 2}>
          <Grid item xs={12} lg={4}>
            {/* PlacesAutocomplete start */}
            <PlacesAutocomplete
              value={location.address}
              onChange={(data) => {
                setLocation({
                  ...location,
                  lat: null,
                  lng: null,
                  address: data
                });
                setError({
                  warning: false,
                  text: '',
                  address: false,
                  server: false
                });
              }}
              onSelect={handleSelectLocation}>
              {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                <div className={placeAutocompleteStyles.cover}>
                  <TextField
                    {...getInputProps({ placeholder: 'Type address' })}
                    label=""
                    placeholder="Enter location of the theft"
                    fullWidth
                    size="medium"
                    InputLabelProps={{
                      shrink: true,
                      classes: inputLabelStyles
                    }}
                    InputProps={{
                      classes: inputBaseStyles,
                      disableUnderline: true
                    }}
                    inputRef={placeAutocompleteRef}
                    error={!!error.address}
                  />
                  <div className={placeAutocompleteStyles.suggestion}>
                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active
                          ? theme.palette.secondary.main
                          : theme.palette.background.white,
                        color: suggestion.active
                          ? theme.palette.background.white
                          : theme.palette.text.main
                      };
                      return (
                        <div
                          className={placeAutocompleteStyles.places}
                          {...getSuggestionItemProps(suggestion, { style })}
                          key={suggestion.placeId}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            {/* PlacesAutocomplete end */}
          </Grid>
          <Grid item xs={12} lg={3}>
            {/* Search by incident title start */}
            <TextField
              label=""
              placeholder="Type incident title"
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputLabelProps={{ shrink: true, classes: inputLabelStyles }}
              InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
              fullWidth
            />
            {/* Search by incident title end */}
          </Grid>
          <Grid item xs={12} lg={5}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                {/* Search by occured after start */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    variant="inline"
                    value={occurredAfter}
                    placeholder="Occurred after"
                    onChange={(date) => setOccurredAfter(date)}
                    format={config.DATE_PICKER_MASKED_INPUT_FORMAT}
                    disableFuture
                    InputLabelProps={{
                      shrink: true,
                      classes: inputLabelStyles
                    }}
                    InputProps={{
                      classes: inputBaseStyles,
                      disableUnderline: true
                    }}
                    className={classes.formControlMarginTop}
                    invalidDateMessage=""
                    disableToolbar
                    autoOk
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
                {/* Search by occured after end */}
              </Grid>
              <Grid item xs={6}>
                {/* Search by occured before start */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    variant="inline"
                    value={occurredBefore}
                    placeholder="Occurred before"
                    onChange={(date) => setOccurredBefore(date)}
                    format={config.DATE_PICKER_MASKED_INPUT_FORMAT}
                    minDate={occurredAfter ? occurredAfter : null}
                    disableFuture
                    InputLabelProps={{
                      shrink: true,
                      classes: inputLabelStyles
                    }}
                    InputProps={{
                      classes: inputBaseStyles,
                      disableUnderline: true
                    }}
                    className={classes.formControlMarginTop}
                    invalidDateMessage=""
                    disableToolbar
                    autoOk
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
                {/* Search by occured before end */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.searchBtn}
          disabled={isLoading}>
          <FontAwesomeIcon icon={faSearch} size="lg" />
          {isSmallerThanLg && (
            <Typography variant="subtitle1">Search</Typography>
          )}
        </Button>
      </form>
    </Container>
  );
};

Form.propTypes = {
  location: PropTypes.shape({
    address: PropTypes.string,
    lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  setLocation: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  occurredBefore: PropTypes.instanceOf(Date),
  setOccurredBefore: PropTypes.func.isRequired,
  occurredAfter: PropTypes.instanceOf(Date),
  setOccurredAfter: PropTypes.func.isRequired,
  error: PropTypes.shape({
    warning: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    address: PropTypes.bool.isRequired,
    server: PropTypes.bool.isRequired
  }).isRequired,
  setError: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleFormSubmit: PropTypes.func.isRequired
};

Form.defaultProps = {
  occurredBefore: null,
  occurredAfter: null
};

export default Form;
