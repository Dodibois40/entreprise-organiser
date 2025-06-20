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
  Tooltip,
  Card
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
  IconFilter,
  IconX
} from '@tabler/icons-react';
import { getBdcs, deleteBdc, receptionnerBdc, getAffaires, validerBdc, annulerBdc } from '@/services/achatService';
import { PasswordModal } from '../../components/ui/password-modal';

const BdcList = () => {
  console.log('🚨 [COMPOSANT ACTIF] BdcList.jsx est utilisé');
  
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
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [bdcToDelete, setBdcToDelete] = useState(null);
  const [deletingBdc, setDeletingBdc] = useState(false);

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
  const handleDelete = async (bdc) => {
    // Si le BDC est validé, demander le mot de passe
    if (bdc.statut === 'VALIDE') {
      setBdcToDelete(bdc);
      setShowPasswordModal(true);
    } else {
      // Suppression normale pour les BDC non validés
      if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bon de commande ?')) {
        await performDelete(bdc.id);
      }
    }
  };

  const performDelete = async (bdcId, password = null) => {
    try {
      setDeletingBdc(true);
      await deleteBdc(bdcId, password);
      
      // Mettre à jour la liste
      setBdcs(bdcs.filter(bdc => bdc.id !== bdcId));
      setTotalItems(prev => prev - 1);
      
      notifications.show({
        title: 'Succès',
        message: 'Bon de commande supprimé avec succès',
        color: 'green'
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du bon de commande:', error);
      
      if (error.response?.status === 400) {
        notifications.show({
          title: 'Erreur',
          message: 'Un mot de passe est requis pour supprimer un BDC validé',
          color: 'red'
        });
      } else if (error.response?.status === 401) {
        notifications.show({
          title: 'Erreur',
          message: 'Mot de passe incorrect',
          color: 'red'
        });
      } else {
        notifications.show({
          title: 'Erreur',
          message: 'Impossible de supprimer le bon de commande',
          color: 'red'
        });
      }
    } finally {
      setDeletingBdc(false);
      setShowPasswordModal(false);
      setBdcToDelete(null);
    }
  };

  const handlePasswordConfirm = (password) => {
    if (bdcToDelete) {
      performDelete(bdcToDelete.id, password);
    }
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
    setBdcToDelete(null);
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

  // Valider un BDC
  const handleValidation = async (id) => {
    try {
      await validerBdc(id);
      
      // Mettre à jour l'élément dans la liste
      setBdcs(bdcs.map(bdc => 
        bdc.id === id ? { ...bdc, statut: 'VALIDE' } : bdc
      ));
      
      notifications.show({
        title: 'Succès',
        message: 'Bon de commande validé avec succès',
        color: 'green'
      });
    } catch (error) {
      console.error('Erreur lors de la validation du bon de commande:', error);
      notifications.show({
        title: 'Erreur',
        message: 'Impossible de valider le bon de commande',
        color: 'red'
      });
    }
  };

  // Annuler un BDC
  const handleAnnulation = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler ce bon de commande ?')) {
      try {
        await annulerBdc(id);
        
        // Mettre à jour l'élément dans la liste
        setBdcs(bdcs.map(bdc => 
          bdc.id === id ? { ...bdc, statut: 'ANNULE' } : bdc
        ));
        
        notifications.show({
          title: 'Succès',
          message: 'Bon de commande annulé avec succès',
          color: 'orange'
        });
      } catch (error) {
        console.error('Erreur lors de l\'annulation du bon de commande:', error);
        notifications.show({
          title: 'Erreur',
          message: 'Impossible d\'annuler le bon de commande',
          color: 'red'
        });
      }
    }
  };

  // Statut du BDC (badge)
  const getBadgeStatus = (bdc) => {
    const statusConfig = {
      'EN_ATTENTE': { 
        color: 'orange', 
        icon: IconClock, 
        text: 'En attente' 
      },
      'VALIDE': { 
        color: 'blue', 
        icon: IconCheck, 
        text: 'Validé' 
      },
      'RECEPTIONNE': { 
        color: 'green', 
        icon: IconCheck, 
        text: 'Réceptionné' 
      },
      'ANNULE': { 
        color: 'red', 
        icon: IconX, 
        text: 'Annulé' 
      }
    };

    // Priorité : dateReception > statut
    if (bdc.dateReception) {
      const config = statusConfig['RECEPTIONNE'];
      const IconComponent = config.icon;
      return (
        <Badge color={config.color} variant="light">
          <Group spacing={4}>
            <IconComponent size={14} />
            <Text>{config.text}</Text>
          </Group>
        </Badge>
      );
    }

    const config = statusConfig[bdc.statut] || statusConfig['EN_ATTENTE'];
    const IconComponent = config.icon;
    return (
      <Badge color={config.color} variant="light">
        <Group spacing={4}>
          <IconComponent size={14} />
          <Text>{config.text}</Text>
        </Group>
      </Badge>
    );
  };

  return (
    <Container size="xl">
      <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />
      
      <Group position="apart" mb="lg">
        <div>
          <Title order={2}>Bons de commande</Title>
          <Text c="dimmed">Gestion des bons de commande fournisseurs</Text>
        </div>
        <Button 
          component={Link} 
          to="/bdc/nouveau" 
          leftSection={<IconPlus size={16} />}
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
            <th style={{ width: 200, textAlign: 'right' }}>Actions</th>
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
                    <Group spacing="xs" position="right">
                      {/* Actions selon le statut */}
                      {bdc.statut === 'EN_ATTENTE' && !bdc.dateReception && (
                        <>
                          <Tooltip label="Valider le BDC">
                            <ActionIcon
                              size="lg"
                              color="blue"
                              variant="light"
                              onClick={() => handleValidation(bdc.id)}
                            >
                              <IconCheck size={18} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Annuler le BDC">
                            <ActionIcon
                              size="lg"
                              color="red"
                              variant="light"
                              onClick={() => handleAnnulation(bdc.id)}
                            >
                              <IconX size={18} />
                            </ActionIcon>
                          </Tooltip>
                        </>
                      )}
                      
                      {bdc.statut === 'VALIDE' && !bdc.dateReception && (
                        <Tooltip label="Réceptionner le BDC">
                          <ActionIcon
                            size="lg"
                            color="green"
                            variant="light"
                            onClick={() => handleReception(bdc.id)}
                          >
                            <IconCheck size={18} />
                          </ActionIcon>
                        </Tooltip>
                      )}
                      
                      {/* Actions communes */}
                      <Tooltip label="Voir les détails">
                        <ActionIcon
                          size="lg"
                          color="gray"
                          variant="light"
                          onClick={() => navigate(`/bdc/${bdc.id}`)}
                        >
                          <IconEye size={18} />
                        </ActionIcon>
                      </Tooltip>
                      
                      <Tooltip label="Modifier">
                        <ActionIcon
                          size="lg"
                          color="blue"
                          variant="light"
                          onClick={() => navigate(`/bdc/${bdc.id}/modifier`)}
                        >
                          <IconPencil size={18} />
                        </ActionIcon>
                      </Tooltip>
                      
                      <Tooltip label="Supprimer">
                        <ActionIcon
                          size="lg"
                          color="red"
                          variant="light"
                          onClick={() => handleDelete(bdc)}
                        >
                          <IconTrash size={18} />
                        </ActionIcon>
                      </Tooltip>
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

      {/* Modal de mot de passe */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={handlePasswordModalClose}
        onConfirm={handlePasswordConfirm}
        title="Suppression d'un BDC validé"
        message={`Ce bon de commande (${bdcToDelete?.numero}) est validé. Un mot de passe administrateur est requis pour le supprimer.`}
        loading={deletingBdc}
      />
    </Container>
  );
};

export default BdcList; 