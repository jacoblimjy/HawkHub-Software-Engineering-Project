import React from 'react';
import { CircularProgress } from '@mui/material';

function Loader() {
  return (
    <CircularProgress
      color="primary"
      size={100}
      style={{
        margin: 'auto',
        display: 'block',
      }}
    />
  );
}

export default Loader;
