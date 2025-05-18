import React from 'react'
import ReactDOM from 'react-dom/client'
import AppDebug from './App.debug.jsx'
import './index.css'

// Créer une racine React et rendre l'application de débogage
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppDebug />
  </React.StrictMode>
) 