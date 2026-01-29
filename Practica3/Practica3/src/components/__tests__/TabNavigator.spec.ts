import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import TabNavigator from '../../components/Punto4/Punto4-2/TabNavigator.vue';

describe('TabNavigator', () => {
  let pushStateSpy: any;

  beforeEach(() => {
    pushStateSpy = vi.spyOn(history, 'pushState');
  });

  it('llama a pushState al cambiar a pestaña Facturación', async () => {
    const wrapper = mount(TabNavigator);
    
    await wrapper.findAll('.tab-btn')[1].trigger('click');
    
    expect(pushStateSpy).toHaveBeenCalledTimes(1);
    expect(pushStateSpy).toHaveBeenCalledWith({ tab: 'facturacion' }, '', '/settings/facturacion');
    expect(wrapper.text()).toContain('Contenido de Facturación');
  });
});