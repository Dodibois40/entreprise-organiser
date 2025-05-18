import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PasswordInput, Button, Group, Text, Alert, Progress, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconLock, IconArrowLeft, IconCheck, IconX } from '@tabler/icons-react';
import { useAuth } from '../../contexts/AuthContext';
import authService from '../../services/authService';

// Évaluation de la force du mot de passe (repris du composant Register)
const PasswordStrength = ({ password }) => {
  if (!password) return null;

  // Critères de sécurité
  const requirements = [
    { re: /[0-9]/, label: 'Contient des chiffres' },
    { re: /[a-z]/, label: 'Contient des lettres minuscules' },
    { re: /[A-Z]/, label: 'Contient des lettres majuscules' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Contient des caractères spéciaux' },
  ];

  // Vérification des critères
  const strength = requirements.filter(requirement => requirement.re.test(password)).length;

  // Couleur en fonction de la force
  const color = strength === 0 ? 'red' : strength === 1 ? 'orange' : strength === 2 ? 'yellow' : strength === 3 ? 'lime' : 'green';

  // Affichage des critères
  const checks = requirements.map((requirement, index) => (
    <Text
      key={index}
      color={requirement.re.test(password) ? 'teal' : 'red'}
      size="sm"
      mt={5}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      {requirement.re.test(password) ? <IconCheck size={14} /> : <IconX size={14} />} {requirement.label}
    </Text>
  ));

  return (
    <Box mt="md">
      <Progress value={(strength / 4) * 100} color={color} size="sm" mb="md" />
      {checks}
    </Box>
  );
};

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const [success, setSuccess] = useState(false);
  
  // Configuration du formulaire avec validation
  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate: {
      password: (value) => {
        if (value.length < 6) return 'Le mot de passe doit contenir au moins 6 caractères';
        
        // Évaluer la complexité du mot de passe
        const requirements = [
          { re: /[0-9]/ },
          { re: /[a-z]/ },
          { re: /[A-Z]/ },
          { re: /[$&+,:;=?@#|'<>.^*()%!-]/ },
        ];
        
        const strength = requirements.filter(req => req.re.test(value)).length;
        
        if (strength < 2) return 'Le mot de passe est trop faible';
        return null;
      },
      confirmPassword: (value, values) => 
        value !== values.password ? 'Les mots de passe ne correspondent pas' : null
    }
  });
  
  // Vérifier la validité du token au chargement
  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      notifications.show({
        title: 'Erreur',
        message: 'Token de réinitialisation manquant ou invalide',
        color: 'red',
      });
    }
  }, [token]);
  
  // Gestion de la soumission du formulaire
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await authService.resetPassword(token, values.password);
      
      setSuccess(true);
      
      // Connexion automatique avec le nouveau token
      if (response.token) {
        // Attendre un peu pour que l'utilisateur voie le message de succès
        setTimeout(() => {
          login({ token: response.token });
          navigate('/');
        }, 2000);
      }
      
      notifications.show({
        title: 'Succès',
        message: 'Votre mot de passe a été réinitialisé avec succès',
        color: 'green',
      });
    } catch (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe:', error);
      
      if (error.message === 'Token invalide ou expiré') {
        setTokenValid(false);
      }
      
      notifications.show({
        title: 'Erreur',
        message: error.message || 'Une erreur est survenue lors de la réinitialisation du mot de passe',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Si le token est invalide, afficher un message d'erreur
  if (!tokenValid) {
    return (
      <Alert 
        title="Lien invalide ou expiré" 
        color="red"
        mb="md"
      >
        Le lien de réinitialisation de mot de passe est invalide ou a expiré. 
        Veuillez demander un nouveau lien de réinitialisation.
        <Group position="center" mt="md">
          <Button 
            component={Link} 
            to="/auth/forgot-password"
            variant="light"
          >
            Demander un nouveau lien
          </Button>
        </Group>
      </Alert>
    );
  }
  
  // Si la réinitialisation a réussi, afficher un message de succès
  if (success) {
    return (
      <Alert 
        title="Mot de passe réinitialisé" 
        color="green"
        mb="md"
      >
        Votre mot de passe a été réinitialisé avec succès. Vous allez être connecté automatiquement...
      </Alert>
    );
  }
  
  return (
    <Box>
      <Text size="sm" mb="md">
        Entrez votre nouveau mot de passe ci-dessous pour réinitialiser votre compte.
      </Text>
      
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <PasswordInput
          required
          label="Nouveau mot de passe"
          placeholder="Votre nouveau mot de passe"
          icon={<IconLock size={16} />}
          {...form.getInputProps('password')}
          disabled={loading}
          mb="xs"
        />
        
        <PasswordStrength password={form.values.password} />
        
        <PasswordInput
          required
          mt="md"
          label="Confirmer le mot de passe"
          placeholder="Confirmez votre nouveau mot de passe"
          icon={<IconLock size={16} />}
          {...form.getInputProps('confirmPassword')}
          disabled={loading}
        />
        
        <Group position="apart" mt="xl">
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
            Réinitialiser le mot de passe
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default ResetPassword; 