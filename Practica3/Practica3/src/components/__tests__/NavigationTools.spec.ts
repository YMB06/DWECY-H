import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import NavigationTools from '../../components/Punto2/Punto2-2/NavigationTools.vue';

describe('NavigationTools', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    delete (window as any).location;
    window.location = {
      ...originalLocation,
      assign: vi.fn(),
      reload: vi.fn(),
    };
  });

  it('llama a reload al hacer clic en Recargar Página', async () => {
    const wrapper = mount(NavigationTools);
    
    await wrapper.find('.reload-btn').trigger('click');
    
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });

  it('llama a assign con URL por defecto al hacer clic en Ir', async () => {
    const wrapper = mount(NavigationTools);
    
    await wrapper.find('.go-btn').trigger('click');
    
    expect(window.location.assign).toHaveBeenCalledWith('https://vuejs.org');
  });

  it('llama a assign con nueva URL cuando se cambia el input', async () => {
    const wrapper = mount(NavigationTools);
    
    await wrapper.find('.url-input').setValue('https://github.com');
    await wrapper.find('.go-btn').trigger('click');
    
    expect(window.location.assign).toHaveBeenCalledWith('https://github.com');
  });
});