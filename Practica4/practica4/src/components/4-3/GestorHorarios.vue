<script setup lang="ts">
import { ref, computed } from 'vue';
import type { HorariosData, HorarioAula, IAsignatura } from '@/types/4-3/schedule';
import HorarioModal from './HorarioModal.vue';

// --- Datos de Ejemplo Iniciales ---
const horarios = ref<HorariosData>({
  'Aula 101': [
    // Lunes
    [
      { nombre: 'DAWEC', profesor: 'A. Pérez', grupo: '2DAW' },
      { nombre: 'DAWEC', profesor: 'A. Pérez', grupo: '2DAW' },
      null,
      { nombre: 'DIW', profesor: 'B. García', grupo: '2DAW' },
      { nombre: 'DIW', profesor: 'B. García', grupo: '2DAW' },
      null,
      null,
      null
    ],
    // Martes
    [
      null,
      { nombre: 'EIE', profesor: 'C. López', grupo: '2DAW' },
      { nombre: 'EIE', profesor: 'C. López', grupo: '2DAW' },
      null,
      { nombre: 'DAWES', profesor: 'D. Martín', grupo: '2DAW' },
      { nombre: 'DAWES', profesor: 'D. Martín', grupo: '2DAW' },
      null,
      null
    ],
    // Miércoles
    [
      { nombre: 'DAWEC', profesor: 'A. Pérez', grupo: '2DAW' },
      { nombre: 'DAWEC', profesor: 'A. Pérez', grupo: '2DAW' },
      { nombre: 'DAWEC', profesor: 'A. Pérez', grupo: '2DAW' },
      null,
      null,
      { nombre: 'Inglés', profesor: 'E. Smith', grupo: '2DAW' },
      null,
      null
    ],
    // Jueves
    [
      null,
      null,
      { nombre: 'DAWES', profesor: 'D. Martín', grupo: '2DAW' },
      { nombre: 'DAWES', profesor: 'D. Martín', grupo: '2DAW' },
      { nombre: 'DAWES', profesor: 'D. Martín', grupo: '2DAW' },
      null,
      null,
      null
    ],
    // Viernes
    [
      { nombre: 'DIW', profesor: 'B. García', grupo: '2DAW' },
      { nombre: 'DIW', profesor: 'B. García', grupo: '2DAW' },
      null,
      null,
      { nombre: 'Tutoría', profesor: 'F. Ruiz', grupo: '2DAW' },
      null,
      null,
      null
    ]
  ],
  'Aula 205': [
    // Matriz vacía para el Aula 205
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null]
  ],
  'Aula 302': [
    // Algunas clases para el Aula 302
    [
      { nombre: 'Matemáticas', profesor: 'G. Fernández', grupo: '1DAW' },
      { nombre: 'Matemáticas', profesor: 'G. Fernández', grupo: '1DAW' },
      null,
      null,
      { nombre: 'Programación', profesor: 'H. Torres', grupo: '1DAW' },
      { nombre: 'Programación', profesor: 'H. Torres', grupo: '1DAW' },
      null,
      null
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null]
  ]
});

// --- Estado Reactivo ---
const aulas = computed(() => Object.keys(horarios.value));
const aulaSeleccionada = ref<string>(Object.keys(horarios.value)[0] || '');
const modalVisible = ref(false);
const datosModal = ref<{ dia: number; hora: number; asignatura: IAsignatura | null } | null>(null);

// El horario que se muestra en la vista, se recalcula si cambia el aula seleccionada
const horarioVisible = computed<HorarioAula>(() => horarios.value[aulaSeleccionada.value] || []);

// Configuración de días y horas
const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const horasDelDia = [
  '8:00-9:00', '9:00-10:00', '10:00-11:00', '11:30-12:30', 
  '12:30-13:30', '13:30-14:30', '15:00-16:00', '16:00-17:00'
];

// --- Lógica de Negocio (CRUD) ---
function abrirModal(dia: number, hora: number) {
  const horario = horarioVisible.value;
  if (horario && horario[dia] && horario[dia][hora] !== undefined) {
    datosModal.value = { dia, hora, asignatura: horario[dia][hora] };
    modalVisible.value = true;
  }
}

function guardarReserva(payload: { dia: number; hora: number; asignatura: IAsignatura }) {
  const horario = horarios.value[aulaSeleccionada.value];
  if (horario && horario[payload.dia]) {
    horario[payload.dia][payload.hora] = payload.asignatura;
  }
  modalVisible.value = false;
}

