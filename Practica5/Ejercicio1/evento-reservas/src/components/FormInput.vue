<template>
  <div class="form-group">
    <label :for="id">{{ label }} <span v-if="required" class="required">*</span></label>
    <div class="input-wrapper">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :class="{ error: hasError, valid: isValid }"
        :aria-describedby="hasError ? `${id}-error` : undefined"
        :required="required"
        v-bind="$attrs"
        @input="handleInput"
        @blur="handleBlur"
      />
      <span v-if="showValidationIcon" class="validation-icon">
        {{ isValid ? '✓' : '✗' }}
      </span>
    </div>
    <div v-if="hasError" :id="`${id}-error`" class="error-message" role="alert">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id: string
  label: string
  type?: string
  modelValue: string
  required?: boolean
  hasError?: boolean
  errorMessage?: string
  showValidationIcon?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  (e: 'blur', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  hasError: false,
  errorMessage: '',
  showValidationIcon: true
})

const emit = defineEmits<Emits>()

const isValid = computed(() => {
  return !props.hasError && props.modelValue.trim() !== ''
})

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', target.value)
}

const handleBlur = (event: Event): void => {
  const target = event.target as HTMLInputElement
  emit('blur', target.value)
}
</script>