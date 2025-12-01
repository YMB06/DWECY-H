<template>
  <div class="browser-info">
    <h2>Panel de Información del Navegador</h2>
    
    <div class="info-card">
      <ul class="info-list">
        <li>
          <strong>Idioma del Navegador:</strong> {{ language }}
        </li>
        <li>
          <strong>Sistema Operativo:</strong> {{ platform }}
        </li>
        <li>
          <strong>Cookies Habilitadas:</strong> {{ cookiesEnabled }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const language = computed(() => navigator.language);
const platform = computed(() => navigator.platform);
const cookiesEnabled = computed(() => navigator.cookieEnabled ? 'Sí' : 'No');
</script>

<style scoped>
.browser-info {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.info-card {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-list li {
  padding: 10px 0;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
}

.info-list li:last-child {
  border-bottom: none;
}

.info-list strong {
  color: var(--color-heading);
}
</style>