/**
 * HACK PROP-TYPES
 * Ce script est conçu pour être chargé avant le bundle principal de React
 * et intercepter toutes les erreurs liées au module prop-types
 */
(function() {
  console.log("🔧 Chargement du hack prop-types...");
  
  // Sauvegarder les fonctions originales
  var originalRequire = window.require;
  var originalDefineProperty = Object.defineProperty;
  
  // Remplacer la fonction require pour intercepter les imports de prop-types
  if (typeof window.require === 'function') {
    window.require = function(id) {
      // Si c'est prop-types
      if (id === 'prop-types') {
        console.log('⚡ Intercepté require("prop-types")');
        var module = originalRequire.apply(this, arguments);
        // Ajouter l'export par défaut
        if (module && !module.default) {
          module.default = module;
        }
        return module;
      }
      return originalRequire.apply(this, arguments);
    };
  }
  
  // Intercepter les erreurs de syntaxe lors du chargement des modules
  window.addEventListener('error', function(event) {
    if (event && event.message && event.message.includes('prop-types') && event.message.includes('default')) {
      console.log('⚠️ Erreur prop-types interceptée:', event.message);
      
      // Empêcher l'erreur d'être affichée
      event.preventDefault();
      
      // Patcher PropTypes globalement
      setTimeout(function() {
        console.log('🔄 Application du patch global pour PropTypes');
        
        // Créer un script qui s'exécute dans le contexte global
        var script = document.createElement('script');
        script.textContent = `
          // Créer un objet PropTypes global avec un export par défaut
          if (!window.PropTypes) {
            window.PropTypes = { 
              string: function() { return null; },
              number: function() { return null; },
              bool: function() { return null; },
              func: function() { return null; },
              array: function() { return null; },
              object: function() { return null; },
              node: function() { return null; },
              element: function() { return null; },
              instanceOf: function() { return function() { return null; }; },
              oneOf: function() { return function() { return null; }; },
              oneOfType: function() { return function() { return null; }; },
              arrayOf: function() { return function() { return null; }; },
              objectOf: function() { return function() { return null; }; },
              shape: function() { return function() { return null; }; },
              any: function() { return null; }
            };
            
            // Ajouter l'export par défaut
            window.PropTypes.default = window.PropTypes;
            
            console.log('✅ PropTypes global créé');
          }
          
          // Recharger la page pour appliquer les changements
          location.reload();
        `;
        document.head.appendChild(script);
      }, 500);
      
      return true;
    }
  }, true);
  
  console.log("✅ Hack prop-types installé avec succès");
})(); 