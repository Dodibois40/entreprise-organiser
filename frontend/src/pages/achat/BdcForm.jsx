import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBdc, createBdc, updateBdc, getAffaires, getCategoriesAchat } from '@/services/achatService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    // numero généré automatiquement par le backend
    dateBdc: new Date().toISOString().split('T')[0],
    fournisseur: '',
    affaireId: '',
    categorieId: '',
    commentaire: '',
    montantHt: 0,
  });

  const [affaires, setAffaires] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [bdcNumero, setBdcNumero] = useState(''); // Pour afficher le numéro en mode édition

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
              // numero généré automatiquement, on ne l'affiche que pour info
              dateBdc: bdcData.dateBdc ? new Date(bdcData.dateBdc).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
              fournisseur: bdcData.fournisseur || '',
              affaireId: String(bdcData.affaireId || ''),
              categorieId: String(bdcData.categorieId || ''),
              commentaire: bdcData.commentaire || '',
              montantHt: bdcData.montantHt || 0,
            });
            
            // Stocker le numéro pour l'affichage
            setBdcNumero(bdcData.numero || '');
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
    if (!formData.categorieId) {
      newErrors.categorieId = "La catégorie est requise";
    }
    if (!formData.montantHt || parseFloat(formData.montantHt) <= 0) {
      newErrors.montantHt = "Le montant doit être supérieur à 0";
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
        montantHt: parseFloat(formData.montantHt),
        affaireId: formData.affaireId,
        categorieId: formData.categorieId,
        dateBdc: new Date(formData.dateBdc),
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
          {!isEditMode && (
            <p className="text-sm text-gray-600 mt-2">
              📝 Le numéro de BDC sera généré automatiquement au format : BDC-YYYY-XXX (ex: BDC-2025-001)
            </p>
          )}
        </CardHeader>
        <CardContent>
          {isEditMode && error && <p className="text-red-500 mb-4">Erreur: {error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            {isEditMode && bdcNumero && (
              <div>
                <Label>Numéro BDC</Label>
                <div className="p-2 bg-gray-50 border rounded-md text-gray-700 font-mono">
                  {bdcNumero}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Le numéro de BDC est généré automatiquement au format : BDC-YYYY-XXX (ex: BDC-2025-001)
                </p>
              </div>
            )}
            <div>
              <Label htmlFor="dateBdc">Date de création *</Label>
              <Input id="dateBdc" name="dateBdc" type="date" value={formData.dateBdc} onChange={handleChange} required />
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
                    <SelectItem key={affaire.id} value={String(affaire.id)}>{affaire.libelle} ({affaire.numero})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.affaireId && (
                <p className="text-red-500 text-sm mt-1">{formErrors.affaireId}</p>
              )}
            </div>

            <div>
              <Label htmlFor="categorieId">Catégorie d'achat *</Label>
              <Select name="categorieId" value={formData.categorieId} onValueChange={(value) => handleSelectChange('categorieId', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={String(cat.id)}>{cat.intitule}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.categorieId && (
                <p className="text-red-500 text-sm mt-1">{formErrors.categorieId}</p>
              )}
            </div>

            <div>
              <Label htmlFor="commentaire">Commentaire</Label>
              <Textarea id="commentaire" name="commentaire" value={formData.commentaire} onChange={handleChange} placeholder="Commentaire sur la commande..." />
            </div>

            <div>
              <Label htmlFor="montantHt">Montant HT *</Label>
              <Input id="montantHt" name="montantHt" type="number" step="0.01" value={formData.montantHt} onChange={handleChange} required placeholder="0.00" />
              {formErrors.montantHt && (
                <p className="text-red-500 text-sm mt-1">{formErrors.montantHt}</p>
              )}
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
