import React from 'react';
import { TextField } from '@material-ui/core';

import {
  useshadeInputBaseStyles,
  useshadeInputLabelStyles
} from './TextInput.style';

const SimpleTextField = () => {
  const inputBaseStyles = useshadeInputBaseStyles();
  const inputLabelStyles = useshadeInputLabelStyles();

  return (
    <div>
      <TextField
        label=""
        placeholder="Search by title"
        margin="normal"
        InputLabelProps={{ shrink: true, classes: inputLabelStyles }}
        InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
        fullWidth
      />
    </div>
  );
};

export default SimpleTextField;
