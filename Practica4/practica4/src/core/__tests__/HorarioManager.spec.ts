import { describe, it, expect, beforeEach } from 'vitest';
import { HorarioManager } from '../4-3/HorarioManager';
import type { HorariosData, IAsignatura } from '@/types/4-3/schedule';

describe('HorarioManager', () => {
  let manager: HorarioManager;
  
  const horariosIniciales: HorariosData = {
    'Aula 101': [
      [
        { nombre: 'DAWEC', profesor: 'A. Pérez', grupo: '2DAW' },
        null,
        null,
        { nombre: 'DIW', profesor: 'B. García', grupo: '2DAW' },
        null,
        null,
        null,
        null
      ],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null]
    ]
  };

  beforeEach(() => {
    manager = new HorarioManager(JSON.parse(JSON.stringify(horariosIniciales)));
  });

  describe('Gestión de Aulas', () => {
    it('debe crear una nueva aula con horario vacío', () => {
      const nombreAula = 'Aula 205';
      manager.crearAula(nombreAula);
      
      const aulas = manager.obtenerAulas();
      expect(aulas).toContain(nombreAula);
      
      const horario = manager.obtenerHorarioAula(nombreAula);
      expect(horario).toBeDefined();
      expect(horario!.length).toBe(5); // 5 días
      expect(horario![0].length).toBe(8); // 8 horas
      
      // Verificar que todos los bloques están vacíos
      horario!.forEach(dia => {
        dia.forEach(bloque => {
          expect(bloque).toBeNull();
        });
      });
    });

    it('debe eliminar un aula existente', () => {
      const resultado = manager.eliminarAula('Aula 101');
      expect(resultado).toBe(true);
      
      const aulas = manager.obtenerAulas();
      expect(aulas).not.toContain('Aula 101');
      
      const horario = manager.obtenerHorarioAula('Aula 101');
      expect(horario).toBeNull();
    });

    it('debe retornar false al intentar eliminar aula inexistente', () => {
      const resultado = manager.eliminarAula('Aula Inexistente');
      expect(resultado).toBe(false);
    });
  });

  describe('Gestión de Reservas', () => {
    const nuevaAsignatura: IAsignatura = {
      nombre: 'Matemáticas',
      profesor: 'Prof. Test',
      grupo: '1DAW'
    };

    it('debe crear una reserva en bloque vacío', () => {
      const resultado = manager.crearReserva('Aula 101', 0, 1, nuevaAsignatura);
      expect(resultado).toBe(true);
      
      const reserva = manager.obtenerReserva('Aula 101', 0, 1);
      expect(reserva).toEqual(nuevaAsignatura);
    });

    it('no debe crear reserva en bloque ocupado', () => {
      const resultado = manager.crearReserva('Aula 101', 0, 0, nuevaAsignatura);
      expect(resultado).toBe(false);
      
      // Verificar que la reserva original no cambió
      const reservaOriginal = manager.obtenerReserva('Aula 101', 0, 0);
      expect(reservaOriginal).toEqual({ nombre: 'DAWEC', profesor: 'A. Pérez', grupo: '2DAW' });
    });

    it('debe actualizar una reserva existente', () => {
      const asignaturaActualizada: IAsignatura = {
        nombre: 'DAWEC Avanzado',
        profesor: 'A. Pérez Modificado',
        grupo: '2DAW-A'
      };
      
      const resultado = manager.actualizarReserva('Aula 101', 0, 0, asignaturaActualizada);
      expect(resultado).toBe(true);
      
      const reserva = manager.obtenerReserva('Aula 101', 0, 0);
      expect(reserva).toEqual(asignaturaActualizada);
    });

    it('debe eliminar una reserva', () => {
      const resultado = manager.eliminarReserva('Aula 101', 0, 0);
      expect(resultado).toBe(true);
      
      const reserva = manager.obtenerReserva('Aula 101', 0, 0);
      expect(reserva).toBeNull();
    });

    it('debe validar coordenadas incorrectas', () => {
      expect(manager.crearReserva('Aula Inexistente', 0, 0, nuevaAsignatura)).toBe(false);
      expect(manager.crearReserva('Aula 101', -1, 0, nuevaAsignatura)).toBe(false);
      expect(manager.crearReserva('Aula 101', 0, -1, nuevaAsignatura)).toBe(false);
      expect(manager.crearReserva('Aula 101', 5, 0, nuevaAsignatura)).toBe(false);
      expect(manager.crearReserva('Aula 101', 0, 8, nuevaAsignatura)).toBe(false);
    });
  });

  describe('Consultas Avanzadas', () => {
    beforeEach(() => {
      // Agregar más datos para las pruebas
      manager.crearReserva('Aula 101', 1, 1, { nombre: 'Historia', profesor: 'A. Pérez', grupo: '1DAW' });
      manager.crearAula('Aula 205');
      manager.crearReserva('Aula 205', 0, 0, { nombre: 'Física', profesor: 'A. Pérez', grupo: '2DAW' });
    });

    it('debe obtener reservas por profesor', () => {
      const reservas = manager.obtenerReservasPorProfesor('A. Pérez');
      expect(reservas.length).toBe(3);
      
      reservas.forEach(reserva => {
        expect(reserva.asignatura.profesor).toBe('A. Pérez');
      });
    });

    it('debe obtener reservas por asignatura', () => {
      const reservas = manager.obtenerReservasPorAsignatura('DAWEC');
      expect(reservas.length).toBe(1);
      expect(reservas[0].asignatura.nombre).toBe('DAWEC');
    });

    it('debe calcular estadísticas de aula', () => {
      const stats = manager.obtenerEstadisticasAula('Aula 101');
      expect(stats.totalBloques).toBe(40); // 5 días x 8 horas
      expect(stats.bloquesOcupados).toBe(3); // DAWEC, DIW, Historia
      expect(stats.bloquesLibres).toBe(37);
    });

    it('debe detectar conflictos de profesor', () => {
      // Crear conflicto: mismo profesor en dos aulas a la misma hora
      manager.crearReserva('Aula 205', 0, 3, { nombre: 'Química', profesor: 'B. García', grupo: '1DAW' });
      
      const conflictos = manager.obtenerConflictosProfesor('B. García');
      expect(conflictos.length).toBe(1);
      expect(conflictos[0].dia).toBe(0);
      expect(conflictos[0].hora).toBe(3);
    });
  });

  describe('Exportación e Importación', () => {
    it('debe exportar horarios correctamente', () => {
      const horariosExportados = manager.exportarHorarios();
      expect(horariosExportados).toEqual(horariosIniciales);
      
      // Verificar que es una copia profunda
      horariosExportados['Aula 101'][0][0] = null;
      const reservaOriginal = manager.obtenerReserva('Aula 101', 0, 0);
      expect(reservaOriginal).not.toBeNull();
    });

    it('debe importar horarios correctamente', () => {
      const nuevosHorarios: HorariosData = {
        'Aula Nueva': [
          [{ nombre: 'Test', profesor: 'Test Prof', grupo: 'Test Grupo' }, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null]
        ]
      };
      
      manager.importarHorarios(nuevosHorarios);
      
      const aulas = manager.obtenerAulas();
      expect(aulas).toEqual(['Aula Nueva']);
      
      const reserva = manager.obtenerReserva('Aula Nueva', 0, 0);
      expect(reserva?.nombre).toBe('Test');
    });
  });

  describe('Validaciones', () => {
    it('debe identificar bloques libres correctamente', () => {
      expect(manager.esBloqueLibre('Aula 101', 0, 0)).toBe(false); // Ocupado
      expect(manager.esBloqueLibre('Aula 101', 0, 1)).toBe(true);  // Libre
      expect(manager.esBloqueLibre('Aula Inexistente', 0, 0)).toBe(false); // Aula no existe
    });
  });
});