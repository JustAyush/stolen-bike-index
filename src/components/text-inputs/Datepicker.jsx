import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

import {
  useshadeInputBaseStyles,
  useshadeInputLabelStyles
} from './TextInput.style';

const dateFormat = 'MM/dd/yyyy';

const useStyles = makeStyles({
  formControlMarginTop: {
    marginTop: '16px'
  }
});

const DatePicker = () => {
  const classes = useStyles();
  const inputBaseStyles = useshadeInputBaseStyles();
  const inputLabelStyles = useshadeInputLabelStyles();

  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        variant="inline"
        value={selectedDate}
        placeholder="Check-in date"
        onChange={(date) => setSelectedDate(date)}
        minDate={new Date()}
        format={dateFormat}
        InputLabelProps={{ shrink: true, classes: inputLabelStyles }}
        InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
        className={classes.formControlMarginTop}
        invalidDateMessage=""
        disableToolbar
        autoOk
        fullWidth
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
