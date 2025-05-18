const User = require('./userModel');

/**
 * Contrôleur de gestion des utilisateurs
 */
const userController = {
  /**
   * Récupère l'utilisateur actuellement connecté
   */
  getCurrentUser: async (req, res) => {
    try {
      // L'utilisateur est déjà chargé par le middleware auth
      res.status(200).json({ user: req.user });
    } catch (error) {
      console.warn('Erreur lors de la récupération du profil:', error);
      res.status(500).json({
        message: 'Erreur lors de la récupération du profil',
        error: error.message
      });
    }
  },

  /**
   * Récupère tous les utilisateurs (admin uniquement)
   */
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({}).select('-password');
      res.status(200).json({ users });
    } catch (error) {
      console.warn('Erreur lors de la récupération des utilisateurs:', error);
      res.status(500).json({
        message: 'Erreur lors de la récupération des utilisateurs',
        error: error.message
      });
    }
  },

  /**
   * Crée un nouvel utilisateur (admin uniquement)
   */
  createUser: async (req, res) => {
    try {
      const { nom, prenom, email, password, role, poste } = req.body;

      // Valider les données
      if (!nom || !prenom || !email || !password) {
        return res.status(400).json({
          message: 'Veuillez fournir tous les champs requis (nom, prénom, email, mot de passe)'
        });
      }

      // Vérifier si l'email existe déjà
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
      }

      // Créer l'utilisateur
      const newUser = new User({
        nom,
        prenom,
        email,
        password,
        role: role || 'utilisateur',
        poste: poste || ''
      });

      await newUser.save();
      
      // Ne pas renvoyer le mot de passe
      const user = newUser.toJSON();
      
      res.status(201).json({
        message: 'Utilisateur créé avec succès',
        user
      });
    } catch (error) {
      console.warn('Erreur lors de la création de l\'utilisateur:', error);
      res.status(500).json({
        message: 'Erreur lors de la création de l\'utilisateur',
        error: error.message
      });
    }
  },

  /**
   * Récupère un utilisateur par son ID (admin uniquement)
   */
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      
      res.status(200).json({ user });
    } catch (error) {
      console.warn('Erreur lors de la récupération de l\'utilisateur:', error);
      res.status(500).json({
        message: 'Erreur lors de la récupération de l\'utilisateur',
        error: error.message
      });
    }
  },

  /**
   * Met à jour un utilisateur (admin uniquement)
   */
  updateUser: async (req, res) => {
    try {
      const { nom, prenom, email, role, poste, actif } = req.body;
      
      // Mise à jour sans le mot de passe
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { 
          $set: { 
            ...(nom && { nom }),
            ...(prenom && { prenom }),
            ...(email && { email }),
            ...(role && { role }),
            ...(poste !== undefined && { poste }),
            ...(actif !== undefined && { actif })
          } 
        },
        { new: true, runValidators: true }
      ).select('-password');
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      
      res.status(200).json({
        message: 'Utilisateur mis à jour avec succès',
        user: updatedUser
      });
    } catch (error) {
      console.warn('Erreur lors de la mise à jour de l\'utilisateur:', error);
      res.status(500).json({
        message: 'Erreur lors de la mise à jour de l\'utilisateur',
        error: error.message
      });
    }
  },

  /**
   * Supprime un utilisateur (admin uniquement)
   */
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      
      if (!deletedUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      
      res.status(200).json({
        message: 'Utilisateur supprimé avec succès'
      });
    } catch (error) {
      console.warn('Erreur lors de la suppression de l\'utilisateur:', error);
      res.status(500).json({
        message: 'Erreur lors de la suppression de l\'utilisateur',
        error: error.message
      });
    }
  }
};

module.exports = userController; 