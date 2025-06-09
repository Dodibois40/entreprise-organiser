import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconDashboard,
  IconBell,
  IconAlertTriangle,
  IconPackage,
  IconCalendarEvent,
  IconClipboardList,
  IconClock,
  IconTrendingUp,
  IconTrendingDown,
  IconUsers,
  IconBriefcase,
  IconEye,
  IconArrowRight,
  IconRefresh,
  IconChartBar,
  IconCurrencyEuro,
  IconBuilding,
  IconShoppingCart,
  IconTarget,
  IconProgress,
  IconActivity,
  IconAlertOctagon,
  IconCheck,
  IconExclamationMark
} from '@tabler/icons-react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import CountUp from 'react-countup';
import notificationsService from '../services/notificationsService';
import reportingService from '../services/reportingService';
import articlesService from '../services/articlesService';
import affairesService from '../services/affairesService';

// Enregistrement des composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    kpis: null,
    notifications: [],
    inventaire: null,
    affaires: null,
    alertes: []
  });
  const [error, setError] = useState(null);

  // Charger toutes les données du dashboard
  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Chargement en parallèle de toutes les données
      const [
        kpis,
        notifications,
        notificationStats,
        inventaireStats,
        affairesStats
      ] = await Promise.all([
        reportingService.getDashboardData(),
        notificationsService.getNotifications(5),
        notificationsService.getNotificationStats(),
        reportingService.getInventaireStats(),
        affairesService.getAffaires({ limit: 10, sort: 'dateCreation', order: 'desc' })
      ]);

      setDashboardData({
        kpis,
        notifications,
        notificationStats,
        inventaire: inventaireStats,
        affaires: affairesStats,
        alertes: notifications.filter(n => n.priority === 'urgent' || n.priority === 'high')
      });
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
    
    // Actualisation automatique toutes les 2 minutes
    const interval = setInterval(loadDashboardData, 120000);
    return () => clearInterval(interval);
  }, []);

  // Configuration des graphiques
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: 'Inter'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: '600'
        },
        bodyFont: {
          size: 13
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    }
  };

  // Données pour les graphiques
  const revenueData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Chiffre d\'affaires',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: 'white',
        pointBorderWidth: 2
      }
    ]
  };

  const projectsData = {
    labels: ['En cours', 'Terminés', 'En attente', 'Annulés'],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderWidth: 0,
        hoverBorderWidth: 2,
        hoverBorderColor: 'white'
      }
    ]
  };

  const activitiesData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Heures travaillées',
        data: [8, 7.5, 8, 6, 9, 4, 0],
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderRadius: 6,
        borderSkipped: false,
      }
    ]
  };

  // Formatage des valeurs
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount || 0);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'stock_faible':
        return <IconPackage size={16} className="text-orange-600" />;
      case 'echeance_affaire':
        return <IconCalendarEvent size={16} className="text-blue-600" />;
      case 'bdc_en_attente':
        return <IconClipboardList size={16} className="text-purple-600" />;
      case 'pointage_manquant':
        return <IconClock size={16} className="text-yellow-600" />;
      default:
        return <IconBell size={16} className="text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-80 bg-gray-200 rounded-lg skeleton"></div>
            <div className="h-4 w-60 bg-gray-200 rounded skeleton"></div>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded-lg skeleton"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="loading-card h-32"></div>
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="loading-card h-80"></div>
          <div className="loading-card h-80"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="modern-card p-8 text-center">
        <IconAlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Erreur de chargement</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={loadDashboardData}
          className="btn-modern btn-primary"
        >
          <IconRefresh size={16} className="mr-2" />
          Réessayer
        </button>
      </div>
    );
  }

  const { kpis, notifications, notificationStats, inventaire, affaires, alertes } = dashboardData;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold gradient-text">Tableau de Bord</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Vue d'ensemble de votre activité • {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={loadDashboardData}
            disabled={loading}
            className="btn-modern btn-secondary"
          >
            <IconRefresh size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </button>
          <button
            onClick={() => navigate('/analyses-avancees')}
            className="btn-modern btn-primary"
          >
            <IconChartBar size={16} className="mr-2" />
            Analyses avancées
          </button>
        </div>
      </div>

      {/* Alertes critiques */}
      {alertes.length > 0 && (
        <div className="modern-card border-l-4 border-red-500 p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
                <IconAlertOctagon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">Alertes critiques</h3>
                <p className="text-sm text-red-600 dark:text-red-400">Actions requises immédiatement</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/notifications')}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              Voir toutes ({alertes.length})
            </button>
          </div>
          <div className="space-y-3">
            {alertes.slice(0, 3).map((alerte) => (
              <div key={alerte.id} className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg">
                {getNotificationIcon(alerte.type)}
                <div className="flex-1">
                  <p className="text-red-700 dark:text-red-300 text-sm font-medium">{alerte.message}</p>
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                    {new Date(alerte.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* KPIs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Chiffre d'affaires */}
        <div className="stats-card group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="stats-icon bg-gradient-to-br from-blue-500 to-blue-600">
              <IconCurrencyEuro className="w-6 h-6" />
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Chiffre d'affaires</p>
              <p className="stats-value">
                <CountUp end={kpis?.totalRevenue || 152340} duration={2} separator=" " />€
              </p>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <IconTrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+12.5%</span>
            <span className="text-gray-500 ml-2">vs mois dernier</span>
          </div>
        </div>

        {/* Projets actifs */}
        <div className="stats-card group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="stats-icon bg-gradient-to-br from-purple-500 to-purple-600">
              <IconBriefcase className="w-6 h-6" />
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Projets actifs</p>
              <p className="stats-value">
                <CountUp end={kpis?.activeProjects || 24} duration={2} />
              </p>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <IconProgress className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-blue-600 font-medium">8 en cours</span>
            <span className="text-gray-500 ml-2">ce mois</span>
          </div>
        </div>

        {/* Heures travaillées */}
        <div className="stats-card group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="stats-icon bg-gradient-to-br from-green-500 to-green-600">
              <IconClock className="w-6 h-6" />
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Heures travaillées</p>
              <p className="stats-value">
                <CountUp end={kpis?.totalHours || 1834} duration={2} />h
              </p>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <IconActivity className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">7.5h/jour</span>
            <span className="text-gray-500 ml-2">moyenne</span>
          </div>
        </div>

        {/* Notifications */}
        <div className="stats-card group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="stats-icon bg-gradient-to-br from-orange-500 to-orange-600">
              <IconBell className="w-6 h-6" />
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Notifications</p>
              <p className="stats-value">
                <CountUp end={notificationStats?.total || 12} duration={2} />
              </p>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <IconExclamationMark className="w-4 h-4 text-orange-500 mr-1" />
            <span className="text-orange-600 font-medium">{notificationStats?.urgent || 3} urgentes</span>
            <span className="text-gray-500 ml-2">à traiter</span>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution du chiffre d'affaires */}
        <div className="modern-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chiffre d'affaires</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Évolution sur 6 mois</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">CA mensuel</span>
            </div>
          </div>
          <div className="h-64">
            <Line data={revenueData} options={chartOptions} />
          </div>
        </div>

        {/* Répartition des projets */}
        <div className="modern-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Répartition des projets</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">État des affaires en cours</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Voir détails
            </button>
          </div>
          <div className="h-64">
            <Doughnut data={projectsData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Activité et projets récents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activité hebdomadaire */}
        <div className="modern-card p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activité hebdomadaire</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Heures travaillées par jour</p>
          </div>
          <div className="h-48">
            <Bar data={activitiesData} options={chartOptions} />
          </div>
        </div>

        {/* Projets récents */}
        <div className="lg:col-span-2 modern-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Projets récents</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Dernières affaires créées</p>
            </div>
            <button
              onClick={() => navigate('/affaires')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            >
              Voir tout
              <IconArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {affaires?.data?.slice(0, 5).map((affaire) => (
              <div key={affaire.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <IconBuilding className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{affaire.libelle}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{affaire.client}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatAmount(affaire.objectifCaHt)}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`badge ${
                      affaire.statut === 'EN_COURS' ? 'badge-primary' :
                      affaire.statut === 'TERMINE' ? 'badge-success' :
                      affaire.statut === 'EN_ATTENTE' ? 'badge-warning' : 'badge-error'
                    }`}>
                      {affaire.statut}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="modern-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Actions rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/pointages')}
            className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <IconClock className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Pointer</span>
          </button>

          <button
            onClick={() => navigate('/bdc/nouveau')}
            className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <IconShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Nouveau BDC</span>
          </button>

          <button
            onClick={() => navigate('/articles')}
            className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <IconPackage className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">Inventaire</span>
          </button>

          <button
            onClick={() => navigate('/analyses-avancees')}
            className="flex flex-col items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <IconChartBar className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Analyses</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 