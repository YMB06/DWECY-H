<script setup lang="ts">
import DomHighlighter from './components/highlighter/DomHighlighter.vue'
</script>

<template>
  <div id="app">
    <DomHighlighter />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  padding: 2rem;
}
</style>
