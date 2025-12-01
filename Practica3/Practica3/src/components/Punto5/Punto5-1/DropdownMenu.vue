<template>
  <div class="dropdown-container">
    <h2>Detector de Clics Fuera</h2>
    
    <div class="dropdown">
      <button @click="toggleMenu" class="dropdown-btn">
        {{ isOpen ? 'Cerrar Menú' : 'Abrir Menú' }} ▼
      </button>
      
      <div ref="menuRef" v-if="isOpen" class="dropdown-menu">
        <div class="menu-item">Opción 1</div>
        <div class="menu-item">Opción 2</div>
        <div class="menu-item">Opción 3</div>
        <div class="menu-item">Configuración</div>
      </div>
    </div>
    
    <p class="info">
      Haz clic en el botón para abrir el menú, luego haz clic fuera para cerrarlo
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useClickOutside } from '@/composables/useClickOutside';

const isOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

useClickOutside(menuRef, () => {
  isOpen.value = false;
});
</script>

<style scoped>
.dropdown-container {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.dropdown {
  position: relative;
  display: inline-block;
  margin: 20px 0;
}

.dropdown-btn {
  padding: 12px 20px;
  background: var(--color-heading);
  color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.dropdown-btn:hover {
  background: var(--color-text);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

.menu-item {
  padding: 12px 16px;
  color: var(--color-text);
  cursor: pointer;
  transition: background 0.2s ease;
}

.menu-item:hover {
  background: var(--color-background-mute);
}

.menu-item:first-child {
  border-radius: 6px 6px 0 0;
}

.menu-item:last-child {
  border-radius: 0 0 6px 6px;
}

.info {
  color: var(--color-text);
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 20px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>