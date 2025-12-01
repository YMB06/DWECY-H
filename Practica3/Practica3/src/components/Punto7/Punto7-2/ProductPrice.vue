<template>
  <div class="product-price">
    <h2>Formateador de Divisas Internacional</h2>
    
    <div class="price-examples">
      <div class="price-card">
        <h3>Precio en USD (Estados Unidos)</h3>
        <div class="price">{{ formatCurrency(price, 'en-US', 'USD') }}</div>
      </div>
      
      <div class="price-card">
        <h3>Precio en EUR (Alemania)</h3>
        <div class="price">{{ formatCurrency(price, 'de-DE', 'EUR') }}</div>
      </div>
      
      <div class="price-card">
        <h3>Precio en JPY (Japón)</h3>
        <div class="price">{{ formatCurrency(price, 'ja-JP', 'JPY') }}</div>
      </div>
      
      <div class="price-card">
        <h3>Precio en EUR (España)</h3>
        <div class="price">{{ formatCurrency(price, 'es-ES', 'EUR') }}</div>
      </div>
    </div>
    
    <div class="controls">
      <label for="price-input">Cambiar precio:</label>
      <input 
        id="price-input"
        type="number" 
        v-model.number="price" 
        step="0.01"
        class="price-input"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter';

const price = ref(12345.67);
const { formatCurrency } = useCurrencyFormatter();
</script>

<style scoped>
.product-price {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.price-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.price-card {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}

.price-card h3 {
  margin: 0 0 15px 0;
  color: var(--color-heading);
  font-size: 1rem;
}

.price {
  font-size: 1.8rem;
  font-weight: bold;
  color: #28a745;
  font-family: monospace;
}

.controls {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
}

.controls label {
  display: block;
  margin-bottom: 10px;
  color: var(--color-heading);
  font-weight: 500;
}

.price-input {
  padding: 10px 15px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-background);
  color: var(--color-text);
  font-size: 1.1rem;
  width: 200px;
}

@media (max-width: 600px) {
  .price-examples {
    grid-template-columns: 1fr;
  }
}
</style>