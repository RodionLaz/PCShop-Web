import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainpage from './components/MainPage';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/nav/Navbar';
import AppRoutes from './components/Routes';
import { store } from './state/store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
 <Provider store={store} >
    <Navbar />
    <Router> 
      <AppRoutes />
    </Router>
  </Provider>
  </React.StrictMode>
);
reportWebVitals();
