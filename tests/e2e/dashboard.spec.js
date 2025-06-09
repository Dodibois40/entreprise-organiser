import { test, expect } from '@playwright/test';

test.describe('Dashboard E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Se connecter avant chaque test
    await page.goto('/');
    await page.fill('input[type="email"]', 'admin@entreprise.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('devrait afficher tous les éléments du dashboard', async ({ page }) => {
    // Vérifier le titre principal
    await expect(page.locator('h1')).toContainText('Tableau de Bord');
    await expect(page.locator('text=Vue d\'ensemble de votre activité')).toBeVisible();

    // Vérifier les boutons d'action
    await expect(page.locator('button:has-text("Actualiser")')).toBeVisible();
    await expect(page.locator('button:has-text("Analyses avancées")')).toBeVisible();

    // Vérifier les KPIs
    await expect(page.locator('[data-testid="kpi-cards"]')).toBeVisible();
    await expect(page.locator('text=Chiffre d\'affaires')).toBeVisible();
    await expect(page.locator('text=Affaires actives')).toBeVisible();
    await expect(page.locator('text=Marge moyenne')).toBeVisible();
    await expect(page.locator('text=Notifications')).toBeVisible();
  });

  test('devrait afficher les sections principales', async ({ page }) => {
    // Attendre que les données se chargent
    await page.waitForSelector('[data-testid="kpi-cards"]');

    // Vérifier les sections
    await expect(page.locator('text=Affaires récentes')).toBeVisible();
    await expect(page.locator('text=Inventaire')).toBeVisible();
    await expect(page.locator('text=Notifications récentes')).toBeVisible();
  });

  test('devrait permettre la navigation vers les analyses avancées', async ({ page }) => {
    // Cliquer sur le bouton "Analyses avancées"
    await page.click('button:has-text("Analyses avancées")');
    
    // Vérifier la navigation
    await expect(page).toHaveURL('/analyses-avancees');
    await expect(page.locator('h1')).toContainText('Analyses');
  });

  test('devrait permettre la navigation vers les notifications', async ({ page }) => {
    // Attendre le chargement des notifications
    await page.waitForSelector('text=Notifications récentes');
    
    // Cliquer sur "Voir toutes" dans les notifications
    await page.click('text=Voir toutes');
    
    // Vérifier la navigation
    await expect(page).toHaveURL('/notifications');
    await expect(page.locator('h1')).toContainText('Notifications');
  });

  test('devrait permettre la navigation vers les affaires', async ({ page }) => {
    // Attendre le chargement des affaires
    await page.waitForSelector('text=Affaires récentes');
    
    // Cliquer sur "Voir toutes" dans les affaires
    await page.click('text=Voir toutes', { nth: 0 }); // Premier "Voir toutes"
    
    // Vérifier la navigation
    await expect(page).toHaveURL('/chantiers');
  });

  test('devrait permettre la navigation vers l\'inventaire', async ({ page }) => {
    // Attendre le chargement de l'inventaire
    await page.waitForSelector('text=Inventaire');
    
    // Cliquer sur "Gérer" dans l'inventaire
    await page.click('text=Gérer');
    
    // Vérifier la navigation
    await expect(page).toHaveURL('/articles');
    await expect(page.locator('h1')).toContainText('Articles');
  });

  test('devrait actualiser les données', async ({ page }) => {
    // Attendre le chargement initial
    await page.waitForSelector('[data-testid="kpi-cards"]');
    
    // Cliquer sur le bouton actualiser
    await page.click('button:has-text("Actualiser")');
    
    // Vérifier que le loader apparaît brièvement
    await expect(page.locator('text=Chargement')).toBeVisible({ timeout: 1000 });
    
    // Vérifier que les données sont toujours présentes après actualisation
    await expect(page.locator('[data-testid="kpi-cards"]')).toBeVisible();
  });

  test('devrait afficher les alertes critiques', async ({ page }) => {
    // Attendre le chargement
    await page.waitForSelector('[data-testid="kpi-cards"]');
    
    // Vérifier si des alertes critiques sont présentes
    const alertes = page.locator('text=Alertes critiques');
    const count = await alertes.count();
    
    if (count > 0) {
      await expect(alertes).toBeVisible();
      
      // Cliquer sur "Voir toutes" dans les alertes
      await page.click('text=Voir toutes', { nth: -1 }); // Dernier "Voir toutes"
      
      // Vérifier la navigation vers les notifications
      await expect(page).toHaveURL('/notifications');
    }
  });

  test('devrait formater correctement les montants', async ({ page }) => {
    // Attendre le chargement des KPIs
    await page.waitForSelector('[data-testid="kpi-cards"]');
    
    // Vérifier le format des montants (format français avec €)
    const montants = page.locator('text=/\\d+.*€/');
    const count = await montants.count();
    
    if (count > 0) {
      const premierMontant = await montants.first().textContent();
      expect(premierMontant).toMatch(/\d+.*€/);
    }
  });

  test('devrait afficher les pourcentages d\'évolution', async ({ page }) => {
    // Attendre le chargement des KPIs
    await page.waitForSelector('[data-testid="kpi-cards"]');
    
    // Vérifier la présence d'indicateurs de tendance
    const pourcentages = page.locator('text=/%/');
    const count = await pourcentages.count();
    
    if (count > 0) {
      const premierPourcentage = await pourcentages.first().textContent();
      expect(premierPourcentage).toMatch(/\d+.*%/);
    }
  });

  test('devrait être responsive sur mobile', async ({ page }) => {
    // Changer la taille de la viewport pour simuler un mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Attendre le rechargement
    await page.waitForSelector('[data-testid="kpi-cards"]');
    
    // Vérifier que les éléments s'adaptent
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-testid="kpi-cards"]')).toBeVisible();
    
    // Vérifier que le contenu ne déborde pas
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375);
  });

  test('devrait gérer les erreurs de chargement gracieusement', async ({ page }) => {
    // Intercepter les requêtes de données pour simuler des erreurs
    await page.route('**/api/reporting/dashboard-data', route => {
      route.abort('failed');
    });
    
    // Actualiser pour déclencher l'erreur
    await page.click('button:has-text("Actualiser")');
    
    // Vérifier l'affichage de l'erreur
    await expect(page.locator('text=Erreur de chargement')).toBeVisible();
    await expect(page.locator('button:has-text("Réessayer")')).toBeVisible();
  });

  test('devrait permettre de réessayer en cas d\'erreur', async ({ page }) => {
    // Intercepter les requêtes pour simuler une erreur puis un succès
    let requestCount = 0;
    await page.route('**/api/reporting/dashboard-data', route => {
      requestCount++;
      if (requestCount === 1) {
        route.abort('failed');
      } else {
        route.continue();
      }
    });
    
    // Actualiser pour déclencher l'erreur
    await page.click('button:has-text("Actualiser")');
    
    // Attendre l'erreur
    await expect(page.locator('text=Erreur de chargement')).toBeVisible();
    
    // Cliquer sur réessayer
    await page.click('button:has-text("Réessayer")');
    
    // Vérifier le retour à l'état normal
    await expect(page.locator('[data-testid="kpi-cards"]')).toBeVisible();
  });
}); 