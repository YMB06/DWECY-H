<script setup lang="ts">
import { ref, computed } from 'vue';
import type { IButaca } from '@/types/4-2/cinema';
import { EstadoButaca } from '@/types/4-2/cinema';

const props = defineProps({
  filas: { type: Number, required: true },
  columnas: { type: Number, required: true },
  precioPorButaca: { type: Number, default: 8 },
});

const sala = ref<IButaca[][]>(inicializarSala());

function inicializarSala(): IButaca[][] {
  const matriz: IButaca[][] = [];
  for (let fila = 0; fila < props.filas; fila++) {
    const filaButacas: IButaca[] = [];
    for (let columna = 0; columna < props.columnas; columna++) {
      filaButacas.push({
        id: `F${fila + 1}-C${columna + 1}`,
        fila,
        columna,
        estado: EstadoButaca.DISPONIBLE
      });
    }
    matriz.push(filaButacas);
  }
  return matriz;
}

const butacasSeleccionadas = computed(() => {
  const seleccionadas: IButaca[] = [];
  sala.value.forEach(fila => {
    fila.forEach(butaca => {
      if (butaca.estado === EstadoButaca.SELECCIONADO) {
        seleccionadas.push(butaca);
      }
    });
  });
  return seleccionadas;
});

const totalAPagar = computed(() => {
  return butacasSeleccionadas.value.length * props.precioPorButaca;
});

const resumenSeleccion = computed(() => {
  return butacasSeleccionadas.value.map(b => b.id).join(', ');
});

function seleccionarButaca(butaca: IButaca) {
  if (butaca.estado === EstadoButaca.OCUPADO || butaca.estado === EstadoButaca.DAÑADO) {
    return;
  }
  
  if (butaca.estado === EstadoButaca.DISPONIBLE) {
    butaca.estado = EstadoButaca.SELECCIONADO;
  } else if (butaca.estado === EstadoButaca.SELECCIONADO) {
    butaca.estado = EstadoButaca.DISPONIBLE;
  }
}

function confirmarReserva() {
  sala.value.forEach(fila => {
    fila.forEach(butaca => {
      if (butaca.estado === EstadoButaca.SELECCIONADO) {
        butaca.estado = EstadoButaca.OCUPADO;
      }
    });
  });
}
</script>

<template>
  <div class="sala-cine">
    <h1>Sala de Cine</h1>
    
    <div class="pantalla">PANTALLA</div>
    
    <div class="sala-grid">
      <div v-for="(fila, indexFila) in sala" :key="indexFila" class="fila">
        <div class="numero-fila">{{ indexFila + 1 }}</div>
        <div 
          v-for="butaca in fila" 
          :key="butaca.id"
          class="butaca"
          :class="butaca.estado"
          @click="seleccionarButaca(butaca)"
        >
          {{ butaca.columna + 1 }}
        </div>
      </div>
    </div>

    <div class="resumen">
      <p><strong>Butacas seleccionadas:</strong> {{ resumenSeleccion || 'Ninguna' }}</p>
      <p><strong>Total a pagar:</strong> {{ totalAPagar }}€</p>
      
      <button 
        class="btn-confirmar" 
        @click="confirmarReserva"
        :disabled="butacasSeleccionadas.length === 0"
      >
        Confirmar Reserva
      </button>
    </div>

    <div class="leyenda">
      <div class="leyenda-item">
        <div class="butaca-ejemplo disponible"></div>
        <span>Disponible</span>
      </div>
      <div class="leyenda-item">
        <div class="butaca-ejemplo seleccionado"></div>
        <span>Seleccionado</span>
      </div>
      <div class="leyenda-item">
        <div class="butaca-ejemplo ocupado"></div>
        <span>Ocupado</span>
      </div>
      <div class="leyenda-item">
        <div class="butaca-ejemplo dañado"></div>
        <span>Dañado</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sala-cine {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.pantalla {
  background: #333;
  color: white;
  text-align: center;
  padding: 10px;
  margin: 20px auto;
  width: 60%;
  border-radius: 10px;
  font-weight: bold;
}

.sala-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 30px 0;
}

.fila {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
}

.numero-fila {
  width: 30px;
  text-align: center;
  font-weight: bold;
  color: #666;
}

.butaca {
  width: 40px;
  height: 40px;
  border: 2px solid #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.butaca.disponible {
  background: #e8f5e8;
  border-color: #4caf50;
  color: #2e7d32;
}

.butaca.disponible:hover {
  background: #c8e6c9;
  transform: scale(1.1);
}

.butaca.seleccionado {
  background: #fff3e0;
  border-color: #ff9800;
  color: #e65100;
}

.butaca.ocupado {
  background: #ffebee;
  border-color: #f44336;
  color: #c62828;
  cursor: not-allowed;
}

.butaca.dañado {
  background: #f5f5f5;
  border-color: #9e9e9e;
  color: #616161;
  cursor: not-allowed;
  opacity: 0.6;
}

.resumen {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin: 30px 0;
}

.btn-confirmar {
  background: #4caf50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}

.btn-confirmar:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.leyenda {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.leyenda-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.butaca-ejemplo {
  width: 20px;
  height: 20px;
  border: 2px solid;
  border-radius: 4px;
}
</style>