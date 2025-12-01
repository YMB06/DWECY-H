<template>
  <div class="online-status-indicator">
    <h2>Estado de Conexión</h2>
    
    <div v-if="isOnline" class="online">
      🟢 Conectado
    </div>
    <div v-else class="offline">
      🔴 Sin conexión
    </div>
    
    <p class="info">
      Desconecta tu internet para ver el cambio en tiempo real
    </p>
  </div>
</template>

<script setup lang="ts">
import { useOnlineStatus } from '@/composables/useOnlineStatus';

const { isOnline } = useOnlineStatus();
</script>

<style scoped>
.online-status-indicator {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.online, .offline {
  font-size: 1.5rem;
  font-weight: bold;
  padding: 15px 20px;
  border-radius: 8px;
  margin: 20px 0;
  transition: all 0.3s ease;
}

.online {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.offline {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.info {
  color: var(--color-text);
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 15px;
}

@media (prefers-color-scheme: dark) {
  .online {
    background: #1e4620;
    color: #75dd79;
    border-color: #2d5a2f;
  }
  
  .offline {
    background: #4a1e1e;
    color: #f87171;
    border-color: #5a2d2d;
  }
}
</style>