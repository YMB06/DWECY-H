import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Job, CreateJobDto, UpdateJobDto } from '@/types/job'
import { jobService } from '@/services/jobService'

export const useJobStore = defineStore('jobs', () => {
  const jobs = ref<Job[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getJobs = async () => {
    loading.value = true
    error.value = null
    try {
      jobs.value = await jobService.getJobs()
    } catch (e) {
      error.value = 'Error al cargar las candidaturas'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  const addJob = async (job: CreateJobDto) => {
    loading.value = true
    error.value = null
    try {
      const newJob = await jobService.createJob(job)
      jobs.value.push(newJob)
    } catch (e) {
      error.value = 'Error al crear la candidatura'
      console.error(e)
      throw e
    } finally {
      loading.value = false
    }
  }

  const updateJob = async (id: number, data: UpdateJobDto) => {
    loading.value = true
    error.value = null
    try {
      const updatedJob = await jobService.updateJob(id, data)
      const index = jobs.value.findIndex(j => j.id === id)
      if (index !== -1) {
        jobs.value[index] = updatedJob
      }
    } catch (e) {
      error.value = 'Error al actualizar la candidatura'
      console.error(e)
      throw e
    } finally {
      loading.value = false
    }
  }

  const deleteJob = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await jobService.deleteJob(id)
      jobs.value = jobs.value.filter(j => j.id !== id)
    } catch (e) {
      error.value = 'Error al eliminar la candidatura'
      console.error(e)
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    jobs,
    loading,
    error,
    getJobs,
    addJob,
    updateJob,
    deleteJob
  }
})
