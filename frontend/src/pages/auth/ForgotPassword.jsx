import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInput, Button, Group, Text, Box, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAt, IconArrowLeft, IconAlertCircle } from '@tabler/icons-react';
import authService from '../../services/authService';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  // Configuration du formulaire avec validation
  const form = useForm({
    initialValues: {
      email: ''
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalide')
    }
  });
  
  // Gestion de la soumission du formulaire
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await authService.forgotPassword(values.email);
      
      setEmailSent(true);
      
      notifications.show({
        title: 'Email envoyé',
        message: 'Si votre adresse email est enregistrée, vous recevrez un lien de réinitialisation',
        color: 'green',
      });
    } catch (error) {
      console.error('Erreur lors de la demande de réinitialisation:', error);
      
      notifications.show({
        title: 'Erreur',
        message: 'Une erreur est survenue lors de la demande de réinitialisation',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box>
      {emailSent ? (
        <Alert 
          icon={<IconAlertCircle size={16} />} 
          title="Email envoyé" 
          color="blue"
          mb="md"
        >
          Si votre adresse email est enregistrée, vous recevrez un lien de réinitialisation.
          Veuillez vérifier votre boîte de réception et vos courriers indésirables.
        </Alert>
      ) : (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Text size="sm" mb="md">
            Entrez votre adresse email ci-dessous et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </Text>
          
          <TextInput
            required
            label="Email"
            placeholder="votre.email@exemple.com"
            icon={<IconAt size={16} />}
            {...form.getInputProps('email')}
            disabled={loading}
            mb="md"
          />
          
          <Group position="apart" mt="md">
            <Button 
              component={Link} 
              to="/auth/login" 
              variant="subtle" 
              leftIcon={<IconArrowLeft size={16} />}
              disabled={loading}
            >
              Retour à la connexion
            </Button>
            
            <Button
              type="submit"
              loading={loading}
            >
              Envoyer le lien de réinitialisation
            </Button>
          </Group>
        </form>
      )}
    </Box>
  );
};

export default ForgotPassword; 