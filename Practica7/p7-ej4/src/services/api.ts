import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { useAuthStore } from '../stores/auth';

export interface ApiError {
  message: string;
  status: number;
  data?: any;
}

class ApiService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
      timeout: 10000,
    });

    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        const authStore = useAuthStore();
        
        // Inyectar token en Authorization header si existe
        if (authStore.token) {
          config.headers.Authorization = `Bearer ${authStore.token}`;
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        const authStore = useAuthStore();
        
        // Manejar errores de autenticación
        if (error.response?.status === 401 || error.response?.status === 403) {
          // Limpiar la sesión
          authStore.logout();
          
          // Emitir evento para mostrar notificación
          const event = new CustomEvent('sessionExpired', {
            detail: {
              message: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.',
              type: 'error',
            },
          });
          window.dispatchEvent(event);
        }
        
        return Promise.reject(error);
      }
    );
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }

  // Métodos auxiliares para peticiones comunes
  public get<T = any>(url: string, config?: any): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  public post<T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  public put<T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  public delete<T = any>(url: string, config?: any): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }
}

export const apiService = new ApiService();
