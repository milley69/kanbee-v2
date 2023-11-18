<template>
  <div class="avatar-group -space-x-4" v-if="members.length && user">
    <div class="avatar" v-for="(user, index) in qwe.members" :key="index">
      <div class="w-10">
        <img :src="user.avatar" :alt="user.username" :title="user.username" />
      </div>
    </div>
    <div class="avatar placeholder" v-if="qwe.others !== 0">
      <div class="w-10 bg-base-300 text-base-content">
        <span>+{{ qwe.others }}</span>
      </div>
    </div>
    <div class="avatar placeholder" v-if="getAdminByName(title) === user.id">
      <div>
        <button
          class="btn btn-circle btn-neutral w-10 h-10"
          @click="openModal('membersDetail', title)"
          title="Members detail"
        >
          <i class="bx bxs-user-detail bx-sm"></i>
        </button>
      </div>
    </div>
  </div>
  <div class="avatar-group -space-x-4 animate-pulse" v-else-if="!members.length && user">
    <div class="avatar">
      <div class="w-10">
        <img :src="user.avatar" :alt="user.username" />
      </div>
    </div>
    <div class="avatar placeholder" v-if="getAdminByName(title) === user.id">
      <div>
        <button class="btn btn-circle btn-neutral w-10 h-10">
          <i class="bx bxs-user-detail bx-sm"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Members } from '~/types'

const { title } = defineProps<{ title: string }>()

const { getMembers } = useProjects()
const { user } = storeToRefs(useUser())
const { openModal } = useModal()
const { getAdminByName } = useProjectsStore()

const members = ref(<Members[]>[])

onMounted(async () => {
  const data = await getMembers(title)
  if (data) members.value = [...data]
})

const qwe = computed(() =>
  members.value.length <= 4
    ? { members: members.value, others: 0 }
    : { members: members.value.slice(0, 4), others: members.value.length - 4 }
)
</script>
