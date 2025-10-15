import { ref } from 'vue';
import { agregarParticipante } from '../services/ParticipanteService';

export default {
  setup() {
    // Variables reactivas para los campos del formulario
    const nombre = ref('');
    const email = ref('');
    const telefono = ref('');
    const mensaje = ref(''); // Mensaje para mostrar errores o confirmaciones

    // Funcion para agregar un participante usando los datos del formulario
    function agregar() {
      // Validacion: todos los campos son obligatorios
      if (!nombre.value || !email.value || !telefono.value) {
        mensaje.value = 'Todos los campos son obligatorios';
        return;
      }
      // Intenta agregar el participante, verifica si el email ya existe
      const ok = agregarParticipante(nombre.value, email.value, telefono.value);
      mensaje.value = ok ? 'Participante registrado' : 'Email ya registrado';
      // Si se registro correctamente, limpia los campos
      if (ok) {
        nombre.value = '';
        email.value = '';
        telefono.value = '';
      }
    }

    // Retorna las variables y funciones para usarlas en el template
    return { nombre, email, telefono, mensaje, agregar };
  },
  template: `
    <div>
      <input v-model="nombre" placeholder="Nombre" />
      <input v-model="email" placeholder="Email" />
      <input v-model="telefono" placeholder="Telefono" />
      <button @click="agregar">Registrar</button>
      <div style="color:red">{{ mensaje }}</div>
    </div>
  `
};