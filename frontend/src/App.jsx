import { MantineProvider, createTheme, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

// Composant pour détecter les rechargements de page
const PageReloadIndicator = () => {
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    // Cache l'indicateur après un délai
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);
    
    // Nettoyer le timer
    return () => clearTimeout(timer);
  }, []);
  
  if (!show) return null;
  
  return (
    <div className="page-reload-indicator">
      Page rechargée à {new Date().toLocaleTimeString()}
    </div>
  );
};

// Créer un thème personnalisé
const theme = createTheme({
  primaryColor: 'blue',
  primaryShade: 6,
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
  },
  defaultRadius: 'md',
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        shadow: 'sm',
        radius: 'md',
        withBorder: true,
        p: 'lg',
      },
    },
    Notifications: {
      defaultProps: {
        position: 'top-right',
        zIndex: 1000,
        autoClose: 4000,
      },
    },
    Transition: {
      defaultProps: {
        transition: 'fade',
        duration: 300,
      },
    },
  },
});

function App({ children }) {
  const [reloadKey, setReloadKey] = useState(Date.now());
  
  // Réinitialiser la clé à chaque rechargement
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Sauvegarder l'état actuel avant le rechargement
      sessionStorage.setItem('lastReload', Date.now().toString());
    };
    
    const handleLoad = () => {
      const lastReload = sessionStorage.getItem('lastReload');
      if (lastReload) {
        setReloadKey(Date.now());
        // Nettoyer le stockage après utilisation
        sessionStorage.removeItem('lastReload');
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, []);
  
  return (
    <>
      <ColorSchemeScript defaultColorScheme="light" />
      <MantineProvider theme={theme} defaultColorScheme="light">
        <Notifications position="top-right" zIndex={1000} />
        <PageReloadIndicator key={reloadKey} />
        {children}
      </MantineProvider>
    </>
  );
}

export default App;
