import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Paper, Title, Text, Center, Image, Box, Group } from '@mantine/core';

const AuthLayout = () => {
  return (
    <Box 
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.md,
      })}
    >
      <Container size="sm">
        <Paper 
          radius="md" 
          p="xl" 
          withBorder
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          })}
        >
          <Group mb={30} position="center">
            {/* Logo ou icône de l'application */}
            <Center>
              <Title order={1} align="center" mb="xs">
                Entreprise Organiser
              </Title>
            </Center>
          </Group>
          
          {/* Contenu dynamique des pages d'authentification */}
          <Outlet />
          
          <Text color="dimmed" size="sm" align="center" mt="lg">
            © {new Date().getFullYear()} Entreprise Organiser - Tous droits réservés
          </Text>
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout; 