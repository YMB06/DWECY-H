import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SmartRedirector from '../../../Punto2/Punto2-3/SmartRedirector.vue'

describe('SmartRedirector', () => {
  const originalLocation = window.location
  let userAgentSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mock para location
    delete (window as any).location
    window.location = { 
      ...originalLocation, 
      assign: vi.fn(), 
      href: '',
      protocol: 'https:',
      hostname: 'localhost'
    }
    
    // Mock para navigator.userAgent
    userAgentSpy = vi.spyOn(navigator, 'userAgent', 'get')
  })

  afterEach(() => {
    vi.restoreAllMocks()
    window.location = originalLocation
  })

  it('redirige a HTTPS cuando está en HTTP', () => {
    // Mockear protocolo HTTP y hostname diferente de localhost
    Object.defineProperty(window.location, 'protocol', { value: 'http:', writable: true })
    Object.defineProperty(window.location, 'hostname', { value: 'mi-sitio.com', writable: true })
    Object.defineProperty(window.location, 'href', { value: 'http://mi-sitio.com/test', writable: true })

    mount(SmartRedirector)

    // Verificar que se redirigió a HTTPS
    expect(window.location.href).toBe('https://mi-sitio.com/test')
  })

  it('redirige a página de Firefox cuando detecta Firefox', () => {
    // Mockear userAgent de Firefox
    userAgentSpy.mockReturnValue('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0')
    
    const wrapper = mount(SmartRedirector)
    
    // Simular clic en botón de seleccionar navegador
    wrapper.find('button').trigger('click')
    
    // Verificar que se redirigió a la página de Firefox
    expect(window.location.href).toBe('firefox.html')
  })

  it('redirige a página de Chrome cuando detecta Chrome', () => {
    // Mockear userAgent de Chrome
    userAgentSpy.mockReturnValue('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36')
    
    const wrapper = mount(SmartRedirector)
    
    // Simular clic en botón de seleccionar navegador
    wrapper.find('button').trigger('click')
    
    // Verificar que se redirigió a la página de Chrome
    expect(window.location.href).toBe('chrome.html')
  })

  it('redirige a página de otros navegadores cuando no es Chrome ni Firefox', () => {
    // Mockear userAgent de Safari
    userAgentSpy.mockReturnValue('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15')
    
    const wrapper = mount(SmartRedirector)
    
    // Simular clic en botón de seleccionar navegador
    wrapper.find('button').trigger('click')
    
    // Verificar que se redirigió a la página de otros navegadores
    expect(window.location.href).toBe('otros.html')
  })

  it('no redirige cuando está en localhost con HTTPS', () => {
    // Configurar localhost con HTTPS
    Object.defineProperty(window.location, 'protocol', { value: 'https:', writable: true })
    Object.defineProperty(window.location, 'hostname', { value: 'localhost', writable: true })
    
    // Mockear userAgent de Safari (navegador no contemplado para redirección automática)
    userAgentSpy.mockReturnValue('Safari/5.0')
    
    const initialHref = window.location.href
    
    mount(SmartRedirector)
    
    // Verificar que no hubo redirección
    expect(window.location.href).toBe(initialHref)
    expect(window.location.assign).not.toHaveBeenCalled()
  })

  it('redirige con timer después de 5 segundos', () => {
    vi.useFakeTimers()
    
    // Mockear userAgent de Chrome
    userAgentSpy.mockReturnValue('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36')
    
    const wrapper = mount(SmartRedirector)
    
    // Simular clic en botón de redirección con timer
    wrapper.findAll('button')[1].trigger('click')
    
    // Avanzar tiempo 5 segundos
    vi.advanceTimersByTime(5000)
    
    // Verificar que se redirigió después del timer
    expect(window.location.href).toBe('chrome.html')
    
    vi.useRealTimers()
  })
})