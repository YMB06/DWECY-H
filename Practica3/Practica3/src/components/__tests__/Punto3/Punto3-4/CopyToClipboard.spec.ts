import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import CopyToClipboard from '../../../Punto3/Punto3-4/CopyToClipboard.vue'

describe('CopyToClipboard', () => {
  let mockClipboard: {
    writeText: ReturnType<typeof vi.fn>
  }

  beforeEach(() => {
    // Definir mock para el clipboard
    mockClipboard = {
      writeText: vi.fn()
    }
    
    // Asignar el mock al objeto navigator
    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      configurable: true
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('copia texto correctamente - caso de éxito', async () => {
    // Hacer que writeText devuelva una promesa resuelta
    mockClipboard.writeText.mockResolvedValue(undefined)
    
    const wrapper = mount(CopyToClipboard, {
      props: {
        textToCopy: 'texto de prueba'
      }
    })
    
    // Simular clic en el botón
    await wrapper.find('button').trigger('click')
    
    // Verificar que writeText fue llamado con el texto correcto
    expect(mockClipboard.writeText).toHaveBeenCalledWith('texto de prueba')
    
    // Esperar actualización del DOM
    await nextTick()
    
    // Verificar que se muestra el mensaje de éxito
    expect(wrapper.find('button').text()).toBe('¡Copiado!')
  })

  it('usa texto por defecto cuando no se proporciona prop', async () => {
    mockClipboard.writeText.mockResolvedValue(undefined)
    
    const wrapper = mount(CopyToClipboard)
    
    await wrapper.find('button').trigger('click')
    
    // Verificar que se usa el texto por defecto
    expect(mockClipboard.writeText).toHaveBeenCalledWith('Texto por defecto')
  })

  it('maneja errores de copia correctamente', async () => {
    // Hacer que writeText devuelva una promesa rechazada
    mockClipboard.writeText.mockRejectedValue(new Error('Copy failed'))
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    const wrapper = mount(CopyToClipboard, {
      props: {
        textToCopy: 'texto de prueba'
      }
    })
    
    // Simular clic en el botón
    await wrapper.find('button').trigger('click')
    
    // Esperar actualización del DOM
    await nextTick()
    
    // Verificar que se manejó el error
    expect(consoleSpy).toHaveBeenCalledWith('Error al copiar al portapeles: ', expect.any(Error))
    
    // El botón debería mantener el texto original
    expect(wrapper.find('button').text()).toBe('Copiar texto')
    
    consoleSpy.mockRestore()
  })

  it('el mensaje de éxito desaparece después de 2 segundos', async () => {
    vi.useFakeTimers()
    mockClipboard.writeText.mockResolvedValue(undefined)
    
    const wrapper = mount(CopyToClipboard, {
      props: {
        textToCopy: 'texto de prueba'
      }
    })
    
    // Simular clic
    await wrapper.find('button').trigger('click')
    await nextTick()
    
    // Verificar mensaje de éxito
    expect(wrapper.find('button').text()).toBe('¡Copiado!')
    
    // Avanzar tiempo 2 segundos
    vi.advanceTimersByTime(2000)
    await nextTick()
    
    // Verificar que volvió al texto original
    expect(wrapper.find('button').text()).toBe('Copiar texto')
    
    vi.useRealTimers()
  })
})