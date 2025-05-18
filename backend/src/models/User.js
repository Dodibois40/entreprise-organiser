const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true
  },
  prenom: {
    type: String,
    required: [true, 'Le prénom est requis'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Veuillez fournir un email valide']
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'],
    select: false
  },
  poste: {
    type: String,
    trim: true,
    default: ''
  },
  role: {
    type: String,
    enum: ['utilisateur', 'admin'],
    default: 'utilisateur'
  },
  actif: {
    type: Boolean,
    default: true
  },
  dateCreation: {
    type: Date,
    default: Date.now
  },
  derniereConnexion: {
    type: Date,
    default: null
  },
  // Champs pour la vérification de l'email
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  // Champs pour la réinitialisation du mot de passe
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true
});

// Middleware pour hacher le mot de passe avant l'enregistrement
userSchema.pre('save', async function(next) {
  // Ne hacher le mot de passe que s'il a été modifié (ou est nouveau)
  if (!this.isModified('password')) return next();
  
  try {
    // Génération d'un sel et hachage du mot de passe
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Méthode pour mettre à jour la date de dernière connexion
userSchema.methods.updateLastLogin = async function() {
  this.derniereConnexion = Date.now();
  return this.save();
};

// Méthode pour générer un token de vérification d'email
userSchema.methods.generateEmailVerificationToken = function() {
  // Générer un token aléatoire
  const verificationToken = crypto.randomBytes(32).toString('hex');
  
  // Hasher le token et l'enregistrer dans la base de données
  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  
  // Définir une date d'expiration (24 heures)
  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;
  
  return verificationToken;
};

// Méthode pour générer un token de réinitialisation de mot de passe
userSchema.methods.generatePasswordResetToken = function() {
  // Générer un token aléatoire
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Hasher le token et l'enregistrer dans la base de données
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  // Définir une date d'expiration (1 heure)
  this.resetPasswordExpires = Date.now() + 3600000;
  
  return resetToken;
};

// Vérification si le modèle existe déjà pour éviter la recompilation
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User; 