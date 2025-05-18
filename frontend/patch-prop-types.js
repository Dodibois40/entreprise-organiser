/**
 * Script de correction pour les problèmes de PropTypes
 * 
 * Ce script résout le problème: "The requested module '/node_modules/prop-types/index.js' does not provide an export named 'default'"
 * 
 * À exécuter avec: node patch-prop-types.js
 */

const fs = require('fs');
const path = require('path');

// Créer un petit module pour adapter prop-types
const createPropTypesAdapter = () => {
  const content = `
// Ce fichier est un adaptateur pour les deux styles d'import de prop-types
import * as PropTypesModule from 'prop-types';

// Exporter tous les membres individuels
export const {
  array,
  bool,
  func,
  number,
  object,
  string,
  symbol,
  any,
  arrayOf,
  element,
  elementType,
  instanceOf,
  node,
  objectOf,
  oneOf,
  oneOfType,
  shape,
  exact
} = PropTypesModule;

// Exporter le module entier comme défaut pour la compatibilité
export default PropTypesModule;
`;

  // Écrire le fichier adaptateur
  fs.writeFileSync(path.resolve(__dirname, 'src', 'utils', 'prop-types.js'), content);
  console.log('✓ Le fichier adaptateur prop-types a été créé avec succès!');
};

try {
  // Vérifier si le dossier utils existe
  const utilsDir = path.resolve(__dirname, 'src', 'utils');
  if (!fs.existsSync(utilsDir)) {
    fs.mkdirSync(utilsDir, { recursive: true });
  }
  
  // Créer le fichier adaptateur
  createPropTypesAdapter();
  
  console.log('✓ Correction PropTypes terminée!');
  console.log('');
  console.log('Pour utiliser la solution:');
  console.log('1. Importez PropTypes depuis le fichier adapté:');
  console.log('   import PropTypes from "../utils/prop-types";');
  console.log('');
} catch (error) {
  console.error('Erreur lors de la création du patch:', error);
} 