<template>
  <div class="sprite-forge">
    <SpriteForm />
    <SpriteAnimator />
  </div>
</template>

<script setup lang="ts">
import SpriteForm from './SpriteForm.vue'
import SpriteAnimator from './SpriteAnimator.vue'
</script>

<style scoped>
.sprite-forge {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
