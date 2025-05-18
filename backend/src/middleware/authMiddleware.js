const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

/**
 * Middleware d'authentification
 * Vérifie si l'utilisateur est authentifié via le JWT dans les en-têtes
 */
exports.protect = async (req, res, next) => {
  try {
    // Récupérer le token depuis l'en-tête Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Accès non autorisé, token manquant' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé, token invalide' });
    }
    
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, config.jwt.secret);
    
    // Vérifier que l'utilisateur existe toujours
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    
    // Vérifier si l'utilisateur est toujours actif
    if (!user.actif) {
      return res.status(403).json({ message: 'Compte désactivé, contactez un administrateur' });
    }
    
    // Ajouter l'utilisateur à l'objet requête
    req.user = user;
    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

/**
 * Middleware pour vérifier les rôles
 * @param {Array} roles - Tableau des rôles autorisés
 */
exports.authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Accès non autorisé' });
    }
    
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Vous n\'avez pas les permissions nécessaires' });
    }
    
    next();
  };
}; 