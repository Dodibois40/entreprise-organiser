const mongoose = require('mongoose');

/**
 * Fonction pour établir la connexion à MongoDB
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://localhost:27017/entreprise-organiser',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    
    console.log(`MongoDB connecté: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Erreur de connexion à MongoDB: ${error.message}`);
    // Ne quitte plus l'application en cas d'échec
    throw error; // Remonte l'erreur au lieu de quitter
  }
};

module.exports = connectDB; 
