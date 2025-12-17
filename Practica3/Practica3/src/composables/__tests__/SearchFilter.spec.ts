import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchFilter from '../../components/Punto7/Punto7-1/SearchFilter.vue';

describe('SearchFilter', () => {
  const testItems = [
    { id: 1, name: 'Introducción a Vue.js' },
    { id: 2, name: 'Componentes en React' },
    { id: 3, name: 'Angular para principiantes' },
    { id: 4, name: 'JavaScript moderno' }
  ];

  it('filtra elementos correctamente', async () => {
    const wrapper = mount(SearchFilter, {
      props: { items: testItems }
    });
    
    await wrapper.find('.search-field').setValue('Vue');
    
    expect(wrapper.findAll('li').length).toBe(1);
  });

  it('resalta texto coincidente con mark', async () => {
    const wrapper = mount(SearchFilter, {
      props: { items: testItems }
    });
    
    await wrapper.find('.search-field').setValue('Vue');
    
    const listItem = wrapper.find('li');
    expect(listItem.html()).toContain('Introducción a <mark>Vue</mark>.js');
  });
});