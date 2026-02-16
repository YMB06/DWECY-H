<template>
  <div class="checkbox-group">
    <h3 v-if="groupLabel">{{ groupLabel }} <span v-if="required" class="required">*</span></h3>
    <div class="checkbox-options">
      <div v-for="option in options" :key="option.id" class="checkbox-item">
        <input
          :id="`${groupId}-${option.id}`"
          type="checkbox"
          :value="option.id"
          :checked="modelValue.includes(option.id)"
          :aria-describedby="hasError ? `${groupId}-error` : undefined"
          @change="handleChange"
        />
        <label :for="`${groupId}-${option.id}`">{{ option.label }}</label>
      </div>
    </div>
    <div v-if="hasError" :id="`${groupId}-error`" class="error-message" role="alert">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface CheckboxOption {
  id: string
  label: string
}

interface Props {
  groupId: string
  groupLabel?: string
  options: CheckboxOption[]
  modelValue: string[]
  required?: boolean
  hasError?: boolean
  errorMessage?: string
}

interface Emits {
  (e: 'update:modelValue', value: string[]): void
  (e: 'change', value: string[]): void
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  hasError: false,
  errorMessage: ''
})

const emit = defineEmits<Emits>()

const handleChange = (event: Event): void => {
  const target = event.target as HTMLInputElement
  const value = target.value
  let newValue: string[]

  if (target.checked) {
    newValue = [...props.modelValue, value]
  } else {
    newValue = props.modelValue.filter(item => item !== value)
  }

  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>