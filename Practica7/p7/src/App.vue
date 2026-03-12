<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const showMenu = ref(false)
</script>

<template>
  <div id="app">
    <nav class="main-nav">
      <div class="nav-brand">🚀 Práctica 7 - Async JS</div>
      <button class="menu-toggle" @click="showMenu = !showMenu">☰</button>
      <div class="nav-links" :class="{ active: showMenu }">
        <RouterLink to="/" @click="showMenu = false">🏠 Inicio</RouterLink>
        <RouterLink to="/ej1" @click="showMenu = false">💼 Ej1: Job Tracker</RouterLink>
        <RouterLink to="/ej2" @click="showMenu = false">🤖 Ej2: AI-UML</RouterLink>
        <RouterLink to="/ej3" @click="showMenu = false">🎮 Ej3: SpriteSheet</RouterLink>
        <RouterLink to="/login" @click="showMenu = false">🔐 Ej4: GitHub DevHub</RouterLink>
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
  flex-wrap: wrap;
  gap: 1rem;
}

.nav-brand {
  color: white;
  font-size: 1.3rem;
  font-weight: 700;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s;
  white-space: nowrap;
}

.nav-links a:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-links a.router-link-exact-active {
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .main-nav {
    flex-direction: column;
    align-items: stretch;
  }

  .menu-toggle {
    display: block;
    align-self: flex-end;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    width: 100%;
  }

  .nav-links.active {
    display: flex;
  }

  .nav-links a {
    padding: 1rem;
    width: 100%;
  }
}
</style>
