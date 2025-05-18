import { Title, Text, Button, Container, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Container className="py-16 text-center">
      <div className="inline-block text-6xl font-bold border-r border-gray-300 pr-6 mr-6">
        404
      </div>
      <div className="inline-block text-left align-middle">
        <Title>Page non trouvée</Title>
        <Text color="dimmed" size="lg">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </Text>
      </div>
      <Group justify="center" mt="xl">
        <Button component={Link} to="/" variant="outline" size="md">
          Retour à l'accueil
        </Button>
      </Group>
    </Container>
  );
}

export default NotFound; 