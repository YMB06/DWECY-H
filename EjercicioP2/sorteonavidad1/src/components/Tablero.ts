import { ref } from 'vue';
import { obtenerTablero, reservarNumero, liberarNumeroTablero } from '../services/TableroService';
import { asignarNumero, liberarNumero, obtenerParticipantes } from '../services/ParticipanteService';

export default {
  setup() {
    const tablero = ref(obtenerTablero());
    const email = ref('');
    const numero = ref('');
    const mensaje = ref('');

    function reservar() {
      const num = parseInt(numero.value);
      if (!email.value || isNaN(num)) {
        mensaje.value = 'Email y número requeridos';
        return;
      }
      const participante = obtenerParticipantes().find(p => p.email === email.value);
      if (!participante) {
        mensaje.value = 'Participante no existe';
        return;
      }
      if (reservarNumero(num, participante.nombre)) {
        asignarNumero(email.value, num);
        mensaje.value = 'Número reservado';
      } else {
        mensaje.value = 'Número ocupado';
      }
      numero.value = '';
    }

    function liberar(num: number) {
      const casilla = tablero.value.find(c => c.numero === num);
      if (casilla && casilla.reservado && casilla.participante) {
        const participante = obtenerParticipantes().find(p => p.nombre === casilla.participante);
        if (participante) {
          liberarNumeroTablero(num);
          liberarNumero(participante.email, num);
          mensaje.value = 'Reserva cancelada';
        }
      }
    }

    return { tablero, email, numero, mensaje, reservar, liberar };
  },
  template: `
    <div>
      <input v-model="email" placeholder="Email participante" />
      <input v-model="numero" placeholder="Número a reservar" />
      <button @click="reservar">Reservar</button>
      <div style="color:red">{{ mensaje }}</div>
      <div style="display:flex; flex-wrap:wrap; max-width:600px;">
        <span v-for="casilla in tablero" :key="casilla.numero"
          :style="{ margin: '2px', padding: '4px', background: casilla.reservado ? '#ccc' : '#eee', cursor: casilla.reservado ? 'pointer' : 'default' }"
          @click="casilla.reservado ? liberar(casilla.numero) : null"
          title="Click para liberar si está reservado">
          {{ casilla.numero < 10 ? '0'+casilla.numero : casilla.numero }}
          <span v-if="casilla.reservado">({{ casilla.participante }})</span>
        </span>
      </div>
    </div>
  `
};