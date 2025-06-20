import React, { useState, useEffect } from 'react';
import { Plus, Receipt } from 'lucide-react';
import { toast } from 'sonner';
import FactureAchatList from './FactureAchatList';
import FactureAchatModal from './FactureAchatModal';
import { getAchats, createAchat, updateAchat, deleteAchat, getCategoriesAchat } from '../../../services/achatService';
import { getBdcs } from '../../../services/achatService';
import { getFournisseursActifs } from '../../../services/fournisseurService';
import firebaseStorageService from '../../../services/firebaseStorageService';

/**
 * Composant de section Factures d'achats réutilisable
 * Utilise les composants modulaires FactureAchatList et FactureAchatModal
 */
const FactureAchatSection = ({ 
  affaireId, 
  onUpdate, 
  title = "Factures d'Achats",
  subtitle = "Gestion des factures fournisseurs",
  showHeader = true,
  collapsible = false,
  className = ""
}) => {
  // États locaux
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingFacture, setEditingFacture] = useState(null);
  const [categories, setCategories] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [bdcsDisponibles, setBdcsDisponibles] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [error, setError] = useState(null);

  // Charger les factures d'achats depuis la base de données
  const loadFactures = async () => {
    if (!affaireId) {
      console.warn('⚠️ [FACTURES] affaireId manquant');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 [FACTURES] Chargement des factures pour affaireId:', affaireId);
      
      const response = await getAchats({ affaireId });
      console.log('📦 [FACTURES] Réponse API:', response);
      
      // Gérer différents formats de réponse
      let facturesList = [];
      if (response?.achats) {
        facturesList = response.achats;
      } else if (Array.isArray(response)) {
        facturesList = response;
      } else {
        console.warn('⚠️ [FACTURES] Format de réponse inattendu:', response);
        facturesList = [];
      }
      
      console.log('✅ [FACTURES] Factures chargées:', facturesList.length);
      setFactures(facturesList);
    } catch (error) {
      console.error('❌ [FACTURES] Erreur chargement factures:', error);
      setError('Erreur lors du chargement des factures');
      toast.error(`Erreur lors du chargement des factures: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Charger les catégories
  const loadCategories = async () => {
    try {
      console.log('🔄 [FACTURES] Chargement des catégories');
      const categoriesData = await getCategoriesAchat();
      console.log('📂 [FACTURES] Catégories chargées:', categoriesData);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('❌ [FACTURES] Erreur lors du chargement des catégories:', error);
    }
  };

  // Charger les fournisseurs actifs
  const loadFournisseurs = async () => {
    try {
      console.log('🔄 [FACTURES] Chargement des fournisseurs');
      const fournisseursData = await getFournisseursActifs();
      console.log('🏢 [FACTURES] Fournisseurs chargés:', fournisseursData);
      setFournisseurs(fournisseursData || []);
    } catch (error) {
      console.error('❌ [FACTURES] Erreur lors du chargement des fournisseurs:', error);
    }
  };

  // Charger les BDC disponibles pour l'affaire
  const loadBdcsDisponibles = async () => {
    try {
      console.log('🔄 [FACTURES] Chargement des BDC disponibles');
      const response = await getBdcs({ affaireId });
      
      let bdcsList = [];
      if (response?.bdc) {
        bdcsList = response.bdc;
      } else if (response?.bdcs) {
        bdcsList = response.bdcs;
      } else if (Array.isArray(response)) {
        bdcsList = response;
      }
      
      // Filtrer les BDC validés ou réceptionnés qui pourraient être facturés
      const bdcsUtilisables = bdcsList.filter(bdc => 
        bdc.statut === 'VALIDE' || bdc.statut === 'RECEPTIONNE' || bdc.dateReception
      );
      
      console.log('📋 [FACTURES] BDC disponibles:', bdcsUtilisables.length);
      setBdcsDisponibles(bdcsUtilisables);
    } catch (error) {
      console.error('❌ [FACTURES] Erreur lors du chargement des BDC:', error);
      setBdcsDisponibles([]);
    }
  };

  // Effet de chargement initial
  useEffect(() => {
    console.log('🔄 [FACTURES] Effet de chargement initial avec affaireId:', affaireId);
    loadFactures();
    loadCategories();
    loadFournisseurs();
    loadBdcsDisponibles();
  }, [affaireId]);

  // Ouvrir le modal de création
  const handleCreateFacture = () => {
    console.log('➕ [FACTURES] Ouverture du modal de création');
    console.log('➕ [FACTURES] showModal avant:', showModal);
    setEditingFacture(null);
    setShowModal(true);
    console.log('➕ [FACTURES] showModal après:', true);
  };

  // Créer ou modifier une facture
  const handleSubmitFacture = async (values) => {
    try {
      setSubmitting(true);
      console.log('💾 [FACTURES] Données reçues du modal:', values);
      
      // Formater les données selon l'API backend (DTO CreateAchatDto)
      const factureData = {
        montantHt: parseFloat(values.montantHt),
        montantTtc: parseFloat(values.montantTtc),
        dateFacture: values.dateFacture instanceof Date ? values.dateFacture : new Date(values.dateFacture),
        affaireId: affaireId,
        categorieId: values.categorieId,
        fournisseur: values.fournisseur,
        bdcId: values.bdcId || undefined, // undefined au lieu de null pour les champs optionnels
        commentaire: values.commentaire || undefined
      };

      console.log('📤 [FACTURES] Données formatées pour API:', factureData);
      console.log('📤 [FACTURES] Types des données:', {
        montantHt: typeof factureData.montantHt,
        montantTtc: typeof factureData.montantTtc,
        dateFacture: typeof factureData.dateFacture,
        dateEcheance: typeof factureData.dateEcheance,
        affaireId: typeof factureData.affaireId,
        categorieId: typeof factureData.categorieId,
        fournisseur: typeof factureData.fournisseur
      });

      if (editingFacture) {
        const result = await updateAchat(editingFacture.id, factureData);
        toast.success('Facture d\'achat modifiée avec succès !');
        console.log('✅ [FACTURES] Facture modifiée:', result);
      } else {
        const result = await createAchat(factureData);
        toast.success('Facture d\'achat créée avec succès !');
        console.log('✅ [FACTURES] Facture créée:', result);
      }

      await loadFactures();
      handleCloseModal();
      
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('❌ [FACTURES] Erreur complète:', error);
      console.error('❌ [FACTURES] Response data:', error.response?.data);
      console.error('❌ [FACTURES] Status:', error.response?.status);
      console.error('❌ [FACTURES] Status text:', error.response?.statusText);
      
      // Message d'erreur plus détaillé
      let errorMessage = 'Erreur lors de la sauvegarde';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(`Erreur: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Fermer le modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFacture(null);
  };

  // Supprimer une facture
  const handleDeleteFacture = async (factureId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette facture d\'achat ?')) {
      return;
    }

    try {
      console.log('🗑️ [FACTURES] Suppression facture:', factureId);
      await deleteAchat(factureId);
      toast.success('Facture d\'achat supprimée avec succès !');
      await loadFactures();
      
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('❌ [FACTURES] Erreur lors de la suppression de la facture:', error);
      toast.error(`Erreur lors de la suppression: ${error.message}`);
    }
  };

  // Modifier une facture
  const handleEditFacture = (facture) => {
    console.log('✏️ [FACTURES] Modification facture:', facture);
    setEditingFacture(facture);
    setShowModal(true);
  };

  // Valider une facture
  const handleValidateFacture = async (factureId) => {
    try {
      console.log('✅ [FACTURES] Validation facture:', factureId);
      // Simulation de validation - à adapter selon votre API
      const factureData = { statut: 'VALIDEE' };
      await updateAchat(factureId, factureData);
      toast.success('Facture d\'achat validée avec succès !');
      await loadFactures();
      
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('❌ [FACTURES] Erreur lors de la validation de la facture:', error);
      toast.error(`Erreur lors de la validation: ${error.message}`);
    }
  };

  // Annuler une facture
  const handleCancelFacture = async (factureId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir annuler cette facture d\'achat ?')) {
      return;
    }

    try {
      console.log('❌ [FACTURES] Annulation facture:', factureId);
      // Simulation d'annulation - à adapter selon votre API
      const factureData = { statut: 'ANNULEE' };
      await updateAchat(factureId, factureData);
      toast.success('Facture d\'achat annulée avec succès !');
      await loadFactures();
      
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('❌ [FACTURES] Erreur lors de l\'annulation de la facture:', error);
      toast.error(`Erreur lors de l'annulation: ${error.message}`);
    }
  };

  // Marquer comme payée
  const handlePayFacture = async (factureId) => {
    try {
      console.log('💰 [FACTURES] Paiement facture:', factureId);
      // Simulation de paiement - à adapter selon votre API
      const factureData = { 
        statut: 'PAYEE',
        datePaiement: new Date()
      };
      await updateAchat(factureId, factureData);
      toast.success('Facture d\'achat marquée comme payée !');
      await loadFactures();
      
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('❌ [FACTURES] Erreur lors du paiement de la facture:', error);
      toast.error(`Erreur lors du paiement: ${error.message}`);
    }
  };

  // Gestion de l'upload PDF Firebase
  const handlePdfUploadSuccess = async (factureId, result) => {
    try {
      console.log('🔥 [PDF] Upload success result:', result);
      
      // Si result est null (cas de suppression), on supprime les données PDF
      if (result === null) {
        const updateData = {
          nomFichier: null,
          tailleFichier: null,
          dateUpload: null,
          firebaseDownloadUrl: null,
          firebaseStoragePath: null
        };

        console.log('🗑️ [PDF] Suppression des données PDF:', updateData);
        
        await updateAchat(factureId, updateData);
        console.log('✅ [PDF] Facture mise à jour avec succès (suppression)');
         
        // Mettre à jour l'état local
        setFactures(prevFactures => 
          prevFactures.map(facture => 
            facture.id === factureId 
              ? { ...facture, ...updateData }
              : facture
          )
        );
        
        toast.success('PDF supprimé avec succès !');
        
        if (onUpdate) {
          onUpdate();
        }
        return;
      }
      
      // Mettre à jour la facture dans la base de données via achatService
      const updateData = {
        nomFichier: result.fileName || result.nomFichier,
        tailleFichier: parseInt(result.size || result.tailleFichier || 0), // S'assurer que c'est un entier
        dateUpload: result.uploadedAt || result.dateUpload || new Date().toISOString(),
        firebaseDownloadUrl: result.downloadURL || result.firebaseDownloadUrl,
        firebaseStoragePath: result.fullPath || result.firebaseStoragePath
      };

      console.log('📤 [PDF] Données de mise à jour PDF:', updateData);
      
      await updateAchat(factureId, updateData);
      console.log('✅ [PDF] Facture mise à jour avec succès');
       
       // Mettre à jour l'état local
      setFactures(prevFactures => 
        prevFactures.map(facture => 
          facture.id === factureId 
            ? { ...facture, ...updateData }
            : facture
        )
      );
      
      toast.success('PDF uploadé avec succès !');
      
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('❌ [PDF] Erreur après upload:', error);
      
      // Afficher un message d'erreur plus détaillé
      let errorMessage = 'Erreur lors de la mise à jour de la facture';
      if (error.response?.data?.message) {
        errorMessage = `Erreur: ${error.response.data.message}`;
      } else if (error.response?.data?.error) {
        errorMessage = `Erreur: ${error.response.data.error}`;
      } else if (error.message) {
        errorMessage = `Erreur: ${error.message}`;
      }
      
      toast.error(errorMessage);
    }
  };

  const handlePdfUploadError = (factureId, error) => {
    console.error('Erreur upload PDF:', error);
    toast.error(`Erreur lors de l'upload: ${error.message}`);
  };

  // Fonctions Firebase pour l'upload des factures
  const uploadPdfFirebase = async (factureId, file, onProgress) => {
    // Trouver la facture pour récupérer son numéro
    const facture = factures.find(f => f.id === factureId);
    const factureNumero = facture?.numeroFacture;
    
    return await firebaseStorageService.uploadFacturePdf(factureId, file, onProgress, factureNumero);
  };

  const deletePdfFirebase = async (factureId, storagePath) => {
    if (storagePath) {
      await firebaseStorageService.deletePdf(storagePath);
    }
    // Ne pas appeler directement la suppression ici car handlePdfUploadSuccess gère déjà le cas result === null
  };

  const getPdfViewUrlFirebase = async (factureId, downloadUrl) => {
    return downloadUrl;
  };

  // Statistiques des factures
  const totalFactures = factures.reduce((sum, facture) => sum + (facture.montantTtc || 0), 0);
  const facturesPayees = factures.filter(facture => facture.datePaiement || facture.statut === 'PAYEE');
  const totalPayees = facturesPayees.reduce((sum, facture) => sum + (facture.montantTtc || 0), 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount || 0);
  };

  // Rendu du composant
  return (
    <div className={`h-full flex flex-col ${className}`}>
      {/* Header optionnel */}
      {showHeader && (
        <div 
          className={`flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 ${
            collapsible ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors' : ''
          }`}
          onClick={collapsible ? () => setCollapsed(!collapsed) : undefined}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Receipt className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">
              {factures.length} Total • {facturesPayees.length} Payées
            </span>
            <button
              onClick={handleCreateFacture}
              className="inline-flex items-center px-3 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Facture
            </button>
          </div>
        </div>
      )}
      
      {/* Ligne de statistiques supplémentaire pour harmoniser avec les BDC */}
      {showHeader && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/30 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded">
                <Receipt className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Gestion des factures fournisseurs • {formatCurrency(totalFactures)} total
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">
                {factures.length} Total • {facturesPayees.length} Payées
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Contenu principal */}
      {(!collapsible || !collapsed) && (
        <div className="flex-1 p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Statistiques rapides */}
          {factures.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Factures</h4>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalFactures)}</p>
                <p className="text-xs text-gray-500">{factures.length} facture(s)</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Payées</h4>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPayees)}</p>
                <p className="text-xs text-gray-500">{facturesPayees.length} facture(s)</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">En attente</h4>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalFactures - totalPayees)}</p>
                <p className="text-xs text-gray-500">{factures.length - facturesPayees.length} facture(s)</p>
              </div>
            </div>
          )}

          {/* Liste des factures */}
          <FactureAchatList
            factures={factures}
            loading={loading}
            onEdit={handleEditFacture}
            onDelete={handleDeleteFacture}
            onValidate={handleValidateFacture}
            onCancel={handleCancelFacture}
            onPay={handlePayFacture}
            emptyMessage="Créez votre première facture d'achat pour cette affaire."
          />
        </div>
      )}

      {/* Modal de création/modification */}
      <FactureAchatModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitFacture}
        editingFacture={editingFacture}
        categories={categories}
        fournisseurs={fournisseurs}
        bdcsDisponibles={bdcsDisponibles}
        submitting={submitting}
        uploadPdfFirebase={uploadPdfFirebase}
        deletePdfFirebase={deletePdfFirebase}
        getPdfViewUrlFirebase={getPdfViewUrlFirebase}
        onPdfUploadSuccess={handlePdfUploadSuccess}
        onPdfUploadError={handlePdfUploadError}
      />
    </div>
  );
};

export default FactureAchatSection; 