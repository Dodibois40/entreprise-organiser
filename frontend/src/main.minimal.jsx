import React from 'react'
import ReactDOM from 'react-dom/client'
import AppMinimal from './App.minimal.jsx'
import './index.css'

// Créer une racine React et rendre l'application minimale
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppMinimal />
  </React.StrictMode>
) 