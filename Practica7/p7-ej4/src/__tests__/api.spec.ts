import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { apiService } from '../services/api';
import { useAuthStore } from '../stores/auth';
import { setActivePinia, createPinia } from 'pinia';

describe('API Service with Axios Interceptors', () => {
  let mockAxios: MockAdapter;
  let authStore: ReturnType<typeof useAuthStore>;

  beforeEach(() => {
    // Crear una nueva instancia de Pinia para cada test
    setActivePinia(createPinia());
    authStore = useAuthStore();

    // Crear mock adapter para la instancia de axios del apiService
    mockAxios = new MockAdapter(apiService.getInstance());
  });

  afterEach(() => {
    mockAxios.reset();
    vi.clearAllMocks();
  });

  describe('Request Interceptor', () => {
    it('should inject Authorization header when token exists', async () => {
      const testToken = 'test-bearer-token-123';
      authStore.setToken(testToken);

      mockAxios.onGet('/api/test').reply(200, { message: 'success' });

      await apiService.get('/api/test');

      const lastRequest = mockAxios.history.get[0];
      expect(lastRequest.headers.Authorization).toBe(`Bearer ${testToken}`);
    });

    it('should not inject Authorization header when no token exists', async () => {
      authStore.token = null;
      localStorage.removeItem('authToken');

      mockAxios.onGet('/api/test').reply(200, { message: 'success' });

      await apiService.get('/api/test');

      const lastRequest = mockAxios.history.get[0];
      expect(lastRequest.headers.Authorization).toBeUndefined();
    });
  });

  describe('Response Interceptor - Error Handling (CRITICAL TEST)', () => {
    it('should clear token on 401 Unauthorized error', async () => {
      const testToken = 'test-token';
      authStore.setToken(testToken);

      mockAxios.onGet('/api/protected').reply(401, { error: 'Unauthorized' });

      try {
        await apiService.get('/api/protected');
      } catch (error) {
        // Se espera que lance error
      }

      // VERIFY: El token debe ser limpiado
      expect(authStore.token).toBeNull();
      expect(localStorage.getItem('authToken')).toBeNull();
    });

    it('should clear token on 403 Forbidden error', async () => {
      const testToken = 'test-token';
      authStore.setToken(testToken);

      mockAxios.onGet('/api/forbidden').reply(403, { error: 'Forbidden' });

      try {
        await apiService.get('/api/forbidden');
      } catch (error) {
        // Se espera que lance error
      }

      // VERIFY: El token debe ser limpiado
      expect(authStore.token).toBeNull();
      expect(localStorage.getItem('authToken')).toBeNull();
    });

    it('should emit sessionExpired event on 401', (done) => {
      const testToken = 'test-token-xyz';
      authStore.setToken(testToken);

      mockAxios.onGet('/api/user').reply(401, { error: 'Unauthorized' });

      // Escuchar el evento
      const eventListener = (event: CustomEvent) => {
        expect(event.detail.type).toBe('error');
        expect(event.detail.message).toContain('sesión ha expirado');
        window.removeEventListener('sessionExpired', eventListener as EventListener);
        done();
      };

      window.addEventListener('sessionExpired', eventListener as EventListener);

      apiService.get('/api/user').catch(() => {
        // Error esperado
      });
    });

    it('should not clear token on successful requests', async () => {
      const testToken = 'test-token-xyz';
      authStore.setToken(testToken);

      mockAxios.onGet('/api/data').reply(200, { data: 'success' });

      await apiService.get('/api/data');

      expect(authStore.token).toBe(testToken);
      expect(localStorage.getItem('authToken')).toBe(testToken);
    });

    it('should not clear token on 404 or other client errors', async () => {
      const testToken = 'test-token-xyz';
      authStore.setToken(testToken);

      mockAxios.onGet('/api/notfound').reply(404, { error: 'Not Found' });

      try {
        await apiService.get('/api/notfound');
      } catch (error) {
        // Error esperado, pero no debe limpiar token
      }

      expect(authStore.token).toBe(testToken);
    });
  });

  describe('API Methods', () => {
    it('should make GET requests', async () => {
      mockAxios.onGet('/api/test').reply(200, { message: 'success' });

      const response = await apiService.get('/api/test');
      expect(response.status).toBe(200);
      expect(response.data.message).toBe('success');
    });

    it('should make POST requests', async () => {
      const data = { name: 'test user' };
      mockAxios.onPost('/api/create').reply(201, { id: 1, ...data });

      const response = await apiService.post('/api/create', data);
      expect(response.status).toBe(201);
      expect(response.data.name).toBe('test user');
    });

    it('should make PUT requests', async () => {
      const data = { name: 'updated user' };
      mockAxios.onPut('/api/update/1').reply(200, { id: 1, ...data });

      const response = await apiService.put('/api/update/1', data);
      expect(response.status).toBe(200);
      expect(response.data.name).toBe('updated user');
    });

    it('should make DELETE requests', async () => {
      mockAxios.onDelete('/api/delete/1').reply(204);

      const response = await apiService.delete('/api/delete/1');
      expect(response.status).toBe(204);
    });
  });
});
