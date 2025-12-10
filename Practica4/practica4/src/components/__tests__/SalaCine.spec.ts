import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import SalaCine from '../4-2/SalaCine.vue';
import { EstadoButaca } from '@/types/4-2/cinema';

describe('SalaCine', () => {
  let wrapper: any;
  
  beforeEach(() => {
    wrapper = mount(SalaCine, {
      props: {
        filas: 5,
        columnas: 8,
        precioPorButaca: 10
      }
    });
  });

  it('Test 1: Inicialización - sala se crea con dimensiones correctas y estado DISPONIBLE', () => {
    const componentInstance = wrapper.vm;
    
    expect(componentInstance.sala.length).toBe(5);
    expect(componentInstance.sala[0].length).toBe(8);
    
    componentInstance.sala.forEach((fila: any) => {
      fila.forEach((butaca: any) => {
        expect(butaca.estado).toBe(EstadoButaca.DISPONIBLE);
      });
    });
    
    expect(componentInstance.sala[0][0].id).toBe('F1-C1');
    expect(componentInstance.sala[4][7].id).toBe('F5-C8');
  });

  it('Test 2: Selección de butaca - DISPONIBLE cambia a SELECCIONADO', () => {
    const componentInstance = wrapper.vm;
    const butaca = componentInstance.sala[2][3];
    
    expect(butaca.estado).toBe(EstadoButaca.DISPONIBLE);
    
    componentInstance.seleccionarButaca(butaca);
    
    expect(butaca.estado).toBe(EstadoButaca.SELECCIONADO);
  });

  it('Test 3: Deselección de butaca - SELECCIONADO cambia a DISPONIBLE', () => {
    const componentInstance = wrapper.vm;
    const butaca = componentInstance.sala[1][2];
    
    componentInstance.seleccionarButaca(butaca);
    expect(butaca.estado).toBe(EstadoButaca.SELECCIONADO);
    
    componentInstance.seleccionarButaca(butaca);
    expect(butaca.estado).toBe(EstadoButaca.DISPONIBLE);
  });

  it('Test 4: Impedir selección - no afecta butacas OCUPADAS o DAÑADAS', () => {
    const componentInstance = wrapper.vm;
    const butacaOcupada = componentInstance.sala[0][0];
    const butacaDañada = componentInstance.sala[0][1];
    
    butacaOcupada.estado = EstadoButaca.OCUPADO;
    butacaDañada.estado = EstadoButaca.DAÑADO;
    
    componentInstance.seleccionarButaca(butacaOcupada);
    componentInstance.seleccionarButaca(butacaDañada);
    
    expect(butacaOcupada.estado).toBe(EstadoButaca.OCUPADO);
    expect(butacaDañada.estado).toBe(EstadoButaca.DAÑADO);
  });

  it('Test 5: Confirmación de reserva - SELECCIONADAS pasan a OCUPADAS', () => {
    const componentInstance = wrapper.vm;
    
    const butaca1 = componentInstance.sala[0][0];
    const butaca2 = componentInstance.sala[1][1];
    const butaca3 = componentInstance.sala[2][2];
    
    componentInstance.seleccionarButaca(butaca1);
    componentInstance.seleccionarButaca(butaca2);
    componentInstance.seleccionarButaca(butaca3);
    
    expect(butaca1.estado).toBe(EstadoButaca.SELECCIONADO);
    expect(butaca2.estado).toBe(EstadoButaca.SELECCIONADO);
    expect(butaca3.estado).toBe(EstadoButaca.SELECCIONADO);
    
    componentInstance.confirmarReserva();
    
    expect(butaca1.estado).toBe(EstadoButaca.OCUPADO);
    expect(butaca2.estado).toBe(EstadoButaca.OCUPADO);
    expect(butaca3.estado).toBe(EstadoButaca.OCUPADO);
  });

  it('Test 6: Cálculo de total - se actualiza correctamente', () => {
    const componentInstance = wrapper.vm;
    
    expect(componentInstance.totalAPagar).toBe(0);
    
    componentInstance.seleccionarButaca(componentInstance.sala[0][0]);
    expect(componentInstance.totalAPagar).toBe(10);
    
    componentInstance.seleccionarButaca(componentInstance.sala[0][1]);
    expect(componentInstance.totalAPagar).toBe(20);
    
    componentInstance.seleccionarButaca(componentInstance.sala[0][0]);
    expect(componentInstance.totalAPagar).toBe(10);
  });
});