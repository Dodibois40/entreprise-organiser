import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import authService from '../services/authService';

// Créer le contexte
const AuthContext = createContext();

// Hook personnalisé pour accéder au contexte
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        // Vérifier si un token existe
        if (authService.isAuthenticated()) {
          // Récupérer les données utilisateur stockées
          const userData = authService.getCurrentUser();
          
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            // Si pas de données utilisateur, essayer de les récupérer
            try {
              const { user: profileData } = await authService.getProfile();
              setUser(profileData);
              setIsAuthenticated(true);
            } catch (profileError) {
              console.error('Erreur lors de la récupération du profil:', profileError);
              handleLogout();
            }
          }
        }
      } catch (error) {
        console.error('Erreur d\'authentification:', error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Fonction de connexion
  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      
      setUser(response.user);
      setIsAuthenticated(true);
      
      notifications.show({
        title: 'Connexion réussie',
        message: `Bienvenue, ${response.user.prenom} ${response.user.nom}`,
        color: 'green',
      });
      
      navigate('/');
      return response;
    } catch (error) {
      const errorMessage = error.message || 'Erreur lors de la connexion';
      notifications.show({
        title: 'Erreur de connexion',
        message: errorMessage,
        color: 'red',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Fonction d'inscription
  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await authService.register(userData);
      
      setUser(response.user);
      setIsAuthenticated(true);
      
      notifications.show({
        title: 'Inscription réussie',
        message: `Bienvenue, ${response.user.prenom} ${response.user.nom}`,
        color: 'green',
      });
      
      navigate('/');
      return response;
    } catch (error) {
      const errorMessage = error.message || 'Erreur lors de l\'inscription';
      notifications.show({
        title: 'Erreur d\'inscription',
        message: errorMessage,
        color: 'red',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Fonction de déconnexion
  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    navigate('/auth/login');
  };
  
  // Fonction de mise à jour du profil
  const updateProfile = async (userData) => {
    setLoading(true);
    try {
      const response = await authService.updateProfile(userData);
      
      setUser(response.user);
      
      notifications.show({
        title: 'Profil mis à jour',
        message: 'Vos informations ont été mises à jour avec succès',
        color: 'green',
      });
      
      return response;
    } catch (error) {
      const errorMessage = error.message || 'Erreur lors de la mise à jour du profil';
      notifications.show({
        title: 'Erreur',
        message: errorMessage,
        color: 'red',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Valeurs exposées par le contexte
  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout: handleLogout,
    updateProfile
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 