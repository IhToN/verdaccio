import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import 'normalize.css';

import ResetCSS from './ResetStyles';

const StyleBaseline: React.FC = () => (
  <>
    <CssBaseline />
    <ResetCSS />
  </>
);

export default StyleBaseline;
