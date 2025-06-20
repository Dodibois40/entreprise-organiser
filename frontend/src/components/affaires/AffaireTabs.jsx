import React, { useState } from 'react';
import {
  IconFileText,
  IconShoppingCart,
  IconUsers,
  IconCalendar,
  IconChartLine,
  IconSettings
} from '@tabler/icons-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import AffaireAchatsUnified from './AffaireAchatsUnified';
import AffaireDevis from './AffaireDevis';
import AffaireEquipe from './AffaireEquipe';
import AffaireEquipeModern from './AffaireEquipeModern';
import AffaireDashboard from './AffaireDashboard';
import AffaireFinancialSummary from './AffaireFinancialSummary';
import AffairePdfExport from './AffairePdfExport';

const AffaireTabs = ({ 
  affaire, 
  financialData, 
  achatsParCategorie, 
  onRefreshData,
  activeTab,
  onTabChange,
  showOnlyTabs = false,
  showOnlyContent = false
}) => {
  
  // Calculer les alertes de marge
  const getMarginAlerts = () => {
    if (!financialData) return {};
    
    const totalCoutsReels = financialData.totalAchatsValides + (financialData.totalMainOeuvreReelle || 0) + (financialData.fraisGenerauxReels || 0);
    const totalCoutsObjectifs = financialData.objectifAchats + (financialData.coutObjectifMainOeuvre || 0) + (financialData.fraisGenerauxObjectifs || 0);
    const coefficientMargeReel = totalCoutsReels > 0 ? financialData.totalDevisValides / totalCoutsReels : 0;
    const coefficientMargeObjectif = totalCoutsObjectifs > 0 ? financialData.objectifCA / totalCoutsObjectifs : 0;
    const seuilCritique = 1.6;
    
    return {
      alerteMargeReelle: coefficientMargeReel > 0 && coefficientMargeReel < seuilCritique,
      alerteMargeObjectif: coefficientMargeObjectif > 0 && coefficientMargeObjectif < seuilCritique,
      coefficientMargeReel,
      coefficientMargeObjectif,
      totalCoutsReels,
      totalCoutsObjectifs
    };
  };

  const marginAlerts = getMarginAlerts();
  
  // Configuration des onglets
  const tabs = [
    {
      id: 'synthese',
      label: 'Synthèse',
      icon: IconChartLine,
      description: 'Vue d\'ensemble de l\'affaire'
    },
    {
      id: 'devis',
      label: 'Devis',
      icon: IconFileText,
      description: 'Gestion des devis et factures',
      badge: financialData.nbDevis || 0
    },
    {
      id: 'achats',
      label: 'Achats',
      icon: IconShoppingCart,
      description: 'Suivi des achats et BDC',
      badge: (financialData.nbAchats || 0) + (financialData.nbBdc || 0)
    },
    {
      id: 'equipe',
      label: 'Équipe',
      icon: IconUsers,
      description: 'Gestion de l\'équipe et temps',
      badge: financialData.nbPhases || 0
    },
    {
      id: 'phases',
      label: 'Phases',
      icon: IconCalendar,
      description: 'Planning et phases du chantier',
      badge: financialData.nbPhases || 0
    },
    {
      id: 'parametres',
      label: 'Paramètres',
      icon: IconSettings,
      description: 'Configuration de l\'affaire'
    }
  ];

  // Si on veut seulement les onglets
  if (showOnlyTabs) {
    return (
      <div className="w-full py-2">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm relative"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.badge && tab.badge > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {tab.badge}
                    </Badge>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>
    );
  }

  // Si on veut seulement le contenu
  if (showOnlyContent) {
    return (
      <div className="w-full">
        {/* Contenu des onglets seulement */}
        
        {activeTab === 'synthese' && (
          <div className="space-y-4">
            {/* Bouton d'export PDF */}
            <AffairePdfExport 
              affaire={affaire}
              financialData={financialData}
              marginAlerts={marginAlerts}
            />

            {/* Dashboard des métriques */}
            <AffaireDashboard 
              affaire={affaire}
              financialData={financialData}
              marginAlerts={marginAlerts}
            />

            {/* Résumé financier avec camemberts */}
            <AffaireFinancialSummary 
              affaire={affaire}
              financialData={financialData}
            />
          </div>
        )}

        {activeTab === 'devis' && (
          <AffaireDevis 
            affaireId={affaire.id}
            onDevisValidated={onRefreshData}
            onDevisChanged={onRefreshData}
          />
        )}

        {activeTab === 'achats' && (
          <AffaireAchatsUnified 
            affaire={affaire}
            achatsParCategorie={achatsParCategorie}
            onRefresh={onRefreshData}
          />
        )}

        {activeTab === 'equipe' && (
          <AffaireEquipe 
            affaire={affaire}
            onDataUpdate={onRefreshData}
          />
        )}

        {activeTab === 'phases' && (
          <AffaireEquipeModern 
            affaire={affaire}
            onDataUpdate={onRefreshData}
          />
        )}

        {activeTab === 'parametres' && (
          <div className="text-center text-gray-500 py-6">
            <IconSettings className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <h3 className="text-lg font-semibold mb-2">Paramètres de l'Affaire</h3>
            <p className="text-sm">Configuration et paramètres avancés de l'affaire.</p>
            <div className="grid grid-cols-2 gap-3 mt-4 max-w-md mx-auto text-sm">
              <div>
                <strong>Statut :</strong> {affaire.statut}
              </div>
              <div>
                <strong>Numéro :</strong> {affaire.numero}
              </div>
              <div>
                <strong>Client :</strong> {affaire.client}
              </div>
              <div>
                <strong>Ville :</strong> {affaire.ville}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        {/* Liste des onglets */}
        <TabsList className="grid w-full grid-cols-6 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center gap-2 px-4 py-2 text-sm relative"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.badge && tab.badge > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {tab.badge}
                  </Badge>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Contenu des onglets */}
        
        {/* Onglet Synthèse */}
        <TabsContent value="synthese" className="space-y-6">
          {/* Bouton d'export PDF */}
          <AffairePdfExport 
            affaire={affaire}
            financialData={financialData}
            marginAlerts={marginAlerts}
          />

          {/* Dashboard des métriques */}
          <AffaireDashboard 
            affaire={affaire}
            financialData={financialData}
            marginAlerts={marginAlerts}
          />

          {/* Résumé financier avec camemberts */}
          <AffaireFinancialSummary 
            affaire={affaire}
            financialData={financialData}
          />
        </TabsContent>

        {/* Onglet Devis */}
        <TabsContent value="devis" className="space-y-6">
          <AffaireDevis 
            affaireId={affaire.id}
            onDevisValidated={onRefreshData}
            onDevisChanged={onRefreshData}
          />
        </TabsContent>

        {/* Onglet Achats */}
        <TabsContent value="achats" className="space-y-6">
          <AffaireAchatsUnified 
            affaire={affaire}
            achatsParCategorie={achatsParCategorie}
            onRefresh={onRefreshData}
          />
        </TabsContent>

        {/* Onglet Équipe */}
        <TabsContent value="equipe" className="space-y-6">
          <AffaireEquipe 
            affaire={affaire}
            onDataUpdate={onRefreshData}
          />
        </TabsContent>

        {/* Onglet Phases */}
        <TabsContent value="phases" className="space-y-6">
          <AffaireEquipeModern 
            affaire={affaire}
            onDataUpdate={onRefreshData}
          />
        </TabsContent>

        {/* Onglet Paramètres */}
        <TabsContent value="parametres" className="space-y-6">
          <div className="text-center text-gray-500 py-8">
            <IconSettings className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold mb-2">Paramètres de l'Affaire</h3>
            <p>Configuration et paramètres avancés de l'affaire.</p>
            <div className="grid grid-cols-2 gap-4 mt-6 max-w-md mx-auto text-sm">
              <div>
                <strong>Statut :</strong> {affaire.statut}
              </div>
              <div>
                <strong>Numéro :</strong> {affaire.numero}
              </div>
              <div>
                <strong>Client :</strong> {affaire.client}
              </div>
              <div>
                <strong>Ville :</strong> {affaire.ville}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AffaireTabs; 