<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text">Email or username</span>
    </label>
    <input type="text" v-model="search" placeholder="Search" class="input input-bordered" />
  </div>
  <div
    class="grid grid-cols-2 justify-center items-center gap-4 mt-4"
    v-if="users.length === project?.membersId.length"
  >
    <div class="stats shadow text-base-content" v-for="user in filteredUsers" :key="user.id">
      <ModalsMembersDetailRemoveUser :foundUser="user" @exile="exileHandler($event)" :key="user.projectsId.length" />
    </div>
  </div>
  <div class="grid grid-cols-2 justify-center items-center gap-4 mt-4" v-if="!users.length">
    <div class="stats shadow text-base-content" v-for="id in project?.membersId" :key="id">
      <ModalsMembersDetailRemoveMask />
    </div>
  </div>
  <div class="flex justify-center items-center gap-4 mt-4" v-else-if="search.length && !filteredUsers.length">
    <span class=""><i class="bx bxs-bot bx-sm bx-fw"></i>: There's no match</span>
  </div>
</template>

<script setup lang="ts">
import type { Project, User } from '@/types'

const { exileUser } = useProjects()
const { getFullMembers } = useDatabase()
const { getProject, addProject } = useProjectsStore()
const search = ref('')

const { projectTitle } = storeToRefs(useModal())

const exileHandler = async (id: string) => {
  const _id = users.value.findIndex((u) => u.id === id)
  if (_id === -1) return

  const user = users.value[_id]
  user.projectsId = user.projectsId.filter((p) => p !== project.value?.id)
  filteredUsers.value[_id] = user

  if (project.value) {
    await exileUser(project.value, user)

    const _project = project.value
    _project.membersId = _project.membersId.filter((m) => m !== id)
    addProject(_project, true)
  }
}

const users = ref<User[]>([])
const filteredUsers = ref<User[]>([])

const project = ref<Project>()

onMounted(async () => {
  const proj = getProject(projectTitle.value)
  if (proj) {
    project.value = proj
    const data = await getFullMembers(proj.membersId)
    if (data) users.value = [...data]
    filteredUsers.value = users.value
  }
})

watchDebounced(
  () => search.value,
  (val) => {
    filteredUsers.value = users.value.filter(
      ({ email, username }) =>
        email.toLowerCase().indexOf(val.toLowerCase()) >= 0 || username.toLowerCase().indexOf(val.toLowerCase()) >= 0
    )

    if (val === '') filteredUsers.value = users.value
  },
  { debounce: 500, maxWait: 1000 }
)
</script>
