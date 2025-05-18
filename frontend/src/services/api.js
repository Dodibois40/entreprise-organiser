import axios from 'axios';
import { notifications } from '@mantine/notifications';

// Définir l'URL de base de l'API
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Cache simple pour les requêtes GET
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout de 10 secondes
});

// Fonction pour gérer le cache
const getCachedData = (url) => {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (url, data) => {
  cache.set(url, {
    data,
    timestamp: Date.now(),
  });
};

// Ajouter l'intercepteur pour les requêtes
API.interceptors.request.use(
  (config) => {
    // Ajouter le token d'authentification si disponible
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Vérifier le cache pour les requêtes GET
    if (config.method === 'get') {
      const cachedData = getCachedData(config.url);
      if (cachedData) {
        return Promise.reject({
          __CACHE_HIT__: true,
          data: cachedData,
        });
      }
    }
    
    return config;
  },
  (error) => {
    console.error('Erreur de requête API:', error);
    return Promise.reject(error);
  }
);

// Ajouter l'intercepteur pour les réponses
API.interceptors.response.use(
  (response) => {
    // Mettre en cache les réponses GET
    if (response.config.method === 'get') {
      setCachedData(response.config.url, response.data);
    }
    return response;
  },
  (error) => {
    // Gérer les hits de cache
    if (error.__CACHE_HIT__) {
      return Promise.resolve({ data: error.data });
    }

    // Gérer les erreurs de timeout
    if (error.code === 'ECONNABORTED') {
      notifications.show({
        title: 'Erreur de connexion',
        message: 'La requête a pris trop de temps. Veuillez réessayer.',
        color: 'red',
      });
    }

    // Gérer les erreurs de réseau
    if (!error.response) {
      notifications.show({
        title: 'Erreur de connexion',
        message: 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.',
        color: 'red',
      });
    }

    return Promise.reject(error);
  }
);

// Fonction pour vider le cache
export const clearCache = () => {
  cache.clear();
};

// Fonction pour vider le cache d'une URL spécifique
export const clearCacheForUrl = (url) => {
  cache.delete(url);
};

export default API; 