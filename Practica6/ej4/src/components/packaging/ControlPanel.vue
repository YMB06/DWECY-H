<template>
  <div class="control-panel">
    <h2>⚙️ Configuración de Caja</h2>

    <div class="control-group">
      <label for="width">
        📏 Ancho: <strong>{{ width }}cm</strong>
      </label>
      <input
        id="width"
        type="range"
        min="5"
        max="30"
        v-model.number="width"
      />
    </div>

    <div class="control-group">
      <label for="height">
        📐 Alto: <strong>{{ height }}cm</strong>
      </label>
      <input
        id="height"
        type="range"
        min="5"
        max="30"
        v-model.number="height"
      />
    </div>

    <div class="control-group">
      <label for="depth">
        📦 Profundidad: <strong>{{ depth }}cm</strong>
      </label>
      <input
        id="depth"
        type="range"
        min="5"
        max="30"
        v-model.number="depth"
      />
    </div>

    <div class="control-group">
      <label for="color">🎨 Color:</label>
      <input
        id="color"
        type="color"
        v-model="color"
      />
      <span class="color-preview" :style="{ background: color }"></span>
    </div>

    <div class="info-box">
      <h3>📊 Especificaciones</h3>
      <p><strong>Volumen:</strong> {{ volume }} cm³</p>
      <p><strong>Área superficial:</strong> {{ surfaceArea }} cm²</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const width = defineModel<number>('width', { required: true })
const height = defineModel<number>('height', { required: true })
const depth = defineModel<number>('depth', { required: true })
const color = defineModel<string>('color', { required: true })

const volume = computed(() => 
  Math.round(width.value * height.value * depth.value)
)

const surfaceArea = computed(() => 
  Math.round(2 * (width.value * height.value + width.value * depth.value + height.value * depth.value))
)
</script>

<style scoped>
.control-panel {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 1.5rem;
  color: #2d3748;
  font-size: 1.5rem;
}

.control-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 600;
}

input[type="range"] {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #e2e8f0;
  outline: none;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #667eea;
  cursor: pointer;
}

input[type="color"] {
  width: 60px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.color-preview {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-left: 1rem;
  border: 2px solid #e2e8f0;
  vertical-align: middle;
}

.info-box {
  margin-top: 2rem;
  padding: 1rem;
  background: #f7fafc;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.info-box h3 {
  margin-bottom: 0.5rem;
  color: #2d3748;
  font-size: 1rem;
}

.info-box p {
  margin: 0.5rem 0;
  color: #4a5568;
}
</style>
