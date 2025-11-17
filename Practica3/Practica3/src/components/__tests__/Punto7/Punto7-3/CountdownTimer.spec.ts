import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import CountdownTimer from '../../../Punto7/Punto7-3/CountdownTimer.vue'

describe('CountdownTimer', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders initial countdown correctly', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-11-20T10:00:00Z'))
    
    const wrapper = mount(CountdownTimer, {
      props: {
        targetDate: new Date('2025-11-21T12:30:30Z')
      }
    })

    // Esperar a que el componente se monte y actualice
    await nextTick()
    
    // De 2025-11-20T10:00:00Z a 2025-11-21T12:30:30Z = 1 día, 2 horas, 30 minutos, 30 segundos
    expect(wrapper.findAll('.number')[0].text()).toBe('01') // días
    expect(wrapper.findAll('.number')[1].text()).toBe('02') // horas  
    expect(wrapper.findAll('.number')[2].text()).toBe('30') // minutos
    expect(wrapper.findAll('.number')[3].text()).toBe('30') // segundos
  })

  it('updates countdown after one second', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-11-20T10:00:00Z'))
    
    const wrapper = mount(CountdownTimer, {
      props: {
        targetDate: new Date('2025-11-21T12:30:30Z')
      }
    })

    vi.advanceTimersByTime(1000)
    await nextTick()

    expect(wrapper.findAll('.number')[3].text()).toBe('29') // los segundos disminuyen en 1
  })

  it('shows finished message when countdown ends', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-11-20T10:00:00Z'))
    
    const wrapper = mount(CountdownTimer, {
      props: {
        targetDate: new Date('2025-11-21T12:30:30Z')
      }
    })

    const totalTime = (1 * 24 * 60 * 60 + 2 * 60 * 60 + 30 * 60 + 30) * 1000
    vi.advanceTimersByTime(totalTime + 1000)
    await nextTick()

    expect(wrapper.find('.countdown').exists()).toBe(false)
    expect(wrapper.find('.finished').text()).toBe('¡El evento ha comenzado!')
  })
})