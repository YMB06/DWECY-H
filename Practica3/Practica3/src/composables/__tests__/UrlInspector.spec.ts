import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import UrlInspector from '../../components/Punto2/Punto2-1/UrlInspector.vue';

describe('UrlInspector', () => {
  beforeEach(() => {
    const mockUrl = 'https://www.vuejs.org/guide/essentials/list.html?query=test#v-for-with-a-range';
    const mockLocation = new URL(mockUrl);
    
    vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...window.location,
      href: mockLocation.href,
      protocol: mockLocation.protocol,
      hostname: mockLocation.hostname,
      pathname: mockLocation.pathname,
      search: mockLocation.search,
      port: mockLocation.port
    });
  });

  it('muestra correctamente las partes de la URL mockeada', () => {
    const wrapper = mount(UrlInspector);
    
    expect(wrapper.text()).toContain('https://www.vuejs.org/guide/essentials/list.html?query=test#v-for-with-a-range');
    expect(wrapper.text()).toContain('https:');
    expect(wrapper.text()).toContain('www.vuejs.org');
    expect(wrapper.text()).toContain('/guide/essentials/list.html');
    expect(wrapper.text()).toContain('?query=test');
  });
});