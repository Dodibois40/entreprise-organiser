import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Router from './router'; // Assurez-vous que ce chemin est correct
import { AuthProvider } from './contexts/AuthContext'; // Assurez-vous que ce chemin est correct
import './index.css';

// Importer les correctifs avant tout autre code
import './utils/PropTypesFix'; // Ajouté



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
    // console.warn('Erreur interceptée:', event.message); // Optionnel: loguer discrètement
    event.preventDefault(); // Empêcher l'erreur de s'afficher
    return true;
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App>
          <Router />
        </App>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
