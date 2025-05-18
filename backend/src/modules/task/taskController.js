const Task = require('./taskModel');

/**
 * Contrôleur de gestion des tâches
 */
const taskController = {
  /**
   * Crée une nouvelle tâche
   * @route POST /api/tasks
   */
  createTask: async (req, res) => {
    try {
      const { titre, description, priorite, statut, dateDebut, dateFin, assigneA, planningId, tags } = req.body;
      
      // Valider les données de base
      if (!titre) {
        return res.status(400).json({ message: 'Le titre est requis' });
      }
      
      // Créer la tâche avec l'utilisateur connecté comme créateur
      const taskData = {
        titre,
        description,
        priorite,
        statut,
        dateDebut,
        dateFin,
        assigneA,
        planningId,
        tags,
        creePar: req.user._id // Utilisateur connecté
      };
      
      const task = new Task(taskData);
      await task.save();
      
      res.status(201).json({
        message: 'Tâche créée avec succès',
        task
      });
    } catch (error) {
      console.warn('Erreur lors de la création de la tâche:', error);
      res.status(500).json({ 
        message: 'Erreur lors de la création de la tâche', 
        error: error.message 
      });
    }
  },
  
  /**
   * Récupère toutes les tâches avec filtrage et pagination
   * @route GET /api/tasks
   */
  getAllTasks: async (req, res) => {
    try {
      // Extraire les paramètres de la requête pour le filtrage
      const filters = {
        statut: req.query.statut,
        priorite: req.query.priorite,
        assigneA: req.query.assigneA,
        planningId: req.query.planningId,
        search: req.query.search,
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        sortBy: req.query.sortBy || 'createdAt:desc'
      };
      
      const query = {};
      
      // Appliquer les filtres
      if (filters.statut) query.statut = filters.statut;
      if (filters.priorite) query.priorite = filters.priorite;
      if (filters.assigneA) query.assigneA = filters.assigneA;
      if (filters.planningId) query.planningId = filters.planningId;
      
      // Recherche textuelle
      if (filters.search) {
        query.$or = [
          { titre: { $regex: filters.search, $options: 'i' } },
          { description: { $regex: filters.search, $options: 'i' } }
        ];
      }
      
      // Options de tri
      const sort = {};
      if (filters.sortBy) {
        const parts = filters.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
      }
      
      // Récupérer les tâches avec pagination et tri
      const tasks = await Task.find(query)
        .populate('assigneA', 'nom prenom email')
        .populate('creePar', 'nom prenom')
        .populate('planningId', 'titre')
        .sort(sort)
        .skip((filters.page - 1) * filters.limit)
        .limit(filters.limit);
      
      // Compter le nombre total de tâches pour la pagination
      const total = await Task.countDocuments(query);
      
      res.status(200).json({
        tasks,
        pagination: {
          total,
          page: filters.page,
          limit: filters.limit,
          pages: Math.ceil(total / filters.limit)
        }
      });
    } catch (error) {
      console.warn('Erreur lors de la récupération des tâches:', error);
      res.status(500).json({ 
        message: 'Erreur lors de la récupération des tâches', 
        error: error.message 
      });
    }
  },
  
  /**
   * Récupère une tâche par son ID
   * @route GET /api/tasks/:id
   */
  getTaskById: async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findById(taskId)
        .populate('assigneA', 'nom prenom email')
        .populate('creePar', 'nom prenom')
        .populate('planningId', 'titre dateDebut dateFin');
      
      if (!task) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
      }
      
      res.status(200).json({ task });
    } catch (error) {
      console.warn('Erreur lors de la récupération de la tâche:', error);
      res.status(500).json({ 
        message: 'Erreur lors de la récupération de la tâche', 
        error: error.message 
      });
    }
  },
  
  /**
   * Met à jour une tâche existante
   * @route PUT /api/tasks/:id
   */
  updateTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      const taskData = req.body;
      
      const task = await Task.findByIdAndUpdate(
        taskId,
        { $set: taskData },
        { new: true, runValidators: true }
      )
      .populate('assigneA', 'nom prenom email')
      .populate('creePar', 'nom prenom');
      
      if (!task) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
      }
      
      res.status(200).json({
        message: 'Tâche mise à jour avec succès',
        task
      });
    } catch (error) {
      console.warn('Erreur lors de la mise à jour de la tâche:', error);
      res.status(500).json({ 
        message: 'Erreur lors de la mise à jour de la tâche', 
        error: error.message 
      });
    }
  },
  
  /**
   * Supprime une tâche
   * @route DELETE /api/tasks/:id
   */
  deleteTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findByIdAndDelete(taskId);
      
      if (!task) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
      }
      
      res.status(200).json({
        message: 'Tâche supprimée avec succès'
      });
    } catch (error) {
      console.warn('Erreur lors de la suppression de la tâche:', error);
      res.status(500).json({ 
        message: 'Erreur lors de la suppression de la tâche', 
        error: error.message 
      });
    }
  },
  
  /**
   * Récupère les statistiques des tâches
   * @route GET /api/tasks/stats
   */
  getTasksStats: async (req, res) => {
    try {
      const stats = await Task.aggregate([
        {
          $group: {
            _id: '$statut',
            count: { $sum: 1 }
          }
        }
      ]);
      
      const priorityStats = await Task.aggregate([
        {
          $group: {
            _id: '$priorite',
            count: { $sum: 1 }
          }
        }
      ]);
      
      // Formater les résultats
      const statusCounts = {};
      stats.forEach(item => {
        statusCounts[item._id] = item.count;
      });
      
      const priorityCounts = {};
      priorityStats.forEach(item => {
        priorityCounts[item._id] = item.count;
      });
      
      res.status(200).json({
        total: await Task.countDocuments(),
        byStatus: statusCounts,
        byPriority: priorityCounts
      });
    } catch (error) {
      console.warn('Erreur lors de la récupération des statistiques:', error);
      res.status(500).json({ 
        message: 'Erreur lors de la récupération des statistiques', 
        error: error.message 
      });
    }
  }
};

module.exports = taskController; 