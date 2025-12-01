<template>
  <div class="search-filter">
    <h2>Filtro de Búsqueda con Resaltado</h2>
    
    <div class="search-input">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Buscar elementos..."
        class="search-field"
      />
    </div>

    <ul class="results-list">
      <li v-for="item in filteredItems" :key="item.id" class="result-item">
        <span v-html="highlightMatches(item.name)"></span>
      </li>
    </ul>

    <div v-if="filteredItems.length === 0 && searchQuery" class="no-results">
      No se encontraron resultados para "{{ searchQuery }}"
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Item {
  id: number;
  name: string;
}

interface Props {
  items?: Item[];
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [
    { id: 1, name: 'Introducción a Vue.js' },
    { id: 2, name: 'Componentes en React' },
    { id: 3, name: 'Angular para principiantes' },
    { id: 4, name: 'JavaScript moderno' },
    { id: 5, name: 'TypeScript avanzado' },
    { id: 6, name: 'CSS Grid y Flexbox' },
    { id: 7, name: 'Node.js y Express' },
    { id: 8, name: 'Bases de datos con MongoDB' },
    { id: 9, name: 'Vue Router y Vuex' },
    { id: 10, name: 'Testing con Jest' }
  ]
});

const searchQuery = ref('');

const filteredItems = computed(() => {
  if (!searchQuery.value) {
    return props.items;
  }
  
  return props.items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

function highlightMatches(text: string): string {
  if (!searchQuery.value) {
    return text;
  }
  
  const regex = new RegExp(searchQuery.value, 'gi');
  return text.replace(regex, (match) => `<mark>${match}</mark>`);
}
</script>

<style scoped>
.search-filter {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  margin-bottom: 20px;
}

.search-field {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-background);
  color: var(--color-text);
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.search-field:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.results-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.result-item {
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  margin-bottom: 8px;
  background: var(--color-background-soft);
  color: var(--color-text);
  transition: background 0.2s ease;
}

.result-item:hover {
  background: var(--color-background-mute);
}

.no-results {
  text-align: center;
  padding: 20px;
  color: var(--color-text);
  opacity: 0.7;
  font-style: italic;
}

:deep(mark) {
  background: #ffeb3b;
  color: #000;
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: bold;
}

@media (prefers-color-scheme: dark) {
  :deep(mark) {
    background: #ffc107;
    color: #000;
  }
}
</style>