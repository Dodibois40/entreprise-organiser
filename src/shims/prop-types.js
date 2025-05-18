// Ce fichier est un shim pour prop-types qui ajoute l'export par défaut manquant
const PropTypesOriginal = require('prop-types');

// Ajouter l'export default si nécessaire
if (!PropTypesOriginal.default) {
  PropTypesOriginal.default = PropTypesOriginal;
}

// Exporter toutes les propriétés de PropTypes
module.exports = PropTypesOriginal; 