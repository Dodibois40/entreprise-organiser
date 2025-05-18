const Task = require('../models/Task');

// Récupérer toutes les tâches actives
exports.getAllTasks = async (req, res) => {
  try {
    const filter = { actif: true };
    
    // Filtres optionnels
    if (req.query.statut) filter.statut = req.query.statut;
    if (req.query.priorite) filter.priorite = req.query.priorite;
    if (req.query.categorie) filter.categorie = req.query.categorie;
    
    // Filtrer par utilisateur assigné ou créateur
    if (req.query.assigneA) filter.assigneA = req.query.assigneA;
    if (req.query.creeePar) filter.creeePar = req.query.creeePar;
    
    // Filtre par date
    if (req.query.dateDebut) {
      filter.dateDebut = { $gte: new Date(req.query.dateDebut) };
    }
    if (req.query.dateFin) {
      filter.dateFin = { $lte: new Date(req.query.dateFin) };
    }
    
    // Options de pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Options de tri
    const sort = {};
    if (req.query.sort) {
      const parts = req.query.sort.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    } else {
      // Tri par défaut par date de début descendante
      sort.dateDebut = -1;
    }
    
    // Exécuter la requête avec population des utilisateurs
    const tasks = await Task.find(filter)
      .populate('assigneA', 'nom prenom email')
      .populate('creeePar', 'nom prenom email')
      .sort(sort)
      .skip(skip)
      .limit(limit);
    
    // Compter le nombre total de tâches pour la pagination
    const total = await Task.countDocuments(filter);
    
    res.status(200).json({
      tasks,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une tâche par ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      actif: true
    })
    .populate('assigneA', 'nom prenom email')
    .populate('creeePar', 'nom prenom email');
    
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle tâche
exports.createTask = async (req, res) => {
  try {
    // Ajouter l'utilisateur courant comme créateur
    const taskData = {
      ...req.body,
      creeePar: req.user._id
    };
    
    const newTask = new Task(taskData);
    const savedTask = await newTask.save();
    
    // Récupérer la tâche avec les références peuplées
    const task = await Task.findById(savedTask._id)
      .populate('assigneA', 'nom prenom email')
      .populate('creeePar', 'nom prenom email');
    
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une tâche
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, actif: true },
      { $set: req.body },
      { new: true, runValidators: true }
    )
    .populate('assigneA', 'nom prenom email')
    .populate('creeePar', 'nom prenom email');
    
    if (!updatedTask) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une tâche (soft delete)
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, actif: true },
      { actif: false },
      { new: true }
    );
    
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    
    res.status(200).json({ message: 'Tâche supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 