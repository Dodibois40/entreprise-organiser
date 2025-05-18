// Script d'insertion directe d'utilisateurs dans MongoDB
const { MongoClient } = require('mongodb');

const run = async () => {
  // Connexion à MongoDB
  console.log('Connexion à MongoDB...');
  const client = new MongoClient('mongodb://localhost:27017/');
  
  try {
    await client.connect();
    console.log('Connecté!');
    
    // Sélectionner la base et la collection
    const db = client.db('entreprise-organiser');
    const users = db.collection('users');
    
    // Supprimer les utilisateurs s'ils existent
    const result = await users.deleteMany({
      email: { $in: ['admin@example.com', 'user@example.com'] }
    });
    console.log(`${result.deletedCount} utilisateurs supprimés`);
    
    // Insérer l'admin
    await users.insertOne({
      nom: 'Admin',
      prenom: 'System',
      email: 'admin@example.com',
      // Mot de passe: admin123 (haché)
      password: '$2a$10$1YVrL21EtaBZuJlCDBDrLO74g2TIotXl58H1ik.O7HFMgg1vdwGTa',
      role: 'admin',
      emailVerified: true,
      actif: true,
      dateCreation: new Date()
    });
    console.log('Admin créé!');
    
    // Insérer l'utilisateur standard
    await users.insertOne({
      nom: 'User',
      prenom: 'Standard',
      email: 'user@example.com',
      // Mot de passe: password123 (haché)
      password: '$2a$10$mnPuA4SKuPxOBOBZi89GEO7ByU6cyFV6NHyW2Ja61VqF76S1JX5pq',
      role: 'utilisateur',
      emailVerified: true,
      actif: true,
      dateCreation: new Date()
    });
    console.log('User standard créé!');
    
    console.log('UTILISATEURS CRÉÉS AVEC SUCCÈS!');
    console.log('-------------------------------');
    console.log('Admin: admin@example.com / admin123');
    console.log('User: user@example.com / password123');
    
  } catch (err) {
    console.error('ERREUR:', err);
  } finally {
    await client.close();
    console.log('Déconnexion terminée');
  }
};

// Exécuter
run().catch(console.error); 