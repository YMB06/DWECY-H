<template>
  <div class="job-tracker">
    <div v-if="showForm" class="modal-overlay" @click="closeForm">
      <div class="modal-content" @click.stop>
        <JobForm
          @submit="handleSubmit"
          @cancel="closeForm"
        />
      </div>
    </div>

    <JobList
      :jobs="jobStore.jobs"
      :loading="jobStore.loading"
      :error="jobStore.error"
      @add-new="showForm = true"
      @update-status="handleUpdateStatus"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useJobStore } from '@/stores/ej1/jobStore'
import JobList from './JobList.vue'
import JobForm from './JobForm.vue'
import type { JobStatus } from '@/types/job'

const jobStore = useJobStore()
const showForm = ref(false)

onMounted(() => {
  jobStore.getJobs()
})

const handleSubmit = async (data: { empresa: string; puesto: string; estado: JobStatus }) => {
  try {
    await jobStore.addJob(data)
    showForm.value = false
  } catch (error) {
    console.error('Error creating job:', error)
  }
}

const handleUpdateStatus = async (id: number, status: string) => {
  try {
    await jobStore.updateJob(id, { estado: status as JobStatus })
  } catch (error) {
    console.error('Error updating job:', error)
  }
}

const handleDelete = async (id: number) => {
  if (confirm('¿Estás seguro de eliminar esta candidatura?')) {
    try {
      await jobStore.deleteJob(id)
    } catch (error) {
      console.error('Error deleting job:', error)
    }
  }
}

const closeForm = () => {
  showForm.value = false
}
</script>

<style scoped>
.job-tracker {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}
</style>
