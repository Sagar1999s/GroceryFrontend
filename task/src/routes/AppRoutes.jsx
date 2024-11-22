import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GroceryPartnerRegister from '../components/grocerypartnerregister/GroceryPartnerRegister';
import Login from '../components/login/Login';
import Navigation from '../components/navigation/Navigation';
import NavBar from '../components/navbar/NavBar';
import Products from '../components/products/Products';
import Cart from '../components/cart/Cart';
import Customer from '../components/customer/Customer';
import Orders from "../components/orders/Orders";
import ViewOrders from '../components/vieworders/ViewOrders';


const AppRoutes = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<>Index Page</>}>
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/products" element={<Products />}/>
        <Route path="/home" element={<Navigation/>}/>
        <Route path="/grocerypartnerregister" element={<GroceryPartnerRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/vieworders" element={<ViewOrders />} />


      </Routes>
    </Router>
  );
};

export default AppRoutes;
