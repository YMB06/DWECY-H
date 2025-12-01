<template>
  <div class="tab-navigator">
    <h2>Navegación SPA con pushState</h2>
    
    <div class="tab-buttons">
      <button 
        @click="changeTab('perfil')" 
        :class="{ active: activeTab === 'perfil' }"
        class="tab-btn"
      >
        Perfil
      </button>
      <button 
        @click="changeTab('facturacion')" 
        :class="{ active: activeTab === 'facturacion' }"
        class="tab-btn"
      >
        Facturación
      </button>
      <button 
        @click="changeTab('seguridad')" 
        :class="{ active: activeTab === 'seguridad' }"
        class="tab-btn"
      >
        Seguridad
      </button>
    </div>

    <div class="tab-content">
      <div v-if="activeTab === 'perfil'" class="content-panel">
        <h3>Contenido del Perfil</h3>
        <p>Aquí puedes editar tu información personal, foto de perfil y datos básicos.</p>
      </div>
      
      <div v-if="activeTab === 'facturacion'" class="content-panel">
        <h3>Contenido de Facturación</h3>
        <p>Gestiona tus métodos de pago, facturas y suscripciones.</p>
      </div>
      
      <div v-if="activeTab === 'seguridad'" class="content-panel">
        <h3>Contenido de Seguridad</h3>
        <p>Configura tu contraseña, autenticación de dos factores y sesiones activas.</p>
      </div>
    </div>

    <div class="url-info">
      <small>Observa cómo cambia la URL sin recargar la página</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const activeTab = ref('perfil');

function changeTab(tabName: string) {
  activeTab.value = tabName;
  const stateObject = { tab: tabName };
  const newUrl = `/settings/${tabName}`;
  history.pushState(stateObject, '', newUrl);
}

onMounted(() => {
  activeTab.value = 'perfil';
});
</script>

<style scoped>
.tab-navigator {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.tab-buttons {
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
  border-bottom: 2px solid var(--color-border);
}

.tab-btn {
  padding: 12px 20px;
  border: none;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  font-weight: 500;
}

.tab-btn:hover {
  background: var(--color-background-soft);
  color: var(--color-heading);
}

.tab-btn.active {
  color: var(--color-heading);
  border-bottom-color: #007bff;
  background: var(--color-background-soft);
}

.tab-content {
  min-height: 200px;
  margin: 20px 0;
}

.content-panel {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

.content-panel h3 {
  margin-top: 0;
  color: var(--color-heading);
}

.content-panel p {
  color: var(--color-text);
  line-height: 1.6;
}

.url-info {
  text-align: center;
  color: var(--color-text);
  opacity: 0.7;
  margin-top: 20px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .tab-buttons {
    flex-direction: column;
  }
  
  .tab-btn {
    text-align: left;
    border-bottom: 1px solid var(--color-border);
    border-left: 3px solid transparent;
  }
  
  .tab-btn.active {
    border-bottom-color: var(--color-border);
    border-left-color: #007bff;
  }
}
</style>