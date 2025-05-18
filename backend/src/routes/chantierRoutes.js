const express = require('express');
const router = express.Router();
const chantierController = require('../controllers/chantierController');
const { protect } = require('../middleware/authMiddleware');

// Routes protégées par l'authentification (commenté pour le développement)
// router.use(protect);

// Routes pour les opérations CRUD basiques
router.route('/')
  .get(chantierController.getAllChantiers)
  .post(chantierController.createChantier);

router.route('/:id')
  .get(chantierController.getChantierById)
  .put(chantierController.updateChantier)
  .delete(chantierController.deleteChantier);

// Route pour mettre à jour les données financières
router.put('/:id/finances', chantierController.updateFinances);

// Route pour obtenir les statistiques financières
router.get('/stats/finances', chantierController.getFinancialStats);

module.exports = router;
