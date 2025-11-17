import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import UnsavedChangesForm from '../../../Punto4/Punto4-3/UnsavedChangesForm.vue'

describe('UnsavedChangesForm', () => {
  let addEventSpy: ReturnType<typeof vi.spyOn>
  let removeEventSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    addEventSpy = vi.spyOn(window, 'addEventListener')
    removeEventSpy = vi.spyOn(window, 'removeEventListener')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('estado inicial limpio - no añade event listener', async () => {
    const wrapper = mount(UnsavedChangesForm)
    
    await nextTick()
    
    // Verificar que no se añadió el event listener inicialmente
    expect(addEventSpy).not.toHaveBeenCalledWith('beforeunload', expect.any(Function))
  })

  it('transición a sucio - añade event listener', async () => {
    const wrapper = mount(UnsavedChangesForm)
    
    // Cambiar el contenido del textarea para activar el estado "sucio"
    await wrapper.find('textarea').setValue('contenido modificado')
    await nextTick()
    
    // Verificar que se añadió el event listener
    expect(addEventSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function))
  })

  it('transición de vuelta a limpio - elimina event listener', async () => {
    const wrapper = mount(UnsavedChangesForm)
    
    // Cambiar a estado sucio
    await wrapper.find('textarea').setValue('contenido modificado')
    await nextTick()
    
    // Guardar cambios para volver al estado limpio
    await wrapper.find('button').trigger('click')
    await nextTick()
    
    // Verificar que se eliminó el event listener
    expect(removeEventSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function))
  })

  it('muestra advertencia cuando hay cambios sin guardar', async () => {
    const wrapper = mount(UnsavedChangesForm)
    
    // Cambiar el contenido
    await wrapper.find('textarea').setValue('contenido modificado')
    await nextTick()
    
    // Verificar que se muestra la advertencia
    expect(wrapper.find('.unsaved-warning').exists()).toBe(true)
    expect(wrapper.find('.unsaved-warning').text()).toBe('Tienes cambios sin guardar.')
  })

  it('oculta advertencia después de guardar', async () => {
    const wrapper = mount(UnsavedChangesForm)
    
    // Cambiar contenido y guardar
    await wrapper.find('textarea').setValue('contenido modificado')
    await wrapper.find('button').trigger('click')
    await nextTick()
    
    // Verificar que no se muestra la advertencia
    expect(wrapper.find('.unsaved-warning').exists()).toBe(false)
  })
})