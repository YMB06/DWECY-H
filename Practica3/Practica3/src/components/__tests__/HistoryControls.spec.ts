import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import HistoryControls from '../../components/Punto4/Punto4-1/HistoryControls.vue';

describe('HistoryControls', () => {
  let backSpy: any;
  let forwardSpy: any;
  let goSpy: any;

  beforeEach(() => {
    backSpy = vi.spyOn(history, 'back');
    forwardSpy = vi.spyOn(history, 'forward');
    goSpy = vi.spyOn(history, 'go');
  });

  it('llama a history.back al hacer clic en Atrás', async () => {
    const wrapper = mount(HistoryControls);
    
    await wrapper.find('.back-btn').trigger('click');
    
    expect(backSpy).toHaveBeenCalledTimes(1);
  });

  it('llama a history.forward al hacer clic en Adelante', async () => {
    const wrapper = mount(HistoryControls);
    
    await wrapper.find('.forward-btn').trigger('click');
    
    expect(forwardSpy).toHaveBeenCalledTimes(1);
  });

  it('llama a history.go(-2) al hacer clic en Ir 2 páginas atrás', async () => {
    const wrapper = mount(HistoryControls);
    
    await wrapper.find('.go-btn').trigger('click');
    
    expect(goSpy).toHaveBeenCalledWith(-2);
  });
});