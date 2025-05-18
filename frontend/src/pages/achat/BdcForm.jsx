import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Container, 
  Title, 
  Group, 
  Button, 
  TextInput, 
  NumberInput, 
  Select, 
  Textarea, 
  Text, 
  Divider, 
  Paper, 
  Grid, 
  ActionIcon, 
  LoadingOverlay,
  Box
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { 
  IconArrowLeft, 
  IconDeviceFloppy, 
  IconTrash,
  IconCalculator
} from '@tabler/icons-react';
import { 
  getBdc, 
  createBdc, 
  updateBdc, 
  getAffaires, 
  getCategoriesAchat 
} from '../../services/achatService';

const BdcForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(false);
  const [affaires, setAffaires] = useState([]);
  const [categories, setCategories] = useState([]);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  
  // Formulaire avec validation
  const form = useForm({
    initialValues: {
      numero: isEditMode ? '' : `BDC-${new Date().getFullYear()}-`,
      montantHt: 0,
      affaireId: '',
      categorieId: '',
      fournisseur: '',
      dateBdc: new Date(),
      dateReception: null,
      commentaire: '',
    },
    validate: {
      numero: (value) => {
        if (!value) return 'Le numéro est requis';
        if (!/^BDC-\d{4}-\d{3}$/.test(value)) {
          return 'Format invalide. Utilisez BDC-XXXX-XXX (ex: BDC-2024-001)';
        }
        return null;
      },
      montantHt: (value) => (value < 0 ? 'Le montant ne peut pas être négatif' : null),
      affaireId: (value) => (!value ? 'L\'affaire est requise' : null),
      categorieId: (value) => (!value ? 'La catégorie est requise' : null),
      fournisseur: (value) => (!value ? 'Le fournisseur est requis' : null),
    },
  });

  // Charger les listes de référence (affaires, catégories)
  useEffect(() => {
    const fetchReferenceData = async () => {
      try {
        setLoading(true);
        
        // Charger les affaires
        const affairesData = await getAffaires();
        const formattedAffaires = affairesData.affaires.map(affaire => ({
          value: affaire.id,
          label: `${affaire.numero} - ${affaire.libelle}`,
        }));
        setAffaires(formattedAffaires);
        
        // Charger les catégories d'achat
        const categoriesData = await getCategoriesAchat();
        const formattedCategories = categoriesData.map(categorie => ({
          value: categorie.id,
          label: `${categorie.code} - ${categorie.intitule}`,
          pourcentageFg: categorie.pourcentageFg,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Erreur lors du chargement des données de référence:', error);
        notifications.show({
          title: 'Erreur',
          message: 'Impossible de charger les données de référence',
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReferenceData();
  }, []);

  // En mode édition, charger les données du BDC
  useEffect(() => {
    const fetchBdcData = async () => {
      if (!isEditMode) return;
      
      try {
        setInitialLoading(true);
        const data = await getBdc(id);
        
        // Mettre à jour le formulaire avec les données du BDC
        form.setValues({
          numero: data.numero,
          montantHt: data.montantHt,
          affaireId: data.affaireId,
          categorieId: data.categorieId,
          fournisseur: data.fournisseur,
          dateBdc: data.dateBdc ? new Date(data.dateBdc) : null,
          dateReception: data.dateReception ? new Date(data.dateReception) : null,
          commentaire: data.commentaire || '',
        });
      } catch (error) {
        console.error('Erreur lors du chargement du bon de commande:', error);
        notifications.show({
          title: 'Erreur',
          message: 'Impossible de charger le bon de commande',
          color: 'red',
        });
        navigate('/bdc');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchBdcData();
  }, [id, isEditMode, navigate]);

  // Calculer automatiquement les frais généraux (simulation)
  const calculateFraisGeneraux = () => {
    const { montantHt, categorieId } = form.values;
    if (!montantHt || !categorieId) {
      notifications.show({
        title: 'Information',
        message: 'Veuillez saisir un montant et sélectionner une catégorie pour calculer les frais généraux',
        color: 'blue',
      });
      return;
    }
    
    const selectedCategory = categories.find(cat => cat.value === categorieId);
    if (!selectedCategory) return;
    
    const pourcentage = selectedCategory.pourcentageFg;
    const montantFg = (montantHt * pourcentage) / 100;
    
    notifications.show({
      title: 'Calcul des frais généraux',
      message: `Catégorie: ${selectedCategory.label}\nPourcentage: ${pourcentage}%\nMontant FG: ${montantFg.toFixed(2)}€`,
      color: 'green',
    });
  };

  // Soumission du formulaire
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      if (isEditMode) {
        // Mettre à jour un BDC existant
        await updateBdc(id, values);
        notifications.show({
          title: 'Succès',
          message: 'Bon de commande mis à jour avec succès',
          color: 'green',
        });
      } else {
        // Créer un nouveau BDC
        await createBdc(values);
        notifications.show({
          title: 'Succès',
          message: 'Bon de commande créé avec succès',
          color: 'green',
        });
      }
      
      // Redirection vers la liste
      navigate('/bdc');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du bon de commande:', error);
      
      let errorMessage = 'Une erreur est survenue';
      if (error.response) {
        // Erreur avec réponse du serveur
        if (error.response.status === 409) {
          errorMessage = 'Un bon de commande avec ce numéro existe déjà';
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      notifications.show({
        title: 'Erreur',
        message: errorMessage,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="lg">
      <LoadingOverlay visible={initialLoading} overlayBlur={2} />
      
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group position="apart" mb="lg">
          <Group>
            <ActionIcon 
              variant="light" 
              component={Link} 
              to="/bdc" 
              size="lg"
            >
              <IconArrowLeft size={20} />
            </ActionIcon>
            <div>
              <Title order={2}>
                {isEditMode ? 'Modifier le bon de commande' : 'Nouveau bon de commande'}
              </Title>
              {isEditMode && <Text c="dimmed">{form.values.numero}</Text>}
            </div>
          </Group>
          
          <Group>
            <Button 
              type="submit" 
              loading={loading}
              leftIcon={<IconDeviceFloppy size={16} />}
            >
              Enregistrer
            </Button>
            {isEditMode && (
              <Button 
                variant="subtle" 
                component={Link} 
                to={`/bdc/${id}`}
                color="gray"
              >
                Annuler
              </Button>
            )}
          </Group>
        </Group>
        
        <Paper p="md" radius="md" withBorder>
          <Divider my="md" label="Informations générales" labelPosition="center" />
          
          <Grid columns={12} gutter="md">
            <Grid.Col span={6}>
              <TextInput 
                label="Numéro du bon de commande"
                placeholder="BDC-2024-001"
                required
                {...form.getInputProps('numero')}
              />
            </Grid.Col>
            
            <Grid.Col span={6}>
              <Group align="flex-end" spacing="xs" noWrap>
                <Box sx={{ flexGrow: 1 }}>
                  <NumberInput 
                    label="Montant HT (€)"
                    placeholder="0.00"
                    precision={2}
                    min={0}
                    required
                    {...form.getInputProps('montantHt')}
                  />
                </Box>
                <ActionIcon 
                  size="lg" 
                  variant="light" 
                  color="blue" 
                  onClick={calculateFraisGeneraux}
                  title="Calculer les frais généraux"
                >
                  <IconCalculator size={20} />
                </ActionIcon>
              </Group>
            </Grid.Col>
            
            <Grid.Col span={6}>
              <Select 
                label="Affaire"
                placeholder="Sélectionner l'affaire"
                data={affaires}
                required
                searchable
                nothingFound="Aucune affaire trouvée"
                {...form.getInputProps('affaireId')}
              />
            </Grid.Col>
            
            <Grid.Col span={6}>
              <Select 
                label="Catégorie d'achat"
                placeholder="Sélectionner la catégorie"
                data={categories}
                required
                searchable
                nothingFound="Aucune catégorie trouvée"
                {...form.getInputProps('categorieId')}
              />
            </Grid.Col>
            
            <Grid.Col span={12}>
              <TextInput 
                label="Fournisseur"
                placeholder="Nom du fournisseur"
                required
                {...form.getInputProps('fournisseur')}
              />
            </Grid.Col>
          </Grid>
          
          <Divider my="md" label="Dates et commentaires" labelPosition="center" />
          
          <Grid columns={12} gutter="md">
            <Grid.Col span={6}>
              <DateInput 
                label="Date du bon de commande"
                placeholder="Sélectionner une date"
                valueFormat="DD/MM/YYYY"
                clearable
                {...form.getInputProps('dateBdc')}
              />
            </Grid.Col>
            
            <Grid.Col span={6}>
              <DateInput 
                label="Date de réception"
                placeholder="Sélectionner une date"
                valueFormat="DD/MM/YYYY"
                clearable
                disabled={!isEditMode}
                {...form.getInputProps('dateReception')}
              />
            </Grid.Col>
            
            <Grid.Col span={12}>
              <Textarea 
                label="Commentaire"
                placeholder="Commentaire optionnel"
                minRows={3}
                {...form.getInputProps('commentaire')}
              />
            </Grid.Col>
          </Grid>
        </Paper>
      </form>
    </Container>
  );
};

export default BdcForm; 