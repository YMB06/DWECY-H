<template>
  <div class="modal-overlay" @click="cerrarModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>{{ esEdicion ? 'Editar Reserva' : 'Nueva Reserva' }}</h3>
        <button class="btn-close" @click="cerrarModal">&times;</button>
      </div>
      
      <div class="modal-body">
        <div class="info-bloque">
          <p><strong>Día:</strong> {{ nombreDia }}</p>
          <p><strong>Hora:</strong> {{ horaFormateada }}</p>
        </div>
        
        <form @submit.prevent="guardar">
          <div class="form-group">
            <label for="nombre">Asignatura:</label>
            <input 
              id="nombre"
              v-model="formulario.nombre" 
              type="text" 
              required 
              placeholder="Nombre de la asignatura"
            >
          </div>
          
          <div class="form-group">
            <label for="profesor">Profesor:</label>
            <input 
              id="profesor"
              v-model="formulario.profesor" 
              type="text" 
              required 
              placeholder="Nombre del profesor"
            >
          </div>
          
          <div class="form-group">
            <label for="grupo">Grupo/Curso:</label>
            <input 
              id="grupo"
              v-model="formulario.grupo" 
              type="text" 
              required 
              placeholder="Grupo o curso"
            >
          </div>
        </form>
      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="cerrarModal">
          Cancelar
        </button>
        <button 
          v-if="esEdicion" 
          type="button" 
          class="btn btn-danger" 
          @click="eliminar"
        >
          Eliminar Reserva
        </button>
        <button type="button" class="btn btn-primary" @click="guardar">
          {{ esEdicion ? 'Actualizar' : 'Crear' }} Reserva
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { IAsignatura } from '@/types/4-3/schedule';

interface Props {
  datos: {
    dia: number;
    hora: number;
    asignatura: IAsignatura | null;
  } | null;
}

interface Emits {
  close: [];
  save: [payload: { dia: number; hora: number; asignatura: IAsignatura }];
  delete: [payload: { dia: number; hora: number }];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formulario = ref<IAsignatura>({
  nombre: '',
  profesor: '',
  grupo: ''
});

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const horasDelDia = [
  '8:00-9:00', '9:00-10:00', '10:00-11:00', '11:30-12:30', 
  '12:30-13:30', '13:30-14:30', '15:00-16:00', '16:00-17:00'
];

const esEdicion = computed(() => props.datos?.asignatura !== null);
const nombreDia = computed(() => props.datos ? diasSemana[props.datos.dia] : '');
const horaFormateada = computed(() => props.datos ? horasDelDia[props.datos.hora] : '');

onMounted(() => {
  if (props.datos?.asignatura) {
    formulario.value = { ...props.datos.asignatura };
  }
});

function cerrarModal() {
  emit('close');
}

function guardar() {
  if (!props.datos) return;
  
  if (!formulario.value.nombre.trim() || !formulario.value.profesor.trim() || !formulario.value.grupo.trim()) {
    alert('Por favor, completa todos los campos');
    return;
  }
  
  emit('save', {
    dia: props.datos.dia,
    hora: props.datos.hora,
    asignatura: { ...formulario.value }
  });
}

function eliminar() {
  if (!props.datos) return;
  
  if (confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
    emit('delete', {
      dia: props.datos.dia,
      hora: props.datos.hora
    });
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.btn-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-close:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
}

.info-bloque {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.info-bloque p {
  margin: 5px 0;
  color: #666;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #eee;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}
</style>