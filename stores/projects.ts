import type { NewTask, Project } from '@/types'
import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('ProjectsPinia', () => {
  const { createProject } = useProjects()

  const projectsTitles = ref<string[]>([])
  const projects = ref<Project[]>([])
  const newTask = ref<NewTask | null>(null)
  const refreshedCount = ref(0)

  const addProjectTitle = async (name: string, isNew = false) => {
    const title = convertHashToPath(name)
    projectsTitles.value.push(title)
    if (isNew) await createProject(title)
  }

  const addProject = (project: Project, isRefresh?: boolean) => {
    const _id = projects.value.findIndex((p) => p.id === project.id)
    if (_id === -1) {
      projects.value.push(project)
      addProjectTitle(project.title)
    }
    if (isRefresh && _id !== -1) {
      projects.value[_id] = project
      refreshedCount.value++
    }
  }

  const getProject = (title: string): Project | undefined => {
    return projects.value.find((p) => p.title === title.replaceAll(' ', '—'))
  }
  const getProjectId = (title: string) => {
    return projects.value.findIndex((p) => p.title === title.replaceAll(' ', '—'))
  }

  const getAdminByName = (title: string) => {
    const project = getProject(title)
    return project ? project.adminId : ''
  }

  const removeProjects = () => {
    projectsTitles.value = []
    projects.value = []
    newTask.value = null
  }

  const convertHashToPath = (hash: string) => '/' + hash.replace('#', '').trim().replaceAll(' ', '—')

  return {
    projectsTitles,
    refreshedCount,
    projects,
    newTask,
    getProject,
    addProject,
    getProjectId,
    removeProjects,
    getAdminByName,
    addProjectTitle,
    convertHashToPath,
  }
})
