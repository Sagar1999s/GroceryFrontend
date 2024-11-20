import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <div className="navigation-container">
      <div className="sidebar">
        <NavLink to="/products" activeClassName="active-sidebar-link">
          Products
        </NavLink>
        <NavLink to="/cart" activeClassName="active-sidebar-link">
          Cart
        </NavLink>
        <NavLink to="/orders" activeClassName="active-sidebar-link">
          Orders
        </NavLink>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Navigation;
