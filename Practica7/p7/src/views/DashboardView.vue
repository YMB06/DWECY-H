<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useToastStore } from '@/stores/toast';
import { apiService } from '@/services/api';

const router = useRouter();
const authStore = useAuthStore();
const toastStore = useToastStore();

const userData = ref<any>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

onMounted(() => {
  // Verificar que el usuario está autenticado
  if (!authStore.isAuthenticated) {
    router.push('/');
    return;
  }

  userData.value = authStore.user;
});

async function handleLogout() {
  try {
    await authStore.logout();
    toastStore.addToast('Sesión cerrada correctamente', 'success');
    router.push('/');
  } catch (err: any) {
    toastStore.addToast('Error al cerrar sesión', 'error');
  }
}

async function fetchUserData() {
  isLoading.value = true;
  error.value = null;

  try {
    // Ejemplo de petición a la API (necesitarás un endpoint real)
    // const response = await apiService.get('/api/user/profile');
    toastStore.addToast('Datos cargados correctamente', 'success');
  } catch (err: any) {
    error.value = err.message || 'Error al cargar datos';
    toastStore.addToast(error.value || 'Error', 'error');
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <div class="header-content">
        <h1>🎛️ Panel de Control</h1>
        <button @click="handleLogout" class="btn-logout">Cerrar Sesión</button>
      </div>
    </header>

    <main class="dashboard-main">
      <div class="dashboard-card welcome-card">
        <h2>¡Bienvenido, {{ authStore.user?.displayName || 'Usuario' }}!</h2>

        <div v-if="authStore.user" class="user-info">
          <p>
            <strong>Email:</strong>
            <span>{{ authStore.user.email || 'No disponible' }}</span>
          </p>
          <p>
            <strong>ID de Usuario:</strong>
            <span>{{ authStore.user.uid }}</span>
          </p>
          <p v-if="authStore.token">
            <strong>Token:</strong>
            <span class="token-preview">{{ authStore.token.substring(0, 20) }}...</span>
          </p>
        </div>

        <div class="security-info">
          <h3>🔐 Información de Seguridad</h3>
          <ul>
            <li>✅ Token almacenado en sessionStorage</li>
            <li>✅ Interceptores de petición activos</li>
            <li>✅ Manejo automático de errores 401/403</li>
            <li>✅ Notificaciones de sesión expirada habilitadas</li>
          </ul>
        </div>

        <button @click="fetchUserData" :disabled="isLoading" class="btn-fetch">
          {{ isLoading ? 'Cargando...' : '📡 Cargar Datos de Ejemplo' }}
        </button>

        <p v-if="error" class="error-message">Erro: {{ error }}</p>
      </div>

      <div class="dashboard-card info-card">
        <h3>ℹ️ Cómo funciona</h3>
        <ol>
          <li>
            <strong>Autenticación:</strong> Tu sesión está protegida con
            Firebase OAuth
          </li>
          <li>
            <strong>Token Automático:</strong> El token se inyecta en todas las
            peticiones
          </li>
          <li>
            <strong>Errores Manejados:</strong> Si el servidor devuelve 401 o
            403, tu sesión se cierra automáticamente
          </li>
          <li>
            <strong>Notificaciones:</strong> Recibirás alertas emergentes (Toast)
            de cualquier problema
          </li>
        </ol>
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.dashboard-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h1 {
  margin: 0;
  font-size: 28px;
}

.btn-logout {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn-logout:hover {
  background-color: #ff5252;
}

.dashboard-main {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

.dashboard-card {
  background: white;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.welcome-card h2 {
  margin-top: 0;
  color: #333;
}

.user-info {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 4px;
  margin: 20px 0;
}

.user-info p {
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-info strong {
  color: #667eea;
  min-width: 100px;
}

.token-preview {
  font-family: 'Courier New', monospace;
  background-color: white;
  padding: 4px 8px;
  border-radius: 3px;
  font-size: 12px;
}

.security-info {
  background-color: #e8f5e9;
  border-left: 4px solid #4caf50;
  padding: 20px;
  border-radius: 4px;
  margin: 20px 0;
}

.security-info h3 {
  margin-top: 0;
  color: #2e7d32;
}

.security-info ul {
  margin: 0;
  padding-left: 20px;
}

.security-info li {
  color: #558b2f;
  margin: 8px 0;
}

.btn-fetch {
  background-color: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s;
  margin-top: 20px;
}

.btn-fetch:hover:not(:disabled) {
  background-color: #556cd6;
}

.btn-fetch:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #d32f2f;
  background-color: #ffebee;
  padding: 12px;
  border-radius: 4px;
  margin-top: 20px;
}

.info-card {
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
}

.info-card h3 {
  color: #1565c0;
  margin-top: 0;
}

.info-card ol {
  color: #0d47a1;
  padding-left: 20px;
}

.info-card li {
  margin-bottom: 12px;
  line-height: 1.6;
}
</style>
