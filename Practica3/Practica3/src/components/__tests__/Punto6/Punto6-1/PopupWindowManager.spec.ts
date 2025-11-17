import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PopupWindowManager from '../../../Punto6/Punto6-1/PopupWindowManager.vue'

describe('PopupWindowManager', () => {
  let windowOpenSpy: ReturnType<typeof vi.spyOn>
  let mockWindow: {
    closed: boolean
    close: ReturnType<typeof vi.fn>
    document: {
      write: ReturnType<typeof vi.fn>
    }
  }

  beforeEach(() => {
    // Crear mock de ventana
    mockWindow = {
      closed: false,
      close: vi.fn(),
      document: {
        write: vi.fn()
      }
    }
    
    // Espiar window.open
    windowOpenSpy = vi.spyOn(window, 'open')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('abre ventana popup correctamente', async () => {
    // Configurar mock para devolver ventana exitosa
    windowOpenSpy.mockReturnValue(mockWindow)
    
    const wrapper = mount(PopupWindowManager)
    
    // Simular clic en botón abrir
    await wrapper.find('button').trigger('click')
    
    // Verificar que window.open fue llamado con parámetros correctos
    expect(windowOpenSpy).toHaveBeenCalledWith(
      'about:blank',
      '_blank',
      'width=600,height=400,scrollbars=yes,resizable=yes'
    )
    
    // Verificar que se escribió contenido en la ventana
    expect(mockWindow.document.write).toHaveBeenCalled()
  })

  it('cierra ventana popup correctamente', async () => {
    // Configurar mock para devolver ventana exitosa
    windowOpenSpy.mockReturnValue(mockWindow)
    
    const wrapper = mount(PopupWindowManager)
    
    // Abrir ventana primero
    await wrapper.find('button').trigger('click')
    
    // Simular clic en botón cerrar
    await wrapper.findAll('button')[1].trigger('click')
    
    // Verificar que el método close fue llamado
    expect(mockWindow.close).toHaveBeenCalled()
  })

  it('maneja popup bloqueado correctamente', async () => {
    // Configurar mock para devolver null (popup bloqueado)
    windowOpenSpy.mockReturnValue(null)
    
    // Espiar alert
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    
    const wrapper = mount(PopupWindowManager)
    
    // Simular clic en botón abrir
    await wrapper.find('button').trigger('click')
    
    // Verificar que se mostró alerta de popup bloqueado
    expect(alertSpy).toHaveBeenCalledWith(
      'Popup bloqueado. Por favor, permite popups para este sitio.'
    )
    
    alertSpy.mockRestore()
  })

  it('maneja ventana cerrada al intentar cerrar', async () => {
    // Configurar mock con ventana cerrada
    const closedWindow = { ...mockWindow, closed: true }
    windowOpenSpy.mockReturnValue(closedWindow)
    
    const wrapper = mount(PopupWindowManager)
    
    // Abrir ventana
    await wrapper.find('button').trigger('click')
    
    // Simular clic en botón cerrar (no debería fallar)
    await wrapper.findAll('button')[1].trigger('click')
    
    // Verificar que close fue llamado sin errores
    expect(closedWindow.close).toHaveBeenCalled()
  })
})