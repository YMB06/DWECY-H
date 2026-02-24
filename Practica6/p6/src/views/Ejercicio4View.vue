<template>
  <div class="ejercicio4">
    <div class="header">
      <h1>📦 Ejercicio 4: Diseñador de Packaging B2B</h1>
      <p>Herramienta 3D con Three.js para diseñar cajas de envío personalizadas</p>
    </div>
    <PackagingDesigner />
  </div>
</template>

<script setup lang="ts">
import PackagingDesigner from '@/components/ej4-packaging/PackagingDesigner.vue'
</script>

<style scoped>
.ejercicio4 {
  min-height: calc(100vh - 60px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header {
  text-align: center;
  padding: 2rem;
  color: white;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

p {
  font-size: 1.2rem;
  opacity: 0.9;
}
</style>
