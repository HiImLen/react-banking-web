import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
//import './assets/bootstrap/js/bootstrap.min.js';
import './assets/bootstrap/css/bootstrap.min.css';
import './assets/fonts/fontawesome-all.min.css';
import './assets/bootstrap/js/theme.js';
import Popper from 'popper.js';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.body.className = 'bg-gradient-primary';
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
