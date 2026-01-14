import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BrowserInfo from '../../components/Punto3/Punto3-1/BrowserInfo.vue';

describe('BrowserInfo', () => {
  beforeEach(() => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('fr-FR');
    vi.spyOn(navigator, 'platform', 'get').mockReturnValue('MacIntel');
    vi.spyOn(navigator, 'cookieEnabled', 'get').mockReturnValue(false);
  });

  it('muestra la información del navegador mockeada', () => {
    const wrapper = mount(BrowserInfo);
    
    expect(wrapper.text()).toContain('fr-FR');
    expect(wrapper.text()).toContain('MacIntel');
    expect(wrapper.text()).toContain('No');
  });
});