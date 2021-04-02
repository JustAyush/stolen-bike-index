import React, { useState } from 'react';

import { Container, TextField, Box } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Container maxWidth="xs">
      <Box mt={2}>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </Box>
      <Box mt={2}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            inputVariant="outlined"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-outlined"
            label="Date picker outlined"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
      </Box>
    </Container>
  );
}

export default App;
