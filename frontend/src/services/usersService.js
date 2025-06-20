import API from './api';

const API_BASE_URL = 'http://localhost:3001/api';

// Configuration des rôles avec leurs labels français
export const ROLES_CONFIG = {
  ADMIN_SYS: {
    label: 'Administrateur Système',
    description: 'Accès total, gestion des paramètres',
    color: 'red'
  },
  DIRIGEANT: {
    label: 'Dirigeant',
    description: 'Direction de l\'entreprise, accès complet',
    color: 'purple'
  },
  CHARGE_AFFAIRE: {
    label: 'Chargé d\'Affaire',
    description: 'Crée/édite les affaires, valide les BDC, consulte reporting',
    color: 'blue'
  },
  CHEF_CHANTIER: {
    label: 'Chef de Chantier',
    description: 'Supervision des chantiers, validation pointages chantier',
    color: 'orange'
  },
  CHEF_ATELIER: {
    label: 'Chef d\'Atelier',
    description: 'Supervision atelier, validation pointages atelier',
    color: 'green'
  },
  ACHETEUR: {
    label: 'Acheteur',
    description: 'Crée/édite BDC, voit les coûts, pas la marge',
    color: 'indigo'
  },
  OUVRIER_CHANTIER: {
    label: 'Ouvrier Chantier',
    description: 'Travail sur chantier, saisie pointages',
    color: 'yellow'
  },
  OUVRIER_ATELIER: {
    label: 'Ouvrier Atelier',
    description: 'Travail en atelier, saisie pointages',
    color: 'teal'
  },
  SOUS_TRAITANT: {
    label: 'Sous-Traitant',
    description: 'Intervenant externe, saisie pointages',
    color: 'gray'
  },
  CONSULTATION: {
    label: 'Consultation',
    description: 'Lecture seule reporting',
    color: 'slate'
  }
};

// Récupérer la liste des utilisateurs avec filtres et pagination
export const getUsers = async (params = {}) => {
  try {
    const { data } = await API.get('/users', { params });
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    throw error;
  }
};

// Récupérer un utilisateur par ID
export const getUserById = async (id) => {
  try {
    const { data } = await API.get(`/users/${id}`);
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    throw error;
  }
};

// Créer un nouvel utilisateur
export const createUser = async (userData) => {
  try {
    const { data } = await API.post('/users', userData);
    return data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    throw error;
  }
};

// Mettre à jour un utilisateur
export const updateUser = async (id, userData) => {
  try {
    const { data } = await API.put(`/users/${id}`, userData);
    return data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    throw error;
  }
};

// Supprimer (désactiver) un utilisateur
export const deleteUser = async (id) => {
  try {
    const { data } = await API.delete(`/users/${id}`);
    return data;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    throw error;
  }
};

// Réactiver un utilisateur
export const reactivateUser = async (id) => {
  try {
    const { data } = await API.patch(`/users/${id}/reactivate`);
    return data;
  } catch (error) {
    console.error('Erreur lors de la réactivation de l\'utilisateur:', error);
    throw error;
  }
};

// Changer le mot de passe d'un utilisateur
export const changeUserPassword = async (id, passwordData) => {
  try {
    const { data } = await API.patch(`/users/${id}/password`, passwordData);
    return data;
  } catch (error) {
    console.error('Erreur lors du changement de mot de passe:', error);
    throw error;
  }
};

// Obtenir les statistiques des utilisateurs
export const getUsersStats = async () => {
  try {
    const { data } = await API.get('/users/stats');
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw error;
  }
};

// Obtenir les utilisateurs par rôle
export const getUsersByRole = async (role) => {
  try {
    const { data } = await API.get(`/users/by-role/${role}`);
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs par rôle:', error);
    throw error;
  }
};

// Vérifier si un email est disponible
export const checkEmailAvailability = async (email, excludeUserId = null) => {
  try {
    const { data } = await getUsers({ search: email });
    const existingUser = data.users?.find(user => 
      user.email.toLowerCase() === email.toLowerCase() && 
      (!excludeUserId || user.id !== excludeUserId)
    );
    return !existingUser; // Retourne true si l'email est disponible
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'email:', error);
    return true; // En cas d'erreur, on laisse passer la validation
  }
};

// Fonctions utilitaires
export const getRoleLabel = (role) => {
  return ROLES_CONFIG[role]?.label || role;
};

export const getRoleColor = (role) => {
  return ROLES_CONFIG[role]?.color || 'gray';
};

export const getRoleDescription = (role) => {
  return ROLES_CONFIG[role]?.description || '';
};

export const getRolesForSelect = () => {
  return Object.entries(ROLES_CONFIG).map(([value, config]) => ({
    value,
    label: config.label,
    description: config.description
  }));
};

// Validation des données utilisateur
export const validateUserData = (userData) => {
  const errors = {};

  if (!userData.nom?.trim()) {
    errors.nom = 'Le nom est obligatoire';
  }

  if (!userData.prenom?.trim()) {
    errors.prenom = 'Le prénom est obligatoire';
  }

  if (!userData.email?.trim()) {
    errors.email = 'L\'email est obligatoire';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
    errors.email = 'Format d\'email invalide';
  }

  if (!userData.role) {
    errors.role = 'Le rôle est obligatoire';
  }

  if (userData.tarifHoraireBase !== undefined && userData.tarifHoraireBase < 0) {
    errors.tarifHoraireBase = 'Le tarif horaire ne peut pas être négatif';
  }

  if (userData.telephone && !/^[0-9\s\-\+\(\)]+$/.test(userData.telephone)) {
    errors.telephone = 'Format de téléphone invalide';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  reactivateUser,
  changeUserPassword,
  getUsersStats,
  getUsersByRole,
  checkEmailAvailability,
  getRoleLabel,
  getRoleColor,
  getRoleDescription,
  getRolesForSelect,
  validateUserData,
  ROLES_CONFIG
}; 