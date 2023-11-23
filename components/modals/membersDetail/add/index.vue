<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text">{{ $t('modals.members.emailOrUsername') }}</span>
    </label>
    <input type="text" v-model="search" :placeholder="$t('actions.search')" class="input input-bordered" />
  </div>
  <div class="flex justify-center items-center gap-4 mt-4" v-if="users.length && !loading">
    <div class="stats shadow text-base-content" v-for="user in users" :key="user.id">
      <ModalsMembersDetailAddUser :foundUser="user" @invite="inviteHandler($event)" :key="user.invites.length" />
    </div>
  </div>
  <div class="flex justify-center items-center gap-4 mt-4" v-else-if="loading">
    <span class="loading loading-ring loading-lg"></span>
  </div>
  <div class="flex justify-center items-center gap-4 mt-4" v-else-if="search.length && !users.length">
    <span class=""><i class="bx bxs-bot bx-sm bx-fw"></i>: {{ $t('utils.noMatch') }}</span>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types'

const { searchUsers } = useDatabase()
const { inviteUser } = useProjects()
const search = ref('')

const users = ref<User[]>([])
const loading = ref(false)
const { projectTitle } = storeToRefs(useModal())

const inviteHandler = async (id: string) => {
  const _id = users.value.findIndex((u) => u.id === id)
  if (_id === -1) return
  const user = users.value[_id]
  user.invites.push({ title: projectTitle.value, id: 0 })
  await inviteUser(user.email, projectTitle.value)
}

watch(
  () => search.value,
  () => {
    loading.value = true
  }
)

watchDebounced(
  () => search.value,
  async (val) => {
    users.value = await searchUsers(val)
    loading.value = false
  },
  { debounce: 500, maxWait: 1000 }
)
</script>
