import React from 'react';
import ReactDOM from 'react-dom/client';
import './Style.css';
import Weather from './Weather';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Weather />
  // </React.StrictMode>
);
reportWebVitals();
