<template>
  <div class="packaging-designer">
    <div class="viewer-section">
      <BoxViewer3D
        :width="dimensions.width"
        :height="dimensions.height"
        :depth="dimensions.depth"
        :color="dimensions.color"
      />
    </div>
    <div class="controls-section">
      <ControlPanel
        v-model:width="dimensions.width"
        v-model:height="dimensions.height"
        v-model:depth="dimensions.depth"
        v-model:color="dimensions.color"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import BoxViewer3D from './BoxViewer3D.vue'
import ControlPanel from './ControlPanel.vue'

const dimensions = reactive({
  width: 15,
  height: 20,
  depth: 10,
  color: '#cd853f'
})
</script>

<style scoped>
.packaging-designer {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .packaging-designer {
    grid-template-columns: 1fr;
  }
}
</style>
