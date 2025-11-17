import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ProximityDetector from '../../../Punto3/Punto3-3/ProximityDetector.vue'

describe('ProximityDetector', () => {
  let successCallback: PositionCallback | null = null
  let errorCallback: PositionErrorCallback | null = null

  beforeEach(() => {
    // Mockear navigator.geolocation
    Object.defineProperty(navigator, 'geolocation', {
      value: {
        watchPosition: vi.fn().mockImplementation((success, error) => {
          successCallback = success
          errorCallback = error
          return 1 // Devuelve un watchId falso
        }),
        clearWatch: vi.fn()
      },
      configurable: true
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    successCallback = null
    errorCallback = null
  })

  it('muestra amigos cercanos cuando están dentro del radio', async () => {
    const wrapper = mount(ProximityDetector)
    
    // Simular posición muy cerca de Ana (40.4169, -3.7035)
    const mockPosition: GeolocationPosition = {
      coords: {
        latitude: 40.4170, // Muy cerca de Ana
        longitude: -3.7036,
        accuracy: 10,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
      },
      timestamp: Date.now()
    }
    
    // Llamar al callback de éxito manualmente
    if (successCallback) {
      successCallback(mockPosition)
    }
    
    await nextTick()
    
    // Verificar que Ana aparece en la lista
    expect(wrapper.text()).toContain('Ana')
    expect(wrapper.text()).toContain('Luis') // También está cerca
    
    // Verificar que Carlos (lejano) no aparece
    expect(wrapper.text()).not.toContain('Carlos')
  })

  it('muestra mensaje cuando no hay amigos cercanos', async () => {
    const wrapper = mount(ProximityDetector)
    
    // Simular posición muy lejos de todos los amigos
    const mockPosition: GeolocationPosition = {
      coords: {
        latitude: 0, // Muy lejos de Madrid
        longitude: 0,
        accuracy: 10,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
      },
      timestamp: Date.now()
    }
    
    // Llamar al callback de éxito manualmente
    if (successCallback) {
      successCallback(mockPosition)
    }
    
    await nextTick()
    
    // Verificar que se muestra el mensaje de "nadie cerca"
    expect(wrapper.text()).toContain('Nadie cerca por ahora. ¡Sigue moviéndote!')
    
    // Verificar que no aparece ningún nombre de amigo
    expect(wrapper.text()).not.toContain('Ana')
    expect(wrapper.text()).not.toContain('Luis')
    expect(wrapper.text()).not.toContain('Carlos')
  })

  it('maneja errores de geolocalización correctamente', async () => {
    const wrapper = mount(ProximityDetector)
    
    // Simular error de geolocalización
    const mockError: GeolocationPositionError = {
      code: 1,
      message: 'User denied geolocation',
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3
    }
    
    // Llamar al callback de error manualmente
    if (errorCallback) {
      errorCallback(mockError)
    }
    
    await nextTick()
    
    // Verificar que se muestra el error
    expect(wrapper.text()).toContain('Error de geolocalización: User denied geolocation')
  })

  it('limpia el watchPosition al desmontar el componente', () => {
    const clearWatchSpy = vi.spyOn(navigator.geolocation, 'clearWatch')
    
    const wrapper = mount(ProximityDetector)
    
    // Desmontar el componente
    wrapper.unmount()
    
    // Verificar que se llamó clearWatch
    expect(clearWatchSpy).toHaveBeenCalledWith(1)
  })
})