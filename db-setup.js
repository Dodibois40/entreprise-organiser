const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// URI MongoDB
const dbURI = 'mongodb://localhost:27017/entreprise-organiser';

// Schéma utilisateur simplifié
const userSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  password: String,
  role: String,
  emailVerified: Boolean,
  actif: Boolean
});

// Prétraitement du mot de passe
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Modèle utilisateur
const User = mongoose.model('User', userSchema);

// Fonction principale
async function createUsers() {
  try {
    // Connexion à MongoDB
    console.log('Connexion à MongoDB...');
    await mongoose.connect(dbURI);
    console.log('Connecté avec succès!');

    // Supprimer les utilisateurs existants (optionnel)
    await User.deleteMany({ email: { $in: ['admin@example.com', 'user@example.com'] } });
    console.log('Anciens utilisateurs supprimés');

    // Créer admin
    const admin = new User({
      nom: 'Admin',
      prenom: 'System',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      emailVerified: true,
      actif: true
    });
    await admin.save();
    console.log('Admin créé!');

    // Créer utilisateur standard
    const user = new User({
      nom: 'User',
      prenom: 'Standard',
      email: 'user@example.com',
      password: 'password123',
      role: 'utilisateur',
      emailVerified: true,
      actif: true
    });
    await user.save();
    console.log('Utilisateur standard créé!');

    console.log('=================================');
    console.log('UTILISATEURS CRÉÉS AVEC SUCCÈS!');
    console.log('=================================');
    console.log('Admin: admin@example.com / admin123');
    console.log('User: user@example.com / password123');
    console.log('=================================');

  } catch (error) {
    console.error('ERREUR:', error);
  } finally {
    // Fermer la connexion
    await mongoose.disconnect();
    console.log('Déconnexion de MongoDB');
    process.exit(0);
  }
}

// Exécuter
createUsers(); 