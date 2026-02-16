<template>
  <div class="navigation-buttons">
    <button 
      v-if="canGoPrevious" 
      @click="$emit('previous')"
      class="btn-secondary"
    >
      ← Anterior
    </button>
    
    <button 
      v-if="canGoNext" 
      @click="$emit('next')"
      class="btn-primary"
    >
      Siguiente →
    </button>
    
    <button 
      v-if="isLastStep" 
      @click="$emit('finish')"
      class="btn-primary"
    >
      Finalizar Pedido
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  canGoNext: boolean
  canGoPrevious: boolean
  isLastStep: boolean
}>()

defineEmits<{
  next: []
  previous: []
  finish: []
}>()
</script>

<style scoped>
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-secondary {
  background: #e2e8f0;
  color: #4a5568;
}

.btn-primary:hover {
  background: #5a67d8;
}

.btn-secondary:hover {
  background: #cbd5e0;
}
</style>