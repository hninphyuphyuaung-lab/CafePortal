import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button color="inherit" component={Link} to="/cafes">
          Cafes
        </Button>
        <Button color="inherit" component={Link} to="/employees">
          Employees
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
