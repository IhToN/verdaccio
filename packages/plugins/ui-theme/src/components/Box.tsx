import { default as MaterialUIBox, BoxProps } from '@mui/material/Box';
import React from 'react';

function Box(props: BoxProps) {
  return <MaterialUIBox {...props} />;
}

export default Box;
