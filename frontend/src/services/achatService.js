import api from './api';

/**
 * Service pour la gestion des bons de commande (BDC)
 */

// Récupérer tous les bons de commande avec pagination et filtres
export const getBdcs = async (params = {}) => {
  try {
    const { data } = await api.get('/bdc', { params });
    return data;
  } catch (error) {
    throw error;
  }
};

// Récupérer un bon de commande par son ID
export const getBdc = async (id) => {
  try {
    const { data } = await api.get(`/bdc/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// Créer un nouveau bon de commande
export const createBdc = async (bdcData) => {
  try {
    const { data } = await api.post('/bdc', bdcData);
    return data;
  } catch (error) {
    throw error;
  }
};

// Mettre à jour un bon de commande
export const updateBdc = async (id, bdcData) => {
  try {
    const { data } = await api.patch(`/bdc/${id}`, bdcData);
    return data;
  } catch (error) {
    throw error;
  }
};

// Supprimer un bon de commande
export const deleteBdc = async (id) => {
  try {
    const { data } = await api.delete(`/bdc/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// Réceptionner un bon de commande
export const receptionnerBdc = async (id, dateReception) => {
  try {
    const { data } = await api.patch(`/bdc/${id}/receptionner`, { dateReception });
    return data;
  } catch (error) {
    throw error;
  }
};

// Obtenir les statistiques d'achat par affaire
export const getStatsByAffaire = async (affaireId) => {
  try {
    const { data } = await api.get(`/bdc/affaire/${affaireId}/stats`);
    return data;
  } catch (error) {
    throw error;
  }
};

// Récupérer les catégories d'achat
export const getCategoriesAchat = async () => {
  try {
    const { data } = await api.get('/categories-achat');
    return data;
  } catch (error) {
    throw error;
  }
};

// Récupérer les affaires (utilisé pour les sélecteurs de BDC)
export const getAffaires = async () => {
  try {
    const { data } = await api.get('/affaires');
    return data;
  } catch (error) {
    throw error;
  }
};
