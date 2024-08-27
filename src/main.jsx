import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from '././redux/store.js'

import './index.css'
import { LoginStatusProvider } from './contexts/LoginContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store} >
        <LoginStatusProvider>
          <App />
        </LoginStatusProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)