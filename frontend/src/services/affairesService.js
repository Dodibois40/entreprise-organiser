import api from './api';

const AFFAIRES_ENDPOINT = '/affaires';

// Service pour la gestion des affaires
const affairesService = {
  // Obtenir toutes les affaires avec filtres et pagination
  async getAffaires(params = {}) {
    try {
      const response = await api.get(AFFAIRES_ENDPOINT, { params });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des affaires:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des affaires');
    }
  },

  // Obtenir une affaire par ID
  async getAffaire(id) {
    try {
      const response = await api.get(`${AFFAIRES_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'affaire:', error);
      throw new Error(error.response?.data?.message || 'Affaire non trouvée');
    }
  },

  // Créer une nouvelle affaire
  async createAffaire(affaireData) {
    try {
      const response = await api.post(AFFAIRES_ENDPOINT, affaireData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'affaire:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la création de l\'affaire');
    }
  },

  // Mettre à jour une affaire
  async updateAffaire(id, affaireData) {
    try {
      const response = await api.patch(`${AFFAIRES_ENDPOINT}/${id}`, affaireData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'affaire:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour de l\'affaire');
    }
  },

  // Supprimer une affaire
  async deleteAffaire(id) {
    try {
      await api.delete(`${AFFAIRES_ENDPOINT}/${id}`);
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'affaire:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la suppression de l\'affaire');
    }
  },

  // Obtenir les statistiques globales
  async getGlobalStats() {
    try {
      const response = await api.get(`${AFFAIRES_ENDPOINT}/stats`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des statistiques');
    }
  },

  // Obtenir les affaires par statut
  async getAffairesByStatus(statut) {
    try {
      const response = await api.get(AFFAIRES_ENDPOINT, {
        params: { statut }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des affaires par statut:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des affaires');
    }
  },

  // Obtenir les affaires en retard
  async getAffairesEnRetard() {
    try {
      const today = new Date();
      const response = await api.get(AFFAIRES_ENDPOINT, {
        params: {
          dateCloturePrevue_lt: today.toISOString(),
          statut_ne: 'TERMINE'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des affaires en retard:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des affaires en retard');
    }
  },

  // Obtenir le chiffre d'affaires par période
  async getChiffreAffaires(dateDebut, dateFin) {
    try {
      const response = await api.get(`${AFFAIRES_ENDPOINT}/chiffre-affaires`, {
        params: { dateDebut, dateFin }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du chiffre d\'affaires:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération du chiffre d\'affaires');
    }
  },

  // Clôturer une affaire
  async cloturerAffaire(id, donneesCloture = {}) {
    try {
      const response = await api.patch(`${AFFAIRES_ENDPOINT}/${id}/cloturer`, donneesCloture);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la clôture de l\'affaire:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la clôture de l\'affaire');
    }
  },

  // Obtenir les affaires du client
  async getAffairesClient(client) {
    try {
      const response = await api.get(AFFAIRES_ENDPOINT, {
        params: { client }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des affaires du client:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des affaires du client');
    }
  },

  // Rechercher des affaires
  async searchAffaires(query) {
    try {
      const response = await api.get(`${AFFAIRES_ENDPOINT}/search`, {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la recherche d\'affaires:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la recherche d\'affaires');
    }
  },

  // Obtenir les dernières affaires modifiées
  async getAffairesRecentes(limite = 10) {
    try {
      const response = await api.get(AFFAIRES_ENDPOINT, {
        params: {
          limit: limite,
          sort: 'dateModification',
          order: 'desc'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des affaires récentes:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des affaires récentes');
    }
  },

  // Fonctions utilitaires
  formatStatut(statut) {
    const statuts = {
      'EN_ATTENTE': 'En attente',
      'EN_COURS': 'En cours',
      'SUSPENDU': 'Suspendu',
      'TERMINE': 'Terminé',
      'ANNULE': 'Annulé'
    };
    return statuts[statut] || statut;
  },

  getStatutColor(statut) {
    const colors = {
      'EN_ATTENTE': 'yellow',
      'EN_COURS': 'blue',
      'SUSPENDU': 'orange',
      'TERMINE': 'green',
      'ANNULE': 'red'
    };
    return colors[statut] || 'gray';
  },

  formatMontant(montant) {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(montant || 0);
  },

  formatDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR');
  },

  // Calculer le pourcentage d'avancement à partir d'un statut
  calculerProgression(statut) {
    switch (statut) {
      case 'EN_ATTENTE':
        return 25;
      case 'EN_COURS':
        return 50; // Peut être affiné avec plus de logique métier
      case 'SUSPENDU':
        return 75;
      case 'TERMINE':
        return 100;
      case 'ANNULE':
        return 0;
      default:
        return 0;
    }
  }
};

export default affairesService; 