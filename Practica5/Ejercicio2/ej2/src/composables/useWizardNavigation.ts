import { ref, computed } from 'vue'

export type WizardStep = 1 | 2 | 3 | 4

const currentStep = ref<WizardStep>(1)
const completedSteps = ref<Set<number>>(new Set())

export function useWizardNavigation() {
  const goToStep = (step: WizardStep) => {
    currentStep.value = step
  }

  const nextStep = () => {
    if (currentStep.value < 4) {
      completedSteps.value.add(currentStep.value)
      currentStep.value = (currentStep.value + 1) as WizardStep
    }
  }

  const previousStep = () => {
    if (currentStep.value > 1) {
      currentStep.value = (currentStep.value - 1) as WizardStep
    }
  }

  const isStepCompleted = (step: number) => {
    return completedSteps.value.has(step)
  }

  const canGoNext = computed(() => currentStep.value < 4)
  const canGoPrevious = computed(() => currentStep.value > 1)

  return {
    currentStep,
    completedSteps,
    goToStep,
    nextStep,
    previousStep,
    isStepCompleted,
    canGoNext,
    canGoPrevious
  }
}
