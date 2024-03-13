import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import LoginPage from './auth/LoginPage';
import ShopPage from './shop/ShopPage';

const AppRoutes: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
  );
}

export default AppRoutes;
