const express = require('express');
const router = express.Router();
const inventaireController = require('./inventaireController');
const { authenticateJWT, authorizeRoles } = require('../../middleware/authMiddleware');

/**
 * Routes pour la gestion de l'inventaire
 */

// Configuration - Mettre à true pour activer l'authentification
const ENABLE_AUTH = false;

// Middleware conditionnel pour l'authentification
if (ENABLE_AUTH) {
  router.use(authenticateJWT);
}

// Récupérer les statistiques d'inventaire
router.get('/statistiques', inventaireController.getStatistiques);

// Liste des articles avec filtres et pagination
router.get('/', inventaireController.getAllArticles);

// Récupérer un article par ID
router.get('/:id', inventaireController.getArticleById);

// Créer un nouvel article
router.post('/', inventaireController.createArticle);

// Mettre à jour un article
router.put('/:id', inventaireController.updateArticle);

// Supprimer un article
router.delete('/:id', inventaireController.deleteArticle);

// Ajuster le stock (entrée/sortie)
router.post('/:id/ajuster-stock', inventaireController.ajusterStock);

module.exports = router;
