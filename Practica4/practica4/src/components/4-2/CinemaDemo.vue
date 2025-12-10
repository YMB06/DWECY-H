<script setup lang="ts">
import SalaCine from './SalaCine.vue';
</script>

<template>
  <div class="cinema-demo">
    <h1>Demo - Gestor de Sala de Cine</h1>
    
    <div class="demo-container">
      <h2>Sala Principal (8x10)</h2>
      <SalaCine :filas="8" :columnas="10" :precio-por-butaca="12" />
    </div>
    
    <div class="demo-container">
      <h2>Sala VIP (5x8)</h2>
      <SalaCine :filas="5" :columnas="8" :precio-por-butaca="18" />
    </div>
  </div>
</template>

<style scoped>
.cinema-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-container {
  margin: 40px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 40px;
}

h2 {
  text-align: center;
  color: #666;
  margin-bottom: 20px;
}
</style>