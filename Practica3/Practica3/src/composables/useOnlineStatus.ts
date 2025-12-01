import { ref, onMounted, onUnmounted } from 'vue';

export function useOnlineStatus() {
  const isOnline = ref(false);

  function updateOnlineStatus() {
    isOnline.value = navigator.onLine;
  }

  function handleOnline() {
    isOnline.value = true;
  }

  function handleOffline() {
    isOnline.value = false;
  }

  onMounted(() => {
    isOnline.value = navigator.onLine;
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
  });

  onUnmounted(() => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  });

  return {
    isOnline
  };
}