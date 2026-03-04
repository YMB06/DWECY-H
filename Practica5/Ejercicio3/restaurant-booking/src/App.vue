<template>
  <div id="app">
    <header>
      <h1>🍽️ Sistema de Reservas - Restaurante</h1>
    </header>
    <main>
      <TimeSlotSelector />
      <RestaurantLayout />
    </main>
  </div>
</template>

<script setup lang="ts">
import TimeSlotSelector from './components/TimeSlotSelector.vue'
import RestaurantLayout from './components/RestaurantLayout.vue'
</script>

<style>
:root {
  --color-primary: #42b983;
  --color-secondary: #ff6b6b;
  --color-bg: #f4f6f8;
  --color-card: #ffffff;
  --color-text: #2c3e50;
  --color-text-light: #ffffff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, sans-serif;
  background: var(--color-bg);
  min-height: 100vh;
  color: var(--color-text);
}

#app {
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

h1 {
  color: var(--color-primary);
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

main {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
