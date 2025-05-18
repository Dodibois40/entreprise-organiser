const User = require('../user/userModel');
const { generateToken } = require('../../config/jwt');

/**
 * Service d'authentification
 */
const authService = {
  /**
   * Inscrit un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Object} - Nouvel utilisateur et token
   */
  register: async (userData) => {
    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('Cet email est déjà utilisé');
    }
    
    // Créer un nouvel utilisateur
    const user = new User(userData);
    await user.save();
    
    // Générer un token JWT
    const token = generateToken(user);
    
    return { user, token };
  },
  
  /**
   * Authentifie un utilisateur existant
   * @param {String} email - Email de l'utilisateur
   * @param {String} password - Mot de passe de l'utilisateur
   * @returns {Object} - Utilisateur et token
   */
  login: async (email, password) => {
    // Rechercher l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Email ou mot de passe incorrect');
    }
    
    // Vérifier si le compte est actif
    if (!user.actif) {
      throw new Error('Ce compte a été désactivé');
    }
    
    // Vérifier le mot de passe
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Email ou mot de passe incorrect');
    }
    
    // Générer un token JWT
    const token = generateToken(user);
    
    return { user, token };
  },
  
  /**
   * Récupère le profil d'un utilisateur
   * @param {String} userId - ID de l'utilisateur
   * @returns {Object} - Utilisateur
   */
  getProfile: async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    return user;
  },
  
  /**
   * Met à jour le profil d'un utilisateur
   * @param {String} userId - ID de l'utilisateur
   * @param {Object} userData - Données à mettre à jour
   * @returns {Object} - Utilisateur mis à jour
   */
  updateProfile: async (userId, userData) => {
    // Ne pas autoriser la mise à jour du rôle via cette méthode
    if (userData.role) {
      delete userData.role;
    }
    
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: userData },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    
    return user;
  }
};

module.exports = authService; 