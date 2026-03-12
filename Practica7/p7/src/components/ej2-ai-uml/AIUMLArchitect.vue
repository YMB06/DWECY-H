<template>
  <div class="ai-uml-architect">
    <DiagramForm />
    <DiagramViewer />
  </div>
</template>

<script setup lang="ts">
import DiagramForm from './DiagramForm.vue'
import DiagramViewer from './DiagramViewer.vue'
</script>

<style scoped>
.ai-uml-architect {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
