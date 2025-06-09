import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBdc, createBdc, updateBdc, getAffaires, getCategoriesAchat } from '../../services/achatService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const BdcForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    numero: '',
    date_creation: new Date().toISOString().split('T')[0],
    fournisseur: '',
    affaireId: '',
    categorieAchatId: '',
    description: '',
    montant_ht: 0,
    statut: 'COMMANDE',
  });

  const [affaires, setAffaires] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [affairesData, categoriesData] = await Promise.all([
          getAffaires(),
          getCategoriesAchat()
        ]);
        setAffaires(affairesData?.affaires || []);
        setCategories(categoriesData || []);

        if (isEditMode) {
          const bdcData = await getBdc(id);
          if (bdcData) {
            setFormData({
              numero: bdcData.numero || '',
              date_creation: bdcData.date_creation ? new Date(bdcData.date_creation).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
              fournisseur: bdcData.fournisseur || '',
              affaireId: String(bdcData.affaireId || ''),
              categorieAchatId: String(bdcData.categorieAchatId || ''),
              description: bdcData.description || '',
              montant_ht: bdcData.montant_ht || 0,
              statut: bdcData.statut || 'COMMANDE',
            });
          } else {
            setError('BDC non trouvé');
            toast.error("Bon de commande non trouvé.");
          }
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
        setError(err.message || 'Une erreur est survenue');
        toast.error(err.message || "Impossible de charger les données pour le formulaire.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fournisseur.trim()) {
      newErrors.fournisseur = "Le fournisseur est requis";
    }
    if (!formData.affaireId) {
      newErrors.affaireId = "L'affaire est requise";
    }
    if (!formData.categorieAchatId) {
      newErrors.categorieAchatId = "La catégorie est requise";
    }
    if (!formData.montant_ht || parseFloat(formData.montant_ht) <= 0) {
      newErrors.montant_ht = "Le montant doit être supérieur à 0";
    }
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs du formulaire.");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const dataToSubmit = {
        ...formData,
        montant_ht: parseFloat(formData.montant_ht),
        affaireId: parseInt(formData.affaireId, 10),
        categorieAchatId: parseInt(formData.categorieAchatId, 10),
      };

      if (isEditMode) {
        await updateBdc(id, dataToSubmit);
        toast.success("Bon de commande mis à jour avec succès.");
      } else {
        await createBdc(dataToSubmit);
        toast.success("Bon de commande créé avec succès.");
      }
      navigate('/bdc');
    } catch (err) {
      console.error("Erreur lors de la soumission du formulaire:", err);
      setError(err.message || 'Une erreur est survenue lors de la soumission.');
      toast.error(err.message || "Impossible de sauvegarder le bon de commande.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !affaires.length && !categories.length && !isEditMode) return <p>Chargement du formulaire...</p>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? 'Modifier le Bon de Commande' : 'Créer un Bon de Commande'}</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditMode && error && <p className="text-red-500 mb-4">Erreur: {error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="numero">Numéro BDC (optionnel)</Label>
              <Input id="numero" name="numero" value={formData.numero} onChange={handleChange} placeholder="Ex: BDC00123" />
            </div>
            <div>
              <Label htmlFor="date_creation">Date de création *</Label>
              <Input id="date_creation" name="date_creation" type="date" value={formData.date_creation} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="fournisseur">Fournisseur *</Label>
              <Input id="fournisseur" name="fournisseur" value={formData.fournisseur} onChange={handleChange} required placeholder="Nom du fournisseur" />
              {formErrors.fournisseur && (
                <p className="text-red-500 text-sm mt-1">{formErrors.fournisseur}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="affaireId">Affaire *</Label>
              <Select name="affaireId" value={formData.affaireId} onValueChange={(value) => handleSelectChange('affaireId', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une affaire" />
                </SelectTrigger>
                <SelectContent>
                  {affaires.map(affaire => (
                    <SelectItem key={affaire.id} value={String(affaire.id)}>{affaire.nom} ({affaire.numero})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.affaireId && (
                <p className="text-red-500 text-sm mt-1">{formErrors.affaireId}</p>
              )}
            </div>

            <div>
              <Label htmlFor="categorieAchatId">Catégorie d'achat *</Label>
              <Select name="categorieAchatId" value={formData.categorieAchatId} onValueChange={(value) => handleSelectChange('categorieAchatId', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={String(cat.id)}>{cat.intitule}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.categorieAchatId && (
                <p className="text-red-500 text-sm mt-1">{formErrors.categorieAchatId}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Description détaillée de la commande..." />
            </div>

            <div>
              <Label htmlFor="montant_ht">Montant HT *</Label>
              <Input id="montant_ht" name="montant_ht" type="number" step="0.01" value={formData.montant_ht} onChange={handleChange} required placeholder="0.00" />
              {formErrors.montant_ht && (
                <p className="text-red-500 text-sm mt-1">{formErrors.montant_ht}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="statut">Statut</Label>
              <Select name="statut" value={formData.statut} onValueChange={(value) => handleSelectChange('statut', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="COMMANDE">Commandé</SelectItem>
                  <SelectItem value="RECEPTION_PARTIELLE">Réception Partielle</SelectItem>
                  <SelectItem value="RECEPTION_TOTALE">Réception Totale</SelectItem>
                  <SelectItem value="ANNULE">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => navigate('/bdc')} disabled={isLoading}>
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (isEditMode ? 'Sauvegarde...' : 'Création...') : (isEditMode ? 'Sauvegarder les modifications' : 'Créer le BDC')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BdcForm; 
