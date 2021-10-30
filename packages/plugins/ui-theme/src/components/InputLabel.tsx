import { default as MaterialUIInputLabel, InputLabelProps } from '@mui/material/InputLabel';
import React, { forwardRef } from 'react';

type InputLabelRef = HTMLLabelElement;

const InputLabel = forwardRef<InputLabelRef, InputLabelProps>(function InputLabel(props, ref) {
  return <MaterialUIInputLabel {...props} ref={ref} />;
});

export default InputLabel;
