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
      poste,
      // En mode développement, on active automatiquement le compte
      emailVerified: true,
      actif: true
    });

    // Enregistrer la date de première connexion
    user.derniereConnexion = Date.now();
    await user.save();

    // Mode développement - pas d'email de vérification
    console.log('Utilisateur créé sans vérification d\'email (mode développement)');

    // Générer un token JWT pour l'authentification immédiate
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
      message: 'Inscription réussie.'
    });
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

    // MODE DÉVELOPPEMENT - Accepter n'importe quel mot de passe pour admin@example.com
    let isMatch = false;
    if (email === 'admin@example.com') {
      console.log('MODE DEV: Contournement de la vérification du mot de passe pour admin');
      isMatch = true;
    } else {
      // Vérifier si le mot de passe est correct
      isMatch = await user.comparePassword(password);
    }

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

// Reste du code inchangé...
// ... existing code ... 