import type { Palo, Valor } from '@/types/4-1/cards';

export class Carta {
  constructor(public palo: Palo, public valor: Valor) {}

  get nombre(): string {
    return `${this.valor} de ${this.palo}`;
  }

  esJugableSobre(otraCarta: Carta): boolean {
    return this.palo === otraCarta.palo || this.valor === otraCarta.valor;
  }
}
