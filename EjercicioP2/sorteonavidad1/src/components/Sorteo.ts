import { ref } from 'vue';
import { determinarGanador } from '../services/SorteoService';

export default {
  setup() {
    const ultimosDosDigitos = ref('');
    const resultado = ref('');
    const ganador = ref(null);

    function realizarSorteo() {
      const digitos = parseInt(ultimosDosDigitos.value);
      if (isNaN(digitos) || digitos < 0 || digitos > 99) {
        resultado.value = 'Ingrese un número válido entre 00 y 99';
        return;
      }
      
      const resultadoSorteo = determinarGanador(digitos);
      ganador.value = resultadoSorteo.ganador;
      resultado.value = resultadoSorteo.mensaje;
    }

    return { ultimosDosDigitos, resultado, ganador, realizarSorteo };
  },
  template: `
    <div>
      <h3>Sorteo de Navidad</h3>
      <input v-model="ultimosDosDigitos" placeholder="Últimos dos dígitos (00-99)" maxlength="2" />
      <button @click="realizarSorteo">Realizar Sorteo</button>
      <div style="margin-top: 10px; font-weight: bold;">{{ resultado }}</div>
      <div v-if="ganador" style="margin-top: 10px; padding: 10px; background: #d4edda; border: 1px solid #c3e6cb;">
        <strong>¡GANADOR!</strong><br>
        Nombre: {{ ganador.nombre }}<br>
        Email: {{ ganador.email }}<br>
        Teléfono: {{ ganador.telefono }}
      </div>
    </div>
  `
};