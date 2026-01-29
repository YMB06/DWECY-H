<template>
  <div class="step-indicator">
    <div 
      v-for="step in steps" 
      :key="step.number"
      class="step"
      :class="{
        'active': step.number === currentStep,
        'completed': isStepCompleted(step.number),
        'pending': step.number > currentStep && !isStepCompleted(step.number)
      }"
    >
      <div class="step-circle">
        <span v-if="isStepCompleted(step.number)">✓</span>
        <span v-else>{{ step.number }}</span>
      </div>
      <div class="step-label">{{ step.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWizardNavigation } from '@/composables/useWizardNavigation'

const { currentStep, isStepCompleted } = useWizardNavigation()

const steps = [
  { number: 1, label: 'Facturación' },
  { number: 2, label: 'Envío' },
  { number: 3, label: 'Pago' },
  { number: 4, label: 'Resumen' }
]
</script>

<style scoped>
.step-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

.step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 25px;
  left: 60%;
  width: 80%;
  height: 3px;
  background: linear-gradient(90deg, #e0e0e0 0%, #f5f5f5 100%);
  z-index: 0;
  border-radius: 2px;
}

.step.completed:not(:last-child)::after {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

.step-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  background: #f0f0f0;
  color: #999;
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 3px solid transparent;
}

.step.active .step-circle {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  transform: scale(1.15);
  border-color: white;
}

.step.completed .step-circle {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.step.pending .step-circle {
  background: #fafafa;
  color: #ccc;
}

.step-label {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #999;
  transition: all 0.3s;
}

.step.active .step-label {
  color: #667eea;
  font-weight: 700;
}

.step.completed .step-label {
  color: #764ba2;
}

@media (max-width: 768px) {
  .step-label {
    font-size: 0.7rem;
  }
  
  .step-circle {
    width: 40px;
    height: 40px;
    font-size: 0.9rem;
  }
}
</style>