function eliminarReserva(payload: { dia: number; hora: number }) {
  const horario = horarios.value[aulaSeleccionada.value];
  if (horario && horario[payload.dia]) {
    horario[payload.dia][payload.hora] = null;
  }
  modalVisible.value = false;
}
</script>

<template>
  <div class="gestor-horarios">
    <div class="header">
      <h1>Gestión de Horarios de Aulas</h1>
      
      <!-- Selector de Aulas -->
      <div class="selector-aula">
        <label for="aula-select">Seleccionar Aula:</label>
        <select id="aula-select" v-model="aulaSeleccionada" class="select-aula">
          <option v-for="aula in aulas" :key="aula" :value="aula">{{ aula }}</option>
        </select>
      </div>
    </div>

    <!-- Tabla/Grid del Horario -->
    <div class="horario-container">
      <table class="horario-table">
        <thead>
          <tr>
            <th class="dia-header">Día / Hora</th>
            <th v-for="(hora, index) in horasDelDia" :key="index" class="hora-header">
              {{ hora }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(fila, indexDia) in horarioVisible" :key="indexDia">
            <!-- Etiqueta del Día -->
            <td class="dia-label">{{ diasSemana[indexDia] }}</td>
            
            <!-- Celdas de bloques horarios -->
            <td 
              v-for="(bloque, indexHora) in fila" 
              :key="indexHora" 
              class="bloque-horario"
              :class="{ 'ocupado': bloque, 'libre': !bloque }"
              @click="abrirModal(indexDia, indexHora)"
            >
              <div v-if="bloque" class="reserva-info">
                <div class="asignatura">{{ bloque.nombre }}</div>
                <div class="profesor">{{ bloque.profesor }}</div>
                <div class="grupo">{{ bloque.grupo }}</div>
              </div>
              <div v-else class="libre-text">Libre</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para Crear/Editar/Eliminar -->
    <HorarioModal
      v-if="modalVisible"
      :datos="datosModal"
      @close="modalVisible = false"
      @save="guardarReserva"
      @delete="eliminarReserva"
    />
  </div>
</template>

<style scoped>
.gestor-horarios {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.header h1 {
  color: #2c3e50;
  margin: 0;
  font-size: 2.2em;
}

.selector-aula {
  display: flex;
  align-items: center;
  gap: 10px;
}

.selector-aula label {
  font-weight: 600;
  color: #34495e;
}

.select-aula {
  padding: 10px 15px;
  border: 2px solid #bdc3c7;
  border-radius: 6px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.select-aula:focus {
  outline: none;
  border-color: #3498db;
}

.horario-container {
  overflow-x: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.horario-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  min-width: 800px;
}

.dia-header, .hora-header {
  background: #34495e;
  color: white;
  padding: 15px 10px;
  text-align: center;
  font-weight: 600;
  border: 1px solid #2c3e50;
}

.dia-label {
  background: #ecf0f1;
  font-weight: 600;
  padding: 15px;
  text-align: center;
  color: #2c3e50;
  border: 1px solid #bdc3c7;
  min-width: 120px;
}

.bloque-horario {
  border: 1px solid #bdc3c7;
  padding: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 80px;
  vertical-align: middle;
  min-width: 140px;
}

.bloque-horario.ocupado {
  background: #e8f5e8;
  border-color: #27ae60;
}

.bloque-horario.ocupado:hover {
  background: #d5eddb;
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(39, 174, 96, 0.3);
}

.bloque-horario.libre {
  background: #f8f9fa;
  border-color: #dee2e6;
}

.bloque-horario.libre:hover {
  background: #e9ecef;
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.reserva-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  height: 100%;
  justify-content: center;
}

.asignatura {
  font-weight: bold;
  color: #2c3e50;
  font-size: 14px;
}

.profesor {
  color: #7f8c8d;
  font-size: 12px;
}

.grupo {
  color: #95a5a6;
  font-size: 11px;
  font-weight: 500;
}

.libre-text {
  color: #95a5a6;
  font-style: italic;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header h1 {
    font-size: 1.8em;
    text-align: center;
  }
  
  .selector-aula {
    justify-content: center;
  }
  
  .bloque-horario {
    min-width: 100px;
    font-size: 12px;
  }
  
  .asignatura {
    font-size: 12px;
  }
  
  .profesor {
    font-size: 10px;
  }
  
  .grupo {
    font-size: 9px;
  }
}
</style>