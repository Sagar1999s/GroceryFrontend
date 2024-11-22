import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">GroceryMate</h1>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" activeClassName="active-link" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/grocerypartnerregister" activeClassName="active-link">
            Register
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active-link">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
