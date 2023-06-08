import React from 'react';
import { Container, Typography } from '@mui/material';

function Footer() {
  return (
    <footer>
      <Container>
        <Typography align="center" color="textSecondary" component="p"> 
          &copy; HawkHub 2023
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
