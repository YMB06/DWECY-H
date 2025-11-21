<template>
  <div class="window-size-display">
    <h2>Monitor de Dimensiones de la Ventana</h2>
    <div class="dimensions">
      <p>Ancho: {{ width }}px - Alto: {{ height }}px</p>
      <div class="info">
        <small>Redimensiona la ventana para ver los cambios en tiempo real</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@/composables/useWindowSize';

const { width, height } = useWindowSize();
</script>

<style scoped>
.window-size-display {
  padding: 20px;
  text-align: center;
}

.dimensions {
  background: #f5f5f5;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  font-size: 1.2rem;
  font-weight: bold;
}

.info {
  margin-top: 10px;
  color: #666;
  font-size: 0.9rem;
  font-weight: normal;
}
</style>