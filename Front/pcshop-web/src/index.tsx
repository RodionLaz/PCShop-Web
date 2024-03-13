import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainpage from './components/MainPage';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/nav/Navbar';
import AppRoutes from './components/Routes';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Navbar />
    <Router> 
      <AppRoutes />
    </Router>
  </React.StrictMode>
);
reportWebVitals();
