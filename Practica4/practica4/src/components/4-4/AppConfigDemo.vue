<script setup lang="ts">
import { AppConfig } from '@/services/AppConfig';
import { computed } from 'vue';
import PanelDeControl from './PanelDeControl.vue';
import ContenidoPrincipal from './ContenidoPrincipal.vue';

const settings = AppConfig.getInstance().getSettings();

const themeClasses = computed(() => {
  return settings.value.theme === 'dark' ? 'theme-dark' : 'theme-light';
});
</script>

<template>
  <div :class="themeClasses" class="app-demo">
    <h1>Demo - Patrón Singleton AppConfig</h1>
    
    <div class="layout">
      <aside class="sidebar">
        <PanelDeControl />
      </aside>
      
      <main class="main-content">
        <ContenidoPrincipal />
        <ContenidoPrincipal />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-demo {
  min-height: 100vh;
  padding: 20px;
  transition: all 0.3s ease;
}

.theme-light {
  --bg-color: white;
  --text-color: #333;
  --content-bg: #f9f9f9;
  --content-text: #333;
  --input-bg: white;
  --input-text: #333;
  background-color: #f5f5f5;
  color: #333;
}

.theme-dark {
  --bg-color: #2d3748;
  --text-color: #e2e8f0;
  --content-bg: #4a5568;
  --content-text: #e2e8f0;
  --input-bg: #4a5568;
  --input-text: #e2e8f0;
  background-color: #1a202c;
  color: #e2e8f0;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.sidebar {
  position: sticky;
  top: 20px;
  height: fit-content;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>