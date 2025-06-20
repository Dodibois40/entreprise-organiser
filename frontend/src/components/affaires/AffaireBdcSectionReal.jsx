import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, FileText, Calendar, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { Modal, TextInput, NumberInput, Select, Textarea, Button, Group, Stack, Divider } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import PdfUploadFirebase from '../ui/PdfUploadFirebase';
import PdfViewer from '../ui/PdfViewer';

import firebaseStorageService from '../../services/firebaseStorageService';
import { createBdc, getBdcs, updateBdc, deleteBdc, getCategoriesAchat, validerBdc, annulerBdc, receptionnerBdc } from '@/services/achatService';
import { getFournisseursActifs } from '@/services/fournisseurService';
import { findCategorieAchatForFournisseur } from '@/utils/fournisseurCategories';
import { getDeliveryDateStyle, formatDisplayDate } from '@/utils/dateHelpers';

/**
 * Composant de gestion des BDC avec Firebase Storage - Version Production
 * CORRECTION: Utilisation du service achatService standardisé
 */
const AffaireBdcSectionReal = ({ affaireId, onUpdate }) => {
  const [bdcs, setBdcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingBdc, setEditingBdc] = useState(null);
  const [categories, setCategories] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);

  // Debug pour identifier le composant actif
  console.log('🚨 [COMPOSANT ACTIF] AffaireBdcSectionReal.jsx - affaireId:', affaireId);

  // Import du test pour diagnostiquer
  const testDiagnostic = async () => {
    try {
      console.log('🧪 [DIAGNOSTIC] Test de diagnostic de création BDC');
      
      // Test 1: Vérifier les catégories
      console.log('1️⃣ Test des catégories...');
      const categoriesData = await getCategoriesAchat();
      console.log('✅ Catégories:', categoriesData);
      
      if (!categoriesData || categoriesData.length === 0) {
        throw new Error('Aucune catégorie disponible');
      }
      
      // Test 2: Créer un BDC de test
      console.log('2️⃣ Test de création BDC...');
      const testData = {
        fournisseur: 'Test Diagnostic',
        montantHt: 99.99,
        dateBdc: new Date(),
        affaireId: affaireId,
        categorieId: categoriesData[0].id,
        commentaire: 'Test diagnostic automatique'
      };
      
      console.log('📤 Données de test:', testData);
      const result = await createBdc(testData);
      console.log('✅ BDC créé:', result);
      
      // Recharger la liste
      await loadBdcs();
      toast.success('Test de diagnostic réussi ! BDC créé.');
      
    } catch (error) {
      console.error('❌ Erreur diagnostic:', error);
      toast.error(`Erreur diagnostic: ${error.message}`);
    }
  };

  // Formulaire pour les BDC
  const form = useForm({
    initialValues: {
      fournisseur: '',
      montantHt: 0,
      dateBdc: new Date(),
      dateLivraison: null,
      categorieId: '',
      commentaire: ''
    },
    validate: {
      fournisseur: (value) => !value ? 'Le fournisseur est obligatoire' : null,
      montantHt: (value) => !value || value <= 0 ? 'Le montant HT doit être supérieur à 0' : null,
      categorieId: (value) => !value ? 'La catégorie est obligatoire' : null
    }
  });
  const [error, setError] = useState(null);

  // Charger les BDCs depuis la base de données
  const loadBdcs = async () => {
    try {
      setLoading(true);
      console.log('📋 [BDC] Chargement BDCs pour affaire:', affaireId);
      
      const data = await getBdcs({ affaireId, take: 50 });
      console.log('📋 [BDC] Données reçues:', data);
      
      if (data && data.bdc) {
        setBdcs(data.bdc);
        console.log('📋 [BDC] BDCs chargés:', data.bdc.map(bdc => ({
          id: bdc.id,
          numero: bdc.numero,
          statut: bdc.statut,
          fournisseur: bdc.fournisseur
        })));
      } else {
        console.warn('📋 [BDC] Format de données inattendu:', data);
        setBdcs([]);
      }
    } catch (error) {
      console.error('❌ [BDC] Erreur lors du chargement des BDCs:', error);
      setBdcs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔄 [BDC] Effet de chargement initial avec affaireId:', affaireId);
    loadBdcs();
    loadCategories();
    loadFournisseurs();
  }, [affaireId]);

  // Charger les catégories
  const loadCategories = async () => {
    try {
      console.log('🔄 [BDC] Chargement des catégories');
      const categoriesData = await getCategoriesAchat();
      console.log('📂 [BDC] Catégories chargées:', categoriesData);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('❌ [BDC] Erreur lors du chargement des catégories:', error);
    }
  };

  // Charger les fournisseurs actifs
  const loadFournisseurs = async () => {
    try {
      console.log('🔄 [BDC] Chargement des fournisseurs');
      const fournisseursData = await getFournisseursActifs();
      console.log('🏢 [BDC] Fournisseurs chargés:', fournisseursData);
      setFournisseurs(fournisseursData || []);
    } catch (error) {
      console.error('❌ [BDC] Erreur lors du chargement des fournisseurs:', error);
    }
  };

  // Ouvrir le modal de création
  const handleCreateBdc = () => {
    console.log('➕ [BDC] Ouverture du modal de création');
    setEditingBdc(null);
    form.reset();
    setShowModal(true);
  };

  // Créer ou modifier un BDC
  const handleSubmitBdc = async (values) => {
    try {
      setSubmitting(true);
      console.log('💾 [BDC] Sauvegarde BDC:', values);
      
      const bdcData = {
        ...values,
        affaireId: affaireId,
        dateBdc: values.dateBdc instanceof Date ? values.dateBdc : new Date(values.dateBdc)
      };

      console.log('📤 [BDC] Données à envoyer:', bdcData);

      if (editingBdc) {
        await updateBdc(editingBdc.id, bdcData);
        toast.success('BDC modifié avec succès !');
        console.log('✅ [BDC] BDC modifié');
      } else {
        const result = await createBdc(bdcData);
        toast.success('BDC créé avec succès !');
        console.log('✅ [BDC] BDC créé:', result);
      }

      await loadBdcs();
      handleCloseModal();
      
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('❌ [BDC] Erreur lors de la sauvegarde du BDC:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Erreur lors de la sauvegarde du BDC';
      toast.error(`Erreur: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Fermer le modal
  const handleCloseModal = () => {
    console.log('❌ [BDC] Fermeture du modal');
    setShowModal(false);
    setEditingBdc(null);
    form.reset();
  };

  // Supprimer un BDC
  const handleDeleteBdc = async (bdcId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce BDC ?')) {
      return;
    }

    try {
      await deleteBdc(bdcId);
      setBdcs(bdcs.filter(bdc => bdc.id !== bdcId));
      toast.success('BDC supprimé avec succès !');
      
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('❌ [BDC] Erreur suppression BDC:', error);
      
      // Gestion spécifique de l'erreur 400 (mot de passe requis)
      if (error.response?.status === 400) {
        const errorMessage = error.response?.data?.message || error.message || '';
        const errorMessageStr = String(errorMessage); // Convertir en string pour éviter l'erreur toLowerCase
        
        if (errorMessageStr.toLowerCase().includes('mot de passe')) {
          const password = prompt('Ce BDC est validé. Entrez le mot de passe pour le supprimer (défaut: 1234):');
          
          if (password !== null) {
            try {
              await deleteBdc(bdcId, password);
              setBdcs(bdcs.filter(bdc => bdc.id !== bdcId));
              toast.success('BDC supprimé avec succès !');
              
              if (onUpdate) {
                onUpdate();
              }
            } catch (passwordError) {
              console.error('❌ [BDC] Erreur suppression avec mot de passe:', passwordError);
              if (passwordError.response?.status === 401) {
                toast.error('Mot de passe incorrect');
              } else {
                const passwordErrorMessage = passwordError.response?.data?.message || passwordError.message || 'Erreur inconnue';
                toast.error('Erreur lors de la suppression avec mot de passe: ' + passwordErrorMessage);
              }
            }
          }
        } else {
          toast.error('Erreur lors de la suppression: ' + errorMessageStr);
        }
      } else {
        const generalErrorMessage = error.response?.data?.message || error.message || 'Erreur inconnue';
        toast.error('Erreur lors de la suppression du BDC: ' + generalErrorMessage);
      }
    }
  };

  // Éditer un BDC
  const handleEditBdc = (bdc) => {
    setEditingBdc(bdc);
    form.setValues({
      fournisseur: bdc.fournisseur,
      montantHt: bdc.montantHt,
      dateBdc: new Date(bdc.dateBdc),
      dateLivraison: bdc.dateLivraison ? new Date(bdc.dateLivraison) : null,
      categorieId: bdc.categorieId?.toString(),
      commentaire: bdc.commentaire || ''
    });
    setShowModal(true);
  };

  // Valider un BDC
  const handleValidateBdc = async (bdcId) => {
    try {
      await validerBdc(bdcId);
      toast.success('BDC validé avec succès');
      await loadBdcs(); // Recharger la liste
      
      // Notifier les composants parents pour rafraîchir les données financières
      if (onUpdate) {
        onUpdate();
      }
      
      // Émettre un événement global pour rafraîchir toute l'interface
      window.dispatchEvent(new CustomEvent('bdc_updated', { 
        detail: { action: 'validate', bdcId, affaireId } 
      }));
      window.dispatchEvent(new CustomEvent('affaire_updated', { 
        detail: { affaireId } 
      }));
      
    } catch (error) {
      console.error('Erreur lors de la validation du BDC:', error);
      toast.error('Erreur lors de la validation du BDC');
    }
  };

  // Annuler un BDC
  const handleCancelBdc = async (bdcId) => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler ce BDC ?')) {
      try {
        await annulerBdc(bdcId);
        toast.success('BDC annulé avec succès');
        await loadBdcs(); // Recharger la liste
        
        // Notifier les composants parents
        if (onUpdate) {
          onUpdate();
        }
        
        // Émettre un événement global
        window.dispatchEvent(new CustomEvent('bdc_updated', { 
          detail: { action: 'cancel', bdcId, affaireId } 
        }));
        window.dispatchEvent(new CustomEvent('affaire_updated', { 
          detail: { affaireId } 
        }));
        
      } catch (error) {
        console.error('Erreur lors de l\'annulation du BDC:', error);
        toast.error('Erreur lors de l\'annulation du BDC');
      }
    }
  };

  // Réceptionner un BDC
  const handleReceptionBdc = async (bdcId) => {
    try {
      await receptionnerBdc(bdcId, new Date());
      toast.success('BDC réceptionné avec succès');
      await loadBdcs(); // Recharger la liste
      
      // Notifier les composants parents
      if (onUpdate) {
        onUpdate();
      }
      
      // Émettre un événement global
      window.dispatchEvent(new CustomEvent('bdc_updated', { 
        detail: { action: 'receive', bdcId, affaireId } 
      }));
      window.dispatchEvent(new CustomEvent('affaire_updated', { 
        detail: { affaireId } 
        }));
      
    } catch (error) {
      console.error('Erreur lors de la réception du BDC:', error);
      toast.error('Erreur lors de la réception du BDC');
    }
  };

  // Gestion de l'upload PDF Firebase - Garder la même logique Firebase
  const handlePdfUploadSuccess = async (bdcId, result) => {
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
        
        await updateBdc(bdcId, updateData);
        console.log('✅ [PDF] BDC mis à jour avec succès (suppression)');
         
        // Mettre à jour l'état local
        setBdcs(prevBdcs => 
          prevBdcs.map(bdc => 
            bdc.id === bdcId 
              ? { ...bdc, ...updateData }
              : bdc
          )
        );
        
        toast.success('PDF supprimé avec succès !');
        
        if (onUpdate) {
          onUpdate();
        }
        return;
      }
      
      // Mettre à jour le BDC dans la base de données via achatService
      const updateData = {
        nomFichier: result.fileName || result.nomFichier,
        tailleFichier: parseInt(result.size || result.tailleFichier || 0), // S'assurer que c'est un entier
        dateUpload: result.uploadedAt || result.dateUpload || new Date().toISOString(),
        firebaseDownloadUrl: result.downloadURL || result.firebaseDownloadUrl,
        firebaseStoragePath: result.fullPath || result.firebaseStoragePath
      };

      console.log('📤 [PDF] Données de mise à jour PDF:', updateData);
      
      await updateBdc(bdcId, updateData);
      console.log('✅ [PDF] BDC mis à jour avec succès');
       
       // Mettre à jour l'état local
      setBdcs(prevBdcs => 
        prevBdcs.map(bdc => 
          bdc.id === bdcId 
            ? { ...bdc, ...updateData }
            : bdc
        )
      );
      
      toast.success('PDF uploadé avec succès !');
      
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('❌ [PDF] Erreur après upload:', error);
      
      // Afficher un message d'erreur plus détaillé
      let errorMessage = 'Erreur lors de la mise à jour du BDC';
      if (error.response?.data?.message) {
        errorMessage = `Erreur: ${error.response.data.message}`;
      } else if (error.response?.data?.error) {
        errorMessage = `Erreur: ${error.response.data.error}`;
      } else if (error.message) {
        errorMessage = `Erreur: ${error.message}`;
      }
      
      toast.error(errorMessage);
      
      // Log des détails pour le debugging
      if (error.response) {
        console.error('❌ [PDF] Détails de la réponse d\'erreur:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          headers: error.response.headers
        });
      }
    }
  };

  const handlePdfUploadError = (bdcId, error) => {
    console.error('Erreur upload PDF:', error);
    toast.error(`Erreur lors de l'upload: ${error.message}`);
  };



  // Fonctions Firebase
  const uploadPdfFirebase = async (bdcId, file, onProgress) => {
    // Trouver le BDC pour récupérer son numéro
    const bdc = bdcs.find(b => b.id === bdcId);
    const bdcNumero = bdc?.numero;
    
    return await firebaseStorageService.uploadBdcPdf(bdcId, file, onProgress, bdcNumero);
  };

  const deletePdfFirebase = async (bdcId, storagePath) => {
    if (storagePath) {
      await firebaseStorageService.deletePdf(storagePath);
    }
    // Ne pas appeler handlePdfDelete ici car handlePdfUploadSuccess gère déjà le cas result === null
    // La suppression sera gérée par handlePdfUploadSuccess(bdcId, null)
  };

  const getPdfViewUrlFirebase = async (bdcId, downloadUrl) => {
    return downloadUrl;
  };

  // Utilitaires de formatage
  const formatMontant = (montant) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(montant);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getStatutColor = (statut) => {
    const colors = {
      'EN_ATTENTE': 'yellow',
      'VALIDE': 'green',
      'REFUSE': 'red',
      'LIVRE': 'blue'
    };
    return colors[statut] || 'gray';
  };

  const formatStatut = (statut) => {
    const labels = {
      'EN_ATTENTE': 'En attente',
      'VALIDE': 'Validé',
      'REFUSE': 'Refusé',
      'LIVRE': 'Livré'
    };
    return labels[statut] || statut;
  };

  // Aperçu PDF avec gestion du proxy pour CORS
  const previewPdf = (bdc) => {
    console.log('🔍 Prévisualisation PDF pour BDC:', bdc.id);
    
    // FORCER l'utilisation du proxy pour Firebase (éviter CORS)
    let pdfUrl, filename;
    
    if (bdc.firebaseDownloadUrl && bdc.firebaseDownloadUrl.includes('firebasestorage.googleapis.com')) {
      console.log('🔥 Firebase détecté - FORCER le proxy pour éviter CORS');
      pdfUrl = `http://localhost:8000/api/bdc/${bdc.id}/pdf-proxy`;
      filename = bdc.nomFichier || `BDC_${bdc.numero}.pdf`;
    } else {
      console.log('📄 URL directe utilisée');
      pdfUrl = bdc.firebaseDownloadUrl;
      filename = bdc.nomFichier;
    }
    
    console.log('📄 URL finale:', pdfUrl);
    
    setSelectedPdf({ 
      url: pdfUrl, 
      filename: filename 
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-8">
          <div className="text-red-500 mb-4">
            <FileText className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Erreur de chargement
          </h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={loadBdcs}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Contenu de la section - En-tête supprimé pour éviter la duplication */}
      <div className="p-4">
        {/* Bouton de création en haut */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            {bdcs.length} BDC • Firebase Storage
          </div>
          <button
            onClick={handleCreateBdc}
            className="inline-flex items-center px-3 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau BDC
          </button>
        </div>
        {bdcs.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun bon de commande
            </h3>
            <p className="text-gray-500 mb-4">
              Commencez par créer votre premier bon de commande pour cette affaire.
            </p>
            <button
              onClick={handleCreateBdc}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Créer un BDC
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bdcs.map((bdc) => (
              <div key={bdc.id} className="border border-gray-200 rounded-lg p-6">
                {/* En-tête du BDC */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-medium text-gray-900">
                        BDC #{bdc.numero}
                      </h4>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getStatutColor(bdc.statut)}-100 text-${getStatutColor(bdc.statut)}-800`}
                      >
                        {formatStatut(bdc.statut)}
                      </span>
                    </div>
                    
                    <div className="space-y-3 text-sm text-gray-600">
                      {/* Première ligne : Montant et Date de création */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="font-medium">{formatMontant(bdc.montantHt)}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <span>Créé le {formatDate(bdc.dateBdc)}</span>
                        </div>
                      </div>
                      
                      {/* Deuxième ligne : Date de livraison et Fournisseur */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {bdc.dateLivraison ? (
                          <div className="flex items-center flex-wrap">
                            <Calendar className="w-4 h-4 mr-2 text-orange-400 flex-shrink-0" />
                            <span className="mr-2">Livraison: {formatDisplayDate(bdc.dateLivraison)}</span>
                            {(() => {
                              const style = getDeliveryDateStyle(bdc.dateLivraison);
                              return (
                                <span className={`px-2 py-1 text-xs font-bold rounded-full border-2 ${style.badge} flex-shrink-0`}>
                                  {style.text}
                                </span>
                              );
                            })()}
                          </div>
                        ) : (
                          <div></div>
                        )}
                        <div className="flex items-center">
                          <span className="font-medium mr-1">Fournisseur:</span>
                          <span className="truncate">{bdc.fournisseur}</span>
                        </div>
                      </div>
                    </div>

                    {bdc.commentaire && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{bdc.commentaire}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {/* Boutons selon le statut */}
                    {bdc.statut === 'EN_ATTENTE' && (
                      <>
                        <button
                          onClick={() => handleValidateBdc(bdc.id)}
                          className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                          title="Valider le BDC"
                        >
                          Valider
                        </button>
                        <button
                          onClick={() => handleCancelBdc(bdc.id)}
                          className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
                          title="Annuler le BDC"
                        >
                          Annuler
                        </button>
                      </>
                    )}
                    
                    {bdc.statut === 'VALIDE' && !bdc.dateReception && (
                      <button
                        onClick={() => handleReceptionBdc(bdc.id)}
                        className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors"
                        title="Réceptionner le BDC"
                      >
                        Réceptionner
                      </button>
                    )}
                    
                    {/* Boutons d'action généraux */}
                    <button
                      onClick={() => handleEditBdc(bdc)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteBdc(bdc.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Section PDF Firebase */}
                <div className="border-t pt-4">
                  <h5 className="text-sm font-medium text-gray-900 mb-3">
                    Document PDF (Firebase Storage)
                  </h5>
                  
                  <PdfUploadFirebase
                    entityId={bdc.id}
                    entityType="bdc"
                    existingFile={
                      bdc.nomFichier ? {
                        nomFichier: bdc.nomFichier,
                        tailleFichier: bdc.tailleFichier,
                        dateUpload: bdc.dateUpload,
                        firebaseDownloadUrl: bdc.firebaseDownloadUrl,
                        firebaseStoragePath: bdc.firebaseStoragePath
                      } : null
                    }
                    uploadFunction={uploadPdfFirebase}
                    deleteFunction={deletePdfFirebase}
                    getViewUrlFunction={getPdfViewUrlFirebase}
                    onUploadSuccess={(result) => handlePdfUploadSuccess(bdc.id, result)}
                    onUploadError={(error) => handlePdfUploadError(bdc.id, error)}
                    onPreview={() => previewPdf(bdc)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de création/modification de BDC */}
      <Modal
        opened={showModal}
        onClose={handleCloseModal}
        title={editingBdc ? "Modifier le BDC" : "Nouveau BDC"}
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSubmitBdc)}>
          <Stack spacing="md">
            <Select
              label="Fournisseur"
              placeholder="Sélectionner un fournisseur"
              required
              searchable
              clearable
              data={fournisseurs?.map(fournisseur => ({ 
                value: fournisseur.nom, 
                label: fournisseur.nom,
                description: [
                  fournisseur.categorie ? `Catégorie: ${fournisseur.categorie}` : null,
                  fournisseur.contact ? `Contact: ${fournisseur.contact}` : null
                ].filter(Boolean).join(' • ')
              })) || []}
              {...form.getInputProps('fournisseur')}
              onChange={(value) => {
                form.setFieldValue('fournisseur', value);
                
                // Auto-sélection de la catégorie basée sur le fournisseur
                if (value && fournisseurs && categories) {
                  const fournisseurSelectionne = fournisseurs.find(f => f.nom === value);
                  if (fournisseurSelectionne) {
                    const categorieId = findCategorieAchatForFournisseur(fournisseurSelectionne, categories);
                    if (categorieId) {
                      form.setFieldValue('categorieId', categorieId);
                      toast.success(`Catégorie automatiquement sélectionnée : ${fournisseurSelectionne.categorie}`);
                    }
                  }
                }
              }}
            />

            <NumberInput
              label="Montant HT (€)"
              placeholder="0.00"
              precision={2}
              min={0}
              required
              {...form.getInputProps('montantHt')}
            />

            <DateInput
              label="Date du BDC"
              placeholder="Sélectionner une date"
              required
              {...form.getInputProps('dateBdc')}
            />

            <DateInput
              label="Date de livraison prévue"
              placeholder="Sélectionner la date de livraison"
              description="📅 Date à laquelle vous souhaitez recevoir la commande"
              minDate={new Date()} // Empêche de sélectionner une date passée
              styles={{
                input: {
                  borderColor: form.values.dateLivraison && 
                    new Date(form.values.dateLivraison).toDateString() === new Date().toDateString() 
                    ? '#f59e0b' : undefined,
                  borderWidth: form.values.dateLivraison && 
                    new Date(form.values.dateLivraison).toDateString() === new Date().toDateString() 
                    ? '2px' : undefined,
                  backgroundColor: form.values.dateLivraison && 
                    new Date(form.values.dateLivraison).toDateString() === new Date().toDateString() 
                    ? '#fef3c7' : undefined
                }
              }}
              {...form.getInputProps('dateLivraison')}
            />

            <Select
              label="Catégorie"
              placeholder="Sélectionner une catégorie"
              required
              data={categories?.map(cat => ({ 
                value: cat.id.toString(), 
                label: cat.intitule || cat.nom || `Catégorie ${cat.id}` 
              })) || []}
              {...form.getInputProps('categorieId')}
            />

            <Textarea
              label="Commentaire"
              placeholder="Commentaire sur le BDC..."
              rows={3}
              {...form.getInputProps('commentaire')}
            />

            <Divider />

            <Group position="right">
              <Button variant="outline" onClick={handleCloseModal}>
                Annuler
              </Button>
              <Button type="submit" loading={submitting}>
                {editingBdc ? 'Modifier' : 'Créer'}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      {/* Aperçu PDF */}
      {selectedPdf && (
        <PdfViewer
          url={selectedPdf.url}
          filename={selectedPdf.filename}
          onClose={() => setSelectedPdf(null)}
        />
      )}

    </>
  );
};

export default AffaireBdcSectionReal; 

// Force refresh pour résoudre l'erreur d'export 