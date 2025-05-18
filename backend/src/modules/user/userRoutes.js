const express = require('express');
const router = express.Router();
const userController = require('./userController');
const { auth, authorize } = require('../../middleware/auth');

// Toutes les routes utilisateur nécessitent une authentification
router.use(auth);

// Routes accessibles à tous les utilisateurs authentifiés
router.get('/me', userController.getCurrentUser);

// Routes réservées aux administrateurs
router.get('/', authorize(['admin']), userController.getAllUsers);
router.post('/', authorize(['admin']), userController.createUser);
router.get('/:id', authorize(['admin']), userController.getUserById);
router.put('/:id', authorize(['admin']), userController.updateUser);
router.delete('/:id', authorize(['admin']), userController.deleteUser);

module.exports = router; 