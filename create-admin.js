// Script pour créer un utilisateur administrateur
const mongoose = require('mongoose');
const User = require('./backend/src/models/User');
const config = require('./backend/src/config/config');

async function createAdminUser() {
  try {
    // Connexion à MongoDB
    console.log('Connexion à MongoDB...');
    await mongoose.connect(config.db.uri, config.db.options);
    console.log('Connecté à MongoDB avec succès!');

    // Vérifier si l'utilisateur admin existe déjà
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('L\'utilisateur admin existe déjà!');
      return;
    }

    // Créer l'utilisateur admin
    const adminUser = new User({
      nom: 'Admin',
      prenom: 'System',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      emailVerified: true,
      actif: true
    });

    // Sauvegarder l'utilisateur
    await adminUser.save();
    console.log('Utilisateur admin créé avec succès!');
    console.log('Email: admin@example.com');
    console.log('Mot de passe: admin123');

    // Créer également un utilisateur standard
    const standardUser = new User({
      nom: 'User',
      prenom: 'Standard',
      email: 'user@example.com',
      password: 'password123',
      role: 'utilisateur',
      emailVerified: true,
      actif: true
    });

    // Sauvegarder l'utilisateur
    await standardUser.save();
    console.log('Utilisateur standard créé avec succès!');
    console.log('Email: user@example.com');
    console.log('Mot de passe: password123');

  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    // Fermer la connexion
    await mongoose.disconnect();
    console.log('Déconnexion de MongoDB');
    process.exit(0);
  }
}

// Exécuter la fonction
createAdminUser(); 