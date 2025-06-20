// Catégories de fournisseurs pour l'agencement et la menuiserie
export const CATEGORIES_FOURNISSEUR = {
  QUINCAILLERIE: 'QUINCAILLERIE',
  BOIS: 'BOIS',
  VITRAGE: 'VITRAGE',
  MENUISERIE: 'MENUISERIE',
  AGENCEMENT: 'AGENCEMENT',
  FERRONNERIE: 'FERRONNERIE',
  PEINTURE: 'PEINTURE',
  ELECTRICITE: 'ELECTRICITE',
  PLOMBERIE: 'PLOMBERIE',
  ISOLATION: 'ISOLATION',
  OUTILLAGE: 'OUTILLAGE',
  AUTRE: 'AUTRE',
};

// Labels français pour l'affichage
export const CATEGORIES_LABELS = {
  [CATEGORIES_FOURNISSEUR.QUINCAILLERIE]: 'Quincaillerie',
  [CATEGORIES_FOURNISSEUR.BOIS]: 'Bois',
  [CATEGORIES_FOURNISSEUR.VITRAGE]: 'Vitrage',
  [CATEGORIES_FOURNISSEUR.MENUISERIE]: 'Menuiserie',
  [CATEGORIES_FOURNISSEUR.AGENCEMENT]: 'Agencement',
  [CATEGORIES_FOURNISSEUR.FERRONNERIE]: 'Ferronnerie',
  [CATEGORIES_FOURNISSEUR.PEINTURE]: 'Peinture',
  [CATEGORIES_FOURNISSEUR.ELECTRICITE]: 'Électricité',
  [CATEGORIES_FOURNISSEUR.PLOMBERIE]: 'Plomberie',
  [CATEGORIES_FOURNISSEUR.ISOLATION]: 'Isolation',
  [CATEGORIES_FOURNISSEUR.OUTILLAGE]: 'Outillage',
  [CATEGORIES_FOURNISSEUR.AUTRE]: 'Autre',
};

// Options pour les selects
export const CATEGORIES_OPTIONS = Object.entries(CATEGORIES_LABELS).map(([value, label]) => ({
  value,
  label,
}));

// Couleurs pour les badges par catégorie
export const CATEGORIES_COLORS = {
  [CATEGORIES_FOURNISSEUR.QUINCAILLERIE]: 'blue',
  [CATEGORIES_FOURNISSEUR.BOIS]: 'brown',
  [CATEGORIES_FOURNISSEUR.VITRAGE]: 'cyan',
  [CATEGORIES_FOURNISSEUR.MENUISERIE]: 'orange',
  [CATEGORIES_FOURNISSEUR.AGENCEMENT]: 'green',
  [CATEGORIES_FOURNISSEUR.FERRONNERIE]: 'gray',
  [CATEGORIES_FOURNISSEUR.PEINTURE]: 'pink',
  [CATEGORIES_FOURNISSEUR.ELECTRICITE]: 'yellow',
  [CATEGORIES_FOURNISSEUR.PLOMBERIE]: 'teal',
  [CATEGORIES_FOURNISSEUR.ISOLATION]: 'violet',
  [CATEGORIES_FOURNISSEUR.OUTILLAGE]: 'indigo',
  [CATEGORIES_FOURNISSEUR.AUTRE]: 'gray',
};

// Fonction utilitaire pour obtenir le label d'une catégorie
export const getCategorieLabel = (categorie) => {
  return CATEGORIES_LABELS[categorie] || categorie;
};

// Fonction utilitaire pour obtenir la couleur d'une catégorie
export const getCategorieColor = (categorie) => {
  return CATEGORIES_COLORS[categorie] || 'gray';
};

/**
 * Trouve la catégorie d'achat correspondante pour un fournisseur donné
 * @param {Object} fournisseur - Le fournisseur sélectionné
 * @param {Array} categoriesAchat - La liste des catégories d'achat disponibles
 * @returns {string|null} - L'ID de la catégorie trouvée ou null
 */
export const findCategorieAchatForFournisseur = (fournisseur, categoriesAchat) => {
  if (!fournisseur || !categoriesAchat || !Array.isArray(categoriesAchat)) {
    return null;
  }

  // Si le fournisseur n'a pas de catégorie définie
  if (!fournisseur.categorie) {
    return null;
  }

  // Recherche par correspondance exacte du nom de la catégorie
  const categorieExacte = categoriesAchat.find(cat => {
    const intituleCategorie = (cat.intitule || cat.nom || '').toUpperCase();
    const categorieFournisseur = fournisseur.categorie.toUpperCase();
    return intituleCategorie === categorieFournisseur;
  });

  if (categorieExacte) {
    return categorieExacte.id.toString();
  }

  // Recherche par correspondance partielle (contient le mot-clé)
  const categoriePartielle = categoriesAchat.find(cat => {
    const intituleCategorie = (cat.intitule || cat.nom || '').toUpperCase();
    const categorieFournisseur = fournisseur.categorie.toUpperCase();
    return intituleCategorie.includes(categorieFournisseur) || categorieFournisseur.includes(intituleCategorie);
  });

  if (categoriePartielle) {
    return categoriePartielle.id.toString();
  }

  // Mappage spécifique pour certaines catégories communes
  const mappingCategories = {
    'QUINCAILLERIE': ['QUINCAILLERIE', 'VISSERIE', 'FIXATION'],
    'BOIS': ['BOIS', 'SCIAGE', 'PLANCHES', 'PANNEAUX'],
    'VITRAGE': ['VITRAGE', 'VERRE', 'MIROITERIE'],
    'MENUISERIE': ['MENUISERIE', 'PORTES', 'FENÊTRES', 'VOLETS'],
    'AGENCEMENT': ['AGENCEMENT', 'MOBILIER', 'RANGEMENT'],
    'FERRONNERIE': ['FERRONNERIE', 'MÉTALLERIE', 'SERRURERIE'],
    'PEINTURE': ['PEINTURE', 'REVÊTEMENT', 'FINITION'],
    'ELECTRICITE': ['ELECTRICITÉ', 'ÉLECTRIQUE', 'ÉCLAIRAGE'],
    'PLOMBERIE': ['PLOMBERIE', 'SANITAIRE', 'ROBINETTERIE'],
    'ISOLATION': ['ISOLATION', 'ÉTANCHÉITÉ'],
    'OUTILLAGE': ['OUTILLAGE', 'OUTIL', 'MACHINES']
  };

  // Recherche par mapping de catégories
  for (const [categoriePrincipale, motsClefs] of Object.entries(mappingCategories)) {
    const categorieFournisseur = fournisseur.categorie.toUpperCase();
    
    if (motsClefs.some(motClef => 
      categorieFournisseur.includes(motClef) || motClef.includes(categorieFournisseur)
    )) {
      const categorieCorrespondante = categoriesAchat.find(cat => {
        const intituleCategorie = (cat.intitule || cat.nom || '').toUpperCase();
        return motsClefs.some(motClef => intituleCategorie.includes(motClef));
      });
      
      if (categorieCorrespondante) {
        return categorieCorrespondante.id.toString();
      }
    }
  }

  // Aucune correspondance trouvée
  return null;
}; 