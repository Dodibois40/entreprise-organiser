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
  IconRefresh,
  IconAlertCircle,
  IconTrendingUp,
  IconTrendingDown,
  IconArrowUp,
  IconArrowDown,
  IconDots,
  IconChevronDown,
  IconTarget,
  IconUsers,
  IconCalendar,
  IconFileText,
  IconUser,
  IconCopy
} from '@tabler/icons-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { affairesService } from '@/services/affairesService';
import { clearCache } from '@/services/api';
import AddressLink from '@/components/common/AddressLink';
import { formatCurrency, formatDate, sortAffaires, filterAffaires } from '@/utils/affaires';
import { StatusBadge, CurrencyDisplay } from '@/components/affaires/ui';

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
  const [refreshKey, setRefreshKey] = useState(0);

  const navigate = useNavigate();

  // Écouter les événements de rechargement 
  useEffect(() => {
    // Vérifier localStorage pour les changements d'affaires
    const checkForUpdates = () => {
      const created = localStorage.getItem('affaire-created');
      const updated = localStorage.getItem('affaire-updated');
      
      if (created) {
        const data = JSON.parse(created);
        // Vérifier si c'est récent (moins de 5 secondes)
        if (Date.now() - data.timestamp < 5000) {
          localStorage.removeItem('affaire-created');
          
          fetchAffaires(true); // Force reload
          fetchStats();
          
          toast.success('Nouvelle affaire ajoutée à la liste !', {
            duration: 3000
          });
        }
      }
      
      if (updated) {
        const data = JSON.parse(updated);
        // Vérifier si c'est récent (moins de 5 secondes)
        if (Date.now() - data.timestamp < 5000) {
          localStorage.removeItem('affaire-updated');
          
          fetchAffaires(true); // Force reload
          fetchStats();
          
          toast.success('Affaire mise à jour dans la liste !', {
            duration: 3000
          });
        }
      }
    };

    // Vérifier immédiatement au chargement du composant
    checkForUpdates();
    
    // Vérifier périodiquement (toutes les 2 secondes)
    const interval = setInterval(checkForUpdates, 2000);
    
    // Vérifier aussi au focus de la fenêtre
    const handleWindowFocus = () => {
      checkForUpdates();
    };

    window.addEventListener('focus', handleWindowFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  // useEffect principal pour charger les données
  useEffect(() => {
    fetchAffaires();
    fetchStats();
  }, [refreshKey, searchTerm, statusFilter, pagination.page]);

  const fetchAffaires = async (forceReload = false) => {
    try {
      setLoading(true);
      
      // Si c'est un rechargement forcé, vider le cache d'abord
      if (forceReload) {
        clearCache();
      }
      
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
    if (!affaire.canDelete) {
      toast.error(`Impossible de supprimer l'affaire : ${affaire.deleteReasons?.join(', ')}`);
      return;
    }

    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'affaire "${affaire.numero}" ?`)) {
      try {
        await affairesService.deleteAffaire(affaire.id);
        toast.success('Affaire supprimée avec succès');
        setRefreshKey(prev => prev + 1);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        toast.error('Erreur lors de la suppression de l\'affaire');
      }
    }
  };

  const handleDuplicate = async (affaire) => {
    if (window.confirm(`Voulez-vous copier l'affaire "${affaire.numero}" ?\n\nUne nouvelle affaire sera créée avec un nouveau numéro et les mêmes informations de base.`)) {
      try {
        const affaireDupliquee = await affairesService.duplicateAffaire(affaire.id);
        toast.success(`Affaire copiée avec succès ! Nouveau numéro : ${affaireDupliquee.numero}`);
        setRefreshKey(prev => prev + 1);
        // Optionnel : naviguer vers la nouvelle affaire
        navigate(`/affaires/${affaireDupliquee.id}`);
      } catch (error) {
        console.error('Erreur lors de la duplication:', error);
        toast.error('Erreur lors de la copie de l\'affaire');
      }
    }
  };

  // ✅ Fonctions utilitaires déplacées vers /utils/affaires.js
  // Plus de duplication de code !

  // Fonction pour forcer le rechargement
  const handleManualRefresh = async () => {
    setLoading(true);
    await Promise.all([fetchAffaires(), fetchStats()]);
    toast.success('Liste des affaires actualisée');
  };

  if (loading && affaires.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement des affaires...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900">
      <div className="space-y-8 p-8 animate-fade-in">
        {/* Header avec gradient moderne */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Gestion des Affaires
                </h1>
                <p className="text-blue-100 text-lg">
                  Gérez et suivez toutes vos affaires en temps réel
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full">
                    <IconCalendar className="w-4 h-4" />
                    <span>Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleManualRefresh}
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                  icon={IconRefresh}
                >
                  Actualiser
                </Button>
                <Button
                  onClick={() => navigate('/affaires/nouveau')}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold border-2 border-white/20"
                  icon={IconPlus}
                >
                  <span className="text-blue-600">Nouvelle Affaire</span>
                </Button>
              </div>
            </div>
          </div>
          {/* Motif décoratif */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
        </div>

        {/* Statistiques modernes avec glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Affaires */}
          <Card className="modern-card group hover:scale-105 transition-all duration-300 border-0 shadow-xl bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900">
            <CardContent className="p-6">
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Total Affaires
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">
                    {stats.total || 0}
                  </p>
                  <div className="flex items-center text-green-600 text-sm">
                    <IconTrendingUp className="w-4 h-4 mr-1" />
                    <span className="font-medium">+2.5%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Par rapport au mois dernier</p>
              </div>
            </CardContent>
          </Card>

          {/* En Cours */}
          <Card className="modern-card group hover:scale-105 transition-all duration-300 border-0 shadow-xl bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900">
            <CardContent className="p-6">
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  En Cours
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-4xl font-bold text-orange-600">
                    {stats.enCours || 0}
                  </p>
                  <div className="flex items-center text-orange-600 text-sm">
                    <IconClock className="w-4 h-4 mr-1" />
                    <span className="font-medium">Actif</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Projets en cours de réalisation</p>
              </div>
            </CardContent>
          </Card>

          {/* Terminées */}
          <Card className="modern-card group hover:scale-105 transition-all duration-300 border-0 shadow-xl bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900">
            <CardContent className="p-6">
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Terminées
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-4xl font-bold text-green-600">
                    {stats.terminees || 0}
                  </p>
                  <div className="flex items-center text-green-600 text-sm">
                    <IconCheck className="w-4 h-4 mr-1" />
                    <span className="font-medium">100%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Projets livrés avec succès</p>
              </div>
            </CardContent>
          </Card>

          {/* CA Total */}
          <Card className="modern-card group hover:scale-105 transition-all duration-300 border-0 shadow-xl bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900">
            <CardContent className="p-6">
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  CA Total
                </p>
                <div className="flex items-center gap-3">
                  <CurrencyDisplay 
                    amount={stats.chiffreAffaires}
                    size="3xl"
                    className="text-purple-600"
                  />
                  <div className="flex items-center text-green-600 text-sm">
                    <IconTrendingUp className="w-4 h-4 mr-1" />
                    <span className="font-medium">+12.3%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Objectifs cumulés HT</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interface de recherche et filtrage modernisée */}
        <Card className="modern-card border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Ligne principale avec recherche et actions */}
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Barre de recherche améliorée */}
                <div className="flex-1 relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <IconSearch className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher par numéro, libellé, client..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      <IconX className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>

                {/* Actions rapides */}
                <div className="flex gap-2">
                  <Button
                    onClick={handleManualRefresh}
                    variant="outline"
                    className="h-12 px-4 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600"
                    icon={IconRefresh}
                  >
                    <span className="hidden sm:inline">Actualiser</span>
                  </Button>
                                     <Button
                     onClick={() => navigate('/affaires/nouveau')}
                     className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 text-white font-semibold"
                     icon={IconPlus}
                   >
                     <span className="hidden sm:inline text-white">Nouvelle Affaire</span>
                   </Button>
                </div>
              </div>

              {/* Filtres de statut modernisés */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 py-2">
                  <IconFilter className="w-4 h-4" />
                  Filtrer par statut:
                </span>
                {[
                  { key: 'all', label: 'Tous', color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
                  { key: 'EN_COURS', label: 'En cours', color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
                  { key: 'TERMINE', label: 'Terminé', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
                  { key: 'EN_ATTENTE', label: 'En attente', color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' },
                  { key: 'PLANIFIE', label: 'Planifié', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
                  { key: 'ANNULE', label: 'Annulé', color: 'bg-red-100 text-red-700 hover:bg-red-200' }
                ].map((status) => (
                  <button
                    key={status.key}
                    onClick={() => handleStatusFilter(status.key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      statusFilter === status.key
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : `${status.color} dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600`
                    }`}
                  >
                    {status.label}
                    {statusFilter === status.key && (
                      <span className="ml-2 inline-block w-2 h-2 bg-white rounded-full"></span>
                    )}
                  </button>
                ))}
              </div>

              {/* Message informatif stylisé */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconAlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <div className="font-semibold mb-1">Règles de suppression</div>
                    <p>Les affaires contenant des bons de commande ou des pointages ne peuvent pas être supprimées. Supprimez d'abord ces éléments depuis la page détails de l'affaire.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tableau modernisé */}
        <Card className="modern-card border-0 shadow-xl bg-white dark:bg-gray-800">
          <CardHeader className="border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <IconFileText className="w-6 h-6 text-blue-600" />
                Liste des Affaires ({pagination.total})
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <IconUsers className="w-4 h-4" />
                <span>{affaires.length} affichées</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full modern-table">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {[
                      { key: 'numero', label: 'Numéro', icon: IconBriefcase },
                      { key: 'libelle', label: 'Libellé', icon: IconFileText },
                      { key: 'statut', label: 'Statut', icon: IconTarget },
                      { key: 'objectifCaHt', label: 'Objectif CA HT', icon: IconCurrencyEuro },
                      { key: 'dateCloturePrevue', label: 'Date Clôture', icon: IconCalendarEvent }
                    ].map((column) => (
                      <th
                        key={column.key}
                        className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                        onClick={() => handleSort(column.key)}
                      >
                        <div className="flex items-center gap-2">
                          <column.icon className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                          <span>{column.label}</span>
                          {sortBy === column.key && (
                            <div className="ml-auto">
                              {sortOrder === 'asc' ? (
                                <IconArrowUp className="w-4 h-4 text-blue-600" />
                              ) : (
                                <IconArrowDown className="w-4 h-4 text-blue-600" />
                              )}
                            </div>
                          )}
                        </div>
                      </th>
                    ))}
                    <th className="text-center py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {affaires.map((affaire, index) => (
                    <tr 
                      key={affaire.id} 
                      className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 ${
                        index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-750'
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {affaire.numero?.slice(-2) || '??'}
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {affaire.numero}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900 dark:text-white leading-tight">
                            {affaire.libelle}
                          </p>
                          {affaire.client && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <IconUser className="w-3 h-3" />
                              {affaire.client}
                            </p>
                          )}
                          {(affaire.adresse || affaire.ville) && (
                            <div className="mt-2">
                              <AddressLink 
                                addressData={affaire}
                                variant="compact"
                                showDirections={false}
                                className=""
                              />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge statut={affaire.statut} />
                      </td>
                      <td className="py-4 px-6">
                        <CurrencyDisplay 
                          amount={affaire.objectifCaHt}
                          size="lg"
                          className="text-gray-900 dark:text-white"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <IconCalendar className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">
                            {affaire.dateCloturePrevue ? formatDate(affaire.dateCloturePrevue) : 'Non définie'}
                          </span>
                        </div>
                      </td>
                                             <td className="py-4 px-6">
                         <div className="flex items-center gap-1 justify-center">
                           {/* Bouton Voir - Bleu avec texte */}
                           <Button
                             size="sm"
                             variant="ghost"
                             onClick={() => navigate(`/affaires/${affaire.id}`)}
                             className="h-9 px-3 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 font-medium rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-200"
                             icon={IconEye}
                             title="Voir les détails"
                           >
                             <span className="hidden lg:inline ml-1 text-xs">Voir</span>
                           </Button>
                           
                           {/* Bouton Modifier - Orange avec texte */}
                           <Button
                             size="sm"
                             variant="ghost"
                             onClick={() => navigate(`/affaires/${affaire.id}/modifier`)}
                             className="h-9 px-3 text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900 font-medium rounded-lg border border-orange-200 hover:border-orange-300 transition-all duration-200"
                             icon={IconPencil}
                             title="Modifier"
                           >
                             <span className="hidden lg:inline ml-1 text-xs">Modifier</span>
                           </Button>
                           
                           {/* Bouton Copier - Vert avec texte */}
                           <Button
                             size="sm"
                             variant="ghost"
                             onClick={() => handleDuplicate(affaire)}
                             className="h-9 px-3 text-green-600 hover:bg-green-100 dark:hover:bg-green-900 font-medium rounded-lg border border-green-200 hover:border-green-300 transition-all duration-200"
                             icon={IconCopy}
                             title="Copier l'affaire"
                           >
                             <span className="hidden lg:inline ml-1 text-xs">Copier</span>
                           </Button>
                           
                           {/* Bouton Supprimer - Rouge avec texte */}
                           <Button
                             size="sm"
                             variant="ghost"
                             onClick={() => handleDelete(affaire)}
                             className={`h-9 px-3 font-medium rounded-lg transition-all duration-200 ${
                               affaire.canDelete 
                                 ? "text-red-600 hover:bg-red-100 dark:hover:bg-red-900 border border-red-200 hover:border-red-300" 
                                 : "text-gray-400 cursor-not-allowed opacity-50 border border-gray-200"
                             }`}
                             disabled={!affaire.canDelete}
                             icon={IconTrash}
                             title={
                               !affaire.canDelete 
                                 ? `Impossible de supprimer : ${affaire.deleteReasons?.join(', ') || 'éléments associés'}`
                                 : "Supprimer l'affaire"
                             }
                           >
                             <span className="hidden lg:inline ml-1 text-xs">
                               {affaire.canDelete ? 'Supprimer' : 'Bloqué'}
                             </span>
                           </Button>
                         </div>
                       </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* État vide modernisé */}
            {affaires.length === 0 && !loading && (
              <div className="text-center py-16 px-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <IconBriefcase className="w-12 h-12 text-blue-500 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Aucune affaire trouvée
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Aucun résultat ne correspond à vos critères de recherche. Essayez de modifier vos filtres.'
                    : 'Vous n\'avez pas encore créé d\'affaire. Commencez par créer votre première affaire pour gérer vos projets.'
                  }
                </p>
                                 <Button
                   onClick={() => navigate('/affaires/nouveau')}
                   className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 text-white font-semibold"
                   icon={IconPlus}
                 >
                   <span className="text-white">Créer votre première affaire</span>
                 </Button>
              </div>
            )}

            {/* Pagination modernisée */}
            {pagination.totalPages > 1 && (
              <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <IconUsers className="w-4 h-4" />
                    <span>
                      Affichage de <span className="font-semibold">{(pagination.page - 1) * pagination.limit + 1}</span> à{' '}
                      <span className="font-semibold">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> sur{' '}
                      <span className="font-semibold">{pagination.total}</span> affaires
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                      disabled={pagination.page === 1}
                      className="h-9 px-3"
                    >
                      Précédent
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                        const pageNum = Math.max(1, pagination.page - 2) + i;
                        if (pageNum > pagination.totalPages) return null;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                            className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                              pagination.page === pageNum
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                      disabled={pagination.page === pagination.totalPages}
                      className="h-9 px-3"
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AffairesList; 