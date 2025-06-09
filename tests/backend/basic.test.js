/**
 * Tests basiques pour vérifier la configuration
 */

describe('Tests de Base', () => {
  test('Jest fonctionne correctement', () => {
    expect(1 + 1).toBe(2);
    expect('hello').toBe('hello');
    expect(true).toBe(true);
  });

  test('Les variables d\'environnement de test sont configurées', () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(process.env.JWT_SECRET).toBe('test-jwt-secret-for-testing-only');
  });

  test('Les fonctions asynchrones fonctionnent', async () => {
    const promise = new Promise(resolve => {
      setTimeout(() => resolve('test async'), 100);
    });

    const result = await promise;
    expect(result).toBe('test async');
  });

  test('Les mocks fonctionnent', () => {
    const mockFn = jest.fn();
    mockFn('test');
    
    expect(mockFn).toHaveBeenCalledWith('test');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('Date et Math fonctionnent', () => {
    const now = new Date();
    expect(now).toBeInstanceOf(Date);
    
    expect(Math.round(4.6)).toBe(5);
    expect(Math.max(1, 3, 2)).toBe(3);
  });

  test('Les objets et tableaux fonctionnent', () => {
    const obj = { name: 'test', value: 42 };
    expect(obj).toHaveProperty('name');
    expect(obj.name).toBe('test');

    const arr = [1, 2, 3];
    expect(arr).toHaveLength(3);
    expect(arr).toContain(2);
  });

  test('Les regex fonctionnent', () => {
    const email = 'test@example.com';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    expect(emailRegex.test(email)).toBe(true);
    expect(emailRegex.test('invalid-email')).toBe(false);
  });

  test('JSON parse/stringify fonctionne', () => {
    const obj = { test: 'data', number: 123 };
    const jsonString = JSON.stringify(obj);
    const parsed = JSON.parse(jsonString);
    
    expect(parsed).toEqual(obj);
  });
}); 