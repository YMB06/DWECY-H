<template>
  <div class="sprite-form">
    <h2>🎮 SpriteSheet AI Forge</h2>
    <p>Genera sprites de personajes con IA para tus videojuegos</p>

    <form @submit.prevent="handleSubmit">
      <textarea
        v-model="prompt"
        placeholder="Ej: Guerrero pixel art corriendo en 4 fotogramas, sprite sheet"
        rows="3"
        :disabled="loading"
      ></textarea>

      <div class="actions">
        <button v-if="!loading" type="submit" class="btn-primary" :disabled="!prompt.trim()">
          ✨ Generar Sprite
        </button>
        <button v-else type="button" @click="handleCancel" class="btn-danger">
          ❌ Cancelar
        </button>
      </div>
    </form>

    <div v-if="loading" class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
      </div>
      <p>Descargando: {{ progress }}%</p>
    </div>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSpriteStore } from '@/stores/ej3/spriteStore'

const spriteStore = useSpriteStore()
const prompt = ref('')

const { loading, progress, error } = storeToRefs(spriteStore)

const handleSubmit = async () => {
  if (!prompt.value.trim()) return
  await spriteStore.generateSprite(prompt.value)
}

const handleCancel = () => {
  spriteStore.cancelGeneration()
}
</script>

<style scoped>
.sprite-form {
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

.progress-container {
  margin-top: 1.5rem;
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 30px;
  background: #e2e8f0;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
}

.error {
  background: #fed7d7;
  color: #c53030;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}
</style>
