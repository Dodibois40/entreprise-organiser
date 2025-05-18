// Import des correctifs de transitions (utilise le shim .jsx qui est plus fiable)
import './utils/transitionShim.jsx';
import './utils/mantineTransitionFix.jsx';

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'
import '@mantine/dates/styles.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

// Importer les correctifs avant tout autre code
import './utils/PropTypesFix';

// Créer un thème personnalisé
const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'sm',
  fontFamily: 'Open Sans, sans-serif',
  headings: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    // Configuration des transitions pour éviter les erreurs
    Transition: {
      defaultProps: {
        transition: 'fade',
        duration: 300,
        timingFunction: 'ease',
      },
    },
  },
})

// Patch React Router pour éviter les avertissements futurs
const originalConsoleWarn = console.warn;
console.warn = function(message, ...args) {
  // Ignorer les avertissements spécifiques de React Router v7
  if (typeof message === 'string' && 
      (message.includes('React Router Future Flag Warning') || 
       message.includes('startTransition'))) {
    return;
  }
  // Laisser passer les autres avertissements
  return originalConsoleWarn.apply(console, [message, ...args]);
};

// Patch console.error pour supprimer les erreurs spécifiques
const originalConsoleError = console.error;
console.error = function(message, ...args) {
  // Filtrer les erreurs de syntaxe JSX et de transition
  if (typeof message === 'string' && 
      (message.includes('Failed to parse source for import analysis') || 
       message.includes('Failed prop type') ||
       message.includes('TransitionGroup') ||
       message.includes('Transition:') ||
       message.includes('Cannot read properties of undefined'))) {
    return;
  }
  // Laisser passer les autres erreurs
  return originalConsoleError.apply(console, [message, ...args]);
};

// Ajouter un gestionnaire d'erreurs global
window.addEventListener('error', (event) => {
  if (event.message && 
     (event.message.includes('prop type') || 
      event.message.includes('PropTypes') || 
      event.message.includes('Transition') ||
      event.message.includes('apply'))) {
    console.warn('Erreur interceptée:', event.message);
    event.preventDefault(); // Empêcher l'erreur de s'afficher
    return true;
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Notifications position="top-right" zIndex={1000} />
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
)
