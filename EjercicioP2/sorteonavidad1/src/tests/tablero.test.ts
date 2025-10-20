import { jest } from '@jest/globals';

const makeLocalStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => (Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null),
    setItem: (key: string, value: string) => { store[key] = String(value); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  } as unknown as Storage;
};

describe('Gestion del Tablero (clase Tablero)', () => {
  let localStorageMock: Storage;

  beforeEach(() => {
    localStorageMock = makeLocalStorageMock();
    // @ts-ignore
    global.localStorage = localStorageMock;
    jest.resetModules();
  });

  it('Inicializar tablero correctamente con 100 numeros', async () => {
    const m = await import('../services/TableroService');
    const { Tablero } = m;
    const t = new Tablero(100);
    expect(t.obtenerTablero()).toHaveLength(100);
    expect(t.obtenerTablero()[0].numero).toBe(0);
  });

  it('Reservar un numero libre exitosamente', async () => {
    const m = await import('../services/TableroService');
    const { Tablero } = m;
    const t = new Tablero(100);
    t.reservarNumeroOrThrow(10, 'Luis');
    const cas = t.obtenerTablero()[10];
    expect(cas.reservado).toBe(true);
    expect(cas.participante).toBe('Luis');
  });

  it('Intentar reservar un numero ya ocupado debe lanzar AlreadyReservedError', async () => {
    const m = await import('../services/TableroService');
    const { Tablero, AlreadyReservedError } = m;
    const t = new Tablero(100);
    t.reservarNumeroOrThrow(11, 'A');
    await expect(async () => t.reservarNumeroOrThrow(11, 'B')).rejects.toThrow(AlreadyReservedError);
  });

  it('Permitir que un mismo participante reserve multiples numeros', async () => {
    const m = await import('../services/TableroService');
    const { Tablero } = m;
    const t = new Tablero(100);
    t.reservarNumeroOrThrow(20, 'Mar');
    t.reservarNumeroOrThrow(21, 'Mar');
    const assigned = t.obtenerTablero().filter(c => c.participante === 'Mar').map(c => c.numero);
    expect(assigned).toEqual(expect.arrayContaining([20, 21]));
  });

  it('Liberar un numero correctamente', async () => {
    const m = await import('../services/TableroService');
    const { Tablero } = m;
    const t = new Tablero(100);
    t.reservarNumeroOrThrow(30, 'X');
    t.liberarNumeroOrThrow(30);
    const cas = t.obtenerTablero()[30];
    expect(cas.reservado).toBe(false);
    expect(cas.participante).toBeUndefined();
  });

  it('Intentar liberar un numero que no esta ocupado debe lanzar NotReservedError', async () => {
    const m = await import('../services/TableroService');
    const { Tablero, NotReservedError } = m;
    const t = new Tablero(100);
    await expect(async () => t.liberarNumeroOrThrow(40)).rejects.toThrow(NotReservedError);
  });

  it('Verificar estado de numeros (libre/ocupado) y consultar numeros de un participante', async () => {
    const m = await import('../services/TableroService');
    const { Tablero } = m;
    const t = new Tablero(100);
    t.reservarNumeroOrThrow(50, 'Zoe');
    t.reservarNumeroOrThrow(51, 'Zoe');
    const tablero = t.obtenerTablero();
    expect(tablero[50].reservado).toBe(true);
    expect(tablero[51].reservado).toBe(true);
    const zoeNums = tablero.filter(c => c.participante === 'Zoe').map(c => c.numero);
    expect(zoeNums).toEqual([50, 51]);
  });

  it('Caso limite: reservar todo el tablero y comprobar comportamientos', async () => {
    const m = await import('../services/TableroService');
    const { Tablero, AlreadyReservedError } = m;
    const t = new Tablero(20); // usa 20 para test rapido
    for (let i = 0; i < 20; i++) t.reservarNumeroOrThrow(i, 'All');
    expect(t.obtenerTablero().every(c => c.reservado)).toBe(true);
    // intentar reservar cualquiera debe fallar con AlreadyReservedError
    await expect(async () => t.reservarNumeroOrThrow(5, 'X')).rejects.toThrow(AlreadyReservedError);
  });
});