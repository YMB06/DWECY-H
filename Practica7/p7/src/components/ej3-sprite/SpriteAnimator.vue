<template>
  <div v-if="spriteUrl" class="sprite-animator">
    <div class="animator-header">
      <h3>🎬 Animador de Sprites</h3>
      <button @click="clearSprite" class="btn-clear">🗑️ Limpiar</button>
    </div>

    <div class="controls">
      <label>
        Número de frames:
        <input v-model.number="frames" type="number" min="1" max="20" />
      </label>
      <label>
        Velocidad (s):
        <input v-model.number="speed" type="number" min="0.1" max="5" step="0.1" />
      </label>
    </div>

    <div class="sprite-preview">
      <div
        class="sprite-container"
        :style="{
          backgroundImage: `url(${spriteUrl})`,
          animation: `sprite-animation ${speed}s steps(${frames}) infinite`
        }"
      ></div>
    </div>

    <div class="original-image">
      <h4>Imagen Original:</h4>
      <img :src="spriteUrl" alt="Sprite Sheet" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSpriteStore } from '@/stores/ej3/spriteStore'

const spriteStore = useSpriteStore()
const { spriteUrl } = spriteStore

const frames = ref(4)
const speed = ref(1)

const clearSprite = () => {
  spriteStore.clearSprite()
}
</script>

<style scoped>
.sprite-animator {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.animator-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h3 {
  color: #2d3748;
  margin: 0;
}

.btn-clear {
  padding: 0.5rem 1rem;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-clear:hover {
  background: #c53030;
}

.controls {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.controls label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #4a5568;
  font-weight: 600;
}

.controls input {
  padding: 0.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  width: 120px;
}

.controls input:focus {
  outline: none;
  border-color: #667eea;
}

.sprite-preview {
  background: #2d3748;
  padding: 3rem;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  min-height: 200px;
}

.sprite-container {
  width: 128px;
  height: 128px;
  background-size: auto 100%;
  background-repeat: no-repeat;
  image-rendering: pixelated;
}

@keyframes sprite-animation {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -100% 0;
  }
}

.original-image {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #e2e8f0;
}

h4 {
  color: #4a5568;
  margin-bottom: 1rem;
}

.original-image img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
