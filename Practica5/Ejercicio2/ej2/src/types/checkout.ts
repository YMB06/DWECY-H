export interface BillingData {
  fullName: string
  nif: string
  email: string
  phone: string
  address: string
  postalCode: string
  city: string
  province: string
  country: string
}

export interface ShippingData {
  sameAsBilling: boolean
  recipientName: string
  shippingAddress: string
  postalCode: string
  city: string
  province: string
  country: string
  contactPhone: string
  deliveryInstructions: string
}
