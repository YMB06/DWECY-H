<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <header>
      <nav>
        <RouterLink to="/">🏠 Juego</RouterLink>
        <RouterLink to="/about">ℹ️ Acerca de</RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
header {
  background: #2d2d2d;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  justify-content: center;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s;
}

nav a:hover {
  background: rgba(255, 255, 255, 0.1);
}

nav a.router-link-exact-active {
  background: #ff6600;
  color: white;
}
</style>
