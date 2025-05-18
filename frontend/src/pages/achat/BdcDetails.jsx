import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Card, 
  Group, 
  Title, 
  Text, 
  Divider, 
  Badge, 
  Button, 
  Grid, 
  LoadingOverlay,
  ActionIcon,
  Box,
  Paper,
  useMantineTheme
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { 
  IconArrowLeft, 
  IconPencil, 
  IconTrash, 
  IconCheck, 
  IconClock,
  IconFileInvoice,
  IconBuilding,
  IconUser,
  IconTags,
  IconCalendar,
  IconCoin,
  IconChartBar,
  IconNotes,
  IconPackage
} from '@tabler/icons-react';
import { getBdc, deleteBdc, receptionnerBdc, getStatsByAffaire } from '../../services/achatService';

const InfoItem = ({ icon, label, value, color }) => {
  const theme = useMantineTheme();
  return (
    <Group align="flex-start" spacing="xs">
      <Box mt={3} style={{ color }}>
        {icon}
      </Box>
      <div>
        <Text size="sm" c="dimmed">{label}</Text>
        <Text>{value || '-'}</Text>
      </div>
    </Group>
  );
};

const BdcDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [bdc, setBdc] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBdcDetails = async () => {
      try {
        setLoading(true);
        const data = await getBdc(id);
        setBdc(data);
        
        // Charger les statistiques de l'affaire associée
        if (data.affaire?.id) {
          const affaireStats = await getStatsByAffaire(data.affaire.id);
          setStats(affaireStats);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des détails du bon de commande:', error);
        notifications.show({
          title: 'Erreur',
          message: 'Impossible de charger les détails du bon de commande',
          color: 'red'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBdcDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bon de commande ?')) {
      try {
        await deleteBdc(id);
        notifications.show({
          title: 'Succès',
          message: 'Bon de commande supprimé avec succès',
          color: 'green'
        });
        navigate('/bdc');
      } catch (error) {
        console.error('Erreur lors de la suppression du bon de commande:', error);
        notifications.show({
          title: 'Erreur',
          message: 'Impossible de supprimer le bon de commande',
          color: 'red'
        });
      }
    }
  };

  const handleReception = async () => {
    try {
      const dateReception = new Date();
      await receptionnerBdc(id, dateReception);
      
      // Mettre à jour l'élément
      setBdc({ ...bdc, dateReception });
      
      notifications.show({
        title: 'Succès',
        message: 'Bon de commande réceptionné avec succès',
        color: 'green'
      });
    } catch (error) {
      console.error('Erreur lors de la réception du bon de commande:', error);
      notifications.show({
        title: 'Erreur',
        message: 'Impossible de réceptionner le bon de commande',
        color: 'red'
      });
    }
  };

  // Statut du BDC (badge)
  const getBadgeStatus = () => {
    if (!bdc) return null;
    
    if (bdc.dateReception) {
      return (
        <Badge color="green" size="lg" variant="light">
          <Group spacing={4}>
            <IconCheck size={16} />
            <Text>Réceptionné le {new Date(bdc.dateReception).toLocaleDateString('fr-FR')}</Text>
          </Group>
        </Badge>
      );
    }
    
    return (
      <Badge color="orange" size="lg" variant="light">
        <Group spacing={4}>
          <IconClock size={16} />
          <Text>En attente de réception</Text>
        </Group>
      </Badge>
    );
  };

  return (
    <Container size="xl">
      <LoadingOverlay visible={loading} overlayBlur={2} />
      
      <Group position="apart" mb="lg" align="center">
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
            <Title order={2}>Bon de commande</Title>
            {bdc && <Text c="dimmed">{bdc.numero}</Text>}
          </div>
        </Group>
        
        <Group>
          {bdc && !bdc.dateReception && (
            <Button 
              color="green" 
              onClick={handleReception}
              leftIcon={<IconCheck size={16} />}
            >
              Réceptionner
            </Button>
          )}
          <Button 
            variant="outline" 
            component={Link} 
            to={`/bdc/${id}/modifier`}
            leftIcon={<IconPencil size={16} />}
          >
            Modifier
          </Button>
          <Button 
            color="red" 
            variant="subtle" 
            onClick={handleDelete}
            leftIcon={<IconTrash size={16} />}
          >
            Supprimer
          </Button>
        </Group>
      </Group>
      
      {bdc && (
        <Grid>
          <Grid.Col span={8}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section withBorder p="md" bg={theme.colors.blue[0]}>
                <Group position="apart">
                  <Group>
                    <IconFileInvoice size={24} color={theme.colors.blue[6]} />
                    <Title order={3}>{bdc.numero}</Title>
                  </Group>
                  {getBadgeStatus()}
                </Group>
              </Card.Section>
              
              <Divider my="md" label="Informations générales" labelPosition="center" />
              
              <Grid columns={12}>
                <Grid.Col span={6}>
                  <InfoItem 
                    icon={<IconBuilding size={18} />} 
                    label="Affaire" 
                    value={bdc.affaire ? `${bdc.affaire.numero} - ${bdc.affaire.libelle}` : ''}
                    color={theme.colors.blue[6]}
                  />
                  <InfoItem 
                    icon={<IconTags size={18} />} 
                    label="Catégorie" 
                    value={bdc.categorie ? `${bdc.categorie.code} - ${bdc.categorie.intitule}` : ''}
                    color={theme.colors.green[6]}
                  />
                  <InfoItem 
                    icon={<IconUser size={18} />} 
                    label="Fournisseur" 
                    value={bdc.fournisseur}
                    color={theme.colors.violet[6]}
                  />
                </Grid.Col>
                
                <Grid.Col span={6}>
                  <InfoItem 
                    icon={<IconCalendar size={18} />} 
                    label="Date du BDC" 
                    value={bdc.dateBdc ? new Date(bdc.dateBdc).toLocaleDateString('fr-FR') : '-'}
                    color={theme.colors.orange[6]}
                  />
                  <InfoItem 
                    icon={<IconPackage size={18} />} 
                    label="Date de réception" 
                    value={bdc.dateReception ? new Date(bdc.dateReception).toLocaleDateString('fr-FR') : 'Non réceptionné'}
                    color={theme.colors.red[6]}
                  />
                  <InfoItem 
                    icon={<IconNotes size={18} />} 
                    label="Commentaire" 
                    value={bdc.commentaire || 'Aucun commentaire'}
                    color={theme.colors.gray[6]}
                  />
                </Grid.Col>
              </Grid>
              
              <Divider my="md" label="Montants" labelPosition="center" />
              
              <Grid columns={12}>
                <Grid.Col span={4}>
                  <Paper p="md" withBorder radius="md" bg={theme.colors.blue[0]}>
                    <InfoItem 
                      icon={<IconCoin size={20} />} 
                      label="Montant HT" 
                      value={`${bdc.montantHt.toLocaleString('fr-FR')} €`}
                      color={theme.colors.blue[6]}
                    />
                  </Paper>
                </Grid.Col>
                
                <Grid.Col span={4}>
                  <Paper p="md" withBorder radius="md" bg={theme.colors.green[0]}>
                    <InfoItem 
                      icon={<IconChartBar size={20} />} 
                      label="Frais généraux" 
                      value={`${bdc.montantFg?.toLocaleString('fr-FR') || '0'} €`}
                      color={theme.colors.green[6]}
                    />
                  </Paper>
                </Grid.Col>
                
                <Grid.Col span={4}>
                  <Paper p="md" withBorder radius="md" bg={theme.colors.orange[0]}>
                    <InfoItem 
                      icon={<IconCoin size={20} />} 
                      label="Total" 
                      value={`${(bdc.montantHt + (bdc.montantFg || 0)).toLocaleString('fr-FR')} €`}
                      color={theme.colors.orange[6]}
                    />
                  </Paper>
                </Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>
          
          <Grid.Col span={4}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section withBorder p="md" bg={theme.colors.grape[0]}>
                <Group>
                  <IconBuilding size={24} color={theme.colors.grape[6]} />
                  <Title order={3}>Statistiques affaire</Title>
                </Group>
              </Card.Section>
              
              {stats ? (
                <>
                  <Text mt="md">{stats.numeroAffaire} - {stats.libelleAffaire}</Text>
                  
                  <Divider my="md" />
                  
                  <InfoItem 
                    icon={<IconCoin size={18} />} 
                    label="Objectif achat HT" 
                    value={`${stats.objectifAchatHt.toLocaleString('fr-FR')} €`}
                    color={theme.colors.blue[6]}
                  />
                  
                  <InfoItem 
                    icon={<IconCoin size={18} />} 
                    label="Total achat HT" 
                    value={`${stats.totalMontantHt.toLocaleString('fr-FR')} €`}
                    color={theme.colors.green[6]}
                  />
                  
                  <InfoItem 
                    icon={<IconChartBar size={18} />} 
                    label="Total frais généraux" 
                    value={`${stats.totalMontantFg.toLocaleString('fr-FR')} €`}
                    color={theme.colors.orange[6]}
                  />
                  
                  <InfoItem 
                    icon={<IconChartBar size={18} />} 
                    label="Écart objectif" 
                    value={`${stats.ecartObjectif.toFixed(2)} %`}
                    color={stats.ecartObjectif > 0 ? theme.colors.red[6] : theme.colors.green[6]}
                  />
                </>
              ) : (
                <Text align="center" c="dimmed" my="md">
                  Aucune statistique disponible
                </Text>
              )}
            </Card>
          </Grid.Col>
        </Grid>
      )}
    </Container>
  );
};

export default BdcDetails; 