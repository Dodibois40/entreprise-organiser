import { useState, useEffect } from 'react';
import { TextInput, Button, Group, Text, Title, Paper, Avatar, Divider, PasswordInput, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAt, IconLock, IconUser, IconBriefcase, IconDeviceFloppy } from '@tabler/icons-react';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Configuration du formulaire avec validation
  const form = useForm({
    initialValues: {
      nom: '',
      prenom: '',
      email: '',
      poste: '',
      password: '',
      newPassword: ''
    },
    validate: {
      nom: (value) => (value.length >= 2 ? null : 'Le nom doit contenir au moins 2 caractères'),
      prenom: (value) => (value.length >= 2 ? null : 'Le prénom doit contenir au moins 2 caractères'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalide'),
      newPassword: (value) => (value === '' || value.length >= 6 ? null : 'Le mot de passe doit contenir au moins 6 caractères')
    }
  });
  
  // Initialiser le formulaire avec les données de l'utilisateur
  useEffect(() => {
    if (user) {
      form.setValues({
        nom: user.nom || '',
        prenom: user.prenom || '',
        email: user.email || '',
        poste: user.poste || '',
        password: '',
        newPassword: ''
      });
    }
  }, [user]);
  
  // Gestion de la soumission du formulaire
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Préparer les données à mettre à jour
      const updateData = {
        nom: values.nom,
        prenom: values.prenom,
        poste: values.poste
      };
      
      // Ajouter le nouveau mot de passe s'il est fourni
      if (values.newPassword) {
        updateData.password = values.newPassword;
      }
      
      await updateProfile(updateData);
      
      // Réinitialiser les champs de mot de passe
      form.setFieldValue('password', '');
      form.setFieldValue('newPassword', '');
      
      notifications.show({
        title: 'Succès',
        message: 'Votre profil a été mis à jour avec succès',
        color: 'green'
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      notifications.show({
        title: 'Erreur',
        message: 'Impossible de mettre à jour votre profil',
        color: 'red'
      });
    } finally {
      setLoading(false);
    }
  };
  
  if (!user) {
    return <div>Chargement...</div>;
  }
  
  return (
    <Paper p="md" radius="md">
      <Title order={2} mb="md">Mon Profil</Title>
      
      <Group position="center" mb="lg">
        <Avatar 
          size={100} 
          radius={100} 
          color="blue"
          src={user.photo}
        >
          {user.prenom?.charAt(0)}{user.nom?.charAt(0)}
        </Avatar>
      </Group>
      
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="md">
          <Group grow>
            <TextInput
              required
              label="Nom"
              placeholder="Votre nom"
              icon={<IconUser size={16} />}
              {...form.getInputProps('nom')}
              disabled={loading}
            />
            
            <TextInput
              required
              label="Prénom"
              placeholder="Votre prénom"
              icon={<IconUser size={16} />}
              {...form.getInputProps('prenom')}
              disabled={loading}
            />
          </Group>
          
          <TextInput
            required
            label="Email"
            placeholder="votre.email@exemple.com"
            icon={<IconAt size={16} />}
            {...form.getInputProps('email')}
            disabled={true} // L'email ne peut pas être modifié
          />
          
          <TextInput
            label="Poste"
            placeholder="Votre poste dans l'entreprise"
            icon={<IconBriefcase size={16} />}
            {...form.getInputProps('poste')}
            disabled={loading}
          />
          
          <Divider label="Modifier le mot de passe" labelPosition="center" mt="md" />
          
          <PasswordInput
            label="Nouveau mot de passe"
            placeholder="Laissez vide pour ne pas changer"
            icon={<IconLock size={16} />}
            {...form.getInputProps('newPassword')}
            disabled={loading}
          />
          
          <Button
            type="submit"
            leftIcon={<IconDeviceFloppy size={18} />}
            loading={loading}
            mt="md"
          >
            Enregistrer les modifications
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default Profile; 