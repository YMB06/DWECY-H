<script setup lang="ts">
import ParticipanteFormulario from './components/ParticipanteFormulario';
import ParticipanteLista from './components/ParticipanteLista';
import Tablero from './components/Tablero';
import Sorteo from './components/Sorteo';
import Estadisticas from './components/Estadisticas';
</script>

<template>
  <h1>Sorteo de Navidad</h1>
  <ParticipanteFormulario />
  <ParticipanteLista />
  <Tablero />
  <Sorteo />
  <Estadisticas />
</template>



<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
