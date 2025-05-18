import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Group, Text, Alert, Loader, Box } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft, IconCheck } from '@tabler/icons-react';
import authService from '../../services/authService';

const VerifyEmail = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  
  // Vérifier le token au chargement
  useEffect(() => {
    const verifyEmailToken = async () => {
      if (!token) {
        setError('Token de vérification manquant');
        setLoading(false);
        return;
      }
      
      try {
        await authService.verifyEmail(token);
        setVerified(true);
        
        notifications.show({
          title: 'Succès',
          message: 'Votre adresse email a été vérifiée avec succès',
          color: 'green',
        });
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'email:', error);
        setError(error.message || 'Une erreur est survenue lors de la vérification de l\'email');
        
        notifications.show({
          title: 'Erreur',
          message: error.message || 'Une erreur est survenue lors de la vérification de l\'email',
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    };
    
    verifyEmailToken();
  }, [token]);
  
  // Affichage pendant le chargement
  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
        <Loader size="lg" mb="md" />
        <Text>Vérification de votre adresse email en cours...</Text>
      </Box>
    );
  }
  
  // Affichage en cas d'erreur
  if (error) {
    return (
      <Alert 
        title="Erreur lors de la vérification" 
        color="red"
        mb="md"
      >
        {error === 'Token invalide ou expiré' ? (
          <>
            <Text mb="md">Le lien de vérification est invalide ou a expiré.</Text>
            <Text mb="md">Veuillez vous connecter pour demander un nouveau lien de vérification.</Text>
          </>
        ) : (
          <Text mb="md">{error}</Text>
        )}
        
        <Group position="center" mt="xl">
          <Button 
            component={Link} 
            to="/auth/login"
            variant="light"
          >
            Aller à la page de connexion
          </Button>
        </Group>
      </Alert>
    );
  }
  
  // Affichage en cas de succès
  return (
    <Alert 
      icon={<IconCheck size={16} />}
      title="Adresse email vérifiée" 
      color="green"
      mb="md"
    >
      <Text mb="md">Votre adresse email a été vérifiée avec succès. Vous pouvez maintenant vous connecter à votre compte.</Text>
      
      <Group position="center" mt="xl">
        <Button 
          component={Link} 
          to="/auth/login" 
          leftIcon={<IconArrowLeft size={16} />}
        >
          Aller à la page de connexion
        </Button>
      </Group>
    </Alert>
  );
};

export default VerifyEmail; 