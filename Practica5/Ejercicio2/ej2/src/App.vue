<script setup lang="ts">
import CheckoutWizard from './components/checkout/CheckoutWizard.vue'
</script>

<template>
  <div id="app">
    <CheckoutWizard />
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
