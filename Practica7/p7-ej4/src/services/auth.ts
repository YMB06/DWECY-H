import { useAuthStore } from '../stores/auth';

/**
 * Servicio de autenticación
 * Proporciona una interfaz limpia para operaciones de autenticación
 */
export class AuthService {
  private authStore = useAuthStore();

  /**
   * Iniciar sesión con GitHub
   */
  async loginWithGitHub() {
    return await this.authStore.loginWithGitHub();
  }

  /**
   * Iniciar sesión con Google
   */
  async loginWithGoogle() {
    return await this.authStore.loginWithGoogle();
  }

  /**
   * Cerrar sesión
   */
  async logout() {
    return await this.authStore.logout();
  }

  /**
   * Obtener el token actual
   */
  getToken(): string | null {
    return this.authStore.token;
  }

  /**
   * Comprobar si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return this.authStore.isAuthenticated;
  }

  /**
   * Obtener información del usuario
   */
  getUser() {
    return this.authStore.user;
  }

  /**
   * Establecer un nuevo token (usado principalmente en pruebas)
   */
  setToken(token: string) {
    this.authStore.setToken(token);
  }

  /**
   * Limpiar el token (usado por interceptores)
   */
  clearToken() {
    this.authStore.clearToken();
  }
}

// Exportar singleton
export const authService = new AuthService();
