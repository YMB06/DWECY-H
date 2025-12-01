<template>
  <div class="navigation-tools">
    <h2>Panel de Control de Navegación</h2>
    
    <div class="controls">
      <button @click="reloadPage" class="reload-btn">
        Recargar Página
      </button>
      
      <div class="url-navigation">
        <input 
          type="text" 
          v-model="externalUrl" 
          placeholder="Introduce una URL"
          class="url-input"
        />
        <button @click="goToExternalUrl" class="go-btn">
          Ir
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const externalUrl = ref('https://vuejs.org');

function reloadPage() {
  window.location.reload();
}

function goToExternalUrl() {
  window.location.assign(externalUrl.value);
}
</script>

<style scoped>
.navigation-tools {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
}

.reload-btn {
  padding: 12px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

.reload-btn:hover {
  background: #c82333;
}

.url-navigation {
  display: flex;
  gap: 10px;
  align-items: center;
}

.url-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-background);
  color: var(--color-text);
}

.go-btn {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

.go-btn:hover {
  background: #0056b3;
}

@media (max-width: 600px) {
  .url-navigation {
    flex-direction: column;
  }
  
  .url-input {
    width: 100%;
  }
}
</style>