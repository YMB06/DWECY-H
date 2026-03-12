import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User, AuthState } from '../types/auth';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  GoogleAuthProvider,
  type UserCredential,
} from 'firebase/auth';
import { auth } from '../config/firebase';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('authToken'));
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Computed
  const isAuthenticated = computed(() => !!user.value && !!token.value);

  // Actions
  async function loginWithGitHub() {
    loading.value = true;
    error.value = null;

    try {
      const provider = new GithubAuthProvider();
      // Solicitar acceso al scope 'user:email' para obtener email
      provider.addScope('user:email');
      provider.addScope('read:user');

      const result: UserCredential = await signInWithPopup(auth, provider);

      // Obtener el token de acceso de GitHub
      const credential = GithubAuthProvider.credentialFromResult(result);
      const githubToken = credential?.accessToken || '';

      if (result.user) {
        user.value = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };

        // Guardar token en localStorage
        if (githubToken) {
          token.value = githubToken;
          localStorage.setItem('authToken', githubToken);
        }
      }

      return result;
    } catch (err: any) {
      error.value = err.message || 'Error al iniciar sesión con GitHub';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function loginWithGoogle() {
    loading.value = true;
    error.value = null;

    try {
      const provider = new GoogleAuthProvider();
      const result: UserCredential = await signInWithPopup(auth, provider);

      // Obtener el token de acceso de Google
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const googleToken = credential?.accessToken || '';

      if (result.user) {
        user.value = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };

        // Guardar token en localStorage
        if (googleToken) {
          token.value = googleToken;
          localStorage.setItem('authToken', googleToken);
        }
      }

      return result;
    } catch (err: any) {
      error.value = err.message || 'Error al iniciar sesión con Google';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      user.value = null;
      token.value = null;
      localStorage.removeItem('authToken');
      error.value = null;
    } catch (err: any) {
      error.value = err.message || 'Error al cerrar sesión';
      throw err;
    }
  }

  function clearToken() {
    token.value = null;
    localStorage.removeItem('authToken');
  }

  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem('authToken', newToken);
  }

  // Watch for auth state changes
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      user.value = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      };
    } else {
      if (!user.value) {
        user.value = null;
      }
    }
  });

  return {
    // State
    user,
    token,
    loading,
    error,

    // Computed
    isAuthenticated,

    // Actions
    loginWithGitHub,
    loginWithGoogle,
    logout,
    clearToken,
    setToken,
  };
});
