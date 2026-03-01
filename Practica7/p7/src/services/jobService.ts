import api from './api'
import type { Job, CreateJobDto, UpdateJobDto } from '@/types/job'

export const jobService = {
  async getJobs(): Promise<Job[]> {
    const response = await api.get<Job[]>('/jobs')
    return response.data
  },

  async createJob(job: CreateJobDto): Promise<Job> {
    const response = await api.post<Job>('/jobs', job)
    return response.data
  },

  async updateJob(id: number, data: UpdateJobDto): Promise<Job> {
    const response = await api.put<Job>(`/jobs/${id}`, data)
    return response.data
  },

  async deleteJob(id: number): Promise<void> {
    await api.delete(`/jobs/${id}`)
  }
}
