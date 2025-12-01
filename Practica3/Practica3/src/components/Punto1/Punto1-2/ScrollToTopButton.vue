<template>
  <button 
    v-if="isVisible" 
    @click="scrollToTop" 
    class="scroll-to-top"
    aria-label="Volver arriba"
  >
    ↑
  </button>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const scrollY = ref(0);

const isVisible = computed(() => scrollY.value > 200);

function updateScrollY() {
  scrollY.value = window.scrollY;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollY);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollY);
});
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--color-heading, #007bff);
  color: var(--color-background, white);
  border: 1px solid var(--color-border, transparent);
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  z-index: 1000;
  transition: all 0.3s ease;
}

.scroll-to-top:hover {
  background: var(--color-text, #0056b3);
  transform: translateY(-2px);
}
</style>