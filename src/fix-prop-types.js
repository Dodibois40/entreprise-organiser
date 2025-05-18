// Ce fichier corrige les imports par défaut de prop-types
// En ajoutant cette ligne au début de votre index.js ou main.js, cela devrait résoudre le problème

// Correction pour les imports de PropTypes par défaut
if (!window.PropTypes && typeof require === 'function') {
  try {
    // Récupérer prop-types et l'exposer globalement
    const PropTypesModule = require('prop-types');
    // Ajouter l'export par défaut s'il n'existe pas
    if (PropTypesModule && !PropTypesModule.default) {
      PropTypesModule.default = PropTypesModule;
    }
    // Exposer PropTypes globalement
    window.PropTypes = PropTypesModule;
    console.log('✅ PropTypes corrigé et exposé globalement');
  } catch (err) {
    console.error('❌ Erreur lors de la correction de PropTypes:', err);
  }
} 