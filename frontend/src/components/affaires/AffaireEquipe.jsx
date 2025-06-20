import React, { useState, useEffect } from 'react';
import {
  Paper,
  Title,
  Tabs,
  Group,
  Button,
  Stack,
  Alert,
  Badge,
  Card,
  Text,
  Grid,
  ActionIcon,
  Modal,
  TextInput,
  Select,
  NumberInput,
  Textarea,
  Loader,
  Center,
  Box,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import {
  IconUsers,
  IconClock,
  IconCalendar,
  IconPlus,
  IconEdit,
  IconTrash,
  IconCalculator,
  IconAlertTriangle,
  IconCheck,
  IconX,
  IconPlayerPlay,
  IconRefresh,
  IconInfoCircle,
  IconCurrencyEuro,
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import phasesService from '@/services/phasesService';
import '@/styles/calendar.css';

const usersService = {
  async getOuvriers() {
    const response = await fetch('http://localhost:8000/users?role=OUVRIER_ATELIER,OUVRIER_CHANTIER');
    if (!response.ok) throw new Error('Erreur lors de la récupération des ouvriers');
    return response.json();
  },
};

const TYPE_PHASE_OPTIONS = [
  { value: 'FABRICATION', label: 'Fabrication' },
  { value: 'POSE', label: 'Pose' },
  { value: 'SERVICE', label: 'Service' },
  { value: 'LIVRAISON', label: 'Livraison' },
  { value: 'SAV', label: 'SAV' },
];

const STATUT_PHASE_OPTIONS = [
  { value: 'PLANIFIEE', label: 'Planifiée' },
  { value: 'EN_COURS', label: 'En cours' },
  { value: 'TERMINEE', label: 'Terminée' },
  { value: 'ANNULEE', label: 'Annulée' },
];

function PhaseCard({ phase, onEdit, onDelete, onCalculate, onStatusChange }) {
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

  const loadStats = async () => {
    setLoadingStats(true);
    try {
      const data = await phasesService.getStats(phase.id);
      setStats(data);
    } catch (error) {
      console.error('Erreur stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, [phase.id]);

  const getStatutColor = (statut) => {
    switch (statut) {
      case 'PLANIFIEE': return 'blue';
      case 'EN_COURS': return 'orange';
      case 'TERMINEE': return 'green';
      case 'ANNULEE': return 'red';
      default: return 'gray';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'FABRICATION': return '🔨';
      case 'POSE': return '🏗️';
      case 'SERVICE': return '🔧';
      case 'LIVRAISON': return '🚚';
      case 'SAV': return '🛠️';
      default: return '📋';
    }
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'PLANIFIEE': return 'EN_COURS';
      case 'EN_COURS': return 'TERMINEE';
      case 'TERMINEE': return null;
      case 'ANNULEE': return 'PLANIFIEE';
      default: return null;
    }
  };

  const getStatusAction = (currentStatus) => {
    switch (currentStatus) {
      case 'PLANIFIEE': return { label: 'Démarrer', icon: IconPlayerPlay, color: 'orange' };
      case 'EN_COURS': return { label: 'Terminer', icon: IconCheck, color: 'green' };
      case 'TERMINEE': return null;
      case 'ANNULEE': return { label: 'Réactiver', icon: IconRefresh, color: 'blue' };
      default: return null;
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await phasesService.update(phase.id, { statut: newStatus });
      notifications.show({
        title: 'Succès',
        message: `Statut de la phase mis à jour vers "${STATUT_PHASE_OPTIONS.find(s => s.value === newStatus)?.label}"`,
        color: 'green',
      });
      onStatusChange?.();
    } catch (error) {
      notifications.show({
        title: 'Erreur',
        message: error.message,
        color: 'red',
      });
    }
  };

  const statusAction = getStatusAction(phase.statut);
  const nextStatus = getNextStatus(phase.statut);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header de la phase */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getTypeIcon(phase.typePhase)}</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{phase.nom}</h3>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                phase.statut === 'TERMINEE' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                phase.statut === 'EN_COURS' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                phase.statut === 'PLANIFIEE' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
              }`}>
            {STATUT_PHASE_OPTIONS.find(s => s.value === phase.statut)?.label || phase.statut}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(phase)}
              className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
            >
              <IconEdit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onCalculate(phase.id)}
              className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
            >
              <IconCalculator className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(phase.id)}
              className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            >
              <IconTrash className="w-4 h-4" />
            </button>
          </div>
        </div>

      {phase.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {phase.description}
          </p>
      )}
      </div>

      {/* Actions de statut */}
      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
        <div>
          {statusAction && nextStatus && (
              <button
              onClick={() => handleStatusChange(nextStatus)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  statusAction.color === 'orange' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400' :
                  statusAction.color === 'green' ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400' :
                  statusAction.color === 'blue' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400' :
                  'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-400'
                }`}
              >
                <statusAction.icon className="w-3 h-3" />
              {statusAction.label}
              </button>
          )}
        </div>
        <div>
          {phase.statut !== 'ANNULEE' && (
              <button
              onClick={() => handleStatusChange('ANNULEE')}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            >
                <IconX className="w-3 h-3" />
              Annuler
              </button>
          )}
        </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="p-6">
      {loadingStats ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
      ) : stats ? (
          <div className="space-y-4">
          {/* Indicateur de performance global */}
            <div className="flex items-center justify-between">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                (stats.ecarts.cout > 0 || stats.ecarts.tempsH > 0) ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 
                (stats.ecarts.cout < 0 || stats.ecarts.tempsH < 0) ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
              }`}>
              {(stats.ecarts.cout > 0 || stats.ecarts.tempsH > 0) ? 'Dépassement' : 
               (stats.ecarts.cout < 0 || stats.ecarts.tempsH < 0) ? 'Économie' : 
               'Conforme'}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">Performance:</span>
                <span className={`text-xs font-semibold ${stats.ecarts.cout > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                {stats.estimations.coutEstime > 0 ? Math.round((stats.realise.coutReel / stats.estimations.coutEstime) * 100) : 0}%
                </span>
              </div>
            </div>
            
            {/* Métriques principales */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                <div className="flex items-center gap-2 mb-2">
                  <IconClock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">Temps Réel</span>
                </div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-1">
                      {stats.realise.tempsReelH}h
                </div>
                {stats.ecarts.tempsH !== 0 && (
                  <div className="text-center">
                    <span className={`text-xs font-semibold ${stats.ecarts.tempsH > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                      {stats.ecarts.tempsH > 0 ? '+' : ''}{stats.ecarts.tempsH.toFixed(1)}h vs estimé
                    </span>
                  </div>
                )}
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-4 border border-green-200 dark:border-green-700">
                <div className="flex items-center gap-2 mb-2">
                  <IconCurrencyEuro className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wide">Coût Réel</span>
                </div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300 mb-1">
                      {stats.realise.coutReel.toFixed(0)}€
                </div>
                {stats.ecarts.cout !== 0 && (
                  <div className="text-center">
                    <span className={`text-xs font-semibold ${stats.ecarts.cout > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                      {stats.ecarts.cout > 0 ? '+' : ''}{stats.ecarts.cout.toFixed(0)}€ vs estimé
                    </span>
                  </div>
                )}
              </div>
            </div>
        </div>
      ) : null}

        {/* Footer avec informations supplémentaires */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <IconUsers className="w-3 h-3" />
            <span>{stats?.nbOuvriersAffectes || 0} ouvrier(s)</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <IconClock className="w-3 h-3" />
            <span>{stats?.nbTachesAffectees || 0} tâche(s)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhaseModal({ opened, onClose, phase, affaireId, onSave }) {
  const form = useForm({
    initialValues: {
      nom: '',
      description: '',
      typePhase: 'FABRICATION',
      statut: 'PLANIFIEE',
      dateDebutReelle: null,
      dateFinReelle: null,
      // Données réelles uniquement
      tempsReelH: 0,
      tauxHoraireReel: 0,
      ordre: 1,
    },
    validate: {
      nom: (value) => !value ? 'Le nom est obligatoire' : null,
      typePhase: (value) => !value ? 'Le type de phase est obligatoire' : null,
      tempsReelH: (value) => value < 0 ? 'Le temps doit être positif' : null,
      tauxHoraireReel: (value) => value < 0 ? 'Le taux horaire doit être positif' : null,
    },
  });

  // Réinitialiser le formulaire quand la phase change ou quand le modal s'ouvre
  useEffect(() => {
    if (opened) {
      if (phase) {
        // Mode édition : remplir avec les données de la phase (réelles uniquement)
        form.setValues({
          nom: phase.nom || '',
          description: phase.description || '',
          typePhase: phase.typePhase || 'FABRICATION',
          statut: phase.statut || 'PLANIFIEE',
          dateDebutReelle: phase.dateDebutReelle ? new Date(phase.dateDebutReelle) : null,
          dateFinReelle: phase.dateFinReelle ? new Date(phase.dateFinReelle) : null,
          // Données réelles uniquement
          tempsReelH: phase.tempsReelH || 0,
          tauxHoraireReel: phase.tauxHoraire || 0,
          ordre: phase.ordre || 1,
        });
      } else {
        // Mode création : réinitialiser avec des valeurs par défaut
        form.setValues({
          nom: '',
          description: '',
          typePhase: 'FABRICATION',
          statut: 'PLANIFIEE',
          dateDebutReelle: null,
          dateFinReelle: null,
          tempsReelH: 0,
          tauxHoraireReel: 0,
          ordre: 1,
        });
      }
    }
  }, [opened, phase]);

  const handleSubmit = async (values) => {
    try {
      // Calculer le coût réel uniquement
      const coutReel = (values.tempsReelH || 0) * (values.tauxHoraireReel || 0);
      
      if (phase) {
        // Pour la mise à jour, données réelles uniquement
        const updateData = {
          nom: values.nom,
          description: values.description,
          typePhase: values.typePhase,
          statut: values.statut,
          dateDebutReelle: values.dateDebutReelle ? new Date(values.dateDebutReelle).toISOString() : null,
          dateFinReelle: values.dateFinReelle ? new Date(values.dateFinReelle).toISOString() : null,
          tempsReelH: values.tempsReelH || 0,
          tauxHoraire: values.tauxHoraireReel || 0,
          coutReel: coutReel,
          ordre: values.ordre || 1,
        };

        await phasesService.update(phase.id, updateData);
        notifications.show({
          title: 'Succès',
          message: `Phase mise à jour avec succès. Coût réel : ${coutReel.toFixed(2)}€`,
          color: 'green',
        });
        
        // Déclencher l'événement de mise à jour pour rafraîchir la synthèse
        window.dispatchEvent(new CustomEvent('affaire_updated', { 
          detail: { affaireId: affaireId } 
        }));
      } else {
        // Pour la création, seulement les champs autorisés par CreatePhaseDto
        const createData = {
          nom: values.nom,
          description: values.description,
          typePhase: values.typePhase,
          affaireId: affaireId,
          // Champs optionnels autorisés à la création
          dateDebutPrevue: values.dateDebutPrevue ? new Date(values.dateDebutPrevue).toISOString() : null,
          dateFinPrevue: values.dateFinPrevue ? new Date(values.dateFinPrevue).toISOString() : null,
          tempsEstimeH: values.tempsEstimeH || 0,
          tempsReelH: values.tempsReelH || 0,
          tauxHoraire: values.tauxHoraireReel || 0,
          coutEstime: 0, // Calculé automatiquement
          coutReel: coutReel,
          ordre: values.ordre || 1,
        };

        // Nettoyer les valeurs null
        Object.keys(createData).forEach(key => {
          if (createData[key] === null || createData[key] === undefined) {
            delete createData[key];
          }
        });

        console.log('📤 Données finales envoyées:', createData);
        await phasesService.create(createData);
        notifications.show({
          title: 'Succès',
          message: `Phase créée avec succès. Coût réel : ${coutReel.toFixed(2)}€`,
          color: 'green',
        });
        
        // Déclencher l'événement de mise à jour pour rafraîchir la synthèse
        window.dispatchEvent(new CustomEvent('affaire_updated', { 
          detail: { affaireId: affaireId } 
        }));
      }

      onSave();
      onClose();
    } catch (error) {
      notifications.show({
        title: 'Erreur',
        message: error.message,
        color: 'red',
      });
    }
  };

  // Calculer le coût réel en temps réel
  const coutReelCalcule = (form.values.tempsReelH || 0) * (form.values.tauxHoraireReel || 0);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={phase ? 'Modifier la phase' : 'Nouvelle phase'}
      size="95%"
      radius="md"
      shadow="xl"
      styles={{
        header: {
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e9ecef',
          borderRadius: '8px 8px 0 0'
        },
        title: {
          fontWeight: 600,
          fontSize: '18px'
        },
        body: {
          padding: '24px'
        },
        content: {
          maxWidth: '1400px',
          width: '95vw'
        }
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          {/* Informations générales */}
          <Card withBorder radius="md" p="md">
            <Title order={4} mb="md">Informations générales</Title>
            
            <TextInput
              label="Nom de la phase"
              placeholder="Ex: Fabrication cuisines"
              required
              withAsterisk
              mb="md"
              styles={{
                input: {
                  borderRadius: '8px',
                  border: '1px solid #e9ecef',
                  '&:focus': {
                    borderColor: '#228be6',
                    boxShadow: '0 0 0 2px rgba(34, 139, 230, 0.1)'
                  }
                },
                label: {
                  fontWeight: 500,
                  marginBottom: '4px'
                }
              }}
              {...form.getInputProps('nom')}
            />

            <Textarea
              label="Description"
              placeholder="Description détaillée de la phase"
              minRows={2}
              autosize
              mb="md"
              styles={{
                input: {
                  borderRadius: '8px',
                  border: '1px solid #e9ecef',
                  '&:focus': {
                    borderColor: '#228be6',
                    boxShadow: '0 0 0 2px rgba(34, 139, 230, 0.1)'
                  }
                },
                label: {
                  fontWeight: 500,
                  marginBottom: '4px'
                }
              }}
              {...form.getInputProps('description')}
            />

            <Grid>
              <Grid.Col span={4}>
                <Select
                  label="Type de phase"
                  required
                  withAsterisk
                  data={TYPE_PHASE_OPTIONS}
                  searchable
                  styles={{
                    input: {
                      borderRadius: '8px',
                      border: '1px solid #e9ecef',
                      '&:focus': {
                        borderColor: '#228be6',
                        boxShadow: '0 0 0 2px rgba(34, 139, 230, 0.1)'
                      }
                    },
                    label: {
                      fontWeight: 500,
                      marginBottom: '4px'
                    }
                  }}
                  {...form.getInputProps('typePhase')}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  label="Statut"
                  data={STATUT_PHASE_OPTIONS}
                  searchable
                  disabled={!phase} // Désactivé en création, statut par défaut sera appliqué côté backend
                  styles={{
                    input: {
                      borderRadius: '8px',
                      border: '1px solid #e9ecef',
                      '&:focus': {
                        borderColor: '#228be6',
                        boxShadow: '0 0 0 2px rgba(34, 139, 230, 0.1)'
                      }
                    },
                    label: {
                      fontWeight: 500,
                      marginBottom: '4px'
                    }
                  }}
                  {...form.getInputProps('statut')}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <NumberInput
                  label="Ordre"
                  placeholder="1"
                  min={1}
                  styles={{
                    input: {
                      borderRadius: '8px',
                      border: '1px solid #e9ecef',
                      '&:focus': {
                        borderColor: '#228be6',
                        boxShadow: '0 0 0 2px rgba(34, 139, 230, 0.1)'
                      }
                    },
                    label: {
                      fontWeight: 500,
                      marginBottom: '4px'
                    }
                  }}
                  {...form.getInputProps('ordre')}
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Section Main-d'Œuvre Réelle */}
          <Card withBorder radius="md" p="md" style={{ backgroundColor: '#f0f9ff' }}>
            <Group justify="space-between" mb="md">
              <Title order={4} c="green">✅ Main-d'Œuvre Réelle</Title>
              <Text size="sm" fw={600} c="green">
                Coût réel : {coutReelCalcule.toFixed(2)}€
              </Text>
            </Group>

            <Alert
              icon={<IconClock size={16} />}
              title="Objectifs définis lors de la création d'affaire"
              color="blue"
              mb="md"
            >
              <Text size="sm">
                Cette page se concentre sur les <strong>données réelles</strong> de main-d'œuvre. 
                Les objectifs et estimations sont définis lors de la création de l'affaire et apparaissent dans les camemberts financiers.
              </Text>
            </Alert>

            {/* Calendriers pour les dates prévues (création) ou réelles (édition) */}
            <Grid mb="md">
              <Grid.Col span={6}>
                <Text size="sm" fw={500} mb="xs">
                  {phase ? 'Date début réelle' : 'Date début prévue'}
                </Text>
                <DatePicker
                  value={phase ? form.values.dateDebutReelle : form.values.dateDebutPrevue}
                  onChange={(date) => form.setFieldValue(phase ? 'dateDebutReelle' : 'dateDebutPrevue', date)}
                  placeholder="Sélectionner une date"
                  size="sm"
                  styles={{
                    input: {
                      borderRadius: '8px',
                      border: '1px solid #e9ecef'
                    }
                  }}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" fw={500} mb="xs">
                  {phase ? 'Date fin réelle' : 'Date fin prévue'}
                </Text>
                <DatePicker
                  value={phase ? form.values.dateFinReelle : form.values.dateFinPrevue}
                  onChange={(date) => form.setFieldValue(phase ? 'dateFinReelle' : 'dateFinPrevue', date)}
                  placeholder="Sélectionner une date"
                  size="sm"
                  styles={{
                    input: {
                      borderRadius: '8px',
                      border: '1px solid #e9ecef'
                    }
                  }}
                />
              </Grid.Col>
            </Grid>

            {/* Message informatif selon le mode */}
            <Alert
              icon={<IconInfoCircle size={16} />}
              title={phase ? "Dates de la phase" : "Planification de la phase"}
              color="blue"
              mb="md"
            >
              <Text size="sm">
                {phase 
                  ? "Vous pouvez modifier les dates réelles de début et fin de cette phase."
                  : "Définissez les dates prévues pour cette phase. Les dates réelles pourront être mises à jour plus tard."
                }
              </Text>
            </Alert>

            {/* Temps et taux réels */}
            <Grid>
              <Grid.Col span={6}>
                <NumberInput
                  label="Temps réel (heures)"
                  placeholder="0"
                  min={0}
                  step={0.5}
                  decimalScale={1}
                  styles={{
                    input: {
                      borderRadius: '8px',
                      border: '1px solid #e9ecef',
                      '&:focus': {
                        borderColor: '#228be6',
                        boxShadow: '0 0 0 2px rgba(34, 139, 230, 0.1)'
                      }
                    },
                    label: {
                      fontWeight: 500,
                      marginBottom: '4px'
                    }
                  }}
                  {...form.getInputProps('tempsReelH')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  label="Taux horaire réel (€/h)"
                  placeholder="0"
                  min={0}
                  step={1}
                  decimalScale={2}
                  styles={{
                    input: {
                      borderRadius: '8px',
                      border: '1px solid #e9ecef',
                      '&:focus': {
                        borderColor: '#228be6',
                        boxShadow: '0 0 0 2px rgba(34, 139, 230, 0.1)'
                      }
                    },
                    label: {
                      fontWeight: 500,
                      marginBottom: '4px'
                    }
                  }}
                  {...form.getInputProps('tauxHoraireReel')}
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Résumé des données réelles */}
          {coutReelCalcule > 0 && (
            <Card withBorder radius="md" p="md" mt="md" style={{ backgroundColor: '#f0fdf4' }}>
              <Group justify="space-between" mb="md">
                <Title order={5}>📊 Résumé de la phase</Title>
                <Badge 
                  color="green"
                  variant="light"
                  size="lg"
                >
                  Données réelles
                </Badge>
              </Group>
              
              <Grid>
                {/* Temps de travail */}
                <Grid.Col span={6}>
                  <Card withBorder p="sm" style={{ backgroundColor: '#f0f9ff' }}>
                    <Text size="sm" fw={600} c="blue" mb="xs">⏱️ Temps de travail</Text>
                    <Text size="lg" fw={700} c="dark">
                      {form.values.tempsReelH || 0}h
                    </Text>
                    <Text size="xs" c="dimmed">
                      Taux horaire: {form.values.tauxHoraireReel || 0}€/h
                    </Text>
                  </Card>
                </Grid.Col>
                
                {/* Coût de la phase */}
                <Grid.Col span={6}>
                  <Card withBorder p="sm" style={{ backgroundColor: '#f0fdf4' }}>
                    <Text size="sm" fw={600} c="green" mb="xs">💰 Coût de la phase</Text>
                    <Text size="lg" fw={700} c="dark">
                      {coutReelCalcule.toFixed(0)}€
                    </Text>
                    <Text size="xs" c="dimmed">
                      Coût calculé automatiquement
                    </Text>
                  </Card>
                </Grid.Col>
              </Grid>
            </Card>
          )}

          {/* Boutons d'action */}
          <Group justify="flex-end" mt="xl">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" leftSection={<IconCheck size={16} />}>
              {phase ? 'Mettre à jour' : 'Créer la phase'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

export default function AffaireEquipe({ affaire, onDataUpdate }) {
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPhaseModal, setShowPhaseModal] = useState(false);
  const [editingPhase, setEditingPhase] = useState(null);

  const loadPhases = async () => {
    if (!affaire?.id) return;
    
    setLoading(true);
    try {
      const data = await phasesService.getByAffaire(affaire.id);
      setPhases(data.phases || []);
    } catch (error) {
      notifications.show({
        title: 'Erreur',
        message: 'Impossible de charger les phases',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (affaire?.id) {
      loadPhases();
    }
  }, [affaire?.id]);

  const handleCreatePhase = () => {
    setEditingPhase(null);
    setShowPhaseModal(true);
  };

  const handleEditPhase = (phase) => {
    setEditingPhase(phase);
    setShowPhaseModal(true);
  };

  const handleDeletePhase = async (phaseId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette phase ? Cette action est irréversible.')) {
      try {
        await phasesService.delete(phaseId);
        notifications.show({
          title: 'Succès',
          message: 'Phase supprimée avec succès',
          color: 'green',
        });
        loadPhases();
        onDataUpdate?.();
      } catch (error) {
        notifications.show({
          title: 'Erreur',
          message: error.message,
          color: 'red',
        });
      }
    }
  };

  const handleCalculatePhase = async (phaseId) => {
    try {
      await phasesService.calculateRealData(phaseId);
      notifications.show({
        title: 'Succès',
        message: 'Données recalculées avec succès',
        color: 'green',
      });
      loadPhases();
      onDataUpdate?.();
    } catch (error) {
      notifications.show({
        title: 'Erreur',
        message: error.message,
        color: 'red',
      });
    }
  };

  const handlePhaseSaved = () => {
    loadPhases();
    onDataUpdate?.();
  };

  // Calculs des totaux réels uniquement
  const totalTempsReel = phases.reduce((sum, phase) => sum + (phase.tempsReelH || 0), 0);
  const totalCoutReel = phases.reduce((sum, phase) => sum + (phase.coutReel || 0), 0);

  // Calcul du taux horaire moyen réel
  const tauxHoraireMoyenReel = totalTempsReel > 0 ? totalCoutReel / totalTempsReel : 0;

  // Vérification de sécurité
  if (!affaire) {
    return (
      <Paper p="md">
        <Alert
          icon={<IconAlertTriangle size={16} />}
          title="Chargement en cours"
          color="blue"
        >
          Chargement des données de l'affaire...
        </Alert>
      </Paper>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header moderne */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
            <IconUsers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Équipe & Temps</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Suivi des objectifs et performances</p>
          </div>
        </div>
        <button
          onClick={handleCreatePhase}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <IconPlus className="w-4 h-4" />
          Nouvelle phase
        </button>
      </div>

      {/* Alert d'information moderne */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="p-1 bg-blue-100 dark:bg-blue-800 rounded-lg">
            <IconClock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Suivi des Objectifs</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Cette section compare les <strong>heures estimées</strong> lors de la création de l'affaire avec les <strong>heures réellement passées</strong> par phase.
            </p>
          </div>
        </div>
      </div>

      {/* Section des objectifs - Design moderne */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Objectifs définis lors de la création d'affaire</h3>
                <p className="text-indigo-100 text-sm">Estimations initiales</p>
              </div>
            </div>
            <div className="px-3 py-1 bg-white/20 rounded-full">
              <span className="text-xs font-medium text-white">ESTIMATIONS INITIALES</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🔨</span>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">Heures Fabrication</span>
              </div>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-1">
                {affaire.objectifHeuresFab || 0}h
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">Objectif initial</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🔧</span>
                <span className="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wide">Heures Service</span>
              </div>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300 mb-1">
                {affaire.objectifHeuresSer || 0}h
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">Objectif initial</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl p-4 border border-orange-200 dark:border-orange-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🏗️</span>
                <span className="text-xs font-medium text-orange-600 dark:text-orange-400 uppercase tracking-wide">Heures Pose</span>
              </div>
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-300 mb-1">
                {affaire.objectifHeuresPose || 0}h
              </div>
              <div className="text-xs text-orange-600 dark:text-orange-400">Objectif initial</div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/30 dark:to-amber-800/30 rounded-xl p-4 border border-yellow-200 dark:border-yellow-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">⏱️</span>
                <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">Total Estimé</span>
              </div>
              <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300 mb-1">
                {(affaire.objectifHeuresFab || 0) + (affaire.objectifHeuresSer || 0) + (affaire.objectifHeuresPose || 0)}h
              </div>
              <div className="text-xs text-yellow-600 dark:text-yellow-400">Somme des objectifs</div>
            </div>
          </div>
          
          {/* Comparaison Estimé vs Réalisé - Design moderne */}
          {totalTempsReel > 0 && (
            <div className="mt-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-cyan-200 dark:border-cyan-800">
              <div className="flex items-center gap-2 mb-3">
                <IconCalculator className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <h4 className="font-semibold text-cyan-900 dark:text-cyan-100">Comparaison Estimé vs Réalisé</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">Total estimé</div>
                  <div className="text-xl font-bold text-cyan-700 dark:text-cyan-300">
                    {(affaire.objectifHeuresFab || 0) + (affaire.objectifHeuresSer || 0) + (affaire.objectifHeuresPose || 0)}h
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">Total réalisé</div>
                  <div className="text-xl font-bold text-cyan-700 dark:text-cyan-300">
              {totalTempsReel.toFixed(1)}h
                  </div>
                </div>
                <div className="text-center">
                  {(() => {
                    const totalEstime = (affaire.objectifHeuresFab || 0) + (affaire.objectifHeuresSer || 0) + (affaire.objectifHeuresPose || 0);
                    const ecart = totalTempsReel - totalEstime;
                    const pourcentage = totalEstime > 0 ? ((totalTempsReel / totalEstime) * 100) : 0;
                    
                    return (
                      <div>
                        <div className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">Écart</div>
                        <div className={`text-xl font-bold ${ecart > 0 ? 'text-red-600 dark:text-red-400' : ecart < 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                          {ecart > 0 ? '+' : ''}{ecart.toFixed(1)}h ({pourcentage.toFixed(0)}%)
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Métriques principales - Design moderne */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-800/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500 rounded-lg">
                <IconClock className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-blue-900 dark:text-blue-100">Temps total réalisé</span>
            </div>
            <div className="px-3 py-1 bg-blue-100 dark:bg-blue-800 rounded-full">
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                {phases.length} PHASE{phases.length > 1 ? 'S' : ''}
              </span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-700 dark:text-blue-300 mb-2">
              {totalTempsReel.toFixed(1)}h
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400">
              Temps cumulé de toutes les phases
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-500 rounded-lg">
                <IconCurrencyEuro className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-green-900 dark:text-green-100">Coût total calculé</span>
            </div>
            <div className="px-3 py-1 bg-green-100 dark:bg-green-800 rounded-full">
              <span className="text-xs font-medium text-green-700 dark:text-green-300">
                {tauxHoraireMoyenReel.toFixed(0)}€/H MOYEN
              </span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-700 dark:text-green-300 mb-2">
              {totalCoutReel.toFixed(0)}€
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">
              Coût cumulé de toutes les phases
            </div>
          </div>
        </div>
      </div>

      {/* Indicateurs de performance - Design moderne */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 bg-yellow-100 dark:bg-yellow-900/30 rounded">
              <IconCurrencyEuro className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Taux horaire moyen réel</span>
          </div>
          <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {tauxHoraireMoyenReel.toFixed(2)}€/h
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
              Calculé sur {totalTempsReel.toFixed(1)}h
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
              <IconCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Phases terminées</span>
          </div>
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {phases.filter(p => p.statut === 'TERMINEE').length}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            sur {phases.length} total
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 bg-orange-100 dark:bg-orange-900/30 rounded">
              <IconPlayerPlay className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Phases en cours</span>
          </div>
          <div className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-1">
              {phases.filter(p => p.statut === 'EN_COURS').length}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            phase{phases.filter(p => p.statut === 'EN_COURS').length > 1 ? 's' : ''} active{phases.filter(p => p.statut === 'EN_COURS').length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Impact financier réel - Design moderne */}
      {totalCoutReel > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                <IconCalculator className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            <div>
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">Impact financier réel des phases</h3>
                <div className="space-y-1">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    <span className="font-semibold">Coût total réel de la main-d'œuvre :</span> {totalCoutReel.toFixed(2)}€
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                Ce montant est automatiquement intégré dans la situation financière réelle de l'affaire
                  </p>
            </div>
              </div>
            </div>
            <button
              onClick={() => onDataUpdate?.()}
              className="inline-flex items-center gap-2 px-3 py-2 bg-green-100 hover:bg-green-200 dark:bg-green-800 dark:hover:bg-green-700 text-green-700 dark:text-green-300 font-medium rounded-lg transition-colors"
            >
              <IconCalculator className="w-4 h-4" />
              Actualiser
            </button>
          </div>
        </div>
      )}

      {/* Section des phases - Design moderne */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-6 px-6 py-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg border-b-2 border-blue-500 font-medium">
              <IconCalendar className="w-4 h-4" />
            Phases ({phases.length})
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg font-medium transition-colors">
              <IconClock className="w-4 h-4" />
            Planning
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : phases.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <IconAlertTriangle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Aucune phase</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
              Aucune phase n'a été créée pour cette affaire. Commencez par créer une phase.
              </p>
              <button
                onClick={handleCreatePhase}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <IconPlus className="w-4 h-4" />
                Créer une phase
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {phases.map((phase) => (
                  <PhaseCard
                  key={phase.id}
                    phase={phase}
                    onEdit={handleEditPhase}
                    onDelete={handleDeletePhase}
                    onCalculate={handleCalculatePhase}
                    onStatusChange={handlePhaseSaved}
                  />
              ))}
            </div>
          )}
        </div>
      </div>

      <PhaseModal
        opened={showPhaseModal}
        onClose={() => setShowPhaseModal(false)}
        phase={editingPhase}
        affaireId={affaire?.id}
        onSave={handlePhaseSaved}
      />
    </div>
  );
}
