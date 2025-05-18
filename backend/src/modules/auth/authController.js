const authService = require('./authService');

/**
 * Contrôleur d'authentification
 */
const authController = {
  /**
   * Inscrit un nouvel utilisateur
   * @route POST /api/auth/register
   */
  register: async (req, res) => {
    try {
      const { nom, prenom, email, password, poste } = req.body;
      
      // Valider les données de base
      if (!nom || !prenom || !email || !password) {
        return res.status(400).json({ 
          message: 'Veuillez fournir tous les champs requis (nom, prénom, email, mot de passe)' 
        });
      }
      
      // Inscrit l'utilisateur via le service
      const { user, token } = await authService.register({
        nom,
        prenom,
        email,
        password,
        poste: poste || ''
      });
      
      res.status(201).json({
        message: 'Inscription réussie',
        user,
        token
      });
    } catch (error) {
      console.warn('Erreur lors de l\'inscription:', error);
      
      if (error.message.includes('email est déjà utilisé')) {
        return res.status(400).json({ message: error.message });
      }
      
      res.status(500).json({ 
        message: 'Erreur lors de l\'inscription', 
        error: error.message 
      });
    }
  },
  
  /**
   * Authentifie un utilisateur existant
   * @route POST /api/auth/login
   */
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Valider les données
      if (!email || !password) {
        return res.status(400).json({ 
          message: 'Veuillez fournir un email et un mot de passe' 
        });
      }
      
      // Authentifie l'utilisateur via le service
      const { user, token } = await authService.login(email, password);
      
      res.status(200).json({
        message: 'Connexion réussie',
        user,
        token
      });
    } catch (error) {
      console.warn('Erreur lors de la connexion:', error);
      
      // Gérer les erreurs spécifiques
      if (error.message.includes('Email ou mot de passe incorrect') ||
          error.message.includes('Ce compte a été désactivé')) {
        return res.status(401).json({ message: error.message });
      }
      
      res.status(500).json({ 
        message: 'Erreur lors de la connexion', 
        error: error.message 
      });
    }
  },
  
  /**
   * Récupère le profil de l'utilisateur connecté
   * @route GET /api/auth/profile
   */
  getProfile: async (req, res) => {
    try {
      // L'utilisateur est déjà disponible via le middleware auth
      res.status(200).json({
        user: req.user
      });
    } catch (error) {
      console.warn('Erreur lors de la récupération du profil:', error);
      res.status(500).json({ 
        message: 'Erreur lors de la récupération du profil', 
        error: error.message 
      });
    }
  },
  
  /**
   * Met à jour le profil de l'utilisateur connecté
   * @route PUT /api/auth/profile
   */
  updateProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const userData = req.body;
      
      // Mettre à jour le profil via le service
      const updatedUser = await authService.updateProfile(userId, userData);
      
      res.status(200).json({
        message: 'Profil mis à jour avec succès',
        user: updatedUser
      });
    } catch (error) {
      console.warn('Erreur lors de la mise à jour du profil:', error);
      res.status(500).json({ 
        message: 'Erreur lors de la mise à jour du profil', 
        error: error.message 
      });
    }
  }
};

module.exports = authController; 