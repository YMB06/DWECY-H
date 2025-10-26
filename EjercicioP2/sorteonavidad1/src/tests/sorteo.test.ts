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

describe('Tests para Sorteo', () => {
  let localStorageMock: Storage;

  beforeEach(() => {
    localStorageMock = makeLocalStorageMock();
    // @ts-ignore
    global.localStorage = localStorageMock;
    jest.resetModules();
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  it('debería realizar un sorteo con número ganador ocupado', async () => {
    // Arrange
    const ps = await import('../services/ParticipanteService');
    const ts = await import('../services/TableroService');
    const ss = await import('../services/SorteoService');
    
    ps.agregarParticipanteOrThrow('Juan', 'juan@test.com', '123456789');
    ts.reservarNumero(25, 'Juan');
    ps.asignarNumero('juan@test.com', 25);

    // Act
    const resultado = ss.determinarGanador(25);

    // Assert
    expect(resultado.ganador).toBeDefined();
    expect(resultado.ganador.nombre).toBe('Juan');
    expect(resultado.mensaje).toContain('¡Número premiado: 25!');
  });

  it('debería realizar un sorteo con número ganador libre (desierto)', async () => {
    // Arrange
    const ss = await import('../services/SorteoService');

    // Act
    const resultado = ss.determinarGanador(50);

    // Assert
    expect(resultado.ganador).toBeNull();
    expect(resultado.mensaje).toContain('SORTEO DESIERTO');
    expect(resultado.mensaje).toContain('50');
  });

  it('debería validar que solo se aceptan números entre 00 y 99', async () => {
    // Arrange
    const ss = await import('../services/SorteoService');

    // Act & Assert
    const resultado1 = ss.determinarGanador(0);
    const resultado2 = ss.determinarGanador(99);
    
    expect(resultado1).toBeDefined();
    expect(resultado2).toBeDefined();
    expect(resultado1.mensaje).toContain('00');
    expect(resultado2.mensaje).toContain('99');
  });

  it('debería devolver correctamente la información del ganador', async () => {
    // Arrange
    const ps = await import('../services/ParticipanteService');
    const ts = await import('../services/TableroService');
    const ss = await import('../services/SorteoService');
    
    ps.agregarParticipanteOrThrow('María García', 'maria@test.com', '+34987654321');
    ts.reservarNumero(42, 'María García');
    ps.asignarNumero('maria@test.com', 42);

    // Act
    const resultado = ss.determinarGanador(42);

    // Assert
    expect(resultado.ganador).toBeDefined();
    expect(resultado.ganador.nombre).toBe('María García');
    expect(resultado.ganador.email).toBe('maria@test.com');
    expect(resultado.ganador.telefono).toBe('+34987654321');
    expect(resultado.mensaje).toBe('¡Número premiado: 42!');
  });
});