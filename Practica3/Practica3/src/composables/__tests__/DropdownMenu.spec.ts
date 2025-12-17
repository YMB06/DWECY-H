import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DropdownMenu from '../../components/Punto5/Punto5-1/DropdownMenu.vue';

describe('DropdownMenu', () => {
  it('cierra el menú al hacer clic fuera', async () => {
    const wrapper = mount(DropdownMenu);
    
    await wrapper.find('.dropdown-btn').trigger('click');
    expect(wrapper.find('.dropdown-menu').exists()).toBe(true);
    
    document.body.dispatchEvent(new Event('click'));
    await wrapper.vm.$nextTick();
    
    expect(wrapper.find('.dropdown-menu').exists()).toBe(false);
  });

  it('mantiene el menú abierto al hacer clic dentro', async () => {
    const wrapper = mount(DropdownMenu);
    
    await wrapper.find('.dropdown-btn').trigger('click');
    expect(wrapper.find('.dropdown-menu').exists()).toBe(true);
    
    await wrapper.find('.menu-item').trigger('click');
    
    expect(wrapper.find('.dropdown-menu').exists()).toBe(true);
  });
});