import { describe, it, expect, vi } from 'vitest';
import { useJuego } from '../useJuego';
import { Carta } from '@/core';

describe('useJuego', () => {
  it('Test de Inicio: mazo tiene 44 cartas, manoJugador 7 y descarte 1', () => {
    const juego = useJuego();
    
    juego.iniciarJuego();
    
    expect(juego.cartasEnMazo.value).toBe(44);
    expect(juego.manoJugador.value.length).toBe(7);
    expect(juego.cartaSuperiorDescarte.value).toBeDefined();
  });

  it('Test de Jugada Válida: carta se mueve de la mano al descarte', () => {
    const juego = useJuego();
    juego.iniciarJuego();
    
    const cartaDescarte = juego.cartaSuperiorDescarte.value!;
    const cartaValida = juego.manoJugador.value.find(c => 
      c.palo === cartaDescarte.palo || c.valor === cartaDescarte.valor
    );
    
    if (cartaValida) {
      const manoInicial = juego.manoJugador.value.length;
      
      juego.jugarCarta(cartaValida);
      
      expect(juego.manoJugador.value.length).toBe(manoInicial - 1);
      expect(juego.cartaSuperiorDescarte.value).toBe(cartaValida);
    }
  });

  it('Test de Jugada Inválida: el estado no cambia', () => {
    const juego = useJuego();
    juego.iniciarJuego();
    
    const cartaDescarte = juego.cartaSuperiorDescarte.value!;
    const cartaInvalida = juego.manoJugador.value.find(c => 
      c.palo !== cartaDescarte.palo && c.valor !== cartaDescarte.valor
    );
    
    if (cartaInvalida) {
      const manoInicial = juego.manoJugador.value.length;
      const descarteInicial = juego.cartaSuperiorDescarte.value;
      
      juego.jugarCarta(cartaInvalida);
      
      expect(juego.manoJugador.value.length).toBe(manoInicial);
      expect(juego.cartaSuperiorDescarte.value).toBe(descarteInicial);
    }
  });

  it('Test de Reconstitución de Mazo: mazo se rellena desde el descarte', () => {
    const juego = useJuego();
    juego.iniciarJuego();
    
    // Vaciar el mazo robando todas las cartas
    while (juego.cartasEnMazo.value > 0) {
      juego.robarCarta();
    }
    
    expect(juego.cartasEnMazo.value).toBe(0);
    
    // Robar una carta más debería reconstituir el mazo
    juego.robarCarta();
    
    expect(juego.cartasEnMazo.value).toBeGreaterThan(0);
    expect(juego.cartaSuperiorDescarte.value).toBeDefined();
  });
});
