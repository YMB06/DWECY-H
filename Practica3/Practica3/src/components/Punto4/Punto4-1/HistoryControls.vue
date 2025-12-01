<template>
  <div class="history-controls">
    <h2>Controles de Navegación</h2>
    
    <div class="info">
      <p>Páginas en el historial de sesión: {{ historyLength }}</p>
    </div>
    
    <div class="controls">
      <button @click="goBack" class="nav-btn back-btn">
        ← Atrás
      </button>
      
      <button @click="goForward" class="nav-btn forward-btn">
        Adelante →
      </button>
      
      <button @click="goTo(-2)" class="nav-btn go-btn">
        Ir 2 páginas atrás
      </button>
    </div>
    
    <p class="note">
      Navega por varias páginas para probar estos controles
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const historyLength = ref(0);

function goBack() {
  history.back();
}

function goForward() {
  history.forward();
}

function goTo(pages: number) {
  history.go(pages);
}

onMounted(() => {
  historyLength.value = history.length;
});
</script>

<style scoped>
.history-controls {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.info {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
  text-align: center;
}

.info p {
  margin: 0;
  font-weight: bold;
  color: var(--color-heading);
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0;
}

.nav-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.back-btn {
  background: #6c757d;
  color: white;
}

.back-btn:hover {
  background: #5a6268;
}

.forward-btn {
  background: #007bff;
  color: white;
}

.forward-btn:hover {
  background: #0056b3;
}

.go-btn {
  background: #28a745;
  color: white;
}

.go-btn:hover {
  background: #1e7e34;
}

.note {
  text-align: center;
  color: var(--color-text);
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 20px;
}

@media (max-width: 600px) {
  .controls {
    flex-direction: column;
    align-items: center;
  }
  
  .nav-btn {
    width: 200px;
  }
}
</style>