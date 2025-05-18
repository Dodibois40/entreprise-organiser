// Importer le correctif PropTypes avant tout autre import
import './fix-prop-types';

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import Router from './router'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'
import '@mantine/dates/styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </App>
    </HashRouter>
  </React.StrictMode>
) 