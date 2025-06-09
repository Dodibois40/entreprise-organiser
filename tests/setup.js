/**
 * Configuration globale pour tous les tests
 * Ce fichier est chargé avant l'exécution des tests
 */

// Configuration pour les tests Node.js/NestJS
global.console = {
  ...console,
  // Désactiver les logs en mode test sauf erreurs
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: console.warn,
  error: console.error,
};

// Variables d'environnement pour les tests
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://testuser:testpassword@localhost:5434/test_entreprise_db';
process.env.JWT_SECRET = 'test-jwt-secret-for-testing-only';

// Timeout global pour les tests
jest.setTimeout(30000);

// Configuration pour les tests de base de données
beforeAll(async () => {
  // Nettoyer la base de test avant de commencer
  console.log('🧪 Initialisation des tests...');
});

afterAll(async () => {
  // Nettoyer après tous les tests
  console.log('🧹 Nettoyage après tests...');
});

// Intercepter les erreurs non gérées
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = {}; 