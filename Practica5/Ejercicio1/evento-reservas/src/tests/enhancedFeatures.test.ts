import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ReservaForm from '@/components/ReservaForm.vue'
import ReservationSummary from '@/components/ReservationSummary.vue'
import ProgressIndicator from '@/components/ProgressIndicator.vue'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
vi.stubGlobal('localStorage', localStorageMock)

describe('Enhanced Features', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('ReservationSummary', () => {
    it('should show summary when form has valid data', () => {
      const formData = {
        nombreCompleto: 'Juan Pérez',
        nifNie: '12345678Z',
        telefono: '612345678',
        email: 'juan@example.com',
        tipoEvento: 'Boda',
        fechaEvento: '2024-12-25',
        horaInicio: '10:00',
        numeroAsistentes: 100,
        serviciosCatering: ['vegetariano'],
        presupuesto: 'economico',
        comentarios: 'Comentario de prueba',
        aceptaTerminos: true
      }

      const wrapper = mount(ReservationSummary, {
        props: { formData }
      })

      expect(wrapper.find('h2').text()).toBe('Resumen de Reserva')
      expect(wrapper.text()).toContain('Juan Pérez')
      expect(wrapper.text()).toContain('Boda')
      expect(wrapper.text()).toContain('Menú vegetariano')
    })

    it('should not show summary when no valid data', () => {
      const formData = {
        nombreCompleto: '',
        nifNie: '',
        telefono: '',
        email: '',
        tipoEvento: '',
        fechaEvento: '',
        horaInicio: '',
        numeroAsistentes: 50,
        serviciosCatering: [],
        presupuesto: '',
        comentarios: '',
        aceptaTerminos: false
      }

      const wrapper = mount(ReservationSummary, {
        props: { formData }
      })

      expect(wrapper.find('.reservation-summary').exists()).toBe(false)
    })
  })

  describe('ProgressIndicator', () => {
    it('should calculate progress correctly', () => {
      const formData = {
        nombreCompleto: 'Juan Pérez',
        nifNie: '12345678Z',
        telefono: '612345678',
        email: 'juan@example.com',
        tipoEvento: 'Boda',
        fechaEvento: '2024-12-25',
        horaInicio: '10:00',
        numeroAsistentes: 100,
        serviciosCatering: ['vegetariano'],
        presupuesto: 'economico',
        comentarios: '',
        aceptaTerminos: true
      }

      const wrapper = mount(ProgressIndicator, {
        props: { formData, hasErrors: false }
      })

      expect(wrapper.find('.progress-percentage').text()).toContain('%')
      expect(wrapper.find('.completed-fields').text()).toContain('de 12 campos')
    })

    it('should show reduced progress when has errors', () => {
      const formData = {
        nombreCompleto: 'Juan Pérez',
        nifNie: '',
        telefono: '',
        email: '',
        tipoEvento: '',
        fechaEvento: '',
        horaInicio: '',
        numeroAsistentes: 50,
        serviciosCatering: [],
        presupuesto: '',
        comentarios: '',
        aceptaTerminos: false
      }

      const wrapper = mount(ProgressIndicator, {
        props: { formData, hasErrors: true }
      })

      const progressText = wrapper.find('.progress-percentage').text()
      const progressValue = parseInt(progressText.replace('%', ''))
      expect(progressValue).toBeLessThan(20) // Should be low due to errors
    })
  })

  describe('Enhanced ReservaForm', () => {
    let wrapper: any

    beforeEach(() => {
      wrapper = mount(ReservaForm)
    })

    it('should render theme toggle button', () => {
      const themeToggle = wrapper.find('.theme-toggle')
      expect(themeToggle.exists()).toBe(true)
      expect(themeToggle.attributes('aria-label')).toContain('modo')
    })

    it('should render progress indicator', () => {
      const progressIndicator = wrapper.findComponent(ProgressIndicator)
      expect(progressIndicator.exists()).toBe(true)
    })

    it('should render reservation summary', () => {
      const summary = wrapper.findComponent(ReservationSummary)
      expect(summary.exists()).toBe(true)
    })

    it('should save draft to localStorage on form changes', async () => {
      await wrapper.find('#nombreCompleto').setValue('Juan Pérez')
      
      // Wait for watcher to trigger
      await new Promise(resolve => setTimeout(resolve, 100))
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'reserva-form-draft',
        expect.stringContaining('Juan Pérez')
      )
    })

    it('should clear draft on successful submission', async () => {
      // Fill all required fields
      await wrapper.find('#nombreCompleto').setValue('Juan Pérez')
      await wrapper.find('#nifNie').setValue('12345678Z')
      await wrapper.find('#telefono').setValue('612345678')
      await wrapper.find('#email').setValue('juan@example.com')
      await wrapper.find('#tipoEvento').setValue('Boda')
      
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 10)
      await wrapper.find('#fechaEvento').setValue(futureDate.toISOString().split('T')[0])
      await wrapper.find('#horaInicio').setValue('10:00')
      
      await wrapper.find('#serviciosCatering-vegetariano').setChecked(true)
      await wrapper.find('#presupuesto-economico').setChecked(true)
      await wrapper.find('#aceptaTerminos').setChecked(true)

      await wrapper.find('form').trigger('submit')
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('reserva-form-draft')
    })

    it('should clear draft on form reset', async () => {
      await wrapper.find('.reset-btn').trigger('click')
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('reserva-form-draft')
    })

    it('should show character count for comments', async () => {
      await wrapper.find('#comentarios').setValue('Test comment')
      
      await wrapper.vm.$nextTick()
      const charCount = wrapper.find('.character-count')
      expect(charCount.text()).toContain('/500')
    })

    it('should toggle theme on button click', async () => {
      const themeToggle = wrapper.find('.theme-toggle')
      const initialIcon = themeToggle.text()
      
      await themeToggle.trigger('click')
      await wrapper.vm.$nextTick()
      
      const newIcon = themeToggle.text()
      expect(newIcon).not.toBe(initialIcon)
    })
  })
})