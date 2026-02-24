<template>
  <div class="home">
    <h1>🏗️ Warehouse Simulator</h1>
    <p class="subtitle">Simulador de Formación para Conductores de Carretillas Elevadoras</p>
    <WarehouseGame />
  </div>
</template>

<script setup lang="ts">
import WarehouseGame from '@/components/game/WarehouseGame.vue'
</script>

<style scoped>
.home {
  padding: 2rem;
  text-align: center;
}

h1 {
  color: #ff6600;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}
</style>
