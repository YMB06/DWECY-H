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

describe('Tests para Estadísticas', () => {
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

  it('debería calcular correctamente el número de casillas ocupadas/libres', async () => {
    // Arrange
    const ps = await import('../services/ParticipanteService');
    const ts = await import('../services/TableroService');
    const es = await import('../services/EstadisticasService');
    
    ps.agregarParticipanteOrThrow('Ana', 'ana@test.com', '123456789');
    ts.reservarNumero(10, 'Ana');
    ts.reservarNumero(20, 'Ana');
    ts.reservarNumero(30, 'Ana');

    // Act
    const estadisticas = es.obtenerEstadisticas();

    // Assert
    expect(estadisticas.numerosOcupados).toBe(3);
    expect(estadisticas.numerosLibres).toBe(97);
    expect(estadisticas.numerosOcupados + estadisticas.numerosLibres).toBe(100);
  });

  it('debería contar correctamente el número de participantes únicos', async () => {
    // Arrange
    const ps = await import('../services/ParticipanteService');
    const es = await import('../services/EstadisticasService');
    
    ps.agregarParticipanteOrThrow('Juan', 'juan@test.com', '111111111');
    ps.agregarParticipanteOrThrow('María', 'maria@test.com', '222222222');
    ps.agregarParticipanteOrThrow('Carlos', 'carlos@test.com', '333333333');

    // Act
    const estadisticas = es.obtenerEstadisticas();

    // Assert
    expect(estadisticas.totalParticipantes).toBe(3);
  });

  it('debería calcular el porcentaje de ocupación', async () => {
    // Arrange
    const ps = await import('../services/ParticipanteService');
    const ts = await import('../services/TableroService');
    const es = await import('../services/EstadisticasService');
    
    ps.agregarParticipanteOrThrow('Luis', 'luis@test.com', '444444444');
    // Reservar 25 números (25% de 100)
    for (let i = 0; i < 25; i++) {
      ts.reservarNumero(i, 'Luis');
    }

    // Act
    const estadisticas = es.obtenerEstadisticas();

    // Assert
    expect(estadisticas.porcentajeOcupado).toBe(25);
  });

  it('debería devolver estadísticas correctas con tablero vacío', async () => {
    // Arrange
    const es = await import('../services/EstadisticasService');

    // Act
    const estadisticas = es.obtenerEstadisticas();

    // Assert
    expect(estadisticas.totalParticipantes).toBe(0);
    expect(estadisticas.numerosOcupados).toBe(0);
    expect(estadisticas.numerosLibres).toBe(100);
    expect(estadisticas.porcentajeOcupado).toBe(0);
  });
});