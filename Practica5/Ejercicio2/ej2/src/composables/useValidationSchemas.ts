import * as yup from 'yup'
import { validateNIF } from '@/utils/formatters'
import { validatePostalCode } from '@/services/validationService'

export const billingSchema = yup.object({
  fullName: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'Mínimo 3 caracteres')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'Solo se permiten letras'),
  nif: yup
    .string()
    .required('El NIF/CIF es obligatorio')
    .matches(/^[0-9]{8}[A-Z]$|^[A-Z][0-9]{7}[A-Z]$/, 'Formato inválido')
    .test('valid-nif', 'NIF inválido', (value) => !value || validateNIF(value)),
  email: yup
    .string()
    .required('El email es obligatorio')
    .email('Formato de email inválido'),
  phone: yup
    .string()
    .required('El teléfono es obligatorio')
    .matches(/^[6-9][0-9]{8}$/, 'Formato de teléfono español inválido'),
  address: yup.string().required('La dirección es obligatoria'),
  postalCode: yup
    .string()
    .required('El código postal es obligatorio')
    .matches(/^[0-9]{5}$/, 'Debe tener 5 dígitos')
    .test('valid-cp', 'Código postal no existe', async (value) => {
      if (!value) return false
      const result = await validatePostalCode(value)
      return result !== null
    }),
  city: yup.string().required('La ciudad es obligatoria'),
  province: yup.string().required('La provincia es obligatoria'),
  country: yup.string().required('El país es obligatorio')
})

export const shippingSchema = yup.object({
  sameAsBilling: yup.boolean(),
  recipientName: yup.string().when('sameAsBilling', {
    is: false,
    then: (schema) => schema.required('El nombre del destinatario es obligatorio').min(3, 'Mínimo 3 caracteres'),
    otherwise: (schema) => schema.notRequired()
  }),
  shippingAddress: yup.string().when('sameAsBilling', {
    is: false,
    then: (schema) => schema.required('La dirección de envío es obligatoria'),
    otherwise: (schema) => schema.notRequired()
  }),
  postalCode: yup.string().when('sameAsBilling', {
    is: false,
    then: (schema) => schema
      .required('El código postal es obligatorio')
      .matches(/^[0-9]{5}$/, 'Debe tener 5 dígitos')
      .test('valid-cp', 'Código postal no existe', async (value) => {
        if (!value) return false
        const result = await validatePostalCode(value)
        return result !== null
      }),
    otherwise: (schema) => schema.notRequired()
  }),
  city: yup.string().when('sameAsBilling', {
    is: false,
    then: (schema) => schema.required('La ciudad es obligatoria'),
    otherwise: (schema) => schema.notRequired()
  }),
  province: yup.string().when('sameAsBilling', {
    is: false,
    then: (schema) => schema.required('La provincia es obligatoria'),
    otherwise: (schema) => schema.notRequired()
  }),
  country: yup.string().when('sameAsBilling', {
    is: false,
    then: (schema) => schema.required('El país es obligatorio'),
    otherwise: (schema) => schema.notRequired()
  }),
  contactPhone: yup.string().when('sameAsBilling', {
    is: false,
    then: (schema) => schema
      .required('El teléfono de contacto es obligatorio')
      .matches(/^[6-9][0-9]{8}$/, 'Formato de teléfono español inválido'),
    otherwise: (schema) => schema.notRequired()
  }),
  deliveryInstructions: yup.string().max(200, 'Máximo 200 caracteres')
})

export const paymentSchema = yup.object({
  method: yup.string().required('Selecciona un método de pago'),
  cardNumber: yup.string().when('method', {
    is: 'card',
    then: (schema) => schema
      .required('El número de tarjeta es obligatorio')
      .test('luhn', 'Número de tarjeta inválido', (value) => {
        if (!value) return false
        const { luhnCheck } = require('@/utils/creditCard')
        return luhnCheck(value)
      }),
    otherwise: (schema) => schema.notRequired()
  }),
  cardHolder: yup.string().when('method', {
    is: 'card',
    then: (schema) => schema.required('El nombre del titular es obligatorio'),
    otherwise: (schema) => schema.notRequired()
  }),
  expiryDate: yup.string().when('method', {
    is: 'card',
    then: (schema) => schema
      .required('La fecha de expiración es obligatoria')
      .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, 'Formato MM/YY')
      .test('future-date', 'La tarjeta está expirada', (value) => {
        if (!value) return false
        const { validateExpiryDate } = require('@/utils/creditCard')
        return validateExpiryDate(value)
      }),
    otherwise: (schema) => schema.notRequired()
  }),
  cvv: yup.string().when('method', {
    is: 'card',
    then: (schema) => schema
      .required('El CVV es obligatorio')
      .test('valid-cvv', 'CVV inválido', function(value) {
        if (!value) return false
        const { cardNumber } = this.parent
        if (!cardNumber) return /^[0-9]{3,4}$/.test(value)
        
        const { validateCVV } = require('@/utils/creditCard')
        return validateCVV(value, cardNumber)
      }),
    otherwise: (schema) => schema.notRequired()
  }),
  paypalEmail: yup.string().when('method', {
    is: 'paypal',
    then: (schema) => schema
      .required('El email de PayPal es obligatorio')
      .email('Formato de email inválido'),
    otherwise: (schema) => schema.notRequired()
  }),
  transferReference: yup.string().when('method', {
    is: 'transfer',
    then: (schema) => schema.required('La referencia es obligatoria'),
    otherwise: (schema) => schema.notRequired()
  }),
  bizumPhone: yup.string().when('method', {
    is: 'bizum',
    then: (schema) => schema
      .required('El teléfono es obligatorio')
      .matches(/^[6-9][0-9]{8}$/, 'Formato de teléfono español inválido'),
    otherwise: (schema) => schema.notRequired()
  })
})

export const summarySchema = yup.object({
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'Debes aceptar los términos y condiciones'),
  acceptPrivacy: yup
    .boolean()
    .oneOf([true], 'Debes aceptar la política de privacidad'),
  acceptNewsletter: yup.boolean()
})
