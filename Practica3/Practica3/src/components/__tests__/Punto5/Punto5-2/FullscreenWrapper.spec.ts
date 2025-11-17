import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import FullscreenWrapper from '../../../Punto5/Punto5-2/FullscreenWrapper.vue'

describe('FullscreenWrapper', () => {
  let exitFullscreenSpy: ReturnType<typeof vi.spyOn>
  let requestFullscreenSpy: ReturnType<typeof vi.spyOn>
  let fullscreenElementSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Crear las propiedades que no existen en JSDOM
    Object.defineProperty(document, 'exitFullscreen', {
      value: vi.fn().mockResolvedValue(undefined),
      writable: true
    })
    
    Object.defineProperty(Element.prototype, 'requestFullscreen', {
      value: vi.fn().mockResolvedValue(undefined),
      writable: true
    })
    
    Object.defineProperty(document, 'fullscreenElement', {
      value: null,
      writable: true,
      configurable: true
    })
    
    // Ahora crear los spies
    exitFullscreenSpy = vi.spyOn(document, 'exitFullscreen')
    requestFullscreenSpy = vi.spyOn(Element.prototype, 'requestFullscreen')
    fullscreenElementSpy = vi.spyOn(document, 'fullscreenElement', 'get')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('entra en pantalla completa correctamente', async () => {
    // Mockear fullscreenElement para devolver null (no en pantalla completa)
    fullscreenElementSpy.mockReturnValue(null)
    
    const wrapper = mount(FullscreenWrapper)
    
    // Simular clic en el botón
    await wrapper.find('button').trigger('click')
    
    // Verificar que requestFullscreen fue llamado en el elemento correcto
    expect(requestFullscreenSpy).toHaveBeenCalled()
    expect(wrapper.find('button').text()).toBe('Entrar a Pantalla Completa')
  })

  it('sale de pantalla completa correctamente', async () => {
    const wrapper = mount(FullscreenWrapper)
    const element = wrapper.element
    
    // Mockear fullscreenElement para devolver el elemento del componente
    fullscreenElementSpy.mockReturnValue(element)
    
    // Simular clic en el botón
    await wrapper.find('button').trigger('click')
    
    // Verificar que exitFullscreen fue llamado
    expect(exitFullscreenSpy).toHaveBeenCalled()
  })

  it('reacciona al evento fullscreenchange correctamente', async () => {
    const wrapper = mount(FullscreenWrapper)
    const element = wrapper.element
    
    // Inicialmente no en pantalla completa
    fullscreenElementSpy.mockReturnValue(null)
    expect(wrapper.find('button').text()).toBe('Entrar a Pantalla Completa')
    
    // Simular entrada a pantalla completa
    fullscreenElementSpy.mockReturnValue(element)
    
    // Disparar evento fullscreenchange
    const event = new Event('fullscreenchange')
    document.dispatchEvent(event)
    
    await nextTick()
    
    // Verificar que el botón cambió de texto
    expect(wrapper.find('button').text()).toBe('Salir de Pantalla Completa')
    
    // Simular salida de pantalla completa
    fullscreenElementSpy.mockReturnValue(null)
    
    // Disparar evento fullscreenchange nuevamente
    document.dispatchEvent(event)
    
    await nextTick()
    
    // Verificar que el botón volvió al texto original
    expect(wrapper.find('button').text()).toBe('Entrar a Pantalla Completa')
  })

  it('maneja errores de fullscreen correctamente', async () => {
    // Mockear requestFullscreen para que falle
    requestFullscreenSpy.mockRejectedValue(new Error('Fullscreen no permitido'))
    fullscreenElementSpy.mockReturnValue(null)
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    const wrapper = mount(FullscreenWrapper)
    
    // Simular clic en el botón
    await wrapper.find('button').trigger('click')
    
    // Esperar a que se resuelva la promesa
    await nextTick()
    
    // Verificar que se manejó el error
    expect(consoleSpy).toHaveBeenCalledWith('error de pantalla completa:', expect.any(Error))
    
    consoleSpy.mockRestore()
  })
})