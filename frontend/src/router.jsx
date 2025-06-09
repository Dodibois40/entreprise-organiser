import { Navigate, Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import PlanningList from './pages/planning/PlanningList';
import PlanningForm from './pages/planning/PlanningForm';
import TaskList from './pages/task/TaskList';
import TaskForm from './pages/task/TaskForm';
import UserList from './pages/user/UserList';
import UserForm from './pages/user/UserForm';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/auth/Profile';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import AuthLayout from './components/AuthLayout';
import Chantiers from './pages/Chantiers';
import Achats from './pages/Achats';
import BdcList from './pages/achat/BdcList';
import BdcForm from './pages/achat/BdcForm';
import BdcDetails from './pages/achat/BdcDetails';
import PointageCalendarView from './pages/pointage/PointageCalendarView';
import PointageForm from './pages/pointage/PointageForm';
import PointageValidation from './pages/pointage/PointageValidation';
import PointageStats from './pages/pointage/PointageStats';
import InventaireList from './pages/inventaire/InventaireList';
import InventaireStats from './pages/inventaire/InventaireStats';
import ParametresList from './pages/parametres/ParametresList';
import ParametreForm from './pages/parametres/ParametreForm';
import ArticlesList from './pages/articles/ArticlesList';
import ArticleForm from './pages/articles/ArticleForm';
import ArticleDetails from './pages/articles/ArticleDetails';
import AnalysesAvancees from './pages/reporting/AnalysesAvancees';
import Migration from './pages/Migration';
import Notifications from './pages/Notifications';
import Pointages from './pages/Pointages';
import AffairesList from './pages/affaires/AffairesList';
import AffaireForm from './pages/affaires/AffaireForm';
import AffaireDetails from './pages/affaires/AffaireDetails';
import Planification from './pages/Planification';
import Ressources from './pages/Ressources';
import TempsPasse from './pages/TempsPasse';

// Composant pour protéger les routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Pendant la vérification de l'authentification, afficher un indicateur de chargement
  if (loading) {
    return <div>Chargement...</div>;
  }
  
  // Si non authentifié, rediriger vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }
  
  // Si authentifié, afficher le contenu
  return children;
};

// Composant pour les routes publiques
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  // Si déjà authentifié, rediriger vers la page d'accueil
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return children;
};

// Définition du routeur avec les routes
const Router = () => {
  return (
    <Routes>
      {/* Routes d'authentification */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="forgot-password" element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        } />
        <Route path="reset-password/:token" element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        } />
        <Route path="verify-email/:token" element={<VerifyEmail />} />
      </Route>
      
      {/* Routes protégées */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        
        {/* Routes de planning */}
        <Route path="plannings">
          <Route index element={<PlanningList />} />
          <Route path="nouveau" element={<PlanningForm />} />
          <Route path=":id" element={<PlanningForm />} />
        </Route>
        
        {/* Routes de tâches */}
        <Route path="taches">
          <Route index element={<TaskList />} />
          <Route path="nouveau" element={<TaskForm />} />
          <Route path=":id" element={<TaskForm />} />
        </Route>
        
        {/* Routes de collaborateurs */}
        <Route path="collaborateurs">
          <Route index element={<UserList />} />
          <Route path="nouveau" element={<UserForm />} />
          <Route path=":id" element={<UserForm />} />
        </Route>
        
        {/* Routes de chantiers */}
        <Route path="chantiers" element={<Chantiers />} />
        
        {/* Routes des affaires */}
        <Route path="affaires">
          <Route index element={<AffairesList />} />
          <Route path="nouveau" element={<AffaireForm />} />
          <Route path=":id" element={<AffaireDetails />} />
          <Route path=":id/modifier" element={<AffaireForm />} />
        </Route>
        
        {/* Routes d'achats et bons de commande */}
        <Route path="achats" element={<Achats />} />
        <Route path="bdc">
          <Route index element={<BdcList />} />
          <Route path="nouveau" element={<BdcForm />} />
          <Route path=":id" element={<BdcDetails />} />
          <Route path=":id/modifier" element={<BdcForm />} />
        </Route>
        
        {/* Routes de Pointages - Page principale avec onglets intégrés */}
        <Route path="pointages" element={<Pointages />} />
        
        {/* Routes individuelles pour les pointages (pour navigation directe si nécessaire) */}
        <Route path="pointage">
          <Route path="calendrier" element={<PointageCalendarView />} />
          <Route path="saisie" element={<PointageForm />} />
          <Route path="saisie/:id" element={<PointageForm />} />
          <Route path="validation" element={<PointageValidation />} />
          <Route path="statistiques" element={<PointageStats />} />
        </Route>
        
        {/* Routes d'inventaire */}
        <Route path="inventaire">
          <Route index element={<InventaireList />} />
          <Route path="stats" element={<InventaireStats />} />
        </Route>
        
        {/* Routes des paramètres */}
        <Route path="parametres">
          <Route index element={<ParametresList />} />
          <Route path="nouveau" element={<ParametreForm />} />
          <Route path=":id/modifier" element={<ParametreForm />} />
        </Route>
        
        {/* Routes des articles */}
        <Route path="articles">
          <Route index element={<ArticlesList />} />
          <Route path="nouveau" element={<ArticleForm />} />
          <Route path=":id" element={<ArticleDetails />} />
          <Route path=":id/modifier" element={<ArticleForm />} />
        </Route>
        
        {/* Routes de reporting avancé */}
        <Route path="analyses-avancees" element={<AnalysesAvancees />} />
        
        {/* Route de migration Excel */}
        <Route path="migration" element={<Migration />} />
        
        {/* Route des notifications */}
        <Route path="notifications" element={<Notifications />} />
        
        {/* Profil utilisateur */}
        <Route path="profil" element={<Profile />} />
        
        {/* Routes de planification */}
        <Route path="planification" element={<Planification />} />
        
        {/* Routes de ressources */}
        <Route path="ressources" element={<Ressources />} />
        
        {/* Routes de temps passé */}
        <Route path="temps-passe" element={<TempsPasse />} />
      </Route>
      
      {/* Page 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router; 