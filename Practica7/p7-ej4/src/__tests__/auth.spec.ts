import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '../stores/auth';

describe('Auth Store', () => {
  beforeEach(() => {
    // Crear una nueva instancia de Pinia para cada test
    setActivePinia(createPinia());
    localStorage.clear();
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const authStore = useAuthStore();

      expect(authStore.user).toBeNull();
      expect(authStore.loading).toBe(false);
      expect(authStore.error).toBeNull();
      expect(authStore.isAuthenticated).toBe(false);
    });

    it('should restore token from localStorage', () => {
      localStorage.setItem('authToken', 'restored-token');
      const authStore = useAuthStore();

      expect(authStore.token).toBe('restored-token');
    });
  });

  describe('Token Management', () => {
    it('should set token', () => {
      const authStore = useAuthStore();
      const testToken = 'new-test-token';

      authStore.setToken(testToken);

      expect(authStore.token).toBe(testToken);
      expect(localStorage.getItem('authToken')).toBe(testToken);
    });

    it('should clear token', () => {
      const authStore = useAuthStore();
      authStore.setToken('test-token');

      authStore.clearToken();

      expect(authStore.token).toBeNull();
      expect(localStorage.getItem('authToken')).toBeNull();
    });
  });

  describe('Computed Properties', () => {
    it('should compute isAuthenticated correctly', () => {
      const authStore = useAuthStore();

      expect(authStore.isAuthenticated).toBe(false);

      authStore.setToken('test-token');
      authStore.user = {
        uid: '123',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: null,
      };

      expect(authStore.isAuthenticated).toBe(true);

      authStore.clearToken();
      expect(authStore.isAuthenticated).toBe(false);
    });
  });
});
