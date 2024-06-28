import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { CiShoppingCart } from 'react-icons/ci'; // Using Material-UI's ShoppingCart icon
import { Link , useLocation } from 'react-router-dom';
import logo from '../../assets/favicon.png';
import useStyles from './style';

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <AppBar position='fixed' className={classes.appBar} color='inherit'>
      <Toolbar>
        <Typography component={Link} to='/' variant='h6' className={classes.title} color='textPrimary'>
          <img src={logo} alt="logo" className={classes.image} />
          NikeVibe
        </Typography>
        <div className={classes.grow} />
        {location.pathname === '/' && (
        <div className={classes.button}>
          <IconButton component={Link} to='/Cart' aria-label='Show cart items' color='inherit'>
            <Badge badgeContent={totalItems} color='secondary'>
                <CiShoppingCart />
            </Badge>
          </IconButton>
        </div> )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
