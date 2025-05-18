const jwt = require('jsonwebtoken');

// Clé secrète pour signer les jetons JWT
const JWT_SECRET = process.env.JWT_SECRET || 'entreprise_organiser_secret_key_2025';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '1d';

// Générer un token JWT
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE }
  );
};

// Vérifier un token JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Token invalide ou expiré');
  }
};

module.exports = {
  generateToken,
  verifyToken,
  JWT_SECRET
}; 