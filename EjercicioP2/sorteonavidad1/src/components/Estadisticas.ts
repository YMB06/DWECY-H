import { ref, computed } from 'vue';
import { obtenerEstadisticas, obtenerNumerosPorParticipante } from '../services/EstadisticasService';

export default {
  setup() {
    const emailConsulta = ref('');
    const numerosParticipante = ref([]);
    
    const estadisticas = computed(() => obtenerEstadisticas());

    // Funcion para consultar los numeros reservados por un participante usando su email
    function consultarNumeros() {
      if (!emailConsulta.value) return;
      numerosParticipante.value = obtenerNumerosPorParticipante(emailConsulta.value);
    }

    return { emailConsulta, numerosParticipante, estadisticas, consultarNumeros };
  },
  template: `
    <div>
      <h3>Estadísticas y Consultas</h3>
      
      <div style="margin-bottom: 20px; padding: 10px; background: #f8f9fa; border: 1px solid #dee2e6;">
        <h4>Resumen del Sorteo</h4>
        <p>Total de participantes: {{ estadisticas.totalParticipantes }}</p>
        <p>Números ocupados: {{ estadisticas.numerosOcupados }}</p>
        <p>Números libres: {{ estadisticas.numerosLibres }}</p>
        <p>Porcentaje ocupado: {{ estadisticas.porcentajeOcupado }}%</p>
      </div>

      <div>
        <h4>Consultar números por participante</h4>
        <input v-model="emailConsulta" placeholder="Email del participante" />
        <button @click="consultarNumeros">Consultar</button>
        <div v-if="numerosParticipante.length > 0" style="margin-top: 10px;">
          <strong>Números reservados:</strong> {{ numerosParticipante.join(', ') }}
        </div>
        <div v-else-if="emailConsulta" style="margin-top: 10px; color: #666;">
          No se encontraron números para este participante
        </div>
      </div>
    </div>
  `
};