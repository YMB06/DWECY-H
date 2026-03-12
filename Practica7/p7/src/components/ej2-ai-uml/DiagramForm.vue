<template>
  <div class="diagram-form">
    <h2>🤖 AI-UML Architect</h2>
    <p>Describe el diagrama que necesitas y la IA lo generará automáticamente</p>

    <form @submit.prevent="handleSubmit">
      <textarea
        v-model="prompt"
        placeholder="Ej: Diagrama de flujo de un usuario haciendo login en mi web"
        rows="4"
        :disabled="loading"
      ></textarea>

      <div class="actions">
        <button v-if="!loading" type="submit" class="btn-primary" :disabled="!prompt.trim()">
          ✨ Generar Diagrama
        </button>
        <button v-else type="button" @click="handleCancel" class="btn-danger">
          ❌ Cancelar Generación
        </button>
      </div>
    </form>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Generando diagrama con IA...</p>
    </div>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDiagramStore } from '@/stores/ej2/diagramStore'

const diagramStore = useDiagramStore()
const prompt = ref('')

const { loading, error } = diagramStore

const handleSubmit = async () => {
  if (!prompt.value.trim()) return
  await diagramStore.generateDiagram(prompt.value)
}

const handleCancel = () => {
  diagramStore.cancelGeneration()
}
</script>

<style scoped>
.diagram-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

h2 {
  color: #2d3748;
  margin-bottom: 0.5rem;
}

p {
  color: #718096;
  margin-bottom: 1.5rem;
}

textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  margin-bottom: 1rem;
}

textarea:focus {
  outline: none;
  border-color: #667eea;
}

textarea:disabled {
  background: #f7fafc;
  cursor: not-allowed;
}

.actions {
  display: flex;
  gap: 1rem;
}

.btn-primary,
.btn-danger {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #5a67d8;
}

.btn-primary:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
}

.btn-danger {
  background: #e53e3e;
  color: white;
}

.btn-danger:hover {
  background: #c53030;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #4a5568;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  background: #fed7d7;
  color: #c53030;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}
</style>
