import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { affairesService } from '@/services/affairesService';

export const useFinancialData = (affaireId, affaire) => {
  const [financialData, setFinancialData] = useState({
    // Données réelles
    totalDevisValides: 0,
    totalAchatsValides: 0,
    heuresReelles: 0,
    // Données objectives
    objectifCA: 0,
    objectifAchats: 0,
    objectifHeures: 0,
    // Marges
    margeReelle: 0,
    margeObjectif: 0,
    pourcentageMargeReelle: 0,
    pourcentageMargeObjectif: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFinancialData = async () => {
    if (!affaireId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const financialSituation = await affairesService.getFinancialSituation(affaireId);
      
      const {
        affaire: currentAffaire,
        devis,
        achats,
        phases,
        bdc,
        fraisGeneraux,
        marges
      } = financialSituation;

      // Calculer le coût objectif des heures de main-d'œuvre à partir des objectifs d'affaire
      const TAUX_FABRICATION = 100; // 100€ HT/h
      const TAUX_SERVICE = 75; // 75€ HT/h
      const TAUX_POSE = 50; // 50€ HT/h

      const objectifHeuresFab = currentAffaire.objectifHeuresFab || 0;
      const objectifHeuresSer = currentAffaire.objectifHeuresSer || 0;
      const objectifHeuresPose = currentAffaire.objectifHeuresPose || 0;

      const coutObjectifHeuresFab = objectifHeuresFab * TAUX_FABRICATION;
      const coutObjectifHeuresSer = objectifHeuresSer * TAUX_SERVICE;
      const coutObjectifHeuresPose = objectifHeuresPose * TAUX_POSE;
      const coutObjectifMainOeuvre = coutObjectifHeuresFab + coutObjectifHeuresSer + coutObjectifHeuresPose;

      // Total des achats réels = Achats + BDC + Main-d'œuvre (phases)
      const totalAchatsReels = achats.totalValides + bdc.totalReceptionnes;
      const totalMainOeuvreReelle = phases.coutTotalReel;

      // Total des achats objectifs = Achats objectifs + Main-d'œuvre objectif (basé sur les heures d'affaire)
      const totalAchatsObjectifs = currentAffaire.objectifAchatHt + coutObjectifMainOeuvre;

      const newFinancialData = {
        // CA
        totalDevisValides: devis.totalValides,
        caReel: devis.totalValides, // CA réel = total des devis validés
        objectifCA: currentAffaire.objectifCaHt,
        
        // Achats (sans main-d'œuvre)
        totalAchatsValides: totalAchatsReels,
        totalAchatsFactures: achats.totalValides,
        totalBdcReceptionnes: bdc.totalReceptionnes,
        achatReel: totalAchatsReels, // Achats réels = achats + BDC réceptionnés
        objectifAchats: currentAffaire.objectifAchatHt,
        
        // Main-d'œuvre
        totalMainOeuvreReelle,
        totalMainOeuvreEstimee: coutObjectifMainOeuvre, // Basé sur les objectifs d'heures de l'affaire
        tempsTotalEstime: phases.tempsTotalEstime,
        tempsTotalReel: phases.tempsTotalReel,
        nbPhases: phases.nbPhases,
        
        // Compteurs pour les badges d'onglets
        nbDevis: devis.nbDevisValides,
        nbAchats: achats.nbAchatsValides,
        nbBdc: bdc.nbBdcReceptionnes,
        
        // Heures (totales de tous types) - CORRIGÉ pour utiliser les phases
        heuresReelles: phases.tempsTotalReel || 0, // Utiliser les heures des phases plutôt que les champs affaire
        objectifHeures: objectifHeuresFab + objectifHeuresSer + objectifHeuresPose,
        
        // Détail des objectifs d'heures par type
        objectifHeuresFab,
        objectifHeuresSer,
        objectifHeuresPose,
        coutObjectifHeuresFab,
        coutObjectifHeuresSer,
        coutObjectifHeuresPose,
        coutObjectifMainOeuvre,
        
        // Frais généraux (30% des devis validés)
        fraisGenerauxReels: fraisGeneraux?.montantReel || 0,
        fraisGenerauxObjectifs: fraisGeneraux?.montantObjectif || 0,
        pourcentageFraisGeneraux: fraisGeneraux?.pourcentage || 30,
        
        // Marges (recalculées avec les objectifs d'heures de l'affaire)
        margeReelle: marges.margeReelle,
        margeObjectif: currentAffaire.objectifCaHt - (fraisGeneraux?.montantObjectif || 0) - totalAchatsObjectifs,
        pourcentageMargeReelle: marges.pourcentageMargeReelle,
        pourcentageMargeObjectif: currentAffaire.objectifCaHt > 0 ? 
          ((currentAffaire.objectifCaHt - (fraisGeneraux?.montantObjectif || 0) - totalAchatsObjectifs) / currentAffaire.objectifCaHt) * 100 : 0,
        
        // Totaux pour les camemberts (achats + main-d'œuvre + frais généraux)
        totalCoutsReels: totalAchatsReels + totalMainOeuvreReelle + (fraisGeneraux?.montantReel || 0),
        totalCoutsObjectifs: currentAffaire.objectifAchatHt + coutObjectifMainOeuvre + (fraisGeneraux?.montantObjectif || 0)
      };

      setFinancialData(newFinancialData);
    } catch (error) {
      console.error('Erreur lors du chargement des données financières:', error);
      setError(error);
      toast.error('Erreur lors du chargement des données financières');
    } finally {
      setLoading(false);
    }
  };

  const refreshFinancialData = () => {
    fetchFinancialData();
  };

  // Calculer les alertes de marge
  const getMarginAlerts = () => {
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

  useEffect(() => {
    if (affaire) {
      fetchFinancialData();
    }
    
    // Écouter les événements de mise à jour des BDC et affaires
    const handleBdcUpdate = (event) => {
      const { affaireId } = event.detail;
      if (affaireId === affaireId) {
        console.log('🔄 Rafraîchissement automatique des données financières suite à une action BDC');
        fetchFinancialData();
      }
    };
    
    const handleAffaireUpdate = (event) => {
      const { affaireId: eventAffaireId } = event.detail;
      if (eventAffaireId === affaireId) {
        console.log('🔄 Rafraîchissement automatique des données financières suite à une mise à jour d\'affaire');
        fetchFinancialData();
      }
    };
    
    // Ajouter les listeners
    window.addEventListener('bdc_updated', handleBdcUpdate);
    window.addEventListener('affaire_updated', handleAffaireUpdate);
    window.addEventListener('devis_updated', handleAffaireUpdate);
    
    // Nettoyer les listeners
    return () => {
      window.removeEventListener('bdc_updated', handleBdcUpdate);
      window.removeEventListener('affaire_updated', handleAffaireUpdate);
      window.removeEventListener('devis_updated', handleAffaireUpdate);
    };
  }, [affaireId, affaire]);

  return {
    financialData,
    loading,
    error,
    refreshFinancialData,
    getMarginAlerts,
    setFinancialData // Pour les mises à jour manuelles
  };
}; 