/**
 * HACK POUR CORRIGER L'ERREUR PROP-TYPES
 * Ce fichier se charge de patcher le système de module pour résoudre l'erreur récurrente.
 */

// Capturer la fonction require originale
const originalRequire = window.require;

// Remplacer la fonction require par notre propre version
window.require = function(path) {
  // Intercepter les appels à prop-types
  if (path === 'prop-types') {
    console.log('⚡ Intercepté chargement de prop-types');
    
    // Récupérer le module original
    const propTypes = originalRequire(path);
    
    // Ajouter l'export default manquant
    propTypes.default = propTypes;
    
    return propTypes;
  }
  
  // Pour tous les autres modules, utiliser le require original
  return originalRequire(path);
};

// Patcher également le système de modules ES
const originalGet = Object.getOwnPropertyDescriptor(
  Object.prototype, '__proto__'
).get;

// Surveiller les accès à __proto__ pour intercepter les modules
Object.defineProperty(Object.prototype, '__proto__', {
  get: function() {
    const proto = originalGet.call(this);
    
    // Si c'est le module prop-types
    if (proto && proto.name === 'PropTypes' && !proto.default) {
      console.log('⚡ Intercepté module ES prop-types');
      proto.default = proto;
    }
    
    return proto;
  },
  configurable: true
});

console.log('✅ HACK PROP-TYPES INSTALLÉ');

// Exporter pour être chargé comme module
export default {}; 