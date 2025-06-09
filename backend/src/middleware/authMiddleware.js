const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');
const DEFAULT_SECRET = 'default_secret_key_for_dev_only_please_change_in_production';
const JWT_SECRET = process.env.JWT_SECRET || DEFAULT_SECRET;

/**
 * Middleware pour vérifier l'authentification JWT
 */
exports.authenticateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
    }

    // Format du header: "Bearer TOKEN"
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Format de token invalide.' });
    }

    // Vérification du token avec une gestion d'erreur améliorée
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.error('Erreur d\'authentification:', err);
        return res.status(401).json({ message: 'Token invalide ou expiré.' });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return res.status(401).json({ message: 'Erreur d\'authentification.' });
  }
};

/**
 * Middleware pour vérifier les rôles utilisateur
 */
exports.authorizeRoles = (roles) => {
  return (req, res, next) => {
    try {
      // Assurez-vous que req.user existe (middleware authenticateJWT doit être utilisé avant)
      if (!req.user) {
        return res.status(401).json({ message: 'Authentification requise.' });
      }

      // Vérifier si l'utilisateur a un des rôles autorisés
      if (!req.user.role || !roles.includes(req.user.role.toLowerCase())) {
        return res.status(403).json({ 
          message: 'Accès refusé. Vous n\'avez pas les droits nécessaires.' 
        });
      }

      next();
    } catch (error) {
      console.error('Erreur d\'autorisation:', error);
      return res.status(500).json({ message: 'Erreur serveur lors de la vérification des droits.' });
    }
  };
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