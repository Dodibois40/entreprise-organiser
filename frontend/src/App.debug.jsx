import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

// Composant simple pour la page d'accueil
const Home = () => (
  <div style={{ padding: '20px' }}>
    <h1>Page d'accueil</h1>
    <p>Bienvenue sur l'application de test.</p>
    <nav>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/page1">Page 1</Link></li>
        <li><Link to="/page2">Page 2</Link></li>
      </ul>
    </nav>
  </div>
);

// Composants simples pour les pages de test
const Page1 = () => (
  <div style={{ padding: '20px' }}>
    <h1>Page 1</h1>
    <p>Ceci est la page 1.</p>
    <Link to="/">Retour à l'accueil</Link>
  </div>
);

const Page2 = () => (
  <div style={{ padding: '20px' }}>
    <h1>Page 2</h1>
    <p>Ceci est la page 2.</p>
    <Link to="/">Retour à l'accueil</Link>
  </div>
);

// Page 404
const NotFound = () => (
  <div style={{ padding: '20px' }}>
    <h1>404 - Page non trouvée</h1>
    <p>La page que vous recherchez n'existe pas.</p>
    <Link to="/">Retour à l'accueil</Link>
  </div>
);

function AppDebug() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default AppDebug; 