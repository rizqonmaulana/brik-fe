// src/components/Navigation.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';
import ProductCreate from '../pages/ProductCreate';
import Login from '../pages/Login'
import Register from '../pages/Register';
import Order from '../pages/Order';
import OrderHistory from '../pages/OrderHistory';

import AdminRoute from '../components/AdminRoute'
import PrivateRoute from '../components/PrivateRoute'

const Navigation: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/detail/:id" element={<ProductDetail/>} />

        {/* auth */}
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        {/* private */}
        <Route path="" element={<PrivateRoute/>}>
          <Route path="/order" element={<Order/>}/>
          <Route path="/order/history" element={<OrderHistory/>}/>
        </Route>

        {/* admin */}
        <Route path="" element={<AdminRoute/>}>
          <Route path="/product/create" element={<ProductCreate/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Navigation;
