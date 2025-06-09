import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  IconDashboard, 
  IconCalendarEvent, 
  IconUsers, 
  IconBriefcase,
  IconSettings,
  IconLogout,
  IconUserCircle,
  IconMoon,
  IconSun,
  IconBell,
  IconBuildingFactory,
  IconCurrencyEuro,
  IconShoppingCart,
  IconClockHour4,
  IconList,
  IconChartBar,
  IconPackage,
  IconChartAreaLine,
  IconDatabase,
  IconMenu2,
  IconX,
  IconChevronDown,
  IconNotification,
  IconMailbox,
  IconFileAnalytics,
  IconDeviceAnalytics,
  IconTool,
  IconCalendar,
  IconClock
} from '@tabler/icons-react';
import NotificationCenter from './NotificationCenter';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

// Configuration du menu de navigation avec groupes
const navigationConfig = [
  {
    group: 'Tableau de bord',
    items: [
      { path: '/', label: 'Vue d\'ensemble', icon: IconDashboard, color: 'text-blue-600' },
      { path: '/notifications', label: 'Notifications', icon: IconBell, color: 'text-yellow-600' },
    ]
  },
  {
    group: 'Gestion',
    items: [
      { path: '/affaires', label: 'Affaires', icon: IconBriefcase, color: 'text-blue-600' },
      { path: '/pointages', label: 'Pointages', icon: IconClockHour4, color: 'text-green-600' },
      { path: '/achats', label: 'Achats', icon: IconShoppingCart, color: 'text-purple-600' },
      { path: '/bdc', label: 'Bons de commande', icon: IconCurrencyEuro, color: 'text-indigo-600' },
      { path: '/articles', label: 'Articles', icon: IconPackage, color: 'text-orange-600' },
    ]
  },
  {
    group: 'Planification',
    items: [
      { path: '/planification', label: 'Planning', icon: IconCalendar, color: 'text-blue-600' },
      { path: '/ressources', label: 'Ressources', icon: IconTool, color: 'text-green-600' },
      { path: '/temps-passe', label: 'Temps passé', icon: IconClock, color: 'text-purple-600' },
    ]
  },
  {
    group: 'Analyses',
    items: [
      { path: '/analyses-avancees', label: 'Analyses avancées', icon: IconChartAreaLine, color: 'text-cyan-600' },
    ]
  },
  {
    group: 'Administration',
    items: [
      { path: '/parametres', label: 'Paramètres', icon: IconSettings, color: 'text-gray-600' },
      { path: '/migration', label: 'Migration Excel', icon: IconDatabase, color: 'text-teal-600' },
    ]
  }
];

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Fonction pour vérifier si un lien est actif
  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Obtenir le titre de la page actuelle
  const getCurrentPageTitle = () => {
    for (const group of navigationConfig) {
      const item = group.items.find(item => isActiveLink(item.path));
      if (item) return item.label;
    }
    return 'Entreprise Organiser';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex h-full flex-col bg-white/80 backdrop-blur-xl border-r border-gray-200/50 dark:bg-gray-900/80 dark:border-gray-700/50">
          {/* Logo et Brand */}
          <div className="flex h-20 items-center justify-between px-6 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <IconBuildingFactory className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold gradient-text">Entreprise</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Organiser CRM</p>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <IconX className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
            {navigationConfig.map((group) => (
              <div key={group.group} className="space-y-2">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  {group.group}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActiveLink(item.path);
                    
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={`nav-item group ${isActive ? 'active' : ''}`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          isActive 
                            ? 'bg-white/20' 
                            : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                        }`}>
                          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.color}`} />
                        </div>
                        <span className={`font-medium ${
                          isActive ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {item.label}
                        </span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* User Profile Section */}
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 p-4">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.nom?.[0]}{user?.prenom?.[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.prenom} {user?.nom}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.role === 'ADMIN_SYS' ? 'Administrateur' : 
                   user?.role === 'CHEF_ATELIER' ? 'Chef d\'atelier' : 'Employé'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-0'}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 h-20 border-b border-gray-200/50 bg-white/80 backdrop-blur-xl dark:bg-gray-900/80 dark:border-gray-700/50">
          <div className="flex h-full items-center justify-between px-6">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <IconMenu2 className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {getCurrentPageTitle()}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date().toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title={isDark ? 'Mode clair' : 'Mode sombre'}
              >
                {isDark ? (
                  <IconSun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <IconMoon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Notification Center */}
              <NotificationCenter />

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">
                      {user?.nom?.[0]}{user?.prenom?.[0]}
                    </span>
                  </div>
                  <IconChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.prenom} {user?.nom}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigate('/profil');
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <IconUserCircle className="w-4 h-4" />
                      <span>Mon profil</span>
                    </button>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigate('/parametres');
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <IconSettings className="w-4 h-4" />
                      <span>Paramètres</span>
                    </button>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <IconLogout className="w-4 h-4" />
                      <span>Se déconnecter</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout; 