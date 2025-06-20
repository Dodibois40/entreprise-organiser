import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  IconFileInvoice,
  IconPlus,
  IconCheck,
  IconX,
  IconEye,
  IconEdit,
  IconTrash,
  IconLoader,
  IconAlertCircle,
  IconFile,
  IconUpload
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import PdfUpload from '@/components/ui/pdf-upload';
import PdfPreviewModal from '@/components/ui/pdf-preview-modal';
import SmartPdfViewer from '@/components/ui/SmartPdfViewer';
import devisService from '@/services/devisService';
import { affairesService } from '@/services/affairesService';

const AffaireDevis = ({ affaireId, onDevisValidated, onDevisChanged }) => {
  const [devis, setDevis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    libelle: '',
    description: '',
    montantHt: '',
    dateValidite: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    commentaire: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [previewModal, setPreviewModal] = useState({
    isOpen: false,
    devisId: null,
    devisInfo: null
  });

  useEffect(() => {
    fetchDevis();
  }, [affaireId]);

  const fetchDevis = async () => {
    try {
      setLoading(true);
      const response = await devisService.getDevisByAffaire(affaireId);
      setDevis(response.data || response || []);
    } catch (error) {
      console.error('Erreur lors du chargement des devis:', error);
      toast.error('Erreur lors du chargement des devis');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.libelle.trim()) {
      toast.error('Le libellé est obligatoire');
      return;
    }
    
    if (!formData.montantHt || parseFloat(formData.montantHt) <= 0) {
      toast.error('Le montant HT doit être supérieur à 0');
      return;
    }

    try {
      setSubmitting(true);
      
      const devisData = {
        libelle: formData.libelle.trim(),
        description: formData.description.trim(),
        montantHt: parseFloat(formData.montantHt),
        dateValidite: new Date(formData.dateValidite),
        affaireId: affaireId,
        commentaire: formData.commentaire?.trim() || ''
      };

      await devisService.createDevis(devisData);
      toast.success('Devis créé avec succès');
      
      // Reset form
      setFormData({
        libelle: '',
        description: '',
        montantHt: '',
        dateValidite: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        commentaire: ''
      });
      setShowForm(false);
      
      // Refresh devis list
      fetchDevis();
      
      // Notifier le parent que les devis ont changé
      if (onDevisChanged) {
        onDevisChanged();
      }
    } catch (error) {
      console.error('Erreur lors de la création du devis:', error);
      toast.error('Erreur lors de la création du devis');
    } finally {
      setSubmitting(false);
    }
  };

  const handleValidateDevis = async (devisId) => {
    try {
      await devisService.updateStatutDevis(devisId, 'VALIDE');
      toast.success('Devis validé avec succès');
      fetchDevis();
      
      // Recalculer les données réelles de l'affaire
      if (onDevisValidated) {
        onDevisValidated();
      }
      
      // Notifier le parent que les devis ont changé
      if (onDevisChanged) {
        onDevisChanged();
      }
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      toast.error('Erreur lors de la validation du devis');
    }
  };

  const handleRejectDevis = async (devisId) => {
    try {
      await devisService.updateStatutDevis(devisId, 'REFUSE');
      toast.success('Devis refusé');
      fetchDevis();
      
      // Notifier le parent que les devis ont changé
      if (onDevisChanged) {
        onDevisChanged();
      }
    } catch (error) {
      console.error('Erreur lors du refus:', error);
      toast.error('Erreur lors du refus du devis');
    }
  };

  const handleRealiseDevis = async (devisId) => {
    try {
      await devisService.updateStatutDevis(devisId, 'REALISE');
      toast.success('Devis marqué comme réalisé - Avancement mis à jour');
      fetchDevis();
      
      // Notifier le parent que les devis ont changé (pour recalculer l'avancement)
      if (onDevisChanged) {
        onDevisChanged();
      }
    } catch (error) {
      console.error('Erreur lors du marquage réalisé:', error);
      toast.error('Erreur lors du marquage du devis comme réalisé');
    }
  };

  const handleDeleteDevis = async (devisId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce devis ?')) {
      try {
        await devisService.deleteDevis(devisId);
        toast.success('Devis supprimé avec succès');
        fetchDevis();
        
        // Notifier le parent que les devis ont changé
        if (onDevisChanged) {
          onDevisChanged();
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        toast.error('Erreur lors de la suppression du devis');
      }
    }
  };

  const handlePreviewPdf = (devisItem) => {
    setPreviewModal({
      isOpen: true,
      devisId: devisItem.id,
      devisInfo: {
        numero: devisItem.numero,
        libelle: devisItem.libelle
      }
    });
  };

  const closePreviewModal = () => {
    setPreviewModal({
      isOpen: false,
      devisId: null,
      devisInfo: null
    });
  };

  const getStatutBadge = (statut) => {
    const config = {
      'EN_ATTENTE_VALIDATION': { color: 'bg-yellow-100 text-yellow-800', text: 'En attente' },
      'VALIDE': { color: 'bg-green-100 text-green-800', text: 'Validé' },
      'REALISE': { color: 'bg-blue-100 text-blue-800', text: 'Réalisé' },
      'REFUSE': { color: 'bg-red-100 text-red-800', text: 'Refusé' },
      'EXPIRE': { color: 'bg-gray-100 text-gray-800', text: 'Expiré' }
    };
    
    const style = config[statut] || config['EN_ATTENTE_VALIDATION'];
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${style.color}`}>
        {style.text}
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

  const getTotalValidatedAmount = () => {
    return devis
      .filter(d => d.statut === 'VALIDE')
      .reduce((total, d) => total + (d.montantHt || 0), 0);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconFileInvoice className="w-5 h-5" />
            Devis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <IconLoader className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <IconFileInvoice className="w-5 h-5" />
            Devis ({devis.length})
          </CardTitle>
          <Button
            onClick={() => setShowForm(!showForm)}
            variant="primary"
            size="default"
            icon={IconPlus}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
          >
            Nouveau devis
          </Button>
        </div>
        
        {devis.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total validé :</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {formatCurrency(getTotalValidatedAmount())}
              </span>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {/* Formulaire de création */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">Nouveau devis</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Libellé *
                </label>
                <input
                  type="text"
                  name="libelle"
                  value={formData.libelle}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Installation électrique"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Montant HT (€) *
                </label>
                <input
                  type="number"
                  name="montantHt"
                  value={formData.montantHt}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date de validité *
                </label>
                <input
                  type="date"
                  name="dateValidite"
                  value={formData.dateValidite}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Description détaillée du devis..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                onClick={() => setShowForm(false)}
                variant="outline"
                size="sm"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                variant="primary"
                size="sm"
                icon={submitting ? IconLoader : IconCheck}
              >
                {submitting ? 'Création...' : 'Créer'}
              </Button>
            </div>
          </form>
        )}

        {/* Liste des devis */}
        {devis.length === 0 ? (
          <div className="text-center py-8">
            <IconFileInvoice className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun devis</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Créez votre premier devis pour cette affaire.
            </p>
            <Button
              onClick={() => setShowForm(true)}
              variant="primary"
              icon={IconPlus}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
            >
              Créer un devis
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {devis.map((devisItem) => (
              <div
                key={devisItem.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {devisItem.numero || `DEV-${devisItem.id}`}
                      </h4>
                      {getStatutBadge(devisItem.statut)}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {devisItem.libelle}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Montant HT :</span>
                        <div className="font-semibold text-green-600">
                          {formatCurrency(devisItem.montantHt)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Validité :</span>
                        <div>{formatDate(devisItem.dateValidite)}</div>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Créé le :</span>
                        <div>{formatDate(devisItem.createdAt)}</div>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Fichier PDF :</span>
                        <div className="flex items-center gap-1">
                          {devisItem.fichierPdf ? (
                            <>
                              <IconFile className="w-4 h-4 text-green-600" />
                              <span className="text-green-600 text-xs">Attaché</span>
                            </>
                          ) : (
                            <>
                              <IconUpload className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-400 text-xs">Aucun fichier</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {devisItem.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {devisItem.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {devisItem.statut === 'EN_ATTENTE_VALIDATION' && (
                      <>
                        <Button
                          onClick={() => handleValidateDevis(devisItem.id)}
                          variant="outline"
                          size="sm"
                          icon={IconCheck}
                          className="text-green-600 hover:text-green-700 border-green-300 hover:border-green-400"
                        >
                          Valider
                        </Button>
                        <Button
                          onClick={() => handleRejectDevis(devisItem.id)}
                          variant="outline"
                          size="sm"
                          icon={IconX}
                          className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                        >
                          Refuser
                        </Button>
                      </>
                    )}
                    
                    {devisItem.statut === 'VALIDE' && (
                      <Button
                        onClick={() => handleRealiseDevis(devisItem.id)}
                        variant="outline"
                        size="sm"
                        icon={IconCheck}
                        className="text-blue-600 hover:text-blue-700 border-blue-300 hover:border-blue-400"
                      >
                        Marquer réalisé
                      </Button>
                    )}
                    
                    <Button
                      onClick={() => handleDeleteDevis(devisItem.id)}
                      variant="outline"
                      size="sm"
                      icon={IconTrash}
                      className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
                
                {/* Section PDF Upload */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    📄 Fichier PDF du devis
                  </h5>
                  <PdfUpload
                    devisId={devisItem.id}
                    currentFile={devisItem}
                    onFileUploaded={(updatedDevis) => {
                      // Mettre à jour le devis dans la liste
                      setDevis(prev => prev.map(d => 
                        d.id === devisItem.id ? { ...d, ...updatedDevis } : d
                      ));
                    }}
                    onFileDeleted={() => {
                      // Mettre à jour le devis dans la liste pour supprimer les références au fichier
                      setDevis(prev => prev.map(d => 
                        d.id === devisItem.id 
                          ? { 
                              ...d, 
                              fichierPdf: null, 
                              nomFichier: null, 
                              tailleFichier: null, 
                              dateUpload: null 
                            } 
                          : d
                      ));
                    }}
                    onPreviewRequested={() => handlePreviewPdf(devisItem)}
                    apiService={devisService}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>

    {/* Modal de prévisualisation PDF */}
    <PdfPreviewModal
      isOpen={previewModal.isOpen}
      onClose={closePreviewModal}
      devisId={previewModal.devisId}
      fileName={previewModal.devisInfo?.nomFichier}
      devisInfo={previewModal.devisInfo}
    />
    </>
  );
};

export default AffaireDevis; 