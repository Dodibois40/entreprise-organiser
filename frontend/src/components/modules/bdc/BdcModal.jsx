import React from 'react';
import { Modal, TextInput, NumberInput, Select, Textarea, Button, Group, Stack, Divider } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { toast } from 'sonner';
import { findCategorieAchatForFournisseur } from '../../../utils/fournisseurCategories';

/**
 * Modal de formulaire réutilisable pour les BDC
 * Gérer la création et modification des bons de commande
 */
const BdcModal = ({
  opened,
  onClose,
  onSubmit,
  editingBdc = null,
  categories = [],
  fournisseurs = [],
  submitting = false,
  title = "Nouveau BDC"
}) => {
  // Formulaire pour les BDC
  const form = useForm({
    initialValues: {
      fournisseur: editingBdc?.fournisseur || '',
      montantHt: editingBdc?.montantHt || 0,
      dateBdc: editingBdc?.dateBdc ? new Date(editingBdc.dateBdc) : new Date(),
      dateLivraison: editingBdc?.dateLivraison ? new Date(editingBdc.dateLivraison) : null,
      categorieId: editingBdc?.categorieId || '',
      commentaire: editingBdc?.commentaire || ''
    },
    validate: {
      fournisseur: (value) => !value ? 'Le fournisseur est obligatoire' : null,
      montantHt: (value) => !value || value <= 0 ? 'Le montant HT doit être supérieur à 0' : null,
      categorieId: (value) => !value ? 'La catégorie est obligatoire' : null
    }
  });

  // Réinitialiser le formulaire quand on change de BDC
  React.useEffect(() => {
    if (editingBdc) {
      form.setValues({
        fournisseur: editingBdc.fournisseur || '',
        montantHt: editingBdc.montantHt || 0,
        dateBdc: editingBdc.dateBdc ? new Date(editingBdc.dateBdc) : new Date(),
        dateLivraison: editingBdc.dateLivraison ? new Date(editingBdc.dateLivraison) : null,
        categorieId: editingBdc.categorieId || '',
        commentaire: editingBdc.commentaire || ''
      });
    } else {
      form.reset();
    }
  }, [editingBdc]);

  // Gérer la soumission du formulaire
  const handleSubmit = (values) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  // Gérer la fermeture du modal
  const handleClose = () => {
    form.reset();
    if (onClose) {
      onClose();
    }
  };

  // Gérer le changement de fournisseur avec auto-sélection de catégorie
  const handleFournisseurChange = (value) => {
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
  };

  // Données pour les selects
  const fournisseursData = fournisseurs?.map(fournisseur => ({ 
    value: fournisseur.nom, 
    label: fournisseur.nom,
    description: [
      fournisseur.categorie ? `Catégorie: ${fournisseur.categorie}` : null,
      fournisseur.contact ? `Contact: ${fournisseur.contact}` : null
    ].filter(Boolean).join(' • ')
  })) || [];

  const categoriesData = categories?.map(cat => ({ 
    value: cat.id.toString(), 
    label: cat.intitule || cat.nom || `Catégorie ${cat.id}` 
  })) || [];

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={editingBdc ? "Modifier le BDC" : title}
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="md">
          {/* Information sur le numéro BDC lors de la modification */}
          {editingBdc && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Numéro de BDC :</strong> {editingBdc.numero}
              </p>
            </div>
          )}

          {/* Sélection du fournisseur */}
          <Select
            label="Fournisseur"
            placeholder="Sélectionner un fournisseur"
            required
            searchable
            clearable
            data={fournisseursData}
            {...form.getInputProps('fournisseur')}
            onChange={handleFournisseurChange}
          />

          {/* Montant HT */}
          <NumberInput
            label="Montant HT (€)"
            placeholder="0.00"
            precision={2}
            min={0}
            required
            {...form.getInputProps('montantHt')}
          />

          {/* Date du BDC */}
          <DateInput
            label="Date du BDC"
            placeholder="Sélectionner une date"
            required
            {...form.getInputProps('dateBdc')}
          />

          {/* Date de livraison prévue */}
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

          {/* Catégorie */}
          <Select
            label="Catégorie"
            placeholder="Sélectionner une catégorie"
            required
            data={categoriesData}
            {...form.getInputProps('categorieId')}
          />

          {/* Commentaire */}
          <Textarea
            label="Commentaire"
            placeholder="Commentaire sur le BDC..."
            rows={3}
            {...form.getInputProps('commentaire')}
          />

          <Divider />

          {/* Informations automatiques */}
          {!editingBdc && (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-600">
                ℹ️ Le numéro de BDC sera généré automatiquement au format : BDC-YYYY-XXX
              </p>
            </div>
          )}

          {/* Boutons d'action */}
          <Group position="right">
            <Button variant="outline" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" loading={submitting}>
              {editingBdc ? 'Modifier' : 'Créer'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default BdcModal; 