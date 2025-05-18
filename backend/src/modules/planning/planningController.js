const Planning = require('./planningModel');

/**
 * Contrôleur pour la gestion des plannings
 */
const planningController = {
  /**
   * Récupère tous les plannings
   */
  getAllPlannings: async (req, res) => {
    try {
      const plannings = await Planning.find({})
        .sort({ dateDebut: -1 });
      
      res.status(200).json({ plannings });
    } catch (error) {
      console.warn('Erreur lors de la récupération des plannings:', error);
      res.status(500).json({
        message: 'Erreur lors de la récupération des plannings',
        error: error.message
      });
    }
  },

  /**
   * Récupère un planning par son ID
   */
  getPlanningById: async (req, res) => {
    try {
      const planning = await Planning.findById(req.params.id);
      
      if (!planning) {
        return res.status(404).json({ message: 'Planning non trouvé' });
      }
      
      res.status(200).json({ planning });
    } catch (error) {
      console.warn('Erreur lors de la récupération du planning:', error);
      res.status(500).json({
        message: 'Erreur lors de la récupération du planning',
        error: error.message
      });
    }
  },

  /**
   * Crée un nouveau planning
   */
  createPlanning: async (req, res) => {
    try {
      console.log("Création d'un planning avec les données:", JSON.stringify(req.body, null, 2));
      
      // Création d'un nouvel objet planning à partir des données reçues
      const planningData = {
        titre: req.body.titre || "Planning sans titre",
        description: req.body.description,
        statut: req.body.statut || "En attente",
        priorite: req.body.priorite || "Normale",
        lieu: req.body.lieu,
        notes: req.body.notes,
        participants: req.body.participants || [],
        responsable: req.body.responsable
      };
      
      // Gestion des dates
      try {
        if (req.body.dateDebut) {
          planningData.dateDebut = new Date(req.body.dateDebut);
        } else {
          planningData.dateDebut = new Date(); // Date actuelle si non fournie
        }
        
        if (req.body.dateFin) {
          planningData.dateFin = new Date(req.body.dateFin);
        }
      } catch (err) {
        console.error("Erreur lors de la conversion des dates:", err);
        planningData.dateDebut = new Date(); // Utiliser la date actuelle en cas d'erreur
      }
      
      console.log("Données formatées du planning:", planningData);
      
      // Création et sauvegarde du planning
      const planning = new Planning(planningData);
      
      const savedPlanning = await planning.save();
      console.log("Planning sauvegardé avec succès, ID:", savedPlanning._id);
      
      res.status(201).json({
        message: 'Planning créé avec succès',
        planning: savedPlanning
      });
    } catch (error) {
      console.error('Erreur lors de la création du planning:', error);
      res.status(500).json({
        message: 'Erreur lors de la création du planning',
        error: error.message
      });
    }
  },

  /**
   * Met à jour un planning existant
   */
  updatePlanning: async (req, res) => {
    try {
      const updatedPlanning = await Planning.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: false }
      );
      
      if (!updatedPlanning) {
        return res.status(404).json({ message: 'Planning non trouvé' });
      }
      
      res.status(200).json({
        message: 'Planning mis à jour avec succès',
        planning: updatedPlanning
      });
    } catch (error) {
      console.warn('Erreur lors de la mise à jour du planning:', error);
      res.status(500).json({
        message: 'Erreur lors de la mise à jour du planning',
        error: error.message
      });
    }
  },

  /**
   * Supprime un planning
   */
  deletePlanning: async (req, res) => {
    try {
      const deletedPlanning = await Planning.findByIdAndDelete(req.params.id);
      
      if (!deletedPlanning) {
        return res.status(404).json({ message: 'Planning non trouvé' });
      }
      
      res.status(200).json({
        message: 'Planning supprimé avec succès'
      });
    } catch (error) {
      console.warn('Erreur lors de la suppression du planning:', error);
      res.status(500).json({
        message: 'Erreur lors de la suppression du planning',
        error: error.message
      });
    }
  }
};

module.exports = planningController;
