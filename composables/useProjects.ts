import type { DoneError, Invites, Members, Project, User, UserError, UserProject } from '@/types'
import { storeToRefs } from 'pinia'

export const useProjects = () => {
  const { user, accessToken } = storeToRefs(useUser())
  // const { projects, refreshedCount } = storeToRefs(useProjectsStore())
  const { setUser } = useUser()
  const { addProject, getProject } = useProjectsStore()
  const { $URL } = useNuxtApp()
  const { setToast } = useToast()
  const { socket } = storeToRefs(useSocket())

  const createProject = async (name: string) => {
    if (!user.value) return

    const { user: newUser, project } = await $fetch<UserProject>(`${$URL}/projects/create`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({ title: name.replace('/', '') }),
      headers: { Authorization: accessToken.value },
    })
    if (!(project && newUser)) return
    setUser(newUser)
    addProject(project)
  }

  // const getProjectById = async (id: number) => {
  //   const { data, error } = await $supabase.from('projects').select('*').eq('id', id).limit(1).single()
  //   if (error) return null
  //   return data
  // }

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
    socket.value?.emit('updateKanban', project)
  }

  const inviteUser = async (email: string, title: string) => {
    const project = getProject(title)
    if (!project) return
    const data = await $fetch<DoneError>(`${$URL}/projects/send-invite/`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      body: { id: project.id, title, email },
      headers: { Authorization: accessToken.value },
    })
    if (data.error) {
      setToast('error', data.error)
      return
    }
    setToast('success', `${email} was invited to ${title}`)
  }

  const acceptInvite = async (invite: Invites) => {
    const { user: newUser, project } = await $fetch<UserProject>(`${$URL}/projects/access-invite/${invite.id}`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { Authorization: accessToken.value },
    })
    if (!(project && newUser)) return
    setUser(newUser)
    addProject(project)
  }

  const ignoreInvite = async (invite: Invites) => {
    const { user, error } = await $fetch<UserError>(`${$URL}/projects/ignore-invite/${invite.id}`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { Authorization: accessToken.value },
    })
    if (!user) {
      console.log('error: ', error)
      return
    }
    setUser(user)
  }

  const WSProject = (_user: User) => {
    socket.value?.on(`getInvite-${_user.id}`, (data: Invites) => {
      console.log('data: ', data)
      user.value?.invites.push(data)
    })

    for (const projectId of _user.projectsId) {
      socket.value?.on(`updateKanban:${projectId}`, (data: Project) => {
        addProject(data, true)
      })
    }
  }

  return {
    createProject,
    updateProject,
    initProjects,
    getMembers,
    inviteUser,
    acceptInvite,
    ignoreInvite,
    WSProject,
  }
}
