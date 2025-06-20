import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  IconArrowLeft,
  IconPencil,
  IconBriefcase,
  IconUser,
  IconMapPin,
  IconCalendarEvent,
  IconBuilding,
  IconRefresh,
  IconPhone,
  IconMail,
  IconWorld,
  IconBolt,
  IconTrendingUp,
  IconCurrencyEuro,
  IconShoppingCart,
  IconBuildingFactory,
  IconTarget,
  IconChartLine,
  IconAlertTriangle,
  IconCheck,
  IconClock
} from '@tabler/icons-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAffaireData } from '@/hooks/useAffaireData';
import { useFinancialData } from '@/hooks/useFinancialData';
import { useAchatsData } from '@/hooks/useAchatsData';

import AffaireTabs from '@/components/affaires/AffaireTabs';
import AddressLink from '@/components/common/AddressLink';
import { formatCurrency, formatDate } from '@/utils/affaires';
import { StatusBadge } from '@/components/affaires/ui';
import AffairePdfExport from '@/components/affaires/AffairePdfExport';

const AffaireDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('synthese');

  // Hooks personnalisés pour la gestion des données
  const { 
    affaire, 
    loading: affaireLoading, 
    error: affaireError, 
    updateAffaire, 
    refreshAffaire 
  } = useAffaireData(id);

  const { 
    financialData, 
    loading: financialLoading, 
    error: financialError, 
    refreshFinancialData,
    getMarginAlerts 
  } = useFinancialData(id, affaire);

  const { 
    achatsParCategorie, 
    loading: achatsLoading, 
    error: achatsError, 
    refreshAchatsData 
  } = useAchatsData(id);

  // État de chargement global
  const loading = affaireLoading || financialLoading;

  // Gestion des erreurs
  useEffect(() => {
    if (affaireError) {
      toast.error('Erreur lors du chargement de l\'affaire');
      navigate('/affaires');
    }
  }, [affaireError, navigate]);

  // Fonction de rafraîchissement global
  const handleRefreshData = async () => {
    try {
      await Promise.all([
        refreshAffaire(),
        refreshFinancialData(),
        refreshAchatsData()
      ]);
      toast.success('Données mises à jour');
    } catch (error) {
      console.error('Erreur lors du rafraîchissement:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  // Alertes de marge
  const marginAlerts = financialData ? getMarginAlerts() : {};

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (!affaire) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <IconBriefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Affaire non trouvée</h2>
          <p className="text-gray-600 mb-6">L'affaire demandée n'existe pas ou n'est plus accessible.</p>
          <Button 
            onClick={() => navigate('/affaires')} 
            className="w-full"
          >
            <IconArrowLeft className="w-4 h-4 mr-2" />
            Retour aux affaires
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête restructuré avec encadrés clairs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Barre de navigation supérieure */}
          <div className="py-2 border-b border-gray-200">
            <Button
              variant="ghost"
              onClick={() => navigate('/affaires')}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded-lg"
            >
              <IconArrowLeft className="w-4 h-4 mr-2" />
              Retour aux affaires
            </Button>
          </div>

          {/* Informations principales de l'affaire */}
          <div className="py-3">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* Section principale - Informations de l'affaire (8 colonnes) */}
              <div className="lg:col-span-8">
                <Card className="h-full border border-gray-200 shadow-sm">
                  <CardContent className="p-4">
                    {/* Titre et statut */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-xl border border-indigo-200">
                          <IconBriefcase className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900 mb-0.5">{affaire.numero}</h1>
                          <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Libellé de l'affaire</div>
                          <h2 className="text-base text-gray-900 font-semibold">{affaire.libelle}</h2>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge statut={affaire.statut} />
                        <Button
                          variant="default"
                          onClick={() => navigate(`/affaires/${affaire.id}/modifier`)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                        >
                          <IconPencil className="w-4 h-4" />
                          Modifier l'affaire
                        </Button>
                      </div>
                    </div>

                    {/* Informations détaillées en grille uniforme */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Nom du client */}
                      <div className="space-y-2">
                        <div className="text-sm text-gray-500 uppercase tracking-wide font-semibold border-b border-gray-200 pb-1">
                          Nom du client
                        </div>
                        {affaire.client && (
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                            <IconUser className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            <span className="text-gray-900 font-medium text-sm">{affaire.client}</span>
                          </div>
                        )}
                      </div>

                      {/* Adresse */}
                      <div className="space-y-2">
                        <div className="text-sm text-gray-500 uppercase tracking-wide font-semibold border-b border-gray-200 pb-1">
                          Adresse
                        </div>
                        {(affaire.adresse || affaire.ville) && (
                          <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                            <IconMapPin className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <AddressLink 
                                addressData={affaire}
                                variant="compact"
                                className="text-gray-900 text-sm leading-relaxed"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Date de création */}
                      <div className="space-y-2">
                        <div className="text-sm text-gray-500 uppercase tracking-wide font-semibold border-b border-gray-200 pb-1">
                          Date de création
                        </div>
                        {affaire.dateCreation && (
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                            <IconCalendarEvent className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            <div className="text-gray-900 font-medium text-sm">{formatDate(affaire.dateCreation)}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Fin prévue - Section séparée si elle existe */}
                    {affaire.dateCloturePrevue && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <div className="text-sm text-gray-500 uppercase tracking-wide font-semibold border-b border-gray-200 pb-1">
                              Fin prévue
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                              <IconCalendarEvent className="w-4 h-4 text-gray-500 flex-shrink-0" />
                              <div className="text-gray-900 font-medium text-sm">{formatDate(affaire.dateCloturePrevue)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Section métriques - Tableaux de bord (4 colonnes) */}
              <div className="lg:col-span-4 space-y-3">
                
                {/* Métriques financières */}
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 rounded-t-lg py-2">
                    <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                      <IconBuilding className="w-4 h-4 text-blue-600" />
                      Métriques Clés
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="grid grid-cols-1 gap-3">
                      {/* CA Objectif */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-1">
                          CA Objectif
                        </div>
                        <div className="text-xl font-bold text-blue-900">
                          {formatCurrency(financialData?.objectifCA || affaire.objectifCaHt)}
                        </div>
                        <div className="text-xs text-blue-700 mt-0.5">
                          Chiffre d'affaires prévu
                        </div>
                      </div>

                      {/* Avancement */}
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                        <div className="text-xs text-emerald-600 font-semibold uppercase tracking-wide mb-1">
                          Avancement
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xl font-bold text-emerald-900">
                            {affaire.avancementPourcentage || 0}%
                          </div>
                          <div className="flex-1 bg-emerald-200 rounded-full h-2">
                            <div 
                              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(affaire.avancementPourcentage || 0, 100)}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-xs text-emerald-700 mt-0.5">
                          Progression des travaux
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AffaireTabs
            affaire={affaire}
            financialData={financialData}
            achatsParCategorie={achatsParCategorie}
            onRefreshData={handleRefreshData}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            showOnlyTabs={true}
          />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AffaireTabs
          affaire={affaire}
          financialData={financialData}
          achatsParCategorie={achatsParCategorie}
          onRefreshData={handleRefreshData}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          showOnlyContent={true}
        />
      </div>
    </div>
  );
};

export default AffaireDetails; 