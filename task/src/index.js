import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppRoutes from './routes/AppRoutes';

// Get the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with the root element
root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);

// Optional: Start measuring performance in your app
reportWebVitals();
