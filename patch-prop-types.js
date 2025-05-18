/**
 * Script de correction pour prop-types
 */
const fs = require('fs');
const path = require('path');

// Chemin vers le fichier prop-types/index.js
const propTypesPath = path.join(__dirname, 'node_modules', 'prop-types', 'index.js');

// Vérifier si le fichier existe
if (!fs.existsSync(propTypesPath)) {
  console.error('Le fichier prop-types/index.js est introuvable.');
  process.exit(1);
}

// Lire le contenu actuel
const content = fs.readFileSync(propTypesPath, 'utf8');

// Si le fichier ne contient pas déjà un export default
if (!content.includes('module.exports.default =')) {
  // Ajouter l'export default à la fin du fichier
  const newContent = content + '\n\n// Patch pour les imports ES6 default\nmodule.exports.default = module.exports;\n';
  
  // Écrire le fichier modifié
  fs.writeFileSync(propTypesPath, newContent, 'utf8');
  
  console.log('✅ Le fichier prop-types/index.js a été corrigé avec succès!');
} else {
  console.log('⚠️ Le fichier prop-types/index.js contient déjà un export default.');
}

// Vérifier si le package-lock.json existe et supprimer les entrées de cache
try {
  const packageLockPath = path.join(__dirname, 'package-lock.json');
  if (fs.existsSync(packageLockPath)) {
    const packageLock = JSON.parse(fs.readFileSync(packageLockPath, 'utf8'));
    
    if (packageLock.dependencies && packageLock.dependencies['prop-types']) {
      console.log('⚡ Mise à jour des informations de cache dans package-lock.json...');
      packageLock.dependencies['prop-types'].version = '15.7.2';
      fs.writeFileSync(packageLockPath, JSON.stringify(packageLock, null, 2), 'utf8');
    }
  }
} catch (err) {
  console.error('Erreur lors de la mise à jour du package-lock.json:', err);
}

console.log('🔄 Veuillez redémarrer votre serveur pour appliquer les changements.'); 