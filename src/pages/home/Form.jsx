import React, { useState } from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import {
  useshadeInputBaseStyles,
  useshadeInputLabelStyles,
  useStyles
} from './Form.style';

const dateFormat = 'MM/dd/yyyy';

const Form = () => {
  const classes = useStyles();
  const inputBaseStyles = useshadeInputBaseStyles();
  const inputLabelStyles = useshadeInputLabelStyles();
  const isSmallerThanLg = useMediaQuery('(max-width:992px)');

  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Container maxWidth="xl">
      <form className={classes.wrapper}>
        <Grid container spacing={isSmallerThanLg ? 0 : 2}>
          <Grid item xs={12} lg={4}>
            <TextField
              label=""
              placeholder="Search by location"
              margin="normal"
              InputLabelProps={{ shrink: true, classes: inputLabelStyles }}
              InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <TextField
              label=""
              placeholder="Search by title"
              margin="normal"
              InputLabelProps={{ shrink: true, classes: inputLabelStyles }}
              InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    variant="inline"
                    value={selectedDate}
                    placeholder="Check-in date"
                    onChange={(date) => setSelectedDate(date)}
                    minDate={new Date()}
                    format={dateFormat}
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
              </Grid>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    variant="inline"
                    value={selectedDate}
                    placeholder="Check-in date"
                    onChange={(date) => setSelectedDate(date)}
                    minDate={new Date()}
                    format={dateFormat}
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
            <Typography variant="subtitle1">Search</Typography>
          )}
        </Button>
      </form>
    </Container>
  );
};

export default Form;
