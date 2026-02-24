<template>
  <div class="ejercicio5">
    <div class="header">
      <h1>🏗️ Ejercicio 5: Warehouse Simulator</h1>
      <p>Simulador de formación para conductores de carretillas elevadoras</p>
    </div>
    <WarehouseGame />
  </div>
</template>

<script setup lang="ts">
import WarehouseGame from '@/components/ej5-warehouse/WarehouseGame.vue'
</script>

<style scoped>
.ejercicio5 {
  min-height: calc(100vh - 60px);
  background: #1a202c;
  padding: 2rem;
}

.header {
  text-align: center;
  padding: 2rem;
  color: white;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #ff6600;
}

p {
  font-size: 1.2rem;
  opacity: 0.9;
}
</style>
