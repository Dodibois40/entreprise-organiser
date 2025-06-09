import { test, expect } from '@playwright/test';

test.describe('Authentification E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('devrait afficher la page de connexion', async ({ page }) => {
    // Vérifier que nous sommes sur la page de connexion
    await expect(page).toHaveTitle(/Entreprise Organiser/);
    await expect(page.locator('h1')).toContainText('Connexion');
    
    // Vérifier la présence des champs de formulaire
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('devrait rejeter des identifiants invalides', async ({ page }) => {
    // Remplir le formulaire avec des identifiants invalides
    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    
    // Cliquer sur le bouton de connexion
    await page.click('button[type="submit"]');
    
    // Vérifier le message d'erreur
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('.error-message')).toContainText('Identifiants invalides');
    
    // Vérifier que nous sommes toujours sur la page de connexion
    await expect(page.locator('h1')).toContainText('Connexion');
  });

  test('devrait connecter un utilisateur avec des identifiants valides', async ({ page }) => {
    // Remplir le formulaire avec des identifiants valides
    await page.fill('input[type="email"]', 'admin@entreprise.com');
    await page.fill('input[type="password"]', 'admin123');
    
    // Cliquer sur le bouton de connexion
    await page.click('button[type="submit"]');
    
    // Vérifier la redirection vers le dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Tableau de Bord');
    
    // Vérifier la présence d'éléments du dashboard
    await expect(page.locator('[data-testid="kpi-cards"]')).toBeVisible();
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('devrait valider les champs requis', async ({ page }) => {
    // Essayer de soumettre le formulaire vide
    await page.click('button[type="submit"]');
    
    // Vérifier les messages de validation HTML5
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    
    await expect(emailInput).toHaveAttribute('required');
    await expect(passwordInput).toHaveAttribute('required');
  });

  test('devrait gérer la déconnexion', async ({ page }) => {
    // Se connecter d'abord
    await page.fill('input[type="email"]', 'admin@entreprise.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // Attendre d'être sur le dashboard
    await expect(page).toHaveURL('/dashboard');
    
    // Ouvrir le menu utilisateur
    await page.click('[data-testid="user-menu"]');
    
    // Cliquer sur déconnexion
    await page.click('text=Déconnexion');
    
    // Vérifier la redirection vers la page de connexion
    await expect(page).toHaveURL('/login');
    await expect(page.locator('h1')).toContainText('Connexion');
  });

  test('devrait rediriger les utilisateurs non connectés', async ({ page }) => {
    // Essayer d'accéder directement au dashboard
    await page.goto('/dashboard');
    
    // Vérifier la redirection vers la page de connexion
    await expect(page).toHaveURL(/.*login.*/);
    await expect(page.locator('h1')).toContainText('Connexion');
  });

  test('devrait maintenir la session après rafraîchissement', async ({ page }) => {
    // Se connecter
    await page.fill('input[type="email"]', 'admin@entreprise.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/dashboard');
    
    // Rafraîchir la page
    await page.reload();
    
    // Vérifier que l'utilisateur est toujours connecté
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('devrait afficher les erreurs de réseau gracieusement', async ({ page }) => {
    // Intercepter les requêtes d'authentification pour simuler une erreur réseau
    await page.route('**/auth/login', route => {
      route.abort('failed');
    });
    
    // Essayer de se connecter
    await page.fill('input[type="email"]', 'admin@entreprise.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // Vérifier le message d'erreur de réseau
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('.error-message')).toContainText(/erreur.*réseau|connexion/i);
  });
}); 