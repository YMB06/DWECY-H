import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ScrollProgressBar from '../../../Punto1/Punto1-3/ScrollProgressBar.vue'

describe('ScrollProgressBar', () => {
  let scrollHeightSpy: ReturnType<typeof vi.spyOn>
  let clientHeightSpy: ReturnType<typeof vi.spyOn>
  let scrollYSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mockear propiedades del DOM
    scrollHeightSpy = vi.spyOn(document.documentElement, 'scrollHeight', 'get')
    clientHeightSpy = vi.spyOn(document.documentElement, 'clientHeight', 'get')
    scrollYSpy = vi.spyOn(window, 'scrollY', 'get')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('muestra 0% al inicio de la página', async () => {
    // Configurar dimensiones de la página
    scrollHeightSpy.mockReturnValue(2000)
    clientHeightSpy.mockReturnValue(500)
    scrollYSpy.mockReturnValue(0)

    const wrapper = mount(ScrollProgressBar)
    
    // Disparar evento scroll
    window.dispatchEvent(new Event('scroll'))
    await nextTick()

    // Verificar que el progreso es 0%
    const progressBar = wrapper.find('.scroll-progress-bar')
    expect(progressBar.attributes('style')).toContain('width: 0%')
  })

  it('muestra 50% a mitad de la página', async () => {
    // Configurar dimensiones: scrollHeight 2000, clientHeight 500
    // Distancia total de scroll: 2000 - 500 = 1500
    // Para 50%: scrollY debe ser 750
    scrollHeightSpy.mockReturnValue(2000)
    clientHeightSpy.mockReturnValue(500)
    scrollYSpy.mockReturnValue(750)

    const wrapper = mount(ScrollProgressBar)
    
    // Disparar evento scroll
    window.dispatchEvent(new Event('scroll'))
    await nextTick()

    // Verificar que el progreso es 50%
    const progressBar = wrapper.find('.scroll-progress-bar')
    expect(progressBar.attributes('style')).toContain('width: 50%')
  })

  it('muestra 100% al final de la página', async () => {
    // Configurar dimensiones: scrollHeight 2000, clientHeight 500
    // Distancia total de scroll: 2000 - 500 = 1500
    // Para 100%: scrollY debe ser 1500
    scrollHeightSpy.mockReturnValue(2000)
    clientHeightSpy.mockReturnValue(500)
    scrollYSpy.mockReturnValue(1500)

    const wrapper = mount(ScrollProgressBar)
    
    // Disparar evento scroll
    window.dispatchEvent(new Event('scroll'))
    await nextTick()

    // Verificar que el progreso es 100%
    const progressBar = wrapper.find('.scroll-progress-bar')
    expect(progressBar.attributes('style')).toContain('width: 100%')
  })

  it('maneja valores NaN correctamente', async () => {
    // Configurar valores que podrían causar NaN
    scrollHeightSpy.mockReturnValue(500)
    clientHeightSpy.mockReturnValue(500)
    scrollYSpy.mockReturnValue(0)

    const wrapper = mount(ScrollProgressBar)
    
    // Disparar evento scroll
    window.dispatchEvent(new Event('scroll'))
    await nextTick()

    // Verificar que el progreso es 0% (no NaN)
    const progressBar = wrapper.find('.scroll-progress-bar')
    expect(progressBar.attributes('style')).toContain('width: 0%')
  })

  it('limpia el event listener al desmontar', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    
    scrollHeightSpy.mockReturnValue(2000)
    clientHeightSpy.mockReturnValue(500)
    scrollYSpy.mockReturnValue(0)

    const wrapper = mount(ScrollProgressBar)
    
    // Desmontar el componente
    wrapper.unmount()
    
    // Verificar que se eliminó el event listener
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})