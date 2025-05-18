const Task = require('./taskModel');

/**
 * Service de gestion des tâches
 */
const taskService = {
  /**
   * Crée une nouvelle tâche
   * @param {Object} taskData - Données de la tâche
   * @returns {Object} - Nouvelle tâche créée
   */
  createTask: async (taskData) => {
    const task = new Task(taskData);
    await task.save();
    return task;
  },
  
  /**
   * Récupère toutes les tâches avec des options de filtrage
   * @param {Object} filters - Filtres à appliquer
   * @returns {Array} - Liste des tâches
   */
  getAllTasks: async (filters = {}) => {
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
    
    // Options de pagination
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Options de tri
    const sort = {};
    if (filters.sortBy) {
      const parts = filters.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    } else {
      // Tri par défaut par date de création, plus récent en premier
      sort.createdAt = -1;
    }
    
    // Récupérer les tâches avec pagination et tri
    const tasks = await Task.find(query)
      .populate('assigneA', 'nom prenom email')
      .populate('creePar', 'nom prenom')
      .sort(sort)
      .skip(skip)
      .limit(limit);
    
    // Compter le nombre total de tâches pour la pagination
    const total = await Task.countDocuments(query);
    
    return {
      tasks,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  },
  
  /**
   * Récupère une tâche par son ID
   * @param {String} taskId - ID de la tâche
   * @returns {Object} - Tâche trouvée
   */
  getTaskById: async (taskId) => {
    const task = await Task.findById(taskId)
      .populate('assigneA', 'nom prenom email poste')
      .populate('creePar', 'nom prenom')
      .populate('planningId', 'titre dateDebut dateFin');
    
    if (!task) {
      throw new Error('Tâche non trouvée');
    }
    
    return task;
  },
  
  /**
   * Met à jour une tâche existante
   * @param {String} taskId - ID de la tâche
   * @param {Object} taskData - Données à mettre à jour
   * @returns {Object} - Tâche mise à jour
   */
  updateTask: async (taskId, taskData) => {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { $set: taskData },
      { new: true, runValidators: true }
    ).populate('assigneA', 'nom prenom email');
    
    if (!task) {
      throw new Error('Tâche non trouvée');
    }
    
    return task;
  },
  
  /**
   * Supprime une tâche
   * @param {String} taskId - ID de la tâche
   * @returns {Boolean} - true si la suppression est réussie
   */
  deleteTask: async (taskId) => {
    const task = await Task.findByIdAndDelete(taskId);
    
    if (!task) {
      throw new Error('Tâche non trouvée');
    }
    
    return true;
  },
  
  /**
   * Récupère les statistiques des tâches
   * @returns {Object} - Statistiques
   */
  getTasksStats: async () => {
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
    
    return {
      total: await Task.countDocuments(),
      byStatus: statusCounts,
      byPriority: priorityCounts
    };
  }
};

module.exports = taskService; 