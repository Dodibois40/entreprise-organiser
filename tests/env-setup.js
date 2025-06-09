/**
 * Configuration des variables d'environnement pour les tests
 */

// Variables d'environnement communes
process.env.NODE_ENV = 'test';

// Variables pour les tests backend
process.env.DATABASE_URL = 'postgresql://testuser:testpassword@localhost:5434/test_entreprise_db';
process.env.JWT_SECRET = 'test-jwt-secret-for-testing-only-do-not-use-in-production';
process.env.JWT_EXPIRES_IN = '1h';

// Variables pour les tests frontend
process.env.VITE_API_URL = 'http://localhost:3001';
process.env.VITE_APP_NAME = 'Entreprise Organiser (Test)';

// Désactiver les logs en mode test
process.env.LOG_LEVEL = 'error';

// Configuration de test pour Prisma
process.env.PRISMA_DISABLE_WARNINGS = 'true'; 