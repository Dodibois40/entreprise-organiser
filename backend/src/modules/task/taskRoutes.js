const express = require('express');
const router = express.Router();
const taskController = require('./taskController');
const { auth } = require('../../middleware/auth');

// Toutes les routes de tâches nécessitent une authentification
router.use(auth);

// Routes pour les tâches
router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.get('/stats', taskController.getTasksStats);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router; 