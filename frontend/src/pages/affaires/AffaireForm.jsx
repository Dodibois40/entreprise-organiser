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
  IconClock,
  IconInfoCircle,
  IconCalculator,
  IconTrendingUp,
  IconTarget,
  IconAlertTriangle,
  IconCheck
} from '@tabler/icons-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { affairesService } from '@/services/affairesService';
import GooglePlacesAutocomplete from '@/components/common/GooglePlacesAutocomplete';
import AddressFields from '@/components/common/AddressFields';
import { validateAffaire, formatCurrency, calculateFinancialMetrics } from '@/utils/affaires';

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
    rue: '',
    codePostal: '',
    ville: '',
    pays: 'France',
    latitude: null,
    longitude: null,
    dateCommencement: '',
    dateCloturePrevue: '',
    objectifCaHt: '0',
    objectifAchatHt: '0',
    objectifHeuresFab: '0',
    objectifHeuresSer: '0',
    objectifHeuresPose: '0',
    objectifFraisGeneraux: '',
    statut: 'PLANIFIEE'
  });

  // Calculs en temps réel
  const [calculations, setCalculations] = useState({
    margePrevisionnelle: 0,
    tauxMarge: 0,
    coutHoraireMoyen: 0,
    totalHeures: 0
  });

  useEffect(() => {
    if (isEdit) {
      fetchAffaire();
    }
  }, [id]);

  useEffect(() => {
    calculateMetrics();
  }, [formData.objectifCaHt, formData.objectifAchatHt, formData.objectifHeuresFab, formData.objectifHeuresSer, formData.objectifHeuresPose, formData.objectifFraisGeneraux]);

  const calculateMetrics = () => {
    const ca = parseFloat(formData.objectifCaHt) || 0;
    const achat = parseFloat(formData.objectifAchatHt) || 0;
    const fraisGeneraux = parseFloat(formData.objectifFraisGeneraux) || 0;
    const heuresFab = parseFloat(formData.objectifHeuresFab) || 0;
    const heuresSer = parseFloat(formData.objectifHeuresSer) || 0;
    const heuresPose = parseFloat(formData.objectifHeuresPose) || 0;
    
    // Taux horaires par défaut
    const TAUX_FABRICATION = 100; // 100€ HT/h
    const TAUX_SERVICE = 75; // 75€ HT/h
    const TAUX_POSE = 50; // 50€ HT/h
    
    // Calcul du coût des heures
    const coutHeuresFab = heuresFab * TAUX_FABRICATION;
    const coutHeuresSer = heuresSer * TAUX_SERVICE;
    const coutHeuresPose = heuresPose * TAUX_POSE;
    const coutTotalHeures = coutHeuresFab + coutHeuresSer + coutHeuresPose;
    
    const totalHeures = heuresFab + heuresSer + heuresPose;
    
    // Marge = CA - Achats - Frais Généraux - Coût des Heures
    const margePrevisionnelle = ca - achat - fraisGeneraux - coutTotalHeures;
    const tauxMarge = ca > 0 ? (margePrevisionnelle / ca) * 100 : 0;
    
    // Coût horaire moyen pondéré
    const coutHoraireMoyen = totalHeures > 0 ? 
      (coutHeuresFab + coutHeuresSer + coutHeuresPose) / totalHeures : 0;

    setCalculations({
      margePrevisionnelle,
      tauxMarge,
      coutHoraireMoyen,
      totalHeures,
      coutHeuresFab,
      coutHeuresSer,
      coutHeuresPose,
      coutTotalHeures
    });
  };

  const fetchAffaire = async () => {
    try {
      setLoading(true);
              const affaire = await affairesService.getAffaireById(id);
      setFormData({
        libelle: affaire.libelle || '',
        client: affaire.client || '',
        adresse: affaire.adresse || '',
        rue: affaire.rue || '',
        codePostal: affaire.codePostal || '',
        ville: affaire.ville || '',
        pays: affaire.pays || 'France',
        latitude: affaire.latitude || null,
        longitude: affaire.longitude || null,
        dateCommencement: affaire.dateCommencement ? affaire.dateCommencement.split('T')[0] : '',
        dateCloturePrevue: affaire.dateCloturePrevue ? affaire.dateCloturePrevue.split('T')[0] : '',
        objectifCaHt: affaire.objectifCaHt || '',
        objectifAchatHt: affaire.objectifAchatHt || '',
        objectifHeuresFab: affaire.objectifHeuresFab || '',
        objectifHeuresSer: affaire.objectifHeuresSer || '',
        objectifHeuresPose: affaire.objectifHeuresPose || '',
        objectifFraisGeneraux: affaire.objectifFraisGeneraux || '',
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
    
    // Automatisation des calculs quand le CA HT change
    if (name === 'objectifCaHt' && value) {
      const caHt = parseFloat(value) || 0;
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        // Calculs automatiques basés sur le CA HT
        objectifAchatHt: Math.round(caHt * 0.20), // 20% du CA
        objectifHeuresFab: Math.round(caHt / 10000 * 24), // 24h pour 10 000€ de CA
        objectifHeuresPose: Math.round(caHt / 10000 * 16), // 16h pour 10 000€ de CA
        objectifFraisGeneraux: Math.round(caHt * 0.30) // 30% du CA
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Gestion de la sélection d'adresse depuis Google Places
  const handleAddressSelect = (addressData) => {
    setFormData(prev => ({
      ...prev,
      adresse: addressData.adresse,
      rue: addressData.rue,
      codePostal: addressData.codePostal,
      ville: addressData.ville,
      pays: addressData.pays,
      latitude: addressData.latitude,
      longitude: addressData.longitude
    }));

    // Effacer les erreurs d'adresse
    setErrors(prev => ({
      ...prev,
      adresse: '',
      rue: '',
      codePostal: '',
      ville: '',
      pays: ''
    }));
  };

  // Gestion des modifications manuelles des champs d'adresse
  const handleAddressChange = (addressData) => {
    setFormData(prev => ({
      ...prev,
      ...addressData
    }));

    // Reconstituer l'adresse complète si possible
    if (addressData.rue && addressData.codePostal && addressData.ville) {
      const adresseComplete = `${addressData.rue}, ${addressData.codePostal} ${addressData.ville}${addressData.pays ? ', ' + addressData.pays : ''}`;
      setFormData(prev => ({
        ...prev,
        adresse: adresseComplete
      }));
    }
  };

  const validateForm = () => {
    // ✅ Utilisation de la validation centralisée
    const validation = validateAffaire(formData);
    
    // Ajout des validations spécifiques au formulaire
    const additionalErrors = {};
    
    // Validation de cohérence avec les calculs
    if (calculations.tauxMarge < 10) {
      additionalErrors.marge = 'Attention : Le taux de marge est inférieur à 10%, vérifiez vos objectifs';
    }
    
    const allErrors = { ...validation.errors, ...additionalErrors };
    setErrors(allErrors);
    
    // Retourner true si valide (ignorer les warnings comme 'marge')
    return validation.isValid;
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
        rue: formData.rue || undefined,
        codePostal: formData.codePostal || undefined,
        ville: formData.ville || undefined,
        pays: formData.pays || undefined,
        latitude: formData.latitude || undefined,
        longitude: formData.longitude || undefined,
        dateCommencement: formData.dateCommencement || undefined,
        dateCloturePrevue: formData.dateCloturePrevue || undefined,
        objectifCaHt: parseFloat(formData.objectifCaHt) || 0,
        objectifAchatHt: parseFloat(formData.objectifAchatHt) || 0,
        objectifHeuresFab: parseFloat(formData.objectifHeuresFab) || 0,
        objectifHeuresSer: parseFloat(formData.objectifHeuresSer) || 0,
        objectifHeuresPose: parseFloat(formData.objectifHeuresPose) || 0,
      };
      
      // Ajouter le statut seulement lors de la modification
      if (isEdit) {
        dataToSubmit.statut = formData.statut;
      }
      
      if (isEdit) {
        await affairesService.updateAffaire(id, dataToSubmit);
        toast.success('Affaire modifiée avec succès');
        
        // Marquer qu'une affaire a été modifiée dans localStorage
        localStorage.setItem('affaire-updated', JSON.stringify({
          timestamp: Date.now(),
          affaireId: id
        }));
      } else {
        const newAffaire = await affairesService.createAffaire(dataToSubmit);
        toast.success('Affaire créée avec succès');
        
        // Marquer qu'une affaire a été créée dans localStorage
        localStorage.setItem('affaire-created', JSON.stringify({
          timestamp: Date.now(),
          affaire: newAffaire
        }));
      }
      
      // Naviguer vers la liste
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement de l'affaire...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header moderne avec couleur pastel */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl shadow-sm border border-indigo-200 dark:border-indigo-700">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/affaires')}
                variant="ghost"
                size="sm"
                className="shrink-0 bg-white/70 hover:bg-white dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
              >
                <IconArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg border border-indigo-200 dark:border-indigo-700">
                    <IconBriefcase className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  {isEdit ? 'Modifier l\'Affaire' : 'Nouvelle Affaire'}
                </h1>
                <p className="text-indigo-700 dark:text-indigo-300 mt-1 font-medium">
                  {isEdit ? 'Modifiez les informations de l\'affaire existante' : 'Créez une nouvelle affaire avec suivi automatique'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informations générales */}
              <Card className="shadow-sm border border-blue-200 dark:border-blue-700 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-900/10 dark:to-gray-800">
                <CardHeader className="border-b border-blue-200 dark:border-blue-700 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <CardTitle className="flex items-center gap-3 text-lg font-semibold text-blue-900 dark:text-blue-100">
                    <IconBriefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    Informations Générales
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Info numéro auto */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <IconInfoCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                          Numérotation automatique
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          Le numéro d'affaire sera généré automatiquement au format <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">{new Date().getFullYear().toString().slice(-2)}-BOIS-XXX</code>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date de commencement */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <IconCalendarEvent className="w-4 h-4 inline mr-1" />
                        Date de commencement
                      </label>
                      <input
                        type="date"
                        name="dateCommencement"
                        value={formData.dateCommencement}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-colors"
                      />
                    </div>

                    {/* Date de clôture prévue */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <IconCalendarEvent className="w-4 h-4 inline mr-1" />
                        Date de clôture prévue
                      </label>
                      <input
                        type="date"
                        name="dateCloturePrevue"
                        value={formData.dateCloturePrevue}
                        onChange={handleInputChange}
                        min={formData.dateCommencement || undefined}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-colors"
                      />
                      {formData.dateCommencement && formData.dateCloturePrevue && new Date(formData.dateCloturePrevue) < new Date(formData.dateCommencement) && (
                        <p className="mt-1 text-sm text-amber-600 flex items-center gap-1">
                          <IconAlertTriangle className="w-4 h-4" />
                          La date de clôture ne peut pas être antérieure à la date de commencement
                        </p>
                      )}
                      {errors.dateCloturePrevue && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <IconAlertTriangle className="w-4 h-4" />
                          {errors.dateCloturePrevue}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Statut (seulement en modification) */}
                  {isEdit && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <IconTarget className="w-4 h-4 inline mr-1" />
                          Statut de l'affaire
                        </label>
                        <select
                          name="statut"
                          value={formData.statut}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-colors"
                        >
                          <option value="PLANIFIEE">Planifiée</option>
                          <option value="EN_COURS">En cours</option>
                          <option value="TERMINEE">Terminée</option>
                          <option value="CLOTUREE">Clôturée</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Libellé */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <IconFileText className="w-4 h-4 inline mr-1" />
                      Libellé de l'affaire *
                    </label>
                    <input
                      type="text"
                      name="libelle"
                      value={formData.libelle}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-colors ${
                        errors.libelle ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="ex: Rénovation fenêtres maison individuelle"
                      required
                    />
                    {errors.libelle && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <IconAlertTriangle className="w-4 h-4" />
                        {errors.libelle}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Informations client */}
              <Card className="shadow-sm border border-emerald-200 dark:border-emerald-700 bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-900/10 dark:to-gray-800">
                <CardHeader className="border-b border-emerald-200 dark:border-emerald-700 bg-gradient-to-r from-emerald-100/50 to-green-100/50 dark:from-emerald-900/20 dark:to-green-900/20">
                  <CardTitle className="flex items-center gap-3 text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                    <IconUser className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    Informations Client
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
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
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-colors ${
                        errors.client ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="ex: M. et Mme Dupont"
                      required
                    />
                    {errors.client && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <IconAlertTriangle className="w-4 h-4" />
                        {errors.client}
                      </p>
                    )}
                  </div>

                  {/* Adresse du chantier avec Google Places */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      <IconMapPin className="w-4 h-4 inline mr-1" />
                      Adresse du chantier
                    </label>
                    
                    {/* Auto-complétion Google Places */}
                    <div className="mb-4">
                      <GooglePlacesAutocomplete
                        onAddressSelect={handleAddressSelect}
                        initialValue={formData.adresse}
                        placeholder="Tapez l'adresse du chantier..."
                        error={errors.adresse}
                      />
                    </div>

                    {/* Champs d'adresse détaillés */}
                    <AddressFields
                      addressData={formData}
                      onAddressChange={handleAddressChange}
                      errors={errors}
                      showCoordinates={true}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Objectifs financiers */}
              <Card className="shadow-sm border border-amber-200 dark:border-amber-700 bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-900/10 dark:to-gray-800">
                <CardHeader className="border-b border-amber-200 dark:border-amber-700 bg-gradient-to-r from-amber-100/50 to-orange-100/50 dark:from-amber-900/20 dark:to-orange-900/20">
                  <CardTitle className="flex items-center gap-3 text-lg font-semibold text-amber-900 dark:text-amber-100">
                    <IconCurrencyEuro className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    Objectifs Financiers & Planning
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-colors ${
                          errors.objectifCaHt ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="10000"
                        required
                      />
                      {errors.objectifCaHt && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <IconAlertTriangle className="w-4 h-4" />
                          {errors.objectifCaHt}
                        </p>
                      )}
                      {!isEdit && (
                        <p className="mt-1 text-xs text-indigo-600 flex items-center gap-1">
                          <IconInfoCircle className="w-3 h-3" />
                          Les autres champs se remplissent automatiquement
                        </p>
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
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-colors ${
                          errors.objectifAchatHt ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="8000"
                        required
                      />
                      {errors.objectifAchatHt && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <IconAlertTriangle className="w-4 h-4" />
                          {errors.objectifAchatHt}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Objectif Heures Fabrication */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <IconClock className="w-4 h-4 inline mr-1" />
                        Heures Fabrication *
                      </label>
                      <input
                        type="number"
                        name="objectifHeuresFab"
                        value={formData.objectifHeuresFab}
                        onChange={handleInputChange}
                        step="0.5"
                        min="0"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-colors ${
                          errors.objectifHeuresFab ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="120"
                        required
                      />
                      {errors.objectifHeuresFab && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <IconAlertTriangle className="w-4 h-4" />
                          {errors.objectifHeuresFab}
                        </p>
                      )}
                    </div>

                    {/* Objectif Heures Service */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <IconClock className="w-4 h-4 inline mr-1" />
                        Heures Service
                      </label>
                      <input
                        type="number"
                        name="objectifHeuresSer"
                        value={formData.objectifHeuresSer}
                        onChange={handleInputChange}
                        step="0.5"
                        min="0"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-colors ${
                          errors.objectifHeuresSer ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="15"
                      />
                      {errors.objectifHeuresSer && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <IconAlertTriangle className="w-4 h-4" />
                          {errors.objectifHeuresSer}
                        </p>
                      )}
                    </div>

                    {/* Objectif Heures Pose */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <IconClock className="w-4 h-4 inline mr-1" />
                        Heures Pose
                      </label>
                      <input
                        type="number"
                        name="objectifHeuresPose"
                        value={formData.objectifHeuresPose}
                        onChange={handleInputChange}
                        step="0.5"
                        min="0"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-colors ${
                          errors.objectifHeuresPose ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="25"
                      />
                      {errors.objectifHeuresPose && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <IconAlertTriangle className="w-4 h-4" />
                          {errors.objectifHeuresPose}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Frais Généraux */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <IconCurrencyEuro className="w-4 h-4 inline mr-1" />
                        Frais Généraux (€)
                      </label>
                      <input
                        type="number"
                        name="objectifFraisGeneraux"
                        value={formData.objectifFraisGeneraux}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-colors ${
                          errors.objectifFraisGeneraux ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="3000"
                      />
                      {errors.objectifFraisGeneraux && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <IconAlertTriangle className="w-4 h-4" />
                          {errors.objectifFraisGeneraux}
                        </p>
                      )}
                    </div>
                    
                    {/* Colonne vide pour l'alignement */}
                    <div></div>
                  </div>

                  {/* Alerte marge */}
                  {errors.marge && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <IconAlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                            Attention sur la Rentabilité
                          </h4>
                          <p className="text-sm text-amber-700 dark:text-amber-300">
                            {errors.marge}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Colonne latérale - Calculs en temps réel */}
            <div className="space-y-6">
              {/* Métriques calculées */}
              <Card className="shadow-sm border border-blue-200 dark:border-blue-700 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-900/10 dark:to-gray-800 sticky top-6">
                <CardHeader className="border-b border-blue-200 dark:border-blue-700 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <CardTitle className="flex items-center gap-3 text-lg font-semibold text-blue-900 dark:text-blue-100">
                    <IconCalculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    Calculs Prévisionnels
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  {/* Marge prévisionnelle */}
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-700">
                    <div className="flex items-center gap-3 mb-3">
                      <IconTrendingUp className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                        Marge Prévisionnelle
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-2">
                      {calculations.margePrevisionnelle.toLocaleString('fr-FR', { 
                        style: 'currency', 
                        currency: 'EUR',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded text-xs font-semibold ${
                        calculations.tauxMarge >= 20 ? 'bg-green-100 text-green-800' : 
                        calculations.tauxMarge >= 10 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {calculations.tauxMarge.toFixed(1)}%
                      </div>
                      <span className="text-xs text-emerald-700 dark:text-emerald-300">
                        Taux de marge
                      </span>
                    </div>
                  </div>

                  {/* Coût des heures */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                    <div className="flex items-center gap-3 mb-3">
                      <IconClock className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                        Coût des Heures
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-3">
                      {(calculations.coutTotalHeures || 0).toLocaleString('fr-FR', { 
                        style: 'currency', 
                        currency: 'EUR',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      })}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded border">
                        <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Fabrication</span>
                        <span className="text-xs font-semibold text-blue-900 dark:text-blue-100">
                          {formData.objectifHeuresFab || 0}h × 100€ = {(calculations.coutHeuresFab || 0).toLocaleString('fr-FR')}€
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded border">
                        <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Service</span>
                        <span className="text-xs font-semibold text-blue-900 dark:text-blue-100">
                          {formData.objectifHeuresSer || 0}h × 75€ = {(calculations.coutHeuresSer || 0).toLocaleString('fr-FR')}€
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded border">
                        <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Pose</span>
                        <span className="text-xs font-semibold text-blue-900 dark:text-blue-100">
                          {formData.objectifHeuresPose || 0}h × 50€ = {(calculations.coutHeuresPose || 0).toLocaleString('fr-FR')}€
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Total heures et coût horaire moyen */}
                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
                    <div className="flex items-center gap-3 mb-3">
                      <IconCurrencyEuro className="w-5 h-5 text-amber-600" />
                      <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                        Coût Horaire Moyen
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                      {calculations.coutHoraireMoyen.toFixed(0)}€/h
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-1 bg-amber-100 dark:bg-amber-800 rounded text-xs font-semibold text-amber-800 dark:text-amber-200">
                        {calculations.totalHeures.toFixed(1)}h total
                      </div>
                      <span className="text-xs text-amber-700 dark:text-amber-300">
                        Pondéré par taux
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informations sur le système d'avancement */}
              {!isEdit && (
                <Card className="shadow-sm border border-purple-200 dark:border-purple-700 bg-gradient-to-br from-purple-50/50 to-white dark:from-purple-900/10 dark:to-gray-800">
                  <CardHeader className="border-b border-purple-200 dark:border-purple-700 bg-gradient-to-r from-purple-100/50 to-violet-100/50 dark:from-purple-900/20 dark:to-violet-900/20">
                    <CardTitle className="flex items-center gap-3 text-lg font-semibold text-purple-900 dark:text-purple-100">
                      <IconTrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      Suivi d'Avancement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                        <IconCheck className="w-5 h-5 text-green-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                            Avancement Automatique
                          </h4>
                          <p className="text-sm text-green-700 dark:text-green-300">
                            L'avancement sera calculé automatiquement en fonction des devis marqués comme "réalisés"
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                        <IconFileText className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                            Gestion des Devis
                          </h4>
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            Créez des devis, validez-les puis marquez-les comme réalisés au fur et à mesure
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                        <IconCalculator className="w-5 h-5 text-purple-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                            Calcul Précis
                          </h4>
                          <p className="text-sm text-purple-700 dark:text-purple-300">
                            <code className="bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded text-xs">
                              Avancement = (Montant devis réalisés / Montant total devis validés) × 100
                            </code>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Actions */}
          <Card className="shadow-sm border border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    * Champs obligatoires
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/affaires')}
                    disabled={loading}
                    className="px-6 py-2"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    className="px-6 py-2"
                  >
                    <IconDeviceFloppy className="w-4 h-4 mr-2" />
                    {isEdit ? 'Modifier l\'affaire' : 'Créer l\'affaire'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default AffaireForm; 