import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  AppShell, 
  Burger, 
  Group, 
  Title, 
  Container,
  Avatar, 
  NavLink as MantineNavLink,
  ActionIcon,
  Menu,
  Text,
  Divider,
  rem,
  useMantineColorScheme,
  UnstyledButton,
  Box,
  Tooltip
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconDashboard, 
  IconCalendarEvent, 
  IconUsers, 
  IconBriefcase,
  IconSettings,
  IconLogout,
  IconUserCircle,
  IconMoon,
  IconSun,
  IconBell,
  IconBuildingFactory,
  IconCurrencyEuro,
  IconShoppingCart
} from '@tabler/icons-react';
import { 
  ActionIconWithRef, 
  UnstyledButtonWithRef, 
  NavLinkWithRef,
  TooltipWithRef
} from './shared/ForwardRefComponents';

// Données pour le menu de navigation
const navItems = [
  { path: '/', label: 'Tableau de bord', icon: <IconDashboard size={20} stroke={1.5} /> },
  { path: '/plannings', label: 'Planning', icon: <IconCalendarEvent size={20} stroke={1.5} /> },
  { path: '/collaborateurs', label: 'Collaborateurs', icon: <IconUsers size={20} stroke={1.5} /> },
  { path: '/taches', label: 'Tâches', icon: <IconBriefcase size={20} stroke={1.5} /> },
  { path: '/chantiers', label: 'Chantiers', icon: <IconBuildingFactory size={20} stroke={1.5} /> },
  { path: '/achats', label: 'Achats', icon: <IconShoppingCart size={20} stroke={1.5} /> },
  { path: '/bdc', label: 'Bons de commande', icon: <IconCurrencyEuro size={20} stroke={1.5} /> },
];

function Layout() {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const location = useLocation();
  const [notificationCount] = useState(3); // Exemple pour les notifications

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  // Trouver l'élément de navigation actif
  const activeItem = navItems.find(item => 
    location.pathname === item.path || 
    (item.path !== '/' && location.pathname.startsWith(item.path))
  );

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ 
        width: 280, 
        breakpoint: 'sm', 
        collapsed: { mobile: !opened } 
      }}
      padding="md"
    >
      <AppShell.Header>
        <Container size="xl" h="100%">
          <Group h="100%" justify="space-between">
            <Group>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <Title order={1} size="h3" c={colorScheme === 'dark' ? 'blue.3' : 'blue.7'}>
                Entreprise Organiser
              </Title>
            </Group>
            
            <Group>
              <TooltipWithRef label="Notifications">
                <Menu position="bottom-end" withArrow offset={4}>
                  <Menu.Target>
                    <ActionIconWithRef variant="subtle" size="lg" radius="xl">
                      <IconBell size={20} stroke={1.5} />
                    </ActionIconWithRef>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Notifications</Menu.Label>
                    <Menu.Item>Nouvelle tâche assignée</Menu.Item>
                    <Menu.Item>Réunion dans 1 heure</Menu.Item>
                    <Menu.Item>Planning mis à jour</Menu.Item>
                    <Menu.Divider />
                    <Menu.Item>Voir toutes les notifications</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </TooltipWithRef>
              
              <TooltipWithRef label={colorScheme === 'dark' ? 'Mode clair' : 'Mode sombre'}>
                <ActionIconWithRef 
                  variant="subtle" 
                  size="lg" 
                  radius="xl" 
                  onClick={toggleColorScheme}
                >
                  {colorScheme === 'dark' ? (
                    <IconSun size={20} stroke={1.5} />
                  ) : (
                    <IconMoon size={20} stroke={1.5} />
                  )}
                </ActionIconWithRef>
              </TooltipWithRef>
              
              <Menu position="bottom-end" withArrow offset={4}>
                <Menu.Target>
                  <UnstyledButtonWithRef>
                    <Group gap="xs">
                      <Avatar color="blue" radius="xl" size="md">JD</Avatar>
                      <div style={{ display: 'none' }} className="hidden md:block">
                        <Text size="sm" fw={600}>Jean Dupont</Text>
                        <Text size="xs" c="dimmed">Administrateur</Text>
                      </div>
                    </Group>
                  </UnstyledButtonWithRef>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Jean Dupont</Menu.Label>
                  <Menu.Item leftSection={<IconUserCircle style={{ width: rem(16), height: rem(16) }} />}>
                    Mon profil
                  </Menu.Item>
                  <Menu.Item leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} />}>
                    Paramètres
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item 
                    leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} />} 
                    color="red"
                  >
                    Déconnexion
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Box mt="md" mb="xl">
          <Text size="xs" c="dimmed" mb="md" pl="xs" tt="uppercase" fw={700}>
            Menu Principal
          </Text>
          {navItems.map((item) => (
            <NavLinkWithRef
              key={item.path}
              component={NavLink}
              to={item.path}
              label={item.label}
              leftSection={item.icon}
              active={
                location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path))
              }
              variant="filled"
            />
          ))}
        </Box>
        
        <Divider my="md" />
        
        <Box>
          <Text size="xs" c="dimmed" mb="md" pl="xs" tt="uppercase" fw={700}>
            Administration
          </Text>
          <NavLinkWithRef
            component={NavLink}
            to="/parametres"
            label="Paramètres"
            leftSection={<IconSettings size={20} stroke={1.5} />}
          />
        </Box>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="xl">
          <Box py="md">
            {activeItem && (
              <Text c="dimmed" size="sm" mb="xs">
                {activeItem.path === '/' ? 'Accueil' : activeItem.label}
              </Text>
            )}
            <Outlet />
          </Box>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default Layout; 