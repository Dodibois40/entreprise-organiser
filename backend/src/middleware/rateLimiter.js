const rateLimit = require('express-rate-limit');

// Limite générale pour les routes API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

// Limite plus stricte pour l'authentification
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10
});

module.exports = { apiLimiter, authLimiter };
