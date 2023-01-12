import React from 'react'
import ReactDOM from 'react-dom/client'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App'
import './index.css'
// import './assets/bootstrap/js/bootstrap.min.js';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './app/store.js'
import './assets/bootstrap/css/bootstrap.min.css'
import './assets/bootstrap/js/theme.js'
import './assets/fonts/fontawesome-all.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
<Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
</Provider>
  </React.StrictMode>
)
