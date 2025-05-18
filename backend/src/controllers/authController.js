const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const emailService = require('../services/emailService');
const crypto = require('crypto');

// Génération du token JWT
const generateToken = (id, rememberMe = false) => {
  // Si l'option "se souvenir de moi" est activée, le token expire après 30 jours, sinon selon la config (1 jour par défaut)
  const expiresIn = rememberMe ? '30d' : config.jwt.expiresIn;
  
  return jwt.sign({ id }, config.jwt.secret, { expiresIn });
};

// Inscription d'un nouvel utilisateur
exports.register = async (req, res) => {
  try {
    const { nom, prenom, email, password, poste } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
    }

    // Créer un nouvel utilisateur
    const user = await User.create({
      nom,
      prenom,
      email,
      password,
      poste
    });

    // Enregistrer la date de première connexion
    user.derniereConnexion = Date.now();
    await user.save();

    // Générer un token de vérification d'email
    const verificationToken = user.generateEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    // Construire l'URL de vérification
    const verificationUrl = `${config.frontendUrl || 'http://localhost:3000'}/auth/verify-email/${verificationToken}`;

    // Envoyer l'email de vérification
    try {
      await emailService.sendEmailVerification(user, verificationUrl);
      
      // Générer un token JWT pour l'authentification
      const token = generateToken(user._id);

      // Réponse avec l'utilisateur sans le mot de passe
      res.status(201).json({
        user: {
          _id: user._id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          poste: user.poste,
          role: user.role,
          emailVerified: user.emailVerified
        },
        token,
        message: 'Inscription réussie. Un email de vérification a été envoyé à votre adresse email.'
      });
    } catch (error) {
      // En cas d'erreur d'envoi d'email, réinitialiser les champs de vérification
      user.emailVerificationToken = undefined;
      user.emailVerificationExpires = undefined;
      await user.save({ validateBeforeSave: false });
      
      console.error('Erreur d\'envoi d\'email de vérification:', error);
      
      // Générer un token JWT pour l'authentification
    const token = generateToken(user._id);

    // Réponse avec l'utilisateur sans le mot de passe
    res.status(201).json({
      user: {
        _id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        poste: user.poste,
          role: user.role,
          emailVerified: user.emailVerified
      },
        token,
        message: 'Inscription réussie, mais une erreur est survenue lors de l\'envoi de l\'email de vérification.'
    });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {
  try {
    const { email, password, rememberMe = false } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email, actif: true }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier si le mot de passe est correct
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Mettre à jour la date de dernière connexion
    user.derniereConnexion = Date.now();
    await user.save();

    // Générer un token avec ou sans option "se souvenir de moi"
    const token = generateToken(user._id, rememberMe);

    // Réponse avec l'utilisateur sans le mot de passe
    res.status(200).json({
      user: {
        _id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        poste: user.poste,
        role: user.role,
        emailVerified: user.emailVerified
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir le profil de l'utilisateur actuel
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({
      _id: user._id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      poste: user.poste,
      role: user.role,
      derniereConnexion: user.derniereConnexion,
      emailVerified: user.emailVerified
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour le profil de l'utilisateur
exports.updateProfile = async (req, res) => {
  try {
    // Filtrer les champs autorisés
    const { nom, prenom, poste } = req.body;
    const updatedFields = {};
    
    if (nom) updatedFields.nom = nom;
    if (prenom) updatedFields.prenom = prenom;
    if (poste) updatedFields.poste = poste;

    const user = await User.findByIdAndUpdate(
      req.user.id, 
      { $set: updatedFields },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({
      _id: user._id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      poste: user.poste,
      role: user.role,
      emailVerified: user.emailVerified
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Changer le mot de passe
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Vérifier que le nouveau mot de passe est assez complexe
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères' });
    }

    // Récupérer l'utilisateur avec son mot de passe
    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si le mot de passe actuel est correct
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
    }

    // Mettre à jour le mot de passe
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Mot de passe modifié avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Demander une réinitialisation de mot de passe
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Vérifier si l'email a été fourni
    if (!email) {
      return res.status(400).json({ message: 'Veuillez fournir votre adresse email' });
    }

    // Rechercher l'utilisateur par email
    const user = await User.findOne({ email, actif: true });
    if (!user) {
      // Pour des raisons de sécurité, ne pas indiquer si l'email existe ou non
      return res.status(200).json({ 
        message: 'Si votre adresse email est enregistrée, vous recevrez un lien de réinitialisation'
      });
    }

    // Générer un token de réinitialisation
    const resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // Construire l'URL de réinitialisation
    const resetUrl = `${config.frontendUrl || 'http://localhost:3000'}/auth/reset-password/${resetToken}`;

    // Envoyer l'email de réinitialisation
    try {
      await emailService.sendPasswordResetEmail(user, resetToken, resetUrl);
      
      res.status(200).json({ 
        message: 'Un email de réinitialisation de mot de passe a été envoyé à votre adresse email'
      });
    } catch (error) {
      // En cas d'erreur d'envoi d'email, réinitialiser les champs de réinitialisation
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save({ validateBeforeSave: false });
      
      console.error('Erreur d\'envoi d\'email de réinitialisation:', error);
      
      res.status(500).json({ 
        message: 'Une erreur est survenue lors de l\'envoi de l\'email de réinitialisation'
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Réinitialiser le mot de passe
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Vérifier si le token et le mot de passe ont été fournis
    if (!token || !password) {
      return res.status(400).json({ 
        message: 'Token ou mot de passe manquant'
      });
    }

    // Vérifier que le mot de passe est assez complexe
    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Le mot de passe doit contenir au moins 6 caractères'
      });
    }

    // Hasher le token pour le comparer avec celui stocké en base
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Rechercher l'utilisateur avec le token correspondant et non expiré
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        message: 'Token invalide ou expiré'
      });
    }

    // Mettre à jour le mot de passe
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    // Générer un nouveau token JWT
    const jwtToken = generateToken(user._id);

    res.status(200).json({ 
      message: 'Mot de passe réinitialisé avec succès',
      token: jwtToken
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Vérifier l'email d'un utilisateur
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Vérifier si le token a été fourni
    if (!token) {
      return res.status(400).json({ 
        message: 'Token manquant'
      });
    }

    // Hasher le token pour le comparer avec celui stocké en base
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Rechercher l'utilisateur avec le token correspondant et non expiré
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        message: 'Token invalide ou expiré'
      });
    }

    // Marquer l'email comme vérifié
    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.status(200).json({ 
      message: 'Adresse email vérifiée avec succès'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Renvoyer l'email de vérification
exports.resendVerificationEmail = async (req, res) => {
  try {
    // Récupérer l'utilisateur depuis la requête
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si l'email est déjà vérifié
    if (user.emailVerified) {
      return res.status(400).json({ message: 'Votre adresse email est déjà vérifiée' });
    }

    // Générer un nouveau token de vérification
    const verificationToken = user.generateEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    // Construire l'URL de vérification
    const verificationUrl = `${config.frontendUrl || 'http://localhost:3000'}/auth/verify-email/${verificationToken}`;

    // Envoyer l'email de vérification
    try {
      await emailService.sendEmailVerification(user, verificationUrl);
      
      res.status(200).json({ 
        message: 'Un nouvel email de vérification a été envoyé à votre adresse email'
      });
    } catch (error) {
      // En cas d'erreur d'envoi d'email, réinitialiser les champs de vérification
      user.emailVerificationToken = undefined;
      user.emailVerificationExpires = undefined;
      await user.save({ validateBeforeSave: false });
      
      console.error('Erreur d\'envoi d\'email de vérification:', error);
      
      res.status(500).json({ 
        message: 'Une erreur est survenue lors de l\'envoi de l\'email de vérification'
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
