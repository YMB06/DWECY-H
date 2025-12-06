<script setup lang="ts">
import { onMounted } from 'vue';
import { useJuego } from '@/composables/useJuego';

const {
  iniciarJuego,
  robarCarta,
  jugarCarta,
  manoJugador,
  cartaSuperiorDescarte,
  cartasEnMazo,
  mensaje,
  juegoTerminado
} = useJuego();

onMounted(iniciarJuego);

const obtenerSimbolo = (palo: string): string => {
  const simbolos: Record<string, string> = {
    'Picas': '♠️',
    'Corazones': '❤️',
    'Tréboles': '♣️',
    'Diamantes': '♦️'
  };
  return simbolos[palo] || '';
};

const obtenerColor = (palo: string): string => {
  return palo === 'Corazones' || palo === 'Diamantes' ? 'red' : 'black';
};
</script>

<template>
  <div class="tablero">
    <h1>Juego de Cartas - Uno Solitario</h1>
    
    <div v-if="mensaje" class="mensaje" :class="{ ganaste: juegoTerminado }">
      {{ mensaje }}
    </div>

    <div class="pilas">
      <div class="mazo" @click="robarCarta" :class="{ disabled: juegoTerminado }">
        <div class="carta-reverso">
          <div class="patron"></div>
          <div class="contador">{{ cartasEnMazo }}</div>
        </div>
        <p>Mazo (Click para robar)</p>
      </div>

      <div class="descarte">
        <div v-if="cartaSuperiorDescarte" class="carta" :style="{ color: obtenerColor(cartaSuperiorDescarte.palo) }">
          <div class="carta-contenido">
            <div class="esquina-superior">
              <div>{{ cartaSuperiorDescarte.valor }}</div>
              <div>{{ obtenerSimbolo(cartaSuperiorDescarte.palo) }}</div>
            </div>
            <div class="centro">{{ obtenerSimbolo(cartaSuperiorDescarte.palo) }}</div>
            <div class="esquina-inferior">
              <div>{{ obtenerSimbolo(cartaSuperiorDescarte.palo) }}</div>
              <div>{{ cartaSuperiorDescarte.valor }}</div>
            </div>
          </div>
        </div>
        <p>Descarte</p>
      </div>
    </div>

    <div class="mano">
      <h2>Tu Mano ({{ manoJugador.length }} cartas)</h2>
      <div class="cartas-mano">
        <div 
          v-for="(carta, index) in manoJugador" 
          :key="index"
          class="carta"
          :style="{ color: obtenerColor(carta.palo) }"
          @click="jugarCarta(carta)"
          :class="{ disabled: juegoTerminado }"
        >
          <div class="carta-contenido">
            <div class="esquina-superior">
              <div>{{ carta.valor }}</div>
              <div>{{ obtenerSimbolo(carta.palo) }}</div>
            </div>
            <div class="centro">{{ obtenerSimbolo(carta.palo) }}</div>
            <div class="esquina-inferior">
              <div>{{ obtenerSimbolo(carta.palo) }}</div>
              <div>{{ carta.valor }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button v-if="juegoTerminado" @click="iniciarJuego" class="btn-reiniciar">
      Jugar de Nuevo
    </button>
  </div>
</template>

<style scoped>
.tablero {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

.mensaje {
  text-align: center;
  padding: 15px;
  margin: 20px 0;
  background: #e3f2fd;
  border-radius: 8px;
  font-weight: bold;
  color: #1976d2;
}

.mensaje.ganaste {
  background: #c8e6c9;
  color: #2e7d32;
  font-size: 1.2em;
}

.pilas {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin: 40px 0;
}

.mazo, .descarte {
  text-align: center;
}

.mazo {
  cursor: pointer;
}

.mazo:hover:not(.disabled) .carta-reverso {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
}

.carta-reverso {
  width: 120px;
  height: 170px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.patron {
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255,255,255,0.1) 10px,
    rgba(255,255,255,0.1) 20px
  );
}

.contador {
  position: absolute;
  font-size: 2em;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.carta {
  width: 120px;
  height: 170px;
  background: white;
  border: 2px solid #333;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.carta:hover:not(.disabled) {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
}

.carta.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.carta-contenido {
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: bold;
}

.esquina-superior, .esquina-inferior {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2em;
}

.esquina-inferior {
  transform: rotate(180deg);
}

.centro {
  font-size: 3em;
  text-align: center;
}

.mano {
  margin-top: 60px;
}

.mano h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

.cartas-mano {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.btn-reiniciar {
  display: block;
  margin: 30px auto;
  padding: 15px 30px;
  font-size: 1.1em;
  font-weight: bold;
  color: white;
  background: #4caf50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-reiniciar:hover {
  background: #45a049;
}

.disabled {
  pointer-events: none;
}

p {
  margin-top: 10px;
  font-weight: bold;
  color: #555;
}
</style>
