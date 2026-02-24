<template>
  <div class="game-container">
    <GameHUD :score="score" :time="time" @restart="handleRestart" />
    <div ref="gameCanvas" class="game-canvas"></div>
    <div class="instructions">
      <p>🎮 Usa las flechas del teclado para mover la carretilla</p>
      <p>🎯 Objetivo: Recoger las cajas naranjas</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type Phaser from 'phaser'
import { createGame } from '@/game/config'
import GameHUD from './GameHUD.vue'

const gameCanvas = ref<HTMLDivElement>()
let game: Phaser.Game | null = null
let timerInterval: number | null = null

const score = ref(0)
const time = ref(0)

onMounted(() => {
  if (gameCanvas.value) {
    game = createGame(gameCanvas.value.id || 'game-canvas')
    
    game.events.on('box-collected', () => {
      score.value++
    })

    timerInterval = window.setInterval(() => {
      time.value++
    }, 1000)
  }
})

onUnmounted(() => {
  if (game) {
    game.destroy(true)
    game = null
  }

  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
})

const handleRestart = () => {
  score.value = 0
  time.value = 0
  
  if (game) {
    const scene = game.scene.getScene('WarehouseScene')
    if (scene && 'restart' in scene) {
      (scene as any).restart()
    }
  }
}
</script>

<style scoped>
.game-container {
  position: relative;
  width: 800px;
  margin: 2rem auto;
  background: #2d2d2d;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.game-canvas {
  width: 800px;
  height: 600px;
}

.instructions {
  background: rgba(0, 0, 0, 0.9);
  padding: 1rem;
  text-align: center;
  color: white;
}

.instructions p {
  margin: 0.5rem 0;
}
</style>
