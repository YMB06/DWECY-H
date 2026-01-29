import { test, expect } from '@playwright/test'

test.describe('Checkout Flow E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should complete full checkout process', async ({ page }) => {
    // Step 1: Billing Information
    await expect(page.locator('h2')).toContainText('Datos de Facturación')
    
    await page.fill('input[name="fullName"]', 'Juan Pérez García')
    await page.fill('input[name="nif"]', '12345678Z')
    await page.fill('input[name="email"]', 'juan@example.com')
    await page.fill('input[name="phone"]', '612345678')
    await page.fill('input[name="address"]', 'Calle Mayor 123')
    await page.fill('input[name="postalCode"]', '28001')
    
    // Wait for postal code validation
    await expect(page.locator('.loading')).toBeVisible()
    await expect(page.locator('.loading')).toBeHidden()
    
    // Verify auto-filled city and province
    await expect(page.locator('input[name="city"]')).toHaveValue('Madrid')
    await expect(page.locator('input[name="province"]')).toHaveValue('Madrid')
    
    await page.click('.btn-next')
    
    // Step 2: Shipping Information
    await expect(page.locator('h2')).toContainText('Dirección de Envío')
    
    // Use different shipping address
    await page.uncheck('input[type="checkbox"]')
    await page.fill('input[name="recipientName"]', 'María García')
    await page.fill('input[name="shippingAddress"]', 'Avenida Principal 456')
    await page.fill('input[name="postalCode"]', '08001')
    
    // Wait for postal code validation
    await expect(page.locator('.loading')).toBeVisible()
    await expect(page.locator('.loading')).toBeHidden()
    
    await page.fill('input[name="contactPhone"]', '687654321')
    await page.fill('textarea[name="deliveryInstructions"]', 'Llamar al timbre')
    
    await page.click('.btn-next')
    
    // Step 3: Payment Method
    await expect(page.locator('h2')).toContainText('Método de Pago')
    
    // Select card payment
    await page.check('input[value="card"]')
    
    await page.fill('input[name="cardNumber"]', '4111111111111111')
    await page.fill('input[name="cardHolder"]', 'JUAN PEREZ')
    await page.fill('input[name="expiryDate"]', '12/25')
    await page.fill('input[name="cvv"]', '123')
    
    // Verify card type detection
    await expect(page.locator('.card-type')).toContainText('Visa')
    
    // Apply discount code
    await page.fill('input[type="text"]', 'BIENVENIDO10')
    await page.click('.btn-apply')
    
    // Wait for discount validation
    await expect(page.locator('.success')).toContainText('¡Código válido!')
    
    await page.click('.btn-next')
    
    // Step 4: Summary
    await expect(page.locator('h2')).toContainText('Resumen del Pedido')
    
    // Verify summary information
    await expect(page.locator('.summary-section')).toContainText('Juan Pérez García')
    await expect(page.locator('.summary-section')).toContainText('María García')
    await expect(page.locator('.summary-section')).toContainText('Tarjeta de crédito')
    await expect(page.locator('.price-row.discount')).toContainText('10%')
    
    // Accept terms and conditions
    await page.check('input[name="acceptTerms"]')
    await page.check('input[name="acceptPrivacy"]')
    
    // Confirm order
    await page.click('.btn-confirm')
    
    // Verify success
    await expect(page.locator('text=¡Pedido confirmado con éxito!')).toBeVisible()
  })

  test('should handle validation errors', async ({ page }) => {
    // Try to proceed without filling required fields
    await page.click('.btn-next')
    
    // Should show error summary
    await expect(page.locator('.error-summary')).toBeVisible()
    await expect(page.locator('.error-summary')).toContainText('Corrige los siguientes errores')
  })

  test('should save and restore draft', async ({ page }) => {
    // Fill some data
    await page.fill('input[name="fullName"]', 'Juan Pérez')
    await page.fill('input[name="email"]', 'juan@example.com')
    
    // Save draft
    await page.click('.btn-draft')
    await expect(page.locator('text=Borrador guardado correctamente')).toBeVisible()
    
    // Reload page
    await page.reload()
    
    // Should ask to restore draft
    page.on('dialog', dialog => dialog.accept())
    
    // Verify data is restored
    await expect(page.locator('input[name="fullName"]')).toHaveValue('Juan Pérez')
    await expect(page.locator('input[name="email"]')).toHaveValue('juan@example.com')
  })

  test('should validate postal code asynchronously', async ({ page }) => {
    await page.fill('input[name="postalCode"]', '28001')
    
    // Should show loading state
    await expect(page.locator('.loading')).toBeVisible()
    await expect(page.locator('.loading')).toContainText('Validando...')
    
    // Should auto-fill city and province
    await expect(page.locator('input[name="city"]')).toHaveValue('Madrid')
    await expect(page.locator('input[name="province"]')).toHaveValue('Madrid')
    
    // Loading should disappear
    await expect(page.locator('.loading')).toBeHidden()
  })

  test('should update order summary dynamically', async ({ page }) => {
    // Check initial total in sidebar
    const initialTotal = await page.locator('.order-summary .total').textContent()
    
    // Navigate to payment step (mock navigation)
    await page.evaluate(() => {
      window.localStorage.setItem('checkout-draft', JSON.stringify({
        currentStep: 3,
        billing: { postalCode: '28001' },
        shipping: { sameAsBilling: true }
      }))
    })
    await page.reload()
    
    // Apply discount
    await page.fill('input[type="text"]', 'BIENVENIDO10')
    await page.click('.btn-apply')
    
    // Wait for discount to be applied
    await expect(page.locator('.success')).toBeVisible()
    
    // Check that total has changed
    const newTotal = await page.locator('.order-summary .total').textContent()
    expect(newTotal).not.toBe(initialTotal)
  })
})