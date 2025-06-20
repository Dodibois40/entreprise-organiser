import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  createUser, 
  updateUser, 
  getUserById,
  getRolesForSelect,
  validateUserData,
  checkEmailAvailability
} from '@/services/usersService';
import DebugHelper from '../../utils/debugHelper.js';
import { 
  User, 
  Save, 
  ArrowLeft, 
  Eye, 
  EyeOff,
  Mail,
  Phone,
  Euro,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';
import { useUsers } from '../../contexts/UsersContext';

const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const { triggerRefresh } = useUsers();

  // État du formulaire
  const [formData, setFormData] = useState({
    email: '',
    nom: '',
    prenom: '',
    password: '',
    confirmPassword: '',
    role: '',
    tarifHoraireBase: '',
    telephone: '',
    dateEmbauche: '',
    actif: true
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditing);
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailCheckTimeout, setEmailCheckTimeout] = useState(null);

  // Charger les données de l'utilisateur si édition
  useEffect(() => {
    if (isEditing) {
      loadUserData();
    }
  }, [id, isEditing]);

  // Nettoyer le timeout quand le composant se démonte
  useEffect(() => {
    return () => {
      if (emailCheckTimeout) {
        clearTimeout(emailCheckTimeout);
      }
    };
  }, [emailCheckTimeout]);

  const loadUserData = async () => {
    try {
      setIsLoadingData(true);
      const userData = await getUserById(id);
      
      setFormData({
        email: userData.email,
        nom: userData.nom,
        prenom: userData.prenom,
        password: '',
        confirmPassword: '',
        role: userData.role,
        tarifHoraireBase: userData.tarifHoraireBase ? userData.tarifHoraireBase.toString() : '',
        telephone: userData.telephone || '',
        dateEmbauche: userData.dateEmbauche ? new Date(userData.dateEmbauche).toISOString().split('T')[0] : '',
        actif: userData.actif
      });
    } catch (error) {
      toast.error("Erreur lors du chargement des données de l'utilisateur");
      navigate('/users');
    } finally {
      setIsLoadingData(false);
    }
  };

  // Vérifier la disponibilité de l'email avec debounce
  const checkEmailWithDebounce = async (email) => {
    if (!email || !email.includes('@')) return;
    
    setIsCheckingEmail(true);
    try {
      const isAvailable = await checkEmailAvailability(email, isEditing ? id : null);
      if (!isAvailable) {
        setErrors(prev => ({ ...prev, email: 'Cet email est déjà utilisé' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'email:', error);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  // Gérer les changements de champs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Vérification d'email en temps réel avec debounce
    if (name === 'email') {
      if (emailCheckTimeout) {
        clearTimeout(emailCheckTimeout);
      }
      
      const newTimeout = setTimeout(() => {
        checkEmailWithDebounce(value);
      }, 1000); // Attendre 1 seconde après la dernière frappe
      
      setEmailCheckTimeout(newTimeout);
    }
  };

  // Valider le formulaire
  const validateForm = () => {
    const validation = validateUserData(formData);
    let formErrors = { ...validation.errors };

    // Validation spécifique au formulaire
    if (!isEditing && !formData.password) {
      formErrors.password = 'Le mot de passe est obligatoire';
    }

    if (formData.password && formData.password.length < 6) {
      formErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (formData.tarifHoraireBase && isNaN(parseFloat(formData.tarifHoraireBase))) {
      formErrors.tarifHoraireBase = 'Le tarif horaire doit être un nombre';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    // Vérifier s'il y a des erreurs d'email
    if (errors.email) {
      toast.error('Veuillez corriger l\'erreur avec l\'email');
      return;
    }

    // Empêcher la soumission si l'email est en cours de vérification
    if (isCheckingEmail) {
      toast.error('Vérification de l\'email en cours, veuillez patienter...');
      return;
    }

    setIsLoading(true);
    try {
      const userData = {
        email: formData.email,
        nom: formData.nom,
        prenom: formData.prenom,
        role: formData.role,
        tarifHoraireBase: parseFloat(formData.tarifHoraireBase) || 0,
        telephone: formData.telephone || null,
        dateEmbauche: formData.dateEmbauche ? new Date(formData.dateEmbauche).toISOString() : null,
        actif: formData.actif
      };

      if (!isEditing) {
        userData.password = formData.password;
      } else if (formData.password) {
        userData.password = formData.password;
      }

      let result;
      if (isEditing) {
        result = await updateUser(id, userData);
        toast.success('Utilisateur modifié avec succès');
      } else {
        result = await createUser(userData);
        toast.success('Utilisateur créé avec succès');
      }

      // Déclencher le refresh via le contexte
      console.log('🔄 Déclenchement refresh utilisateurs:', isEditing ? 'update' : 'create');
      triggerRefresh(isEditing ? 'update' : 'create', result);
      
      navigate('/users');
    } catch (error) {
      // Debug détaillé de l'erreur
      DebugHelper.logError(
        isEditing ? 'Modification utilisateur' : 'Création utilisateur',
        error,
        { formData, isEditing, userId: id }
      );
      
      // Gestion spécifique des erreurs
      if (error.response?.status === 409) {
        toast.error('Cet email est déjà utilisé par un autre utilisateur');
        setErrors(prev => ({ ...prev, email: 'Cet email est déjà utilisé' }));
      } else if (error.response?.status === 400) {
        toast.error('Données invalides. Vérifiez vos informations.');
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(isEditing ? 'Erreur lors de la modification' : 'Erreur lors de la création');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const rolesOptions = getRolesForSelect();

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* En-tête */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => navigate('/users')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-blue-500" />
            <h1 className="text-2xl font-bold">
              {isEditing ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
            </h1>
          </div>
        </div>
        <p className="text-gray-600">
          {isEditing 
            ? 'Modifiez les informations de l\'utilisateur'
            : 'Créez un nouvel utilisateur avec ses rôles et tarifs'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations personnelles */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Informations personnelles
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.prenom ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Jean"
              />
              {errors.prenom && (
                <p className="text-red-600 text-sm mt-1">{errors.prenom}</p>
              )}
            </div>

            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                Nom *
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.nom ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Martin"
              />
              {errors.nom && (
                <p className="text-red-600 text-sm mt-1">{errors.nom}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="jean.martin@entreprise.fr"
                />
                {isCheckingEmail && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
              {!errors.email && !isCheckingEmail && formData.email && formData.email.includes('@') && (
                <p className="text-green-600 text-sm mt-1">✓ Email disponible</p>
              )}
            </div>

            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.telephone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="06.12.34.56.78"
                />
              </div>
              {errors.telephone && (
                <p className="text-red-600 text-sm mt-1">{errors.telephone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Authentification */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Authentification
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {isEditing ? 'Nouveau mot de passe (optionnel)' : 'Mot de passe *'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pr-10 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
        </div>

        {/* Rôle et tarification */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Rôle et tarification
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Rôle dans l'entreprise *
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.role ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Sélectionner un rôle</option>
                {rolesOptions.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-red-600 text-sm mt-1">{errors.role}</p>
              )}
              {formData.role && (
                <p className="text-gray-500 text-sm mt-1">
                  {rolesOptions.find(r => r.value === formData.role)?.description}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="tarifHoraireBase" className="block text-sm font-medium text-gray-700 mb-2">
                Tarif horaire de base
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Euro className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="tarifHoraireBase"
                  name="tarifHoraireBase"
                  value={formData.tarifHoraireBase}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.tarifHoraireBase ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="25.50"
                />
              </div>
              {errors.tarifHoraireBase && (
                <p className="text-red-600 text-sm mt-1">{errors.tarifHoraireBase}</p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                Tarif utilisé pour le calcul des coûts de main d'œuvre
              </p>
            </div>
          </div>
        </div>

        {/* Informations complémentaires */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Informations complémentaires
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="dateEmbauche" className="block text-sm font-medium text-gray-700 mb-2">
                Date d'embauche
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="dateEmbauche"
                  name="dateEmbauche"
                  value={formData.dateEmbauche}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="actif"
                    checked={formData.actif}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Utilisateur actif
                  </span>
                </label>
                <p className="text-gray-500 text-sm mt-1">
                  Les utilisateurs inactifs ne peuvent pas se connecter
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/users')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {isEditing ? 'Modification...' : 'Création...'}
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? 'Modifier' : 'Créer'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm; 