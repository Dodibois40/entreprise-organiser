import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Title,
  Paper,
  TextInput,
  NumberInput,
  Select,
  Textarea,
  Button,
  Group,
  Stack,
  Alert,
  LoadingOverlay,
  Grid,
  Card,
  Text,
  Badge,
  Divider
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconReceipt, IconInfoCircle, IconDeviceFloppy, IconArrowLeft } from '@tabler/icons-react';

// Services
import { createAchat, updateAchat, getAchat } from '@/services/achatService';
import { affairesService } from '@/services/affairesService';
import { getCategoriesAchat } from '@/services/categorieAchatService';
import FournisseurSelect from '@/components/affaires/FournisseurSelect';

const AchatForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [affaires, setAffaires] = useState([]);
  const [categories, setCategories] = useState([]);

  const form = useForm({
    initialValues: {
      numero: '', // Sera généré automatiquement côté backend
      fournisseur: '',
      montantHt: 0,
      dateFacture: new Date(),
      dateEcheance: null,
      affaireId: '',
      categorieId: '',
      description: '',
      numeroFacture: '',
      statut: 'RECU'
    },
    validate: {
      fournisseur: (value) => !value ? 'Le fournisseur est obligatoire' : null,
      montantHt: (value) => value <= 0 ? 'Le montant HT doit être supérieur à 0' : null,
      dateFacture: (value) => !value ? 'La date de facture est obligatoire' : null,
      affaireId: (value) => !value ? 'L\'affaire est obligatoire' : null,
      categorieId: (value) => !value ? 'La catégorie est obligatoire' : null,
      numeroFacture: (value) => !value ? 'Le numéro de facture est obligatoire' : null
    }
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setInitialLoading(true);
        
        // Charger les affaires et catégories
        const [affairesResponse, categoriesResponse] = await Promise.all([
          affairesService.getAffaires({ take: 1000 }),
          getCategoriesAchat()
        ]);

        setAffaires(affairesResponse.affaires || []);
        setCategories(categoriesResponse || []);

        // Si édition, charger l'achat
        if (isEditing) {
          const achat = await getAchat(id);
          form.setValues({
            numero: achat.numero,
            fournisseur: achat.fournisseur,
            montantHt: achat.montantHt,
            dateFacture: new Date(achat.dateFacture),
            dateEcheance: achat.dateEcheance ? new Date(achat.dateEcheance) : null,
            affaireId: achat.affaireId?.toString(),
            categorieId: achat.categorieId?.toString(),
            description: achat.description || '',
            numeroFacture: achat.numeroFacture,
            statut: achat.statut
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        notifications.show({
          title: 'Erreur',
          message: 'Impossible de charger les données',
          color: 'red'
        });
      } finally {
        setInitialLoading(false);
      }
    };

    loadData();
  }, [id, isEditing]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      const payload = {
        ...values,
        affaireId: parseInt(values.affaireId),
        categorieId: parseInt(values.categorieId),
        dateFacture: values.dateFacture,
        dateEcheance: values.dateEcheance
      };

      if (isEditing) {
        await updateAchat(id, payload);
        notifications.show({
          title: 'Succès',
          message: 'Facture d\'achat modifiée avec succès',
          color: 'green'
        });
      } else {
        await createAchat(payload);
        notifications.show({
          title: 'Succès',
          message: 'Facture d\'achat créée avec succès',
          color: 'green'
        });
      }
      
      navigate('/achats');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      notifications.show({
        title: 'Erreur',
        message: error.response?.data?.message || 'Erreur lors de la sauvegarde',
        color: 'red'
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Container size="md">
        <LoadingOverlay visible />
      </Container>
    );
  }

  const selectedCategorie = categories.find(cat => cat.id === parseInt(form.values.categorieId));
  const montantFg = selectedCategorie && form.values.montantHt 
    ? (form.values.montantHt * selectedCategorie.pourcentageFg / 100)
    : 0;

  return (
    <Container size="md">
      <Stack spacing="lg">
        <Group>
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={20} />}
            onClick={() => navigate('/achats')}
          >
            Retour aux achats
          </Button>
        </Group>

        <Paper shadow="sm" p="lg" radius="md" withBorder>
          <Stack spacing="md">
            <Group>
              <IconReceipt size={24} />
              <Title order={2}>
                {isEditing ? 'Modifier la facture d\'achat' : 'Créer une facture d\'achat'}
              </Title>
            </Group>

            <Alert icon={<IconInfoCircle size={16} />} color="blue">
              Utilisez ce formulaire pour saisir directement une facture d'achat sans passer par un bon de commande 
              (ex: bâche, petit matériel, achats spontanés).
            </Alert>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack spacing="md">
                <Grid>
                  <Grid.Col span={6}>
                    <TextInput
                      label="Numéro de facture fournisseur"
                      placeholder="F-2025-001"
                      required
                      {...form.getInputProps('numeroFacture')}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <FournisseurSelect
                      label="Fournisseur"
                      placeholder="Sélectionner un fournisseur"
                      required
                      {...form.getInputProps('fournisseur')}
                    />
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={6}>
                    <DateInput
                      label="Date de facture"
                      placeholder="Sélectionner une date"
                      required
                      {...form.getInputProps('dateFacture')}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <DateInput
                      label="Date d'échéance"
                      placeholder="Sélectionner une date (optionnel)"
                      {...form.getInputProps('dateEcheance')}
                    />
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={6}>
                    <Select
                      label="Affaire"
                      placeholder="Sélectionner une affaire"
                      required
                      searchable
                      data={affaires.map(affaire => ({
                        value: affaire.id.toString(),
                        label: `${affaire.numero} - ${affaire.libelle}`
                      }))}
                      {...form.getInputProps('affaireId')}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Select
                      label="Catégorie d'achat"
                      placeholder="Sélectionner une catégorie"
                      required
                      data={categories.map(cat => ({
                        value: cat.id.toString(),
                        label: `${cat.code} - ${cat.intitule}`
                      }))}
                      {...form.getInputProps('categorieId')}
                    />
                  </Grid.Col>
                </Grid>

                <NumberInput
                  label="Montant HT (€)"
                  placeholder="0.00"
                  min={0}
                  decimalScale={2}
                  fixedDecimalScale
                  required
                  {...form.getInputProps('montantHt')}
                />

                {selectedCategorie && (
                  <Card withBorder p="sm" bg="gray.0">
                    <Text size="sm" fw={500} mb="xs">Calcul automatique des frais généraux</Text>
                    <Group>
                      <Text size="sm">
                        Taux FG: <Badge size="sm">{selectedCategorie.pourcentageFg}%</Badge>
                      </Text>
                      <Text size="sm">
                        Montant FG: <Badge size="sm" color="teal">{montantFg.toFixed(2)}€</Badge>
                      </Text>
                      <Text size="sm" fw={500}>
                        Total TTC estimé: <Badge size="sm" color="blue">{(form.values.montantHt + montantFg).toFixed(2)}€</Badge>
                      </Text>
                    </Group>
                  </Card>
                )}

                <Textarea
                  label="Description / Commentaire"
                  placeholder="Description de l'achat, référence, etc."
                  rows={3}
                  {...form.getInputProps('description')}
                />

                <Select
                  label="Statut"
                  data={[
                    { value: 'RECU', label: 'Reçu' },
                    { value: 'VALIDE', label: 'Validé' },
                    { value: 'PAYE', label: 'Payé' },
                    { value: 'LITIGE', label: 'Litige' }
                  ]}
                  {...form.getInputProps('statut')}
                />

                <Divider />

                <Group justify="space-between">
                  <Button
                    variant="subtle"
                    onClick={() => navigate('/achats')}
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    loading={loading}
                    leftSection={<IconDeviceFloppy size={20} />}
                  >
                    {isEditing ? 'Modifier' : 'Créer'} la facture
                  </Button>
                </Group>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default AchatForm; 