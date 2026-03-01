<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <nav class="main-nav">
      <div class="nav-brand">📚 Práctica 7 - Async JS</div>
      <div class="nav-links">
        <RouterLink to="/">🏠 Inicio</RouterLink>
        <RouterLink to="/ej1">💼 Ej1: Job Tracker</RouterLink>
      </div>
    </nav>
    <RouterView />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

#app {
  min-height: 100vh;
}

.main-nav {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.nav-brand {
  color: white;
  font-size: 1.3rem;
  font-weight: 700;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s;
}

.nav-links a:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-links a.router-link-exact-active {
  background: rgba(255, 255, 255, 0.3);
}
</style>
