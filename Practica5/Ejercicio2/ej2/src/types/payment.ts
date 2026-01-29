export type PaymentMethod = 'card' | 'paypal' | 'transfer' | 'bizum'

export interface PaymentData {
  method: PaymentMethod
  cardNumber?: string
  cardHolder?: string
  expiryDate?: string
  cvv?: string
  cardType?: string
  paypalEmail?: string
  transferReference?: string
  bizumPhone?: string
  discountCode?: string
}
