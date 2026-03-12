<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useToastStore } from '../stores/toast';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const toastStore = useToastStore();
const router = useRouter();

const isLoading = ref(false);

async function handleGitHubLogin() {
  isLoading.value = true;
  try {
    await authStore.loginWithGitHub();
    toastStore.addToast('¡Sesión iniciada con GitHub!', 'success');
    router.push('/dashboard');
  } catch (error: any) {
    toastStore.addToast(
      error.message || 'Error al iniciar sesión con GitHub',
      'error'
    );
  } finally {
    isLoading.value = false;
  }
}

async function handleGoogleLogin() {
  isLoading.value = true;
  try {
    await authStore.loginWithGoogle();
    toastStore.addToast('¡Sesión iniciada con Google!', 'success');
    router.push('/dashboard');
  } catch (error: any) {
    toastStore.addToast(
      error.message || 'Error al iniciar sesión con Google',
      'error'
    );
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>🔐 GitHub DevHub</h1>
        <p>Panel Seguro con Autenticación OAuth</p>
      </div>

      <div class="login-body">
        <p class="login-description">
          Para acceder al panel, debes iniciar sesión con tu cuenta de GitHub o
          Google
        </p>

        <button
          @click="handleGitHubLogin"
          :disabled="isLoading"
          class="btn btn-github"
        >
          <span v-if="!isLoading">🐙 Iniciar sesión con GitHub</span>
          <span v-else>Cargando...</span>
        </button>

        <button
          @click="handleGoogleLogin"
          :disabled="isLoading"
          class="btn btn-google"
        >
          <span v-if="!isLoading">🔍 Iniciar sesión con Google</span>
          <span v-else>Cargando...</span>
        </button>
      </div>

      <div class="login-footer">
        <p class="security-notice">
          🔒 Tu token se gestiona automáticamente de forma segura
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  overflow: hidden;
}

.login-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px 20px;
  text-align: center;
}

.login-header h1 {
  margin: 0 0 10px 0;
  font-size: 28px;
}

.login-header p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}

.login-body {
  padding: 40px 20px;
}

.login-description {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
  font-size: 14px;
}

.btn {
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 12px;
  text-align: center;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-github {
  background-color: #24292e;
  color: white;
}

.btn-github:hover:not(:disabled) {
  background-color: #1a1e22;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(36, 41, 46, 0.3);
}

.btn-google {
  background-color: #4285f4;
  color: white;
}

.btn-google:hover:not(:disabled) {
  background-color: #357ae8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.3);
}

.login-footer {
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
}

.security-notice {
  margin: 0;
  font-size: 13px;
  color: #666;
}
</style>
