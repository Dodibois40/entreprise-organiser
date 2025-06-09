import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Dashboard from '../../frontend/src/pages/Dashboard';
import * as notificationsService from '../../frontend/src/services/notificationsService';
import * as reportingService from '../../frontend/src/services/reportingService';
import * as affairesService from '../../frontend/src/services/affairesService';

// Mock des services
jest.mock('../../frontend/src/services/notificationsService');
jest.mock('../../frontend/src/services/reportingService');
jest.mock('../../frontend/src/services/affairesService');

// Mock de react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Composant wrapper pour les tests
const DashboardWrapper = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('Dashboard Component', () => {
  const mockKpis = {
    chiffreAffaires: 150000,
    evolutionCA: 12.5,
    affairesActives: 8,
    affairesEnRetard: 2,
    margeGlobale: 18.5,
    evolutionMarge: -2.1
  };

  const mockNotifications = [
    {
      id: 1,
      type: 'stock_faible',
      title: 'Stock faible',
      message: 'Article "Vis 4x40" en stock faible',
      priority: 'urgent',
      createdAt: new Date().toISOString(),
      data: { stockActuel: 5 }
    },
    {
      id: 2,
      type: 'echeance_affaire',
      title: 'Échéance proche',
      message: 'Affaire "Cuisine Martin" doit être clôturée dans 3 jours',
      priority: 'high',
      createdAt: new Date().toISOString(),
      data: { joursRestants: 3 }
    }
  ];

  const mockNotificationStats = {
    total: 5,
    byPriority: { urgent: 1, high: 2, medium: 1, low: 1 },
    byType: { stock_faible: 2, echeance_affaire: 2, bdc_en_attente: 1 }
  };

  const mockInventaire = {
    totalArticles: 156,
    valeurTotaleStock: 25800,
    articlesStockFaible: 12,
    articlesRupture: 3,
    mouvementsRecents: [
      { type: 'ENTREE', quantite: 50, article: { nom: 'Vis 6x50' } },
      { type: 'SORTIE', quantite: 25, article: { nom: 'Planche 2x4' } }
    ]
  };

  const mockAffaires = {
    items: [
      {
        id: 1,
        nom: 'Cuisine Martin',
        client: 'M. Martin',
        montantDevis: 8500,
        statut: 'EN_COURS'
      },
      {
        id: 2,
        nom: 'Terrasse Dubois',
        client: 'Mme Dubois',
        montantDevis: 12000,
        statut: 'TERMINE'
      }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Configuration des mocks par défaut
    reportingService.getDashboardData = jest.fn().mockResolvedValue(mockKpis);
    notificationsService.getNotifications = jest.fn().mockResolvedValue(mockNotifications);
    notificationsService.getNotificationStats = jest.fn().mockResolvedValue(mockNotificationStats);
    reportingService.getInventaireStats = jest.fn().mockResolvedValue(mockInventaire);
    affairesService.getAffaires = jest.fn().mockResolvedValue(mockAffaires);
    notificationsService.formatTimeAgo = jest.fn().mockReturnValue('Il y a 2 heures');
  });

  test('devrait afficher le titre et la description', async () => {
    render(
      <DashboardWrapper>
        <Dashboard />
      </DashboardWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Tableau de Bord')).toBeInTheDocument();
      expect(screen.getByText('Vue d\'ensemble de votre activité')).toBeInTheDocument();
    });
  });

  test('devrait afficher les KPIs principaux', async () => {
    render(
      <DashboardWrapper>
        <Dashboard />
      </DashboardWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('150 000,00 €')).toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument(); // Affaires actives
      expect(screen.getByText('18,5%')).toBeInTheDocument(); // Marge moyenne
    });
  });

  test('devrait afficher les alertes critiques quand il y en a', async () => {
    render(
      <DashboardWrapper>
        <Dashboard />
      </DashboardWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Alertes critiques')).toBeInTheDocument();
      expect(screen.getByText('Article "Vis 4x40" en stock faible')).toBeInTheDocument();
    });
  });

  test('devrait afficher les affaires récentes', async () => {
    render(
      <DashboardWrapper>
        <Dashboard />
      </DashboardWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Affaires récentes')).toBeInTheDocument();
      expect(screen.getByText('Cuisine Martin')).toBeInTheDocument();
      expect(screen.getByText('M. Martin • 8 500,00 €')).toBeInTheDocument();
      expect(screen.getByText('Terrasse Dubois')).toBeInTheDocument();
    });
  });

  test('devrait afficher les statistiques d\'inventaire', async () => {
    render(
      <DashboardWrapper>
        <Dashboard />
      </DashboardWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Inventaire')).toBeInTheDocument();
      expect(screen.getByText('156')).toBeInTheDocument(); // Articles totaux
      expect(screen.getByText('25 800,00 €')).toBeInTheDocument(); // Valeur stock
      expect(screen.getByText('12')).toBeInTheDocument(); // Stock faible
      expect(screen.getByText('3')).toBeInTheDocument(); // Rupture
    });
  });

  test('devrait afficher les notifications récentes', async () => {
    render(
      <DashboardWrapper>
        <Dashboard />
      </DashboardWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Notifications récentes')).toBeInTheDocument();
      expect(screen.getByText('Stock faible')).toBeInTheDocument();
      expect(screen.getByText('Échéance proche')).toBeInTheDocument();
    });
  });

  test('devrait naviguer vers les analyses avancées au clic', async () => {
    render(
      <DashboardWrapper>
        <Dashboard />
      </DashboardWrapper>
    );

    await waitFor(() => {
      const analysesButton = screen.getByText('Analyses avancées');
      fireEvent.click(analysesButton);
      expect(mockNavigate).toHaveBeenCalledWith('/analyses-avancees');
    });
  });

  test('devrait naviguer vers les notifications au clic sur les alertes', async () => {
    render(
      <DashboardWrapper>
        <Dashboard />
      </DashboardWrapper>
    );

    await waitFor(() => {
      const voirToutesButton = screen.getByText(/Voir toutes \(2\)/);
      fireEvent.click(voirToutesButton);
      expect(mockNavigate).toHaveBeenCalledWith('/notifications');
    });
  });

  test('devrait actualiser les données au clic sur le bouton actualiser', async () => {
    render(
      <DashboardWrapper>
        <Dashboard />
      </DashboardWrapper>
    );

    await waitFor(() => {
      const actualiserButton = screen.getByText('Actualiser');
      fireEvent.click(actualiserButton);
      
      // Vérifier que les services sont appelés à nouveau
      expect(reportingService.getDashboardData).toHaveBeenCalledTimes(2);
    });
  });

  test('devrait afficher une erreur en cas d\'échec de chargement', async () => {
    reportingService.getDashboardData = jest.fn().mockRejectedValue(new Error('Erreur réseau'));

    render(
      <DashboardWrapper>
        <Dashboard />
      </DashboardWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Erreur de chargement')).toBeInTheDocument();
      expect(screen.getByText('Erreur réseau')).toBeInTheDocument();
    });
  });

  test('devrait afficher le loader pendant le chargement', () => {
    render(
      <DashboardWrapper>
        <Dashboard />
      </DashboardWrapper>
    );

    expect(screen.getByText('Chargement du tableau de bord...')).toBeInTheDocument();
  });

  test('devrait formater correctement les montants', async () => {
    render(
      <DashboardWrapper>
        <Dashboard />
      </DashboardWrapper>
    );

    await waitFor(() => {
      // Vérifier le formatage en euros
      expect(screen.getByText('150 000,00 €')).toBeInTheDocument();
      expect(screen.getByText('8 500,00 €')).toBeInTheDocument();
      expect(screen.getByText('25 800,00 €')).toBeInTheDocument();
    });
  });

  test('devrait afficher les indicateurs de tendance', async () => {
    render(
      <DashboardWrapper>
        <Dashboard />
      </DashboardWrapper>
    );

    await waitFor(() => {
      // Vérifier les pourcentages d'évolution
      expect(screen.getByText('12,5%')).toBeInTheDocument(); // Évolution CA positive
      expect(screen.getByText('2,1%')).toBeInTheDocument(); // Évolution marge négative
    });
  });
});
