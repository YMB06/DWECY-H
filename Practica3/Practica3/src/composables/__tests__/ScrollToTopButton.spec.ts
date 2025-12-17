import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ScrollToTopButton from '../../components/Punto1/Punto1-2/ScrollToTopButton.vue';

describe('ScrollToTopButton', () => {
  let scrollToSpy: any;

  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
    scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  it('no es visible cuando el scroll es bajo', () => {
    window.scrollY = 100;
    const wrapper = mount(ScrollToTopButton);
    
    window.dispatchEvent(new Event('scroll'));
    
    expect(wrapper.find('button').exists()).toBe(false);
  });

  it('es visible cuando el scroll supera el umbral', () => {
    const wrapper = mount(ScrollToTopButton);
    
    window.scrollY = 300;
    window.dispatchEvent(new Event('scroll'));
    
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('llama a scrollTo al hacer clic', async () => {
    const wrapper = mount(ScrollToTopButton);
    
    window.scrollY = 300;
    window.dispatchEvent(new Event('scroll'));
    await wrapper.vm.$nextTick();
    
    await wrapper.find('button').trigger('click');
    
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});