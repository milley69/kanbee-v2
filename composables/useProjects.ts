import type { Invites, Members, Project, User, UserProject } from '@/types'
import { storeToRefs } from 'pinia'

export const useProjects = () => {
  const { user, accessToken } = storeToRefs(useUser())
  // const { projects, refreshedCount } = storeToRefs(useProjectsStore())
  const { setUser } = useUser()
  const { addProject, getProject, removeProject } = useProjectsStore()
  const { $URL } = useNuxtApp()
  const { setToast } = useToast()
  const { socket } = storeToRefs(useSocket())

  const createProject = async (title: string) => {
    if (!user.value) return

    const data: UserProject = await socket.value?.emitWithAck('createProject', {
      title: title.replace('/', ''),
      user: user.value,
    })
    if (!data) return
    setUser(data.user)
    return data.project
  }

  const initProjects = async (refresh = false) => {
    if (!user.value) return
    socket.value?.emit('findAllProjects', user.value.projectsId, (res: Project[]) => {
      res.forEach((p) => {
        addProject(p, refresh)
      })
    })
  }

  const getMembers = async (title: string): Promise<Members[]> => {
    if (!user.value) return []
    const project = getProject(title)
    let users: Members[] = []
    if (project && project.membersId.length > 1) {
      const members: Members[] = await socket.value?.emitWithAck('getMembers', project.membersId)
      users = members
      return users
    }
    return [{ avatar: user.value.avatar, username: user.value.username }]
  }

  const updateProject = async (project: Project) => {
    socket.value?.emit('updateProject', project)
  }

  const inviteUser = async (email: string, title: string) => {
    const project = getProject(title)
    if (!project) return
    socket.value?.emit('sendInvite', { id: project.id, title, email })

    setToast('success', `${email} was invited to ${title}`)
  }

  const exileUser = async (project: Project, user: User) => {
    socket.value?.emit('exileUser', { project, userId: user.id })
    setToast('success', `${user.email} was expelled from ${project.title}`)
  }

  const acceptInvite = async (invite: Invites) => {
    const data: UserProject = await socket.value?.emitWithAck('accessInvite', { ...invite, email: user.value?.email })
    if (data) {
      setUser(data.user)
      addProject(data.project, true)
      setToast('success', `Welcome to ${data.project.title}`)
      socket.value?.on(`updateProject:${data.project.id}`, (data: Project) => {
        addProject(data, true)
      })
    }
  }

  const ignoreInvite = async (invite: Invites) => {
    const data: User = await socket.value?.emitWithAck('ignoreInvite', { ...invite, email: user.value?.email })
    if (data) setUser(data)
  }
  const acceptExclusion = async (title: string) => {
    const data: User = await socket.value?.emitWithAck('acceptExclusion', { title, userId: user.value?.id })
    if (data) setUser(data)
  }

  const deleteProject = async (title: string) => {
    const project = getProject(title)
    socket.value?.emit('deleteProject', project)
  }
  const leaveProject = async (title: string) => {
    const project = getProject(title)
    socket.value?.emit('leaveProject', { project, user: user.value })
    setToast('info', `Вы покинули ${title}`)
  }

  const WSProject = (_user: User) => {
    socket.value?.on(`getInvite:${_user.id}`, (user: User) => {
      if (user) setUser(user)
    })

    socket.value?.on(`exileUser:${_user.id}`, (data: UserProject) => {
      const { project, user } = data
      setUser(user)
      removeProject(project)
    })

    for (const projectId of _user.projectsId) {
      socket.value?.on(`updateProject:${projectId}`, (project: Project) => {
        addProject(project, true)
      })

      socket.value?.on(`deleteProject:${projectId}`, (project: Project) => {
        if (user.value) user.value.projectsId = user.value.projectsId.filter((p) => p !== project.id)
        removeProject(project)
        setToast('info', `Проект ${project.title} был удален`)
      })
    }
  }

  return {
    exileUser,
    WSProject,
    getMembers,
    inviteUser,
    initProjects,
    acceptInvite,
    ignoreInvite,
    leaveProject,
    createProject,
    updateProject,
    deleteProject,
    acceptExclusion,
  }
}
