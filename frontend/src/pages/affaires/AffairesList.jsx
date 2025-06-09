import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  IconPlus, 
  IconPencil, 
  IconTrash, 
  IconEye,
  IconSearch,
  IconFilter,
  IconCalendarEvent,
  IconCurrencyEuro,
  IconBriefcase,
  IconCheck,
  IconClock,
  IconX,
  IconAward,
  IconRefresh
} from '@tabler/icons-react';
import { toast } from 'sonner';
import Button from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import affairesService from '../../services/affairesService';
import { clearCache } from '../../services/api';

const AffairesList = () => {
  const [affaires, setAffaires] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const navigate = useNavigate();

  // Chargement des données
  useEffect(() => {
    fetchAffaires();
    fetchStats();
  }, [pagination.page, searchTerm, statusFilter, sortBy, sortOrder]);

  // Écouter les événements de rechargement (pour les créations d'affaires)
  useEffect(() => {
    const handleReload = (event) => {
      // Délai plus long pour les modifications pour laisser le temps au backend
      const delay = event?.type === 'affaire-updated' ? 500 : 300;
      
      setTimeout(() => {
        // Vider le cache pour forcer le rechargement des données fraîches
        clearCache();
        
        fetchAffaires();
        fetchStats();
        
        // Afficher un message en fonction du type d'événement
        if (event?.type === 'affaire-updated') {
          console.log('🔄 Données rechargées après modification d\'affaire (cache vidé)');
        } else if (event?.type === 'affaire-created') {
          console.log('✅ Données rechargées après création d\'affaire (cache vidé)');
        }
      }, delay);
    };

    // Écouter un événement personnalisé ou le focus de la fenêtre
    window.addEventListener('focus', handleReload);
    window.addEventListener('affaire-created', handleReload);
    window.addEventListener('affaire-updated', handleReload);

    return () => {
      window.removeEventListener('focus', handleReload);
      window.removeEventListener('affaire-created', handleReload);
      window.removeEventListener('affaire-updated', handleReload);
    };
  }, []);

  const fetchAffaires = async () => {
    try {
      setLoading(true);
      const params = {
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
        search: searchTerm,
        statut: statusFilter !== 'all' ? statusFilter : undefined,
        // Ajouter un timestamp pour éviter le cache
        _t: Date.now()
      };
      
      const response = await affairesService.getAffaires(params);
      // La réponse backend retourne { affaires, total }
      const affairesData = response.affaires || response.data || response || [];
      const totalData = response.total || affairesData.length || 0;
      
      setAffaires(Array.isArray(affairesData) ? affairesData : []);
      setPagination(prev => ({
        ...prev,
        total: totalData,
        totalPages: Math.ceil(totalData / pagination.limit)
      }));
    } catch (error) {
      console.error('Erreur lors du chargement des affaires:', error);
      toast.error('Erreur lors du chargement des affaires');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await affairesService.getGlobalStats();
      // Mapper les données du backend aux propriétés attendues par le frontend
      const mappedStats = {
        total: response.totalAffaires || 0,
        enCours: response.affairesEnCours || 0,
        terminees: 0, // Calculé plus tard
        chiffreAffaires: response.objectifCaHt || 0
      };
      
      // Calculer les affaires terminées
      try {
        const terminatedResponse = await affairesService.getAffairesByStatus('TERMINEE');
        mappedStats.terminees = terminatedResponse.total || terminatedResponse.affaires?.length || 0;
      } catch (err) {
        console.warn('Impossible de récupérer les affaires terminées:', err);
      }
      
      setStats(mappedStats);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
      setStats({
        total: 0,
        enCours: 0,
        terminees: 0,
        chiffreAffaires: 0
      });
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleDelete = async (affaire) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'affaire "${affaire.libelle}" ?`)) {
      try {
        await affairesService.deleteAffaire(affaire.id);
        toast.success('Affaire supprimée avec succès');
        fetchAffaires();
        fetchStats();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        toast.error('Erreur lors de la suppression de l\'affaire');
      }
    }
  };

  const getStatusBadge = (statut) => {
    // Mapper les statuts du backend vers les labels français
    const statusMapping = {
      'EN_COURS': 'En cours',
      'TERMINE': 'Terminé', 
      'EN_ATTENTE': 'En attente',
      'ANNULE': 'Annulé',
      'PLANIFIE': 'Planifié',
      'SUSPENDU': 'Suspendu'
    };
    
    const statusConfig = {
      'En cours': { color: 'bg-blue-100 text-blue-800', icon: IconClock },
      'Terminé': { color: 'bg-green-100 text-green-800', icon: IconCheck },
      'En attente': { color: 'bg-yellow-100 text-yellow-800', icon: IconClock },
      'Annulé': { color: 'bg-red-100 text-red-800', icon: IconX },
      'Planifié': { color: 'bg-purple-100 text-purple-800', icon: IconCalendarEvent },
      'Suspendu': { color: 'bg-orange-100 text-orange-800', icon: IconClock }
    };
    
    const displayStatus = statusMapping[statut] || statut;
    const config = statusConfig[displayStatus] || { color: 'bg-gray-100 text-gray-800', icon: IconClock };
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {displayStatus}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount || 0);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR');
  };

  // Fonction pour forcer le rechargement
  const handleManualRefresh = async () => {
    setLoading(true);
    await Promise.all([fetchAffaires(), fetchStats()]);
    toast.success('Liste des affaires actualisée');
  };

  if (loading && affaires.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestion des Affaires</h1>
          <p className="text-gray-600 dark:text-gray-400">Gérez et suivez toutes vos affaires</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleManualRefresh}
            variant="outline"
            size="lg"
            icon={IconRefresh}
          >
            Actualiser
          </Button>
          <Button
            onClick={() => navigate('/affaires/nouveau')}
            variant="primary"
            size="lg"
            icon={IconPlus}
          >
            Nouvelle Affaire
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Affaires</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <IconBriefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">En Cours</p>
                <p className="text-2xl font-bold text-blue-600">{stats.enCours || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <IconClock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Terminées</p>
                <p className="text-2xl font-bold text-green-600">{stats.terminees || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <IconCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">CA Total</p>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(stats.chiffreAffaires)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <IconCurrencyEuro className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et Recherche */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Barre de recherche */}
            <div className="flex-1">
              <div className="relative">
                <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une affaire..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Filtres de statut */}
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'Tous' },
                { key: 'EN_COURS', label: 'En cours' },
                { key: 'TERMINE', label: 'Terminé' },
                { key: 'EN_ATTENTE', label: 'En attente' },
                { key: 'PLANIFIE', label: 'Planifié' },
                { key: 'ANNULE', label: 'Annulé' }
              ].map((status) => (
                <button
                  key={status.key}
                  onClick={() => handleStatusFilter(status.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === status.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>

            <Button
              onClick={handleManualRefresh}
              variant="outline"
              size="sm"
              icon={IconRefresh}
              loading={loading}
            >
              Actualiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste des affaires */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Affaires ({pagination.total})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => handleSort('numero')}>
                    Numéro
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => handleSort('libelle')}>
                    Libellé
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => handleSort('statut')}>
                    Statut
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => handleSort('objectifCaHt')}>
                    Objectif CA HT
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => handleSort('dateCloturePrevue')}>
                    Date Clôture Prévue
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {affaires.map((affaire) => (
                  <tr key={affaire.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white font-medium">
                      {affaire.numero}
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{affaire.libelle}</p>
                        {affaire.client && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">{affaire.client}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(affaire.statut)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                      {formatCurrency(affaire.objectifCaHt)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                      {affaire.dateCloturePrevue ? formatDate(affaire.dateCloturePrevue) : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigate(`/affaires/${affaire.id}`)}
                          icon={IconEye}
                        >
                          Voir
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigate(`/affaires/${affaire.id}/modifier`)}
                          icon={IconPencil}
                        >
                          Modifier
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(affaire)}
                          icon={IconTrash}
                          className="text-red-600 hover:text-red-700"
                        >
                          Supprimer
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {affaires.length === 0 && !loading && (
            <div className="text-center py-12">
              <IconBriefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucune affaire trouvée</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Aucun résultat ne correspond à vos critères de recherche.'
                  : 'Commencez par créer votre première affaire.'
                }
              </p>
              <Button
                onClick={() => navigate('/affaires/nouveau')}
                variant="primary"
                icon={IconPlus}
              >
                Créer une affaire
              </Button>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Affichage de {(pagination.page - 1) * pagination.limit + 1} à{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} sur {pagination.total} affaires
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page === 1}
                >
                  Précédent
                </Button>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Page {pagination.page} sur {pagination.totalPages}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page === pagination.totalPages}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AffairesList; 