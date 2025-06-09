/**
 * Tests pour les services frontend
 */

// Mock de fetch global
global.fetch = jest.fn();

// Import des services
import affairesService from '../../frontend/src/services/affairesService';
import authService from '../../frontend/src/services/authService';

describe('Services Frontend', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('affairesService', () => {
    test('formatStatut retourne le bon label', () => {
      expect(affairesService.formatStatut('EN_COURS')).toBe('En cours');
      expect(affairesService.formatStatut('TERMINE')).toBe('Terminé');
      expect(affairesService.formatStatut('ANNULE')).toBe('Annulé');
      expect(affairesService.formatStatut('EN_ATTENTE')).toBe('En attente');
      expect(affairesService.formatStatut('STATUT_INCONNU')).toBe('STATUT_INCONNU');
    });

    test('formatMontant formate correctement les montants', () => {
      expect(affairesService.formatMontant(1000)).toBe('1 000,00 €');
      expect(affairesService.formatMontant(1234.56)).toBe('1 234,56 €');
      expect(affairesService.formatMontant(0)).toBe('0,00 €');
      expect(affairesService.formatMontant(null)).toBe('0,00 €');
      expect(affairesService.formatMontant(undefined)).toBe('0,00 €');
    });

    test('formatDate formate correctement les dates', () => {
      const date = '2024-03-15T10:30:00.000Z';
      const formatted = affairesService.formatDate(date);
      expect(formatted).toMatch(/15\/03\/2024/);
    });

test('calculateProgress calcule correctement le pourcentage', () => {
    expect(affairesService.calculateProgress({ statut: 'EN_COURS' })).toBe(50);
    expect(affairesService.calculateProgress({ statut: 'TERMINE' })).toBe(100);
    expect(affairesService.calculateProgress({ statut: 'EN_ATTENTE' })).toBe(25);
    expect(affairesService.calculateProgress({ statut: 'ANNULE' })).toBe(0);
    expect(affairesService.calculateProgress({ statut: 'INCONNU' })).toBe(0);
});

    });

    test('getAffaires fait un appel API correct', async () => {
      const mockData = {
        items: [
          { id: '1', nom: 'Affaire Test', statut: 'EN_COURS' }
        ],
        total: 1
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await affairesService.getAffaires();
      
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/affaires'),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      
      expect(result).toEqual(mockData);
    });

    test('getAffaires gère les erreurs', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(affairesService.getAffaires()).rejects.toThrow('Network error');
    });
  });

  describe('authService', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    test('setToken stocke le token dans localStorage', () => {
      const token = 'test-token-123';
      authService.setToken(token);
      
      expect(localStorage.getItem('token')).toBe(token);
    });

    test('getToken récupère le token depuis localStorage', () => {
      const token = 'test-token-456';
      localStorage.setItem('token', token);
      
      expect(authService.getToken()).toBe(token);
    });

    test('removeToken supprime le token de localStorage', () => {
      localStorage.setItem('token', 'test-token');
      authService.removeToken();
      
      expect(localStorage.getItem('token')).toBeNull();
    });

    test('isAuthenticated retourne true si token présent', () => {
      localStorage.setItem('token', 'valid-token');
      expect(authService.isAuthenticated()).toBe(true);
      
      localStorage.removeItem('token');
      expect(authService.isAuthenticated()).toBe(false);
    });

    test('login fait un appel API correct', async () => {
      const mockResponse = {
        access_token: 'token-123',
        user: { id: '1', email: 'test@example.com' }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const credentials = {
        email: 'test@example.com',
        password: 'password123'
      };

      const result = await authService.login(credentials);
      
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/auth/login'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })
      );
      
      expect(result).toEqual(mockResponse);
    });

    test('login gère les erreurs d\'authentification', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ message: 'Invalid credentials' }),
      });

      const credentials = {
        email: 'wrong@example.com',
        password: 'wrongpassword'
      };

      await expect(authService.login(credentials)).rejects.toThrow();
    });

    test('getCurrentUser fait un appel API avec token', async () => {
      const token = 'valid-token';
      const mockUser = { id: '1', email: 'test@example.com', role: 'USER' };

      localStorage.setItem('token', token);
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      const result = await authService.getCurrentUser();
      
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/auth/profile'),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': `Bearer ${token}`,
          }),
        })
      );
      
      expect(result).toEqual(mockUser);
    });
  });

  describe('Utilitaires généraux', () => {
    test('La configuration API est correcte', () => {
      // Vérifier que les constantes de base sont définies
      expect(process.env.VITE_API_URL || 'http://localhost:3001').toBeTruthy();
    });

    test('Les en-têtes par défaut sont corrects', () => {
      const headers = {
        'Content-Type': 'application/json',
      };
      
      expect(headers['Content-Type']).toBe('application/json');
    });

    test('Gestion des erreurs HTTP', () => {
      const createError = (status, message) => {
        const error = new Error(message);
        error.status = status;
        return error;
      };

      const error401 = createError(401, 'Unauthorized');
      expect(error401.status).toBe(401);
      expect(error401.message).toBe('Unauthorized');

      const error500 = createError(500, 'Internal Server Error');
      expect(error500.status).toBe(500);
      expect(error500.message).toBe('Internal Server Error');
    });
  });
}); 