const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config');

// Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const planningRoutes = require('./modules/planning/planningRoutes');
const chantierRoutes = require('./routes/chantierRoutes');

// Initialiser l'application Express
const app = express();

// Middlewares
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes principales
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API de l\'Organiseur d\'Entreprise!' });
});

// Routes d'API
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/plannings', planningRoutes);
app.use('/api/chantiers', chantierRoutes);

// Gestionnaire d'erreurs pour les routes non trouvées
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route non trouvée'
  });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Une erreur est survenue sur le serveur!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Connexion à MongoDB et démarrage du serveur
const startServer = async () => {
  try {
    // Options de connexion optimisées pour MongoDB
    const mongooseOptions = {
      ...config.db.options,
      serverSelectionTimeoutMS: 5000, // Timeout de 5 secondes pour la sélection du serveur
      socketTimeoutMS: 45000, // Timeout de 45 secondes pour les opérations
      family: 4, // Forcer IPv4
      maxPoolSize: 10, // Limiter le nombre de connexions simultanées
      minPoolSize: 5, // Maintenir un minimum de connexions
      connectTimeoutMS: 10000, // Timeout de connexion de 10 secondes
    };

    // Connexion à MongoDB
    await mongoose.connect(config.db.uri, mongooseOptions);
    console.log('Connecté à MongoDB avec succès!');
    
    // Démarrage du serveur
    app.listen(config.server.port, () => {
      console.log(`Serveur en cours d'exécution sur le port ${config.server.port}`);
    });
  } catch (error) {
    console.error(`Erreur lors du démarrage du serveur: ${error.message}`);
    process.exit(1);
  }
};

startServer();

module.exports = app;
