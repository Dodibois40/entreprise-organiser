import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Title, 
  Text, 
  Group, 
  Button, 
  TextInput, 
  Select, 
  Table, 
  Badge, 
  ActionIcon, 
  Menu, 
  Pagination, 
  LoadingOverlay, 
  Tooltip
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { 
  IconPlus, 
  IconSearch, 
  IconCheck, 
  IconDotsVertical, 
  IconEye, 
  IconPencil, 
  IconTrash,
  IconClock,
  IconFileInvoice,
  IconFilter
} from '@tabler/icons-react';
import { getBdcs, deleteBdc, receptionnerBdc, getAffaires } from '../../services/achatService';

const BdcList = () => {
  const navigate = useNavigate();
  const [bdcs, setBdcs] = useState([]);
  const [affaires, setAffaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    affaireId: '',
    fournisseur: ''
  });

  // Charger la liste des affaires pour le filtre
  useEffect(() => {
    const fetchAffaires = async () => {
      try {
        const data = await getAffaires();
        const formattedAffaires = data.affaires.map(affaire => ({
          value: affaire.id,
          label: `${affaire.numero} - ${affaire.libelle}`
        }));
        setAffaires(formattedAffaires);
      } catch (error) {
        console.error('Erreur lors du chargement des affaires:', error);
        notifications.show({
          title: 'Erreur',
          message: 'Impossible de charger la liste des affaires',
          color: 'red'
        });
      }
    };

    fetchAffaires();
  }, []);

  // Charger les BDCs avec pagination et filtres
  useEffect(() => {
    const fetchBdcs = async () => {
      try {
        setLoading(true);
        const skip = (currentPage - 1) * itemsPerPage;
        
        const params = {
          skip,
          take: itemsPerPage,
          ...filters
        };
        
        const response = await getBdcs(params);
        
        setBdcs(response.bdc);
        setTotalItems(response.total);
      } catch (error) {
        console.error('Erreur lors du chargement des bons de commande:', error);
        notifications.show({
          title: 'Erreur',
          message: 'Impossible de charger la liste des bons de commande',
          color: 'red'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBdcs();
  }, [currentPage, itemsPerPage, filters]);

  // Gérer la pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Appliquer les filtres
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Réinitialiser à la première page lors de l'application d'un filtre
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setFilters({
      affaireId: '',
      fournisseur: ''
    });
    setCurrentPage(1);
  };

  // Supprimer un BDC
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bon de commande ?')) {
      try {
        await deleteBdc(id);
        
        // Mettre à jour la liste
        setBdcs(bdcs.filter(bdc => bdc.id !== id));
        setTotalItems(prev => prev - 1);
        
        notifications.show({
          title: 'Succès',
          message: 'Bon de commande supprimé avec succès',
          color: 'green'
        });
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

  // Réceptionner un BDC
  const handleReception = async (id) => {
    try {
      const dateReception = new Date();
      await receptionnerBdc(id, dateReception);
      
      // Mettre à jour l'élément dans la liste
      setBdcs(bdcs.map(bdc => 
        bdc.id === id ? { ...bdc, dateReception } : bdc
      ));
      
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
  const getBadgeStatus = (bdc) => {
    if (bdc.dateReception) {
      return (
        <Badge color="green" variant="light">
          <Group spacing={4}>
            <IconCheck size={14} />
            <Text>Réceptionné</Text>
          </Group>
        </Badge>
      );
    }
    
    return (
      <Badge color="orange" variant="light">
        <Group spacing={4}>
          <IconClock size={14} />
          <Text>En attente</Text>
        </Group>
      </Badge>
    );
  };

  return (
    <Container size="xl">
      <LoadingOverlay visible={loading} overlayBlur={2} />
      
      <Group position="apart" mb="lg">
        <div>
          <Title order={2}>Bons de commande</Title>
          <Text c="dimmed">Gestion des bons de commande fournisseurs</Text>
        </div>
        <Button 
          component={Link} 
          to="/bdc/nouveau" 
          leftIcon={<IconPlus size={16} />}
        >
          Nouveau BDC
        </Button>
      </Group>
      
      {/* Filtres */}
      <Group mb="md" position="apart">
        <Group>
          <Select 
            placeholder="Filtrer par affaire"
            clearable
            data={affaires}
            value={filters.affaireId}
            onChange={(value) => handleFilterChange('affaireId', value)}
            icon={<IconFilter size={16} />}
            sx={{ width: 260 }}
          />
          
          <TextInput 
            placeholder="Rechercher par fournisseur"
            value={filters.fournisseur}
            onChange={(e) => handleFilterChange('fournisseur', e.target.value)}
            icon={<IconSearch size={16} />}
            sx={{ width: 220 }}
          />
        </Group>
        
        <Button 
          variant="subtle" 
          onClick={resetFilters}
          disabled={!filters.affaireId && !filters.fournisseur}
        >
          Réinitialiser
        </Button>
      </Group>
      
      {/* Liste des BDCs */}
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Affaire</th>
            <th>Fournisseur</th>
            <th>Montant HT</th>
            <th>Date BDC</th>
            <th>Statut</th>
            <th style={{ width: 100, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bdcs.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: '20px 0' }}>
                <Text color="dimmed">Aucun bon de commande trouvé</Text>
              </td>
            </tr>
          ) : (
            bdcs.map((bdc) => (
              <tr key={bdc.id}>
                <td>
                  <Group spacing="xs">
                    <IconFileInvoice size={16} />
                    <Text>{bdc.numero}</Text>
                  </Group>
                </td>
                <td>{bdc.affaire?.numero}</td>
                <td>{bdc.fournisseur}</td>
                <td>{bdc.montantHt.toLocaleString('fr-FR')} €</td>
                <td>{bdc.dateBdc ? new Date(bdc.dateBdc).toLocaleDateString('fr-FR') : '-'}</td>
                <td>{getBadgeStatus(bdc)}</td>
                <td>
                  <Group spacing={0} position="right">
                    <Menu position="bottom-end" withinPortal>
                      <Menu.Target>
                        <ActionIcon>
                          <IconDotsVertical size={16} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item 
                          icon={<IconEye size={16} />}
                          onClick={() => navigate(`/bdc/${bdc.id}`)}
                        >
                          Détails
                        </Menu.Item>
                        <Menu.Item 
                          icon={<IconPencil size={16} />}
                          onClick={() => navigate(`/bdc/${bdc.id}/modifier`)}
                        >
                          Modifier
                        </Menu.Item>
                        {!bdc.dateReception && (
                          <Menu.Item 
                            icon={<IconCheck size={16} />}
                            onClick={() => handleReception(bdc.id)}
                            color="green"
                          >
                            Réceptionner
                          </Menu.Item>
                        )}
                        <Menu.Divider />
                        <Menu.Item 
                          icon={<IconTrash size={16} />}
                          onClick={() => handleDelete(bdc.id)}
                          color="red"
                        >
                          Supprimer
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      
      {/* Pagination */}
      {totalItems > 0 && (
        <Group position="apart" mt="xl">
          <Text size="sm" color="dimmed">
            Affichage de {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} à {Math.min(currentPage * itemsPerPage, totalItems)} sur {totalItems} bons de commande
          </Text>
          <Pagination 
            total={Math.ceil(totalItems / itemsPerPage)} 
            page={currentPage}
            onChange={handlePageChange}
          />
        </Group>
      )}
    </Container>
  );
};

export default BdcList; 