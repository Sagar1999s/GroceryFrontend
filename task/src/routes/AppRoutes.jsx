import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GroceryPartnerRegister from '../components/grocerypartnerregister/GroceryPartnerRegister';
import Login from '../components/login/Login';
import Navigation from '../components/navigation/Navigation';
import NavBar from '../components/navbar/NavBar';
import Products from '../components/products/Products';
import Cart from '../components/cart/Cart';

const AppRoutes = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<div>Order Page</div>} />
        </Route>
        <Route path="/grocerypartnerregister" element={<GroceryPartnerRegister />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
