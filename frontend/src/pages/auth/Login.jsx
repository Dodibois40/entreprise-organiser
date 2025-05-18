import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInput, PasswordInput, Button, Group, Text, Divider, Anchor, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAt, IconLock, IconLogin } from '@tabler/icons-react';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Configuration du formulaire avec validation
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalide'),
      password: (value) => (value.length >= 4 ? null : 'Le mot de passe doit contenir au moins 4 caractères')
    }
  });
  
  // Gestion de la soumission du formulaire
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values);
      // La redirection est gérée dans le contexte d'authentification
    } catch (error) {
      console.error('Erreur de connexion:', error);
      // Les notifications sont gérées dans le contexte d'authentification
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing="md">
        <TextInput
          required
          label="Email"
          placeholder="votre.email@exemple.com"
          icon={<IconAt size={16} />}
          value={form.values.email}
          onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
          error={form.errors.email}
          disabled={loading}
        />
        
        <PasswordInput
          required
          label="Mot de passe"
          placeholder="Votre mot de passe"
          icon={<IconLock size={16} />}
          value={form.values.password}
          onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
          error={form.errors.password}
          disabled={loading}
        />
        
        <Group position="apart" mt="md">
          <Anchor component={Link} to="/auth/register" size="sm">
            Pas encore de compte ? Inscrivez-vous
          </Anchor>
          <Anchor component={Link} to="/auth/forgot-password" size="sm">
            Mot de passe oublié ?
          </Anchor>
        </Group>
        
        <Button
          fullWidth
          type="submit"
          loading={loading}
        >
          <IconLogin size={18} style={{ marginRight: 8 }} />
          Connexion
        </Button>
      </Stack>
    </form>
  );
};

export default Login; 