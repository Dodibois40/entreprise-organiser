import { createBrowserRouter, Navigate, RouterProvider, Routes, Route } from 'react-router-dom';
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
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import AuthLayout from './components/AuthLayout';

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
        
        {/* Profil utilisateur */}
        <Route path="profil" element={<Profile />} />
      </Route>
      
      {/* Page 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router; 