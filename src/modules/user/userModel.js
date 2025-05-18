const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Vérifier si le modèle existe déjà pour éviter l'erreur OverwriteModelError
const userSchema = new mongoose.Schema({
  nom: { 
    type: String, 
    required: true 
  },
  prenom: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'manager', 'utilisateur'], 
    default: 'utilisateur' 
  },
  poste: {
    type: String,
    default: ''
  },
  photo: {
    type: String,
    default: ''
  },
  actif: { 
    type: Boolean, 
    default: true 
  },
  dateCreation: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  timestamps: true 
});

// Hash password avant sauvegarde
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
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

// Toujours exclure le mot de passe quand on convertit en JSON
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  }
});

// Vérifier si le modèle "User" est déjà défini
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User; 