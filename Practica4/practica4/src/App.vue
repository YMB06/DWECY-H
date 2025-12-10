<script setup lang="ts">
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import JuegoCartas from './components/4-1/JuegoCartas.vue'
import CinemaDemo from './components/4-2/CinemaDemo.vue'
import NotificationComposer from './components/4-2/NotificationComposer.vue'
import GestorHorarios from './components/4-3/GestorHorarios.vue'
import PanelDeControl from './components/4-4/PanelDeControl.vue'

const currentExercise = ref('4-2-notifications')

function selectExercise(exerciseId: string) {
  currentExercise.value = exerciseId
}
</script>

<template>
  <NavBar 
    :currentExercise="currentExercise" 
    @selectExercise="selectExercise" 
  />
  
  <div class="exercise-container">
    <JuegoCartas v-if="currentExercise === '4-1'" />
    <CinemaDemo v-else-if="currentExercise === '4-2-cinema'" />
    <NotificationComposer v-else-if="currentExercise === '4-2-notifications'" />
    <GestorHorarios v-else-if="currentExercise === '4-3'" />
    <PanelDeControl v-else-if="currentExercise === '4-4'" />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#app {
  min-height: 100vh;
}

.exercise-container {
  padding: 0 20px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

* {
  box-sizing: border-box;
}
</style>
