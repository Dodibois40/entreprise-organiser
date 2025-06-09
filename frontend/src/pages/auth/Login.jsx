import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  IconMail, 
  IconLock, 
  IconEye, 
  IconEyeOff, 
  IconLogin,
  IconBuildingFactory,
  IconDeviceDesktop,
  IconMoon,
  IconSun
} from '@tabler/icons-react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/card';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      await login(formData.email, formData.password);
      toast.success('Connexion réussie !', {
        description: 'Bienvenue dans votre espace CRM'
      });
      navigate('/');
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast.error('Erreur de connexion', {
        description: error.message || 'Vérifiez vos identifiants et réessayez'
      });
    } finally {
      setLoading(false);
    }
  };

  const demoCredentials = [
    { role: 'Admin Système', email: 'admin@entreprise.fr', password: 'admin123' },
    { role: 'Chef d\'atelier', email: 'chef@entreprise.fr', password: 'chef123' },
    { role: 'Employé', email: 'employe@entreprise.fr', password: 'employe123' }
  ];

  const fillDemoCredentials = (email, password) => {
    setFormData(prev => ({ ...prev, email, password }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse-custom"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse-custom delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse-custom delay-500"></div>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 z-10"
        title={isDark ? 'Mode clair' : 'Mode sombre'}
      >
        {isDark ? (
          <IconSun className="w-5 h-5 text-yellow-400" />
        ) : (
          <IconMoon className="w-5 h-5 text-blue-600" />
        )}
      </button>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left space-y-8">
          <div className="flex items-center justify-center lg:justify-start space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">
              <IconBuildingFactory className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold gradient-text">Entreprise</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">Organiser CRM</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              Gérez votre entreprise
              <br />
              <span className="gradient-text">en toute simplicité</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Une solution CRM moderne pour optimiser vos opérations, 
              suivre vos projets et améliorer votre productivité.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Projets gérés</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card variant="glass" className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Connexion
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Accédez à votre espace de travail
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IconMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`modern-input pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="votre@email.com"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IconLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`modern-input pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <IconEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <IconEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    Se souvenir de moi
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                icon={IconLogin}
              >
                Se connecter
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-4">
                Comptes de démonstration :
              </p>
              <div className="space-y-2">
                {demoCredentials.map((cred, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => fillDemoCredentials(cred.email, cred.password)}
                    className="w-full text-left p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">{cred.role}</div>
                    <div className="text-gray-500 dark:text-gray-400">{cred.email}</div>
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Nouveau sur la plateforme ?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 