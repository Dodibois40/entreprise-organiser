import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  IconArrowLeft,
  IconDeviceFloppy,
  IconBriefcase,
  IconCalendarEvent,
  IconCurrencyEuro,
  IconMapPin,
  IconUser,
  IconFileText,
  IconClock
} from '@tabler/icons-react';
import { toast } from 'sonner';
import Button from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import affairesService from '../../services/affairesService';

const AffaireForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    libelle: '',
    client: '',
    adresse: '',
    dateCloturePrevue: '',
    objectifCaHt: '',
    objectifAchatHt: '',
    objectifHeuresFab: '',
    ser: 0,
    pose: 0,
    statut: 'PLANIFIEE'
  });

  useEffect(() => {
    if (isEdit) {
      fetchAffaire();
    }
  }, [id]);

  const fetchAffaire = async () => {
    try {
      setLoading(true);
      const affaire = await affairesService.getAffaire(id);
      setFormData({
        libelle: affaire.libelle || '',
        client: affaire.client || '',
        adresse: affaire.adresse || '',
        dateCloturePrevue: affaire.dateCloturePrevue ? affaire.dateCloturePrevue.split('T')[0] : '',
        objectifCaHt: affaire.objectifCaHt || '',
        objectifAchatHt: affaire.objectifAchatHt || '',
        objectifHeuresFab: affaire.objectifHeuresFab || '',
        ser: affaire.ser || 0,
        pose: affaire.pose || 0,
        statut: affaire.statut || 'PLANIFIEE'
      });
    } catch (error) {
      console.error('Erreur lors du chargement de l\'affaire:', error);
      toast.error('Erreur lors du chargement de l\'affaire');
      navigate('/affaires');
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
    
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.libelle.trim()) {
      newErrors.libelle = 'Le libellé est requis';
    }
    
    if (!formData.client.trim()) {
      newErrors.client = 'Le nom du client est requis';
    }
    
    if (!formData.objectifCaHt || formData.objectifCaHt <= 0) {
      newErrors.objectifCaHt = 'L\'objectif CA HT est requis et doit être positif';
    }
    
    if (!formData.objectifAchatHt || formData.objectifAchatHt < 0) {
      newErrors.objectifAchatHt = 'L\'objectif achat HT est requis et doit être positif ou nul';
    }
    
    if (!formData.objectifHeuresFab || formData.objectifHeuresFab < 0) {
      newErrors.objectifHeuresFab = 'L\'objectif heures fabrication est requis et doit être positif ou nul';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const dataToSubmit = {
        libelle: formData.libelle,
        client: formData.client,
        adresse: formData.adresse || undefined,
        dateCloturePrevue: formData.dateCloturePrevue || undefined,
        objectifCaHt: parseFloat(formData.objectifCaHt),
        objectifAchatHt: parseFloat(formData.objectifAchatHt),
        objectifHeuresFab: parseFloat(formData.objectifHeuresFab),
        ser: parseFloat(formData.ser) || 0,
        pose: parseFloat(formData.pose) || 0,
        statut: formData.statut
      };
      
      if (isEdit) {
        await affairesService.updateAffaire(id, dataToSubmit);
        toast.success('Affaire modifiée avec succès');
        // Déclencher un événement pour informer la liste de se recharger
        window.dispatchEvent(new CustomEvent('affaire-updated'));
      } else {
        await affairesService.createAffaire(dataToSubmit);
        toast.success('Affaire créée avec succès');
        // Déclencher un événement pour informer la liste de se recharger
        window.dispatchEvent(new CustomEvent('affaire-created'));
      }
      
      navigate('/affaires');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error(`Erreur lors de la ${isEdit ? 'modification' : 'création'} de l'affaire`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          onClick={() => navigate('/affaires')}
          variant="ghost"
          size="sm"
          icon={IconArrowLeft}
        >
          Retour
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isEdit ? 'Modifier l\'affaire' : 'Nouvelle affaire'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isEdit ? 'Modifiez les informations de l\'affaire' : 'Créez une nouvelle affaire'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations générales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconBriefcase className="w-5 h-5" />
              Informations générales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Info numéro auto */}
              <div className="md:col-span-2">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <IconBriefcase className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Le numéro d'affaire sera généré automatiquement au format {new Date().getFullYear().toString().slice(-2)}-BOIS-XXX
                    </span>
                  </div>
                </div>
              </div>

              {/* Date de clôture prévue */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date de clôture prévue
                </label>
                <input
                  type="date"
                  name="dateCloturePrevue"
                  value={formData.dateCloturePrevue}
                  onChange={handleInputChange}
                  className="modern-input"
                />
              </div>

              {/* Statut (seulement en modification) */}
              {isEdit && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Statut de l'affaire
                  </label>
                  <select
                    name="statut"
                    value={formData.statut}
                    onChange={handleInputChange}
                    className="modern-input"
                  >
                    <option value="PLANIFIEE">Planifiée</option>
                    <option value="EN_COURS">En cours</option>
                    <option value="TERMINEE">Terminée</option>
                    <option value="CLOTUREE">Clôturée</option>
                  </select>
                </div>
              )}
            </div>

            {/* Libellé */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Libellé *
              </label>
              <input
                type="text"
                name="libelle"
                value={formData.libelle}
                onChange={handleInputChange}
                className={`modern-input ${errors.libelle ? 'border-red-500' : ''}`}
                placeholder="ex: Rénovation fenêtres maison"
                required
              />
              {errors.libelle && (
                <p className="mt-1 text-sm text-red-600">{errors.libelle}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Informations client */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconUser className="w-5 h-5" />
              Informations client
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Client */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom du client *
              </label>
              <input
                type="text"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
                className={`modern-input ${errors.client ? 'border-red-500' : ''}`}
                placeholder="ex: M. Dupont"
                required
              />
              {errors.client && (
                <p className="mt-1 text-sm text-red-600">{errors.client}</p>
              )}
            </div>

            {/* Adresse du chantier */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Adresse du chantier
              </label>
              <textarea
                name="adresse"
                value={formData.adresse}
                onChange={handleInputChange}
                rows="3"
                className="modern-input"
                placeholder="123 Rue des Érables, 75000 Paris"
              />
            </div>
          </CardContent>
        </Card>

        {/* Planning et finances */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconCurrencyEuro className="w-5 h-5" />
              Planning et finances
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Objectif CA HT */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Objectif CA HT (€) *
                </label>
                <input
                  type="number"
                  name="objectifCaHt"
                  value={formData.objectifCaHt}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className={`modern-input ${errors.objectifCaHt ? 'border-red-500' : ''}`}
                  placeholder="15000"
                  required
                />
                {errors.objectifCaHt && (
                  <p className="mt-1 text-sm text-red-600">{errors.objectifCaHt}</p>
                )}
              </div>

              {/* Objectif Achat HT */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Objectif Achat HT (€) *
                </label>
                <input
                  type="number"
                  name="objectifAchatHt"
                  value={formData.objectifAchatHt}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className={`modern-input ${errors.objectifAchatHt ? 'border-red-500' : ''}`}
                  placeholder="8000"
                  required
                />
                {errors.objectifAchatHt && (
                  <p className="mt-1 text-sm text-red-600">{errors.objectifAchatHt}</p>
                )}
              </div>

              {/* Objectif Heures Fabrication */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Objectif Heures Fab. *
                </label>
                <input
                  type="number"
                  name="objectifHeuresFab"
                  value={formData.objectifHeuresFab}
                  onChange={handleInputChange}
                  step="0.5"
                  min="0"
                  className={`modern-input ${errors.objectifHeuresFab ? 'border-red-500' : ''}`}
                  placeholder="120"
                  required
                />
                {errors.objectifHeuresFab && (
                  <p className="mt-1 text-sm text-red-600">{errors.objectifHeuresFab}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Heures de service */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Heures de service
                </label>
                <input
                  type="number"
                  name="ser"
                  value={formData.ser}
                  onChange={handleInputChange}
                  step="0.5"
                  min="0"
                  className="modern-input"
                  placeholder="10"
                />
              </div>

              {/* Heures de pose */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Heures de pose
                </label>
                <input
                  type="number"
                  name="pose"
                  value={formData.pose}
                  onChange={handleInputChange}
                  step="0.5"
                  min="0"
                  className="modern-input"
                  placeholder="25"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/affaires')}
                disabled={loading}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                icon={IconDeviceFloppy}
              >
                {isEdit ? 'Modifier l\'affaire' : 'Créer l\'affaire'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default AffaireForm; 