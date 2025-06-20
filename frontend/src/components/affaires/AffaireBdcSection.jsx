import React, { useState, useEffect } from 'react';
import {
  Card,
  Title,
  Stack,
  Text,
  Badge,
  Group,
  Button,
  Alert,
  ActionIcon,
  Modal,
  TextInput,
  Select,
  Textarea,
  NumberInput,
  Divider,
  Tooltip,
  Menu,
  Loader
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import {
  IconFileText,
  IconPlus,
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconEdit,
  IconTrash,
  IconX,
  IconClock,
  IconTruck,
  IconFile,
  IconUpload,
  IconCalendar,
  IconDotsVertical,
  IconEye
} from '@tabler/icons-react';
import { toast } from 'sonner';
import { getBdcs, createBdc, receptionnerBdc, validerBdc, annulerBdc, deleteBdc } from '@/services/achatService';
import { getFournisseursActifs } from '@/services/fournisseurService';
import { findCategorieAchatForFournisseur } from '@/utils/fournisseurCategories';
import { getDeliveryDateStyle, formatDisplayDate } from '@/utils/dateHelpers';
import bdcService from '@/services/bdcService';
import PdfUpload from '@/components/ui/pdf-upload';
import PdfPreviewModal from '@/components/ui/pdf-preview-modal';
import { PasswordModal } from '../ui/password-modal';

const AffaireBdcSection = ({ affaire, categoriesAchat, onDataChanged }) => {
  const [bdcs, setBdcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingBdc, setEditingBdc] = useState(null);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [previewModal, setPreviewModal] = useState({
    isOpen: false,
    bdcId: null,
    bdcInfo: null
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [bdcToDelete, setBdcToDelete] = useState(null);
  const [deletingBdc, setDeletingBdc] = useState(false);

  // Debug des catégories
  console.log('🔍 [AffaireBdcSection] Catégories reçues:', categoriesAchat);

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

  // Chargement des BDC
  const loadBdcs = async () => {
    try {
      setLoading(true);
      const response = await getBdcs({ affaireId: affaire.id });
      
      let bdcsList = [];
      if (response?.bdc) {
        bdcsList = response.bdc;
      } else if (response?.bdcs) {
        bdcsList = response.bdcs;
      } else if (Array.isArray(response)) {
        bdcsList = response;
      } else {
        console.warn('Format de réponse BDC inattendu:', response);
        bdcsList = [];
      }
      
      setBdcs(bdcsList);
    } catch (error) {
      console.error('Erreur lors du chargement des BDC:', error);
      toast.error('Erreur lors du chargement des bons de commande');
      setBdcs([]);
    } finally {
      setLoading(false);
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

  // Effet de chargement initial
  useEffect(() => {
    if (affaire?.id) {
      loadBdcs();
    }
    loadFournisseurs();
  }, [affaire?.id]);

  // Création d'un BDC
  const handleCreate = async (values) => {
    try {
      setSubmitting(true);
      
      const bdcData = {
        ...values,
        affaireId: affaire.id,
        dateBdc: values.dateBdc.toISOString()
      };

      await createBdc(bdcData);
      toast.success('BDC créé avec succès');

      await loadBdcs();
      handleCloseModal();
      
      if (onDataChanged) {
        onDataChanged();
      }
    } catch (error) {
      console.error('Erreur lors de la création du BDC:', error);
      toast.error('Erreur lors de la création du BDC');
    } finally {
      setSubmitting(false);
    }
  };

  // Réception d'un BDC
  const handleReception = async (bdcId) => {
    try {
      await receptionnerBdc(bdcId, new Date());
      toast.success('BDC réceptionné avec succès');
      await loadBdcs();
      
      if (onDataChanged) {
        onDataChanged();
      }
    } catch (error) {
      console.error('Erreur lors de la réception du BDC:', error);
      toast.error('Erreur lors de la réception du BDC');
    }
  };

  // Validation d'un BDC
  const handleValidation = async (bdcId) => {
    try {
      await validerBdc(bdcId);
      toast.success('BDC validé avec succès');
      await loadBdcs();
      
      if (onDataChanged) {
        onDataChanged();
      }
    } catch (error) {
      console.error('Erreur lors de la validation du BDC:', error);
      toast.error('Erreur lors de la validation du BDC');
    }
  };

  // Annulation d'un BDC
  const handleAnnulation = async (bdcId) => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler ce bon de commande ?')) {
      try {
        await annulerBdc(bdcId);
        toast.success('BDC annulé avec succès');
        await loadBdcs();
        
        if (onDataChanged) {
          onDataChanged();
        }
      } catch (error) {
        console.error('Erreur lors de l\'annulation du BDC:', error);
        toast.error('Erreur lors de l\'annulation du BDC');
      }
    }
  };

  // Fermeture du modal
  const handleCloseModal = () => {
    setShowModal(false);
    form.reset();
  };

  // Gestion de la prévisualisation PDF
  const handlePreviewPdf = (bdc) => {
    setPreviewModal({
      isOpen: true,
      bdcId: bdc.id,
      bdcInfo: bdc
    });
  };

  const closePreviewModal = () => {
    setPreviewModal({
      isOpen: false,
      bdcId: null,
      bdcInfo: null
    });
  };

  // Formatage de la devise
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount || 0);
  };

  // Formatage de la date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR');
  };

  // Fonction pour obtenir le badge de statut
  const getStatusBadge = (bdc) => {
    const statusConfig = {
      'EN_ATTENTE': { 
        color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300', 
        text: 'En attente' 
      },
      'VALIDE': { 
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', 
        text: 'Validé' 
      },
      'RECEPTIONNE': { 
        color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', 
        text: 'Réceptionné' 
      },
      'ANNULE': { 
        color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', 
        text: 'Annulé' 
      }
    };

    // Priorité : dateReception > statut
    if (bdc.dateReception) {
      const config = statusConfig['RECEPTIONNE'];
      return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
          {config.text}
        </span>
      );
    }

    const config = statusConfig[bdc.statut] || statusConfig['EN_ATTENTE'];
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const handleEdit = (bdc) => {
    setEditingBdc(bdc);
    form.setValues({
      fournisseur: bdc.fournisseur,
      montantHt: bdc.montantHt,
      dateBdc: new Date(bdc.dateBdc),
      dateLivraison: bdc.dateLivraison ? new Date(bdc.dateLivraison) : null,
      categorieId: bdc.categorieId,
      commentaire: bdc.commentaire
    });
    setShowModal(true);
  };

  const handleDelete = async (bdcId) => {
    const bdc = bdcs.find(b => b.id === bdcId);
    
    // Si le BDC est validé, demander le mot de passe
    if (bdc && bdc.statut === 'VALIDE') {
      setBdcToDelete(bdcId);
      setShowPasswordModal(true);
    } else {
      // Suppression normale pour les BDC non validés
      if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bon de commande ?')) {
        await performDelete(bdcId);
      }
    }
  };

  const performDelete = async (bdcId, password = null) => {
    try {
      setDeletingBdc(true);
      await deleteBdc(bdcId, password);
      toast.success('BDC supprimé avec succès');
      await loadBdcs();
      
      if (onDataChanged) {
        onDataChanged();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du BDC:', error);
      
      if (error.response?.status === 400) {
        toast.error('Un mot de passe est requis pour supprimer un BDC validé');
      } else if (error.response?.status === 401) {
        toast.error('Mot de passe incorrect');
      } else {
        toast.error('Erreur lors de la suppression du BDC');
      }
    } finally {
      setDeletingBdc(false);
      setShowPasswordModal(false);
      setBdcToDelete(null);
    }
  };

  const handlePasswordConfirm = (password) => {
    if (bdcToDelete) {
      performDelete(bdcToDelete, password);
    }
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
    setBdcToDelete(null);
  };

  const handleSuccess = () => {
    handleCloseModal();
    if (onDataChanged) {
      onDataChanged();
    }
  };

  if (loading) {
    return (
      <Card withBorder>
        <Text ta="center" p="md">Chargement des bons de commande...</Text>
      </Card>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header standardisé */}
      <div 
        className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <IconFileText className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Bons de Commande</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {bdcs.length} total • {bdcs.filter(b => b.statut === 'RECEPTIONNE').length} réceptionnés
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-medium rounded-full">
              BDC
          </span>
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
            {bdcs.filter(b => b.statut === 'EMIS').length} TOTAL • {bdcs.filter(b => b.statut === 'RECEPTIONNE').length} RÉCEPTIONNÉS
          </span>
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
            {collapsed ? (
              <IconChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <IconChevronUp className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* Contenu avec hauteur fixe pour cohérence */}
      <div className={`transition-all duration-300 ${collapsed ? 'h-0 overflow-hidden' : 'h-96 overflow-y-auto flex-1'}`}>
        <div className="p-4 h-full">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
            {/* Bouton Nouveau BDC */}
              <button
                onClick={() => setShowModal(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
              >
                <IconPlus className="w-4 h-4" />
                Nouveau BDC
              </button>

            {/* Liste des BDC */}
              {bdcs.length === 0 ? (
                <div className="text-center py-8">
                  <IconFileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun BDC</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Créez votre premier bon de commande pour cette affaire.
                  </p>
                </div>
                ) : (
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {bdcs.map((bdc) => (
                      <div key={bdc.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow">
                        {/* En-tête avec numéro et statut */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                              <IconFileText className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                BDC #{bdc.numero}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(bdc.dateBdc)}
                              </p>
                            </div>
                          </div>
                          {getStatusBadge(bdc)}
                        </div>

                        {/* Informations principales */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Fournisseur</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{bdc.fournisseur}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Montant HT</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(bdc.montantHt)}</p>
                          </div>
                        </div>

                        {/* Date de livraison si présente */}
                        {bdc.dateLivraison && (
                          <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <IconCalendar className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                <span className="text-sm font-medium text-orange-900 dark:text-orange-200">
                                  Livraison: {formatDisplayDate(bdc.dateLivraison)}
                                </span>
                              </div>
                              {(() => {
                                const style = getDeliveryDateStyle(bdc.dateLivraison);
                                return (
                                  <span className={`px-2 py-1 text-xs font-bold rounded-full border-2 ${style.badge} flex-shrink-0`}>
                                    {style.text}
                                  </span>
                                );
                              })()}
                            </div>
                          </div>
                        )}

                        {/* Actions - Séparées en deux lignes pour plus de clarté */}
                        <div className="space-y-2">
                          {/* Ligne 1: Actions de statut */}
                          {(bdc.statut === 'EN_ATTENTE' || bdc.statut === 'VALIDE') && !bdc.dateReception && (
                            <div className="flex gap-2">
                              {bdc.statut === 'EN_ATTENTE' && (
                                <>
                                  <button
                                    onClick={() => handleValidation(bdc.id)}
                                    className="flex-1 px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-300 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                                    title="Valider le BDC"
                                  >
                                    <IconCheck className="w-4 h-4" />
                                    Valider
                                  </button>
                                  <button
                                    onClick={() => handleAnnulation(bdc.id)}
                                    className="flex-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-300 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                                    title="Annuler le BDC"
                                  >
                                    <IconX className="w-4 h-4" />
                                    Annuler
                                  </button>
                                </>
                              )}
                              
                              {bdc.statut === 'VALIDE' && (
                                <button
                                  onClick={() => handleReception(bdc.id)}
                                  className="flex-1 px-3 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 dark:bg-orange-900/30 dark:hover:bg-orange-900/50 dark:text-orange-300 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                                  title="Réceptionner le BDC"
                                >
                                  <IconTruck className="w-4 h-4" />
                                  Réceptionner
                                </button>
                              )}
                            </div>
                          )}
                          
                          {/* Ligne 2: Actions communes (modifier/supprimer) */}
                          <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-600">
                            <button
                              onClick={() => handleEdit(bdc)}
                              className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-300 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                              title="Modifier le BDC"
                            >
                              <IconEdit className="w-4 h-4" />
                              Modifier
                            </button>
                            <button
                              onClick={() => handleDelete(bdc.id)}
                              className="flex-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-300 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                              title="Supprimer le BDC"
                            >
                              <IconTrash className="w-4 h-4" />
                              Supprimer
                            </button>
                          </div>
                        </div>

                        {/* Section PDF Upload */}
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                            <IconFile className="w-4 h-4" />
                            📄 Fichier PDF du BDC
                          </h5>
                          <PdfUpload
                            devisId={bdc.id}
                            currentFile={bdc}
                            onFileUploaded={(updatedBdc) => {
                              // Mettre à jour le BDC dans la liste
                              setBdcs(prev => prev.map(b => 
                                b.id === bdc.id ? { ...b, ...updatedBdc } : b
                              ));
                            }}
                            onFileDeleted={() => {
                              // Mettre à jour le BDC dans la liste pour supprimer les références au fichier
                              setBdcs(prev => prev.map(b => 
                                b.id === bdc.id 
                                  ? { 
                                      ...b, 
                                      fichierPdf: null, 
                                      nomFichier: null, 
                                      tailleFichier: null, 
                                      dateUpload: null 
                                    } 
                                  : b
                              ));
                            }}
                            onPreviewRequested={() => handlePreviewPdf(bdc)}
                            apiService={bdcService}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
        )}
        </div>
      </div>

      {/* Modal pour créer/modifier un BDC */}
      <Modal
        opened={showModal}
        onClose={handleCloseModal}
        title={editingBdc ? "Modifier le BDC" : "Nouveau BDC"}
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleCreate)}>
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
                if (value && fournisseurs && categoriesAchat) {
                  const fournisseurSelectionne = fournisseurs.find(f => f.nom === value);
                  if (fournisseurSelectionne) {
                    const categorieId = findCategorieAchatForFournisseur(fournisseurSelectionne, categoriesAchat);
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
              data={categoriesAchat?.map(cat => ({ 
                value: cat.id.toString(), 
                label: cat.nom || cat.intitule || cat.libelle || `Catégorie ${cat.id}` 
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

      {/* Modal de prévisualisation PDF */}
      <PdfPreviewModal
        isOpen={previewModal.isOpen}
        onClose={closePreviewModal}
        devisId={previewModal.bdcId}
        fileName={previewModal.bdcInfo?.nomFichier}
        devisInfo={previewModal.bdcInfo}
        apiService={bdcService}
      />

      {/* Modal de mot de passe */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={handlePasswordModalClose}
        onConfirm={handlePasswordConfirm}
        title="Suppression d'un BDC validé"
        message="Ce bon de commande est validé. Un mot de passe administrateur est requis pour le supprimer."
        loading={deletingBdc}
      />
    </div>
  );
};

export default AffaireBdcSection; 