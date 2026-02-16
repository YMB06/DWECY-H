<template>
  <div class="radio-group">
    <h3 v-if="groupLabel">{{ groupLabel }} <span v-if="required" class="required">*</span></h3>
    <div class="radio-options">
      <div v-for="option in options" :key="option.id" class="radio-item">
        <input
          :id="`${groupId}-${option.id}`"
          type="radio"
          :name="groupId"
          :value="option.id"
          :checked="modelValue === option.id"
          :aria-describedby="hasError ? `${groupId}-error` : undefined"
          @change="handleChange"
        />
        <label :for="`${groupId}-${option.id}`">
          <span class="radio-label">{{ option.label }}</span>
          <span v-if="option.description" class="radio-description">{{ option.description }}</span>
        </label>
      </div>
    </div>
    <div v-if="hasError" :id="`${groupId}-error`" class="error-message" role="alert">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface RadioOption {
  id: string
  label: string
  description?: string
}

interface Props {
  groupId: string
  groupLabel?: string
  options: RadioOption[]
  modelValue: string
  required?: boolean
  hasError?: boolean
  errorMessage?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  hasError: false,
  errorMessage: ''
})

const emit = defineEmits<Emits>()

const handleChange = (event: Event): void => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('change', target.value)
}
</script>