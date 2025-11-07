<script setup lang="ts">
import ScrollProgressBar from './components/Punto1/Punto1-3/ScrollProgressBar.vue'
import SmartRedirector from './components/Punto2/Punto2-3/SmartRedirector.vue';
</script>

<template>
  <header>
    <h1>Vue Components Test</h1>
  </header>

  <main>
    <ScrollProgressBar />
    <SmartRedirector />

  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
