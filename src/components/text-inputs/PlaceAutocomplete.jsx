import React from 'react';
import { TextField } from '@material-ui/core';

import {
  useshadeInputBaseStyles,
  useshadeInputLabelStyles
} from './TextInput.style';

const PlaceAutocomplete = () => {
  const inputBaseStyles = useshadeInputBaseStyles();
  const inputLabelStyles = useshadeInputLabelStyles();

  return (
    <div>
      <TextField
        label=""
        placeholder="Search by location"
        margin="normal"
        InputLabelProps={{ shrink: true, classes: inputLabelStyles }}
        InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
        fullWidth
      />
    </div>
  );
};

export default PlaceAutocomplete;
