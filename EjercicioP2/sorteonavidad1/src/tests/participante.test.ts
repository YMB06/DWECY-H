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

describe('Gestión de Participantes - servicios y clase', () => {
  let localStorageMock: Storage;

  beforeEach(() => {
    // mock global localStorage antes de cargar modulos para que servicios lo usen
    localStorageMock = makeLocalStorageMock();
    // @ts-ignore
    global.localStorage = localStorageMock;
    // reiniciar cache de módulos para evitar estado compartido
    jest.resetModules();
  });

  it('Crear un participante con datos validos', async () => {
    const mod = await import('../services/ParticipanteService');
    const { agregarParticipanteOrThrow, obtenerParticipantes } = mod;
    const p = agregarParticipanteOrThrow('Ana', 'ana@example.com', '+34123456');
    const list = obtenerParticipantes();
    expect(list.some(x => x.email === 'ana@example.com')).toBe(true);
    expect(list.find(x => x.email === 'ana@example.com')?.nombre).toBe('Ana');
  });

  it('Intentar crear participante con email invalido debe fallar', async () => {
    const mod = await import('../services/ParticipanteService');
    const { agregarParticipanteOrThrow } = mod;
    await expect(async () => agregarParticipanteOrThrow('B', 'bad-email', '123456')).rejects.toThrow();
  });

  it('No se pueden registrar participantes duplicados (mismo email)', async () => {
    const mod = await import('../services/ParticipanteService');
    const { agregarParticipanteOrThrow } = mod;
    await agregarParticipanteOrThrow('C', 'c@example.com', '1234567');
    await expect(async () => agregarParticipanteOrThrow('C2', 'c@example.com', '7654321')).rejects.toThrow();
  });

  it('Consultar la lista completa de participantes', async () => {
    const mod = await import('../services/ParticipanteService');
    const { agregarParticipanteOrThrow, obtenerParticipantes } = mod;
    agregarParticipanteOrThrow('D', 'd@example.com', '1111111');
    agregarParticipanteOrThrow('E', 'e@example.com', '2222222');
    const list = obtenerParticipantes();
    expect(list.length).toBeGreaterThanOrEqual(2);
    expect(list.map(p => p.email)).toEqual(expect.arrayContaining(['d@example.com', 'e@example.com']));
  });

  it('Permitir que un mismo participante reserve multiples numeros (servicio asignarNumero)', async () => {
    const ps = await import('../services/ParticipanteService');
    const ts = await import('../services/TableroService');
    const { agregarParticipanteOrThrow, asignarNumero, obtenerParticipantes } = ps;
    const { reservarNumero } = ts; 
    agregarParticipanteOrThrow('F', 'f@example.com', '3333333');
    const ok1 = reservarNumero(1, 'F'); // tablero solo guarda nombre, prueba cohesion minima
    const ok2 = reservarNumero(2, 'F');
    // para que participante tenga numeros hay que usar asignarNumero del servicio
    asignarNumero('f@example.com', 1);
    asignarNumero('f@example.com', 2);
    const p = obtenerParticipantes().find(x => x.email === 'f@example.com')!;
    expect(ok1).toBe(true);
    expect(ok2).toBe(true);
    expect(p.numeros).toEqual(expect.arrayContaining([1, 2]));
  });

  it('Liberar numero con servicio liberarNumero', async () => {
    const ps = await import('../services/ParticipanteService');
    const ts = await import('../services/TableroService');
    const { agregarParticipanteOrThrow, asignarNumero, liberarNumero, obtenerParticipantes } = ps;
    const { reservarNumero, liberarNumeroTablero } = ts;
    agregarParticipanteOrThrow('G', 'g@example.com', '4444444');
    reservarNumero(5, 'G');
    asignarNumero('g@example.com', 5);
    // liberar por servicios
    const okTab = liberarNumeroTablero(5);
    const okPart = liberarNumero('g@example.com', 5);
    const p = obtenerParticipantes().find(x => x.email === 'g@example.com')!;
    expect(okTab).toBe(true);
    expect(okPart).toBe(true);
    expect(p.numeros).not.toContain(5);
  });
});