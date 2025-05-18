const express = require('express');
const router = express.Router();
const planningController = require('./planningController');
const { auth } = require('../../middleware/auth');

// Commenté temporairement pour le débogage
// Toutes les routes nécessitent une authentification
// router.use(auth);

// Routes de planning
router.get('/', planningController.getAllPlannings);
router.post('/', planningController.createPlanning);
router.get('/:id', planningController.getPlanningById);
router.put('/:id', planningController.updatePlanning);
router.delete('/:id', planningController.deletePlanning);

module.exports = router;
