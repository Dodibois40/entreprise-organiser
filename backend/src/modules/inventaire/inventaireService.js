const Inventaire = require('./inventaireModel');

/**
 * Service de gestion d'inventaire pour les stocks de matériaux
 */

// Récupérer tous les articles avec pagination et filtres
const getAllArticles = async (filters = {}, pagination = {}) => {
  try {
    const { categorie, recherche, seuilAlert } = filters;
    const { page = 1, limit = 20 } = pagination;
    
    const skip = (page - 1) * limit;
    
    // Construction du filtre
    const query = {};
    
    if (categorie) {
      query.categorie = categorie;
    }
    
    if (recherche) {
      query.$or = [
        { reference: { $regex: recherche, $options: 'i' } },
        { designation: { $regex: recherche, $options: 'i' } },
        { fournisseurPrincipal: { $regex: recherche, $options: 'i' } }
      ];
    }
    
    if (seuilAlert === 'true') {
      query.$expr = { $lte: ['$quantiteStock', '$seuilAlerte'] };
    }
    
    // Exécution de la requête avec aggregation pour plus de flexibilité
    const articles = await Inventaire.aggregate([
      { $match: query },
      { $sort: { reference: 1 } },
      { $skip: skip },
      { $limit: parseInt(limit) },
      { 
        $addFields: {
          statut: {
            $cond: {
              if: { $lte: ['$quantiteStock', '$seuilAlerte'] },
              then: 'ALERTE',
              else: 'NORMAL'
            }
          },
          valeurStock: { $multiply: ['$quantiteStock', '$prixUnitaire'] }
        }
      }
    ]);
    
    const total = await Inventaire.countDocuments(query);
    
    return {
      articles,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    throw error;
  }
};

// Récupérer un article par son ID
const getArticleById = async (id) => {
  try {
    const article = await Inventaire.findById(id);
    if (!article) {
      throw new Error('Article non trouvé');
    }
    return article;
  } catch (error) {
    throw error;
  }
};

// Créer un nouvel article
const createArticle = async (articleData) => {
  try {
    // Vérifier si la référence existe déjà
    const existingArticle = await Inventaire.findOne({ reference: articleData.reference });
    if (existingArticle) {
      throw new Error('Un article avec cette référence existe déjà');
    }
    
    const article = new Inventaire(articleData);
    await article.save();
    return article;
  } catch (error) {
    throw error;
  }
};

// Mettre à jour un article
const updateArticle = async (id, articleData) => {
  try {
    // Ajouter la date de dernière mise à jour
    articleData.dateDerniereMAJ = new Date();
    
    const article = await Inventaire.findByIdAndUpdate(
      id,
      articleData,
      { new: true, runValidators: true }
    );
    
    if (!article) {
      throw new Error('Article non trouvé');
    }
    
    return article;
  } catch (error) {
    throw error;
  }
};

// Supprimer un article
const deleteArticle = async (id) => {
  try {
    const article = await Inventaire.findByIdAndDelete(id);
    if (!article) {
      throw new Error('Article non trouvé');
    }
    return { message: 'Article supprimé avec succès' };
  } catch (error) {
    throw error;
  }
};

// Ajuster le stock (entrée ou sortie)
const ajusterStock = async (id, quantite, type, commentaire = '') => {
  try {
    const article = await Inventaire.findById(id);
    if (!article) {
      throw new Error('Article non trouvé');
    }
    
    // Calculer la nouvelle quantité
    let nouvelleQuantite;
    if (type === 'ENTREE') {
      nouvelleQuantite = article.quantiteStock + quantite;
    } else if (type === 'SORTIE') {
      if (article.quantiteStock < quantite) {
        throw new Error('Stock insuffisant pour cette sortie');
      }
      nouvelleQuantite = article.quantiteStock - quantite;
    } else {
      throw new Error('Type de mouvement invalide');
    }
    
    // Mettre à jour l'article
    const articleMaj = await Inventaire.findByIdAndUpdate(
      id,
      { 
        quantiteStock: nouvelleQuantite,
        dateDerniereMAJ: new Date(),
        ...(commentaire && { commentaire })
      },
      { new: true }
    );
    
    return articleMaj;
  } catch (error) {
    throw error;
  }
};

// Obtenir des statistiques d'inventaire
const getStatistiques = async () => {
  try {
    const stats = await Inventaire.aggregate([
      {
        $group: {
          _id: null,
          totalArticles: { $sum: 1 },
          valeurTotale: { $sum: { $multiply: ['$quantiteStock', '$prixUnitaire'] } },
          articlesEnAlerte: {
            $sum: {
              $cond: [
                { $lte: ['$quantiteStock', '$seuilAlerte'] },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalArticles: 1,
          valeurTotale: 1,
          articlesEnAlerte: 1
        }
      }
    ]);
    
    // Répartition par catégorie
    const repartitionCategories = await Inventaire.aggregate([
      {
        $group: {
          _id: '$categorie',
          nombre: { $sum: 1 },
          valeur: { $sum: { $multiply: ['$quantiteStock', '$prixUnitaire'] } }
        }
      },
      {
        $project: {
          categorie: '$_id',
          nombre: 1,
          valeur: 1,
          _id: 0
        }
      }
    ]);
    
    return {
      global: stats.length > 0 ? stats[0] : { totalArticles: 0, valeurTotale: 0, articlesEnAlerte: 0 },
      parCategorie: repartitionCategories
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  ajusterStock,
  getStatistiques
};
