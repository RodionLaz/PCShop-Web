import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import LoginPage from './auth/LogAndRegPage';
import ShopPage from './shop/ShopPage';
import AddProduct from './shop/AddProductPage';

const AppRoutes: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/AddProduct" element={<AddProduct />} />
      </Routes>
  );
}

export default AppRoutes;
