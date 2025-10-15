import { obtenerParticipantes } from '../services/ParticipanteService';

export default {
  setup() {
    return { participantes: obtenerParticipantes() };
  },
  template: `
    <div>
      <h3>Participantes</h3>
      <ul>
        <li v-for="p in participantes" :key="p.email">
          {{ p.nombre }} ({{ p.email }}, {{ p.telefono }}): {{ p.numeros.join(', ') }}
        </li>
      </ul>
    </div>
  `
};