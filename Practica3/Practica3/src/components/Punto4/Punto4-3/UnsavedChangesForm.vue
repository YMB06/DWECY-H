<template>
    <div>
        <h2>Formulario con Protección de Cambios</h2>
        <textarea v-model="editedContent" placeholder="Escribe algo aquí..."></textarea>
        <br>
        <button @click="saveChanges">Guardar</button>
        <p v-if="hasUnsavedChanges" class="unsaved-warning">Tienes cambios sin guardar.</p>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLeaveConfirmation } from '@/composables/useLeaveConfirmation';

const editedContent = ref('');
const originalContent = ref('');

const hasUnsavedChanges = computed(() => {
    return editedContent.value !== originalContent.value;
});

useLeaveConfirmation(hasUnsavedChanges);

function saveChanges() {
    originalContent.value = editedContent.value;
}
</script>

<style scoped>
.unsaved-warning {
    color: red;
    font-weight: bold;
}

textarea {
    width: 100%;
    height: 200px;
    margin: 10px 0;
}

button {
    padding: 10px 20px;
    margin: 10px 0;
}
</style>