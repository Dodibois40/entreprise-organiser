import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Title, 
  Text, 
  Group, 
  SimpleGrid, 
  Card, 
  Button, 
  Space, 
  useMantineTheme
} from '@mantine/core';
import { IconFileInvoice, IconShoppingCart, IconCoin, IconChartBar } from '@tabler/icons-react';
import CountUp from 'react-countup';
import { getBdcs } from '../services/achatService';

const StatsCard = ({ title, value, icon, color }) => {
  const theme = useMantineTheme();
  
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Group>
        {icon && (
          <div style={{ color, backgroundColor: theme.fn.rgba(color, 0.1), borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
          </div>
        )}
        <div>
          <Text fz="lg" fw={500} c="dimmed">
            {title}
          </Text>
          <Title order={3}>
            <CountUp end={value} duration={2} separator=" " />
          </Title>
        </div>
      </Group>
    </Card>
  );
};

const Achats = () => {
  const theme = useMantineTheme();
  const [stats, setStats] = useState({
    totalBdc: 0,
    totalMontantHt: 0,
    totalMontantFg: 0,
    bdcEnAttente: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Récupérer tous les BDC pour les statistiques
        const response = await getBdcs({ take: 1000 });
        const bdcs = response.bdc;
        
        // Calculer les statistiques
        const totalBdc = bdcs.length;
        const totalMontantHt = bdcs.reduce((sum, bdc) => sum + bdc.montantHt, 0);
        const totalMontantFg = bdcs.reduce((sum, bdc) => sum + (bdc.montantFg || 0), 0);
        const bdcEnAttente = bdcs.filter(bdc => !bdc.dateReception).length;
        
        setStats({
          totalBdc,
          totalMontantHt,
          totalMontantFg,
          bdcEnAttente
        });
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques d\'achat:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Container size="xl">
      <Title order={1} mb="md">Module Achats</Title>
      <Text mb="xl">Gestion des achats et bons de commande de l'entreprise</Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
        <StatsCard 
          title="Bons de commande" 
          value={stats.totalBdc} 
          icon={<IconFileInvoice size={24} />} 
          color={theme.colors.blue[6]} 
        />
        <StatsCard 
          title="Montant total HT" 
          value={stats.totalMontantHt} 
          icon={<IconCoin size={24} />} 
          color={theme.colors.teal[6]} 
        />
        <StatsCard 
          title="Frais généraux" 
          value={stats.totalMontantFg} 
          icon={<IconChartBar size={24} />} 
          color={theme.colors.violet[6]} 
        />
        <StatsCard 
          title="En attente de réception" 
          value={stats.bdcEnAttente} 
          icon={<IconShoppingCart size={24} />} 
          color={theme.colors.orange[6]} 
        />
      </SimpleGrid>

      <Space h="xl" />

      <Group position="center" spacing="md">
        <Button 
          component={Link} 
          to="/bdc" 
          variant="filled" 
          leftIcon={<IconFileInvoice size={20} />}
        >
          Gérer les bons de commande
        </Button>
        <Button 
          component={Link} 
          to="/bdc/nouveau" 
          variant="outline" 
          leftIcon={<IconShoppingCart size={20} />}
        >
          Nouveau bon de commande
        </Button>
      </Group>
    </Container>
  );
};

export default Achats;
