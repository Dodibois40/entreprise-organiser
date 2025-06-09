const inventaireService = require('./inventaireService');

/**
 * Contrôleur pour la gestion de l'inventaire des stocks
 */

// Récupérer tous les articles avec pagination et filtres
exports.getAllArticles = async (req, res) => {
  try {
    const { page, limit, categorie, recherche, seuilAlert } = req.query;
    
    const filters = { categorie, recherche, seuilAlert };
    const pagination = { page, limit };
    
    const result = await inventaireService.getAllArticles(filters, pagination);
    
    return res.status(200).json(result);
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Récupérer un article par son ID
exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await inventaireService.getArticleById(id);
    
    return res.status(200).json(article);
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'article ${req.params.id}:`, error);
    
    if (error.message === 'Article non trouvé') {
      return res.status(404).json({ message: error.message });
    }
    
    return res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Créer un nouvel article
exports.createArticle = async (req, res) => {
  try {
    const articleData = req.body;
    const article = await inventaireService.createArticle(articleData);
    
    return res.status(201).json(article);
  } catch (error) {
    console.error('Erreur lors de la création d\'un article:', error);
    
    if (error.message.includes('référence existe déjà')) {
      return res.status(400).json({ message: error.message });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Données invalides', error: error.message });
    }
    
    return res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Mettre à jour un article
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const articleData = req.body;
    
    const article = await inventaireService.updateArticle(id, articleData);
    
    return res.status(200).json(article);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'article ${req.params.id}:`, error);
    
    if (error.message === 'Article non trouvé') {
      return res.status(404).json({ message: error.message });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Données invalides', error: error.message });
    }
    
    return res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Supprimer un article
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await inventaireService.deleteArticle(id);
    
    return res.status(200).json(result);
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'article ${req.params.id}:`, error);
    
    if (error.message === 'Article non trouvé') {
      return res.status(404).json({ message: error.message });
    }
    
    return res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Ajuster le stock (entrée ou sortie)
exports.ajusterStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantite, type, commentaire } = req.body;
    
    if (!quantite || !type || quantite <= 0) {
      return res.status(400).json({ 
        message: 'Veuillez fournir une quantité positive et un type de mouvement' 
      });
    }
    
    const article = await inventaireService.ajusterStock(id, quantite, type, commentaire);
    
    return res.status(200).json(article);
  } catch (error) {
    console.error(`Erreur lors de l'ajustement du stock de l'article ${req.params.id}:`, error);
    
    if (error.message === 'Article non trouvé') {
      return res.status(404).json({ message: error.message });
    }
    
    if (error.message === 'Stock insuffisant pour cette sortie' || 
        error.message === 'Type de mouvement invalide') {
      return res.status(400).json({ message: error.message });
    }
    
    return res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Obtenir des statistiques d'inventaire
exports.getStatistiques = async (req, res) => {
  try {
    const stats = await inventaireService.getStatistiques();
    
    return res.status(200).json(stats);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques d\'inventaire:', error);
    return res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
