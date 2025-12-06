import { ref, readonly, computed } from 'vue';
import { Pila, Carta, type Palo, type Valor } from '@/core';

export function useJuego() {
  const mazo = ref(new Pila<Carta>());
  const descarte = ref(new Pila<Carta>());
  const manoJugador = ref<Carta[]>([]);
  const mensaje = ref<string>('');
  const juegoTerminado = ref(false);

  function crearBaraja(): Carta[] {
    const palos: Palo[] = ['Picas', 'Corazones', 'Tréboles', 'Diamantes'];
    const valores: Valor[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const baraja: Carta[] = [];

    for (const palo of palos) {
      for (const valor of valores) {
        baraja.push(new Carta(palo, valor));
      }
    }

    return baraja;
  }

  function barajar(cartas: Carta[]): Carta[] {
    const barajadas = [...cartas];
    for (let i = barajadas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [barajadas[i], barajadas[j]] = [barajadas[j], barajadas[i]];
    }
    return barajadas;
  }

  function iniciarJuego() {
    mazo.value = new Pila<Carta>();
    descarte.value = new Pila<Carta>();
    manoJugador.value = [];
    mensaje.value = '';
    juegoTerminado.value = false;

    const baraja = barajar(crearBaraja());
    
    for (const carta of baraja) {
      mazo.value.push(carta);
    }

    for (let i = 0; i < 7; i++) {
      const carta = mazo.value.pop();
      if (carta) manoJugador.value.push(carta);
    }

    const cartaInicial = mazo.value.pop();
    if (cartaInicial) descarte.value.push(cartaInicial);
  }

  function robarCarta() {
    if (juegoTerminado.value) return;

    if (mazo.value.isEmpty()) {
      reconstituirMazo();
    }

    const carta = mazo.value.pop();
    if (carta) {
      manoJugador.value.push(carta);
      mensaje.value = `Robaste: ${carta.nombre}`;
    }
  }

  function jugarCarta(cartaAJugar: Carta) {
    if (juegoTerminado.value) return;

    const cartaSuperior = descarte.value.peek();
    if (cartaSuperior && cartaAJugar.esJugableSobre(cartaSuperior)) {
      manoJugador.value = manoJugador.value.filter(c => c !== cartaAJugar);
      descarte.value.push(cartaAJugar);
      mensaje.value = `Jugaste: ${cartaAJugar.nombre}`;

      if (manoJugador.value.length === 0) {
        juegoTerminado.value = true;
        mensaje.value = '¡Ganaste! Te quedaste sin cartas.';
      }
    } else {
      mensaje.value = 'Movimiento no válido. La carta no coincide en palo ni valor.';
    }
  }

  function reconstituirMazo() {
    const cartaSuperior = descarte.value.pop();
    const cartasDescarte = descarte.value.getElementos();
    
    descarte.value = new Pila<Carta>();
    if (cartaSuperior) descarte.value.push(cartaSuperior);

    const cartasBarajadas = barajar(cartasDescarte);
    mazo.value = new Pila<Carta>();
    for (const carta of cartasBarajadas) {
      mazo.value.push(carta);
    }

    mensaje.value = 'Mazo reconstituido desde el descarte.';
  }

  return {
    iniciarJuego,
    robarCarta,
    jugarCarta,
    manoJugador: computed(() => manoJugador.value),
    cartaSuperiorDescarte: computed(() => descarte.value.peek() as Carta | undefined),
    cartasEnMazo: computed(() => mazo.value.size()),
    mensaje: readonly(mensaje),
    juegoTerminado: readonly(juegoTerminado)
  };
}
