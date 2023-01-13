import React from 'react'
import ReactDOM from 'react-dom/client'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App'
import './index.css'
// import './assets/bootstrap/js/bootstrap.min.js';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store, { persistor } from './app/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import './assets/bootstrap/css/bootstrap.min.css'
import './assets/bootstrap/js/theme.js'
import './assets/fonts/fontawesome-all.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
