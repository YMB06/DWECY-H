import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ReservaForm from '@/components/ReservaForm.vue'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}
vi.stubGlobal('localStorage', localStorageMock)

describe('Integration Tests', () => {
  let wrapper: any

  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(ReservaForm)
  })

  describe('Complete Valid Form Flow', () => {
    it('should complete entire form submission flow', async () => {
      // Fill personal data
      await wrapper.find('#nombreCompleto').setValue('María García López')
      await wrapper.find('#nifNie').setValue('12345678Z')
      await wrapper.find('#telefono').setValue('612345678')
      await wrapper.find('#email').setValue('maria@example.com')

      // Fill event details
      await wrapper.find('#tipoEvento').setValue('Boda')
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 15)
      await wrapper.find('#fechaEvento').setValue(futureDate.toISOString().split('T')[0])
      await wrapper.find('#horaInicio').setValue('18:00')
      await wrapper.find('#numeroAsistentes').setValue(150)

      // Fill additional services
      await wrapper.find('#serviciosCatering-vegetariano').setChecked(true)
      await wrapper.find('#serviciosCatering-barraLibre').setChecked(true)
      await wrapper.find('#presupuesto-premium').setChecked(true)
      await wrapper.find('#comentarios').setValue('Boda en jardín exterior')
      await wrapper.find('#aceptaTerminos').setChecked(true)

      await wrapper.vm.$nextTick()

      // Verify form is valid
      expect(wrapper.vm.isFormValid).toBe(true)
      expect(wrapper.find('.submit-btn').attributes('disabled')).toBeUndefined()

      // Submit form
      await wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()

      // Verify success
      expect(wrapper.find('.success-message').exists()).toBe(true)
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('reserva-form-draft')
    })
  })

  describe('Form with Errors Flow', () => {
    it('should handle form with validation errors', async () => {
      // Fill with invalid data
      await wrapper.find('#nombreCompleto').setValue('AB') // Too short
      await wrapper.find('#nifNie').setValue('12345678A') // Wrong letter
      await wrapper.find('#telefono').setValue('512345678') // Wrong prefix
      await wrapper.find('#email').setValue('invalid-email') // Invalid format

      // Trigger validation
      await wrapper.find('#nombreCompleto').trigger('blur')
      await wrapper.find('#nifNie').trigger('blur')
      await wrapper.find('#telefono').trigger('blur')
      await wrapper.find('#email').trigger('blur')

      await wrapper.vm.$nextTick()

      // Verify errors are shown
      expect(wrapper.find('#nombreCompleto-error').exists()).toBe(true)
      expect(wrapper.find('#nifNie-error').exists()).toBe(true)
      expect(wrapper.find('#telefono-error').exists()).toBe(true)
      expect(wrapper.find('#email-error').exists()).toBe(true)

      // Verify form is invalid
      expect(wrapper.vm.isFormValid).toBe(false)
      expect(wrapper.find('.submit-btn').attributes('disabled')).toBeDefined()

      // Try to submit
      await wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()

      // Verify no success message
      expect(wrapper.find('.success-message').exists()).toBe(false)
    })

    it('should clear errors when correcting fields', async () => {
      // Start with invalid data
      await wrapper.find('#nombreCompleto').setValue('AB')
      await wrapper.find('#nombreCompleto').trigger('blur')
      await wrapper.vm.$nextTick()
      expect(wrapper.find('#nombreCompleto-error').exists()).toBe(true)

      // Correct the data
      await wrapper.find('#nombreCompleto').setValue('Juan Pérez')
      await wrapper.find('#nombreCompleto').trigger('input')
      await wrapper.vm.$nextTick()
      expect(wrapper.find('#nombreCompleto-error').exists()).toBe(false)
    })
  })

  describe('LocalStorage Persistence', () => {
    it('should save form data to localStorage', async () => {
      await wrapper.find('#nombreCompleto').setValue('Test User')
      await wrapper.find('#email').setValue('test@example.com')

      // Wait for watcher
      await new Promise(resolve => setTimeout(resolve, 100))

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'reserva-form-draft',
        expect.stringContaining('Test User')
      )
    })

    it('should load draft from localStorage on mount', () => {
      const mockDraft = {
        nombreCompleto: 'Saved User',
        email: 'saved@example.com',
        nifNie: '',
        telefono: '',
        tipoEvento: '',
        fechaEvento: '',
        horaInicio: '',
        numeroAsistentes: 50,
        serviciosCatering: [],
        presupuesto: '',
        comentarios: '',
        aceptaTerminos: false
      }

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockDraft))

      const newWrapper = mount(ReservaForm)
      expect(newWrapper.vm.formData.nombreCompleto).toBe('Saved User')
      expect(newWrapper.vm.formData.email).toBe('saved@example.com')
    })

    it('should clear draft on form reset', async () => {
      await wrapper.find('#nombreCompleto').setValue('Test')
      await wrapper.find('.reset-btn').trigger('click')

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('reserva-form-draft')
      expect(wrapper.vm.formData.nombreCompleto).toBe('')
    })
  })

  describe('Number and Range Synchronization', () => {
    it('should sync number input with range input', async () => {
      const numberInput = wrapper.find('#numeroAsistentes')
      const rangeInput = wrapper.find('#numeroAsistentesRange')

      await numberInput.setValue(200)
      expect(wrapper.vm.formData.numeroAsistentes).toBe(200)

      await rangeInput.setValue(300)
      expect(wrapper.vm.formData.numeroAsistentes).toBe(300)
    })

    it('should validate number range correctly', async () => {
      await wrapper.find('#numeroAsistentes').setValue(5) // Too low
      await wrapper.find('#numeroAsistentes').trigger('blur')
      await wrapper.vm.$nextTick()

      expect(wrapper.find('#numeroAsistentes-error').exists()).toBe(true)
      expect(wrapper.find('#numeroAsistentes-error').text()).toContain('entre 10 y 500')
    })
  })

  describe('Real-time Validation', () => {
    it('should show validation icons in real-time', async () => {
      const input = wrapper.find('#nombreCompleto')
      
      await input.setValue('Juan Pérez')
      await wrapper.vm.$nextTick()
      
      const validationIcon = wrapper.find('.validation-icon')
      expect(validationIcon.exists()).toBe(true)
      expect(validationIcon.text()).toBe('✓')
    })

    it('should update progress indicator in real-time', async () => {
      const progressBefore = wrapper.find('.progress-percentage').text()
      
      await wrapper.find('#nombreCompleto').setValue('Juan Pérez')
      await wrapper.find('#email').setValue('juan@example.com')
      await wrapper.vm.$nextTick()
      
      const progressAfter = wrapper.find('.progress-percentage').text()
      expect(progressAfter).not.toBe(progressBefore)
    })

    it('should update reservation summary in real-time', async () => {
      await wrapper.find('#nombreCompleto').setValue('Juan Pérez')
      await wrapper.find('#tipoEvento').setValue('Boda')
      await wrapper.vm.$nextTick()

      const summary = wrapper.find('.reservation-summary')
      expect(summary.exists()).toBe(true)
      expect(summary.text()).toContain('Juan Pérez')
      expect(summary.text()).toContain('Boda')
    })
  })

  describe('Theme Toggle', () => {
    it('should toggle theme and save to localStorage', async () => {
      const themeToggle = wrapper.find('.theme-toggle')
      
      await themeToggle.trigger('click')
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'reserva-form-theme',
        expect.any(String)
      )
    })
  })

  describe('Accessibility Features', () => {
    it('should have proper ARIA attributes', () => {
      const inputs = wrapper.findAll('input[required]')
      inputs.forEach((input: any) => {
        expect(input.attributes('aria-describedby')).toBeDefined()
      })
    })

    it('should announce errors with role="alert"', async () => {
      await wrapper.find('#nombreCompleto').setValue('AB')
      await wrapper.find('#nombreCompleto').trigger('blur')
      await wrapper.vm.$nextTick()

      const errorMessage = wrapper.find('#nombreCompleto-error')
      expect(errorMessage.attributes('role')).toBe('alert')
    })

    it('should have proper fieldset structure', () => {
      const fieldsets = wrapper.findAll('fieldset')
      expect(fieldsets.length).toBeGreaterThan(0)
      
      fieldsets.forEach((fieldset: any) => {
        expect(fieldset.find('legend').exists()).toBe(true)
      })
    })
  })
})