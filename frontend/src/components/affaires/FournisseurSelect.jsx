import React, { useState, useEffect } from 'react';
import { Select, Group, Text, Badge, Loader } from '@mantine/core';
import { IconBuilding, IconCheck, IconX } from '@tabler/icons-react';
import { getFournisseursActifs } from '@/services/fournisseurService';

const FournisseurSelect = ({ value, onChange, error, ...props }) => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFournisseurs();
  }, []);

  const loadFournisseurs = async () => {
    try {
      setLoading(true);
      const data = await getFournisseursActifs();
      setFournisseurs(data);
    } catch (error) {
      console.error('Erreur lors du chargement des fournisseurs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Transformer les données pour le Select
  const selectData = fournisseurs.map(fournisseur => ({
    value: fournisseur.nom, // On utilise le nom comme valeur pour compatibilité avec l'existant
    label: fournisseur.nom,
    ...fournisseur // Garder toutes les données pour l'affichage personnalisé
  }));

  // Composant personnalisé pour l'affichage des options
  const SelectItem = React.forwardRef(({ label, enCompte, codeClient, contact, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <IconBuilding size={16} />
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>{label}</Text>
          <Group spacing={8}>
            {codeClient && (
              <Text size="xs" color="dimmed">Code: {codeClient}</Text>
            )}
            {contact && (
              <Text size="xs" color="dimmed">Contact: {contact}</Text>
            )}
            {enCompte ? (
              <Badge size="xs" color="blue" variant="light">
                <IconCheck size={8} style={{ marginRight: 2 }} />
                En compte
              </Badge>
            ) : (
              <Badge size="xs" color="gray" variant="light">
                <IconX size={8} style={{ marginRight: 2 }} />
                Non
              </Badge>
            )}
          </Group>
        </div>
      </Group>
    </div>
  ));

  if (loading) {
    return (
      <Select
        {...props}
        disabled
        rightSection={<Loader size={16} />}
        placeholder="Chargement des fournisseurs..."
      />
    );
  }

  return (
    <Select
      {...props}
      data={selectData}
      value={value}
      onChange={onChange}
      error={error}
      itemComponent={SelectItem}
      searchable
      clearable
      maxDropdownHeight={300}
      filter={(value, item) =>
        item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
        (item.codeClient && item.codeClient.toLowerCase().includes(value.toLowerCase().trim())) ||
        (item.contact && item.contact.toLowerCase().includes(value.toLowerCase().trim()))
      }
    />
  );
};

export default FournisseurSelect; 