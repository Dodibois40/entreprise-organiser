const Chantier = require('../models/chantierModel');

// Récupérer tous les chantiers
exports.getAllChantiers = async (req, res) => {
  try {
    const chantiers = await Chantier.find().populate('responsable', 'nom prenom email');
    res.status(200).json({
      success: true,
      count: chantiers.length,
      data: chantiers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des chantiers',
      error: error.message
    });
  }
};

// Récupérer un chantier par son ID
exports.getChantierById = async (req, res) => {
  try {
    const chantier = await Chantier.findById(req.params.id).populate('responsable', 'nom prenom email');
    
    if (!chantier) {
      return res.status(404).json({
        success: false,
        message: 'Chantier non trouvé'
      });
    }
    
    res.status(200).json({
      success: true,
      data: chantier
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du chantier',
      error: error.message
    });
  }
};

// Créer un nouveau chantier
exports.createChantier = async (req, res) => {
  try {
    // Validation des données requises
    const { nom, code, client, dateDebut, dateFin } = req.body;
    
    if (!nom || !code || !client || !dateDebut || !dateFin) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir toutes les informations requises'
      });
    }
    
    // Vérifier si le code est déjà utilisé
    const existingChantier = await Chantier.findOne({ code });
    if (existingChantier) {
      return res.status(400).json({
        success: false,
        message: 'Ce code de chantier est déjà utilisé'
      });
    }
    
    // Créer le chantier
    const chantier = await Chantier.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Chantier créé avec succès',
      data: chantier
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du chantier',
      error: error.message
    });
  }
};

// Mettre à jour un chantier
exports.updateChantier = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérifier si le chantier existe
    let chantier = await Chantier.findById(id);
    if (!chantier) {
      return res.status(404).json({
        success: false,
        message: 'Chantier non trouvé'
      });
    }
    
    // Mise à jour du chantier
    chantier = await Chantier.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      message: 'Chantier mis à jour avec succès',
      data: chantier
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du chantier',
      error: error.message
    });
  }
};

// Supprimer un chantier
exports.deleteChantier = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérifier si le chantier existe
    const chantier = await Chantier.findById(id);
    if (!chantier) {
      return res.status(404).json({
        success: false,
        message: 'Chantier non trouvé'
      });
    }
    
    // Supprimer le chantier
    await Chantier.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: 'Chantier supprimé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du chantier',
      error: error.message
    });
  }
};

// Mettre à jour les données financières du chantier (estimation ou réel)
exports.updateFinances = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, donnees } = req.body; // type peut être 'estimation' ou 'reel'
    
    if (!type || !donnees || (type !== 'estimation' && type !== 'reel')) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir un type valide (estimation ou reel) et les données financières'
      });
    }
    
    // Vérifier si le chantier existe
    let chantier = await Chantier.findById(id);
    if (!chantier) {
      return res.status(404).json({
        success: false,
        message: 'Chantier non trouvé'
      });
    }
    
    // Mettre à jour uniquement les données financières spécifiées
    const updateData = {};
    updateData[type] = donnees;
    
    chantier = await Chantier.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      message: `Données financières (${type}) mises à jour avec succès`,
      data: chantier
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour des données financières',
      error: error.message
    });
  }
};

// Obtenir les statistiques financières des chantiers
exports.getFinancialStats = async (req, res) => {
  try {
    // Statistiques globales
    const stats = await Chantier.aggregate([
      {
        $group: {
          _id: null,
          totalChantiers: { $sum: 1 },
          totalMontantEstime: { $sum: '$estimation.montantMarcheSigne' },
          totalMontantReel: { $sum: '$reel.montantMarcheSigne' },
          totalMargePrevisionnelle: { $sum: '$margePrevisionnelle' },
          totalMargeReelle: { $sum: '$margeReelle' }
        }
      }
    ]);
    
    // Statistiques par statut
    const statsByStatus = await Chantier.aggregate([
      {
        $group: {
          _id: '$statut',
          count: { $sum: 1 },
          totalMontantEstime: { $sum: '$estimation.montantMarcheSigne' },
          totalMontantReel: { $sum: '$reel.montantMarcheSigne' }
        }
      }
    ]);
    
    res.status(200).json({
      success: true,
      stats: stats[0] || {},
      statsByStatus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques financières',
      error: error.message
    });
  }
};
