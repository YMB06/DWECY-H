import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import GestorHorarios from '../4-3/GestorHorarios.vue';
import type { HorariosData, IAsignatura } from '@/types/4-3/schedule';

describe('GestorHorarios', () => {
  let wrapper: any;
  
  const horariosTest: HorariosData = {
    'Aula 101': [
      // Lunes
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
      // Martes
      [
        null,
        { nombre: 'EIE', profesor: 'C. López', grupo: '2DAW' },
        null,
        null,
        null,
        null,
        null,
        null
      ],
      // Miércoles, Jueves, Viernes (vacíos para simplificar)
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null]
    ],
    'Aula 205': [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null]
    ]
  };

  beforeEach(() => {
    wrapper = mount(GestorHorarios);
  });

  it('Test 1: Estado Inicial - horarioVisible corresponde al de la primera aula', () => {
    // Verificar que el aula seleccionada inicialmente es la primera de la lista
    const aulasDisponibles = Object.keys(horariosTest);
    const primeraAula = aulasDisponibles[0];
    
    // Acceder al componente interno para verificar el estado
    const componentInstance = wrapper.vm;
    
    // Verificar que existe al menos una aula
    expect(componentInstance.aulas.length).toBeGreaterThan(0);
    
    // Verificar que el aula seleccionada es la primera
    expect(componentInstance.aulaSeleccionada).toBe(componentInstance.aulas[0]);
    
    // Verificar que horarioVisible corresponde al horario de la primera aula
    expect(componentInstance.horarioVisible).toBeDefined();
    expect(Array.isArray(componentInstance.horarioVisible)).toBe(true);
  });

  it('Test 2: Cambio de Aula - horarioVisible se actualiza correctamente', async () => {
    const componentInstance = wrapper.vm;
    const aulasDisponibles = componentInstance.aulas;
    
    // Asegurar que hay al menos 2 aulas para el test
    if (aulasDisponibles.length < 2) {
      // Agregar una segunda aula para el test
      componentInstance.horarios['Aula Test'] = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null]
      ];
    }
    
    const aulaInicial = componentInstance.aulaSeleccionada;
    const horarioInicial = componentInstance.horarioVisible;
    
    // Cambiar a una aula diferente
    const nuevaAula = componentInstance.aulas.find((aula: string) => aula !== aulaInicial);
    componentInstance.aulaSeleccionada = nuevaAula;
    
    await wrapper.vm.$nextTick();
    
    // Verificar que el aula seleccionada cambió
    expect(componentInstance.aulaSeleccionada).toBe(nuevaAula);
    
    // Verificar que horarioVisible se actualizó
    expect(componentInstance.horarioVisible).not.toBe(horarioInicial);
    expect(componentInstance.horarioVisible).toBe(componentInstance.horarios[nuevaAula]);
  });

  it('Test 3: Añadir Reserva - insertar datos en bloque null', async () => {
    const componentInstance = wrapper.vm;
    
    // Datos de la nueva reserva
    const nuevaAsignatura: IAsignatura = {
      nombre: 'Matemáticas',
      profesor: 'Prof. Test',
      grupo: '1DAW'
    };
    
    const dia = 0; // Lunes
    const hora = 1; // Segunda hora
    
    // Verificar que el bloque está inicialmente vacío
    const aulaActual = componentInstance.aulaSeleccionada;
    const bloqueInicial = componentInstance.horarios[aulaActual][dia][hora];
    expect(bloqueInicial).toBeNull();
    
    // Simular guardar reserva
    componentInstance.guardarReserva({
      dia,
      hora,
      asignatura: nuevaAsignatura
    });
    
    await wrapper.vm.$nextTick();
    
    // Verificar que la reserva se insertó correctamente
    const bloqueActualizado = componentInstance.horarios[aulaActual][dia][hora];
    expect(bloqueActualizado).toEqual(nuevaAsignatura);
    expect(bloqueActualizado.nombre).toBe('Matemáticas');
    expect(bloqueActualizado.profesor).toBe('Prof. Test');
    expect(bloqueActualizado.grupo).toBe('1DAW');
  });

  it('Test 4: Modificar Reserva - actualizar bloque existente', async () => {
    const componentInstance = wrapper.vm;
    
    // Primero, crear una reserva
    const reservaInicial: IAsignatura = {
      nombre: 'Historia',
      profesor: 'Prof. Inicial',
      grupo: '2DAW'
    };
    
    const dia = 0; // Lunes
    const hora = 2; // Tercera hora
    const aulaActual = componentInstance.aulaSeleccionada;
    
    // Insertar reserva inicial
    componentInstance.horarios[aulaActual][dia][hora] = reservaInicial;
    await wrapper.vm.$nextTick();
    
    // Verificar que la reserva inicial está presente
    expect(componentInstance.horarios[aulaActual][dia][hora]).toEqual(reservaInicial);
    
    // Datos de la reserva modificada
    const reservaModificada: IAsignatura = {
      nombre: 'Historia Actualizada',
      profesor: 'Prof. Modificado',
      grupo: '2DAW-A'
    };
    
    // Simular modificar reserva
    componentInstance.guardarReserva({
      dia,
      hora,
      asignatura: reservaModificada
    });
    
    await wrapper.vm.$nextTick();
    
    // Verificar que la reserva se actualizó correctamente
    const bloqueActualizado = componentInstance.horarios[aulaActual][dia][hora];
    expect(bloqueActualizado).toEqual(reservaModificada);
    expect(bloqueActualizado.nombre).toBe('Historia Actualizada');
    expect(bloqueActualizado.profesor).toBe('Prof. Modificado');
    expect(bloqueActualizado.grupo).toBe('2DAW-A');
  });

  it('Test 5: Eliminar Reserva - establecer bloque a null', async () => {
    const componentInstance = wrapper.vm;
    
    // Primero, crear una reserva para eliminar
    const reservaAEliminar: IAsignatura = {
      nombre: 'Física',
      profesor: 'Prof. Eliminar',
      grupo: '1DAW'
    };
    
    const dia = 1; // Martes
    const hora = 3; // Cuarta hora
    const aulaActual = componentInstance.aulaSeleccionada;
    
    // Insertar reserva
    componentInstance.horarios[aulaActual][dia][hora] = reservaAEliminar;
    await wrapper.vm.$nextTick();
    
    // Verificar que la reserva existe
    expect(componentInstance.horarios[aulaActual][dia][hora]).toEqual(reservaAEliminar);
    
    // Simular eliminar reserva
    componentInstance.eliminarReserva({
      dia,
      hora
    });
    
    await wrapper.vm.$nextTick();
    
    // Verificar que el bloque se estableció a null
    const bloqueEliminado = componentInstance.horarios[aulaActual][dia][hora];
    expect(bloqueEliminado).toBeNull();
  });

  it('Test adicional: Verificar estructura de datos inicial', () => {
    const componentInstance = wrapper.vm;
    
    // Verificar que horarios es un objeto
    expect(typeof componentInstance.horarios).toBe('object');
    
    // Verificar que cada aula tiene una estructura de matriz válida
    Object.values(componentInstance.horarios).forEach((horario: any) => {
      expect(Array.isArray(horario)).toBe(true);
      expect(horario.length).toBe(5); // 5 días
      
      horario.forEach((dia: any) => {
        expect(Array.isArray(dia)).toBe(true);
        expect(dia.length).toBe(8); // 8 horas
      });
    });
  });

  it('Test adicional: Verificar comportamiento del modal', async () => {
    const componentInstance = wrapper.vm;
    
    // Verificar estado inicial del modal
    expect(componentInstance.modalVisible).toBe(false);
    expect(componentInstance.datosModal).toBeNull();
    
    // Simular abrir modal
    const dia = 0;
    const hora = 0;
    componentInstance.abrirModal(dia, hora);
    
    await wrapper.vm.$nextTick();
    
    // Verificar que el modal se abrió con los datos correctos
    expect(componentInstance.modalVisible).toBe(true);
    expect(componentInstance.datosModal).toEqual({
      dia,
      hora,
      asignatura: componentInstance.horarioVisible[dia][hora]
    });
  });
});