<template>
  <div class="stat">
    <div class="stat-figure">
      <div class="avatar">
        <div class="w-16 mask mask-squircle">
          <img :src="foundUser.avatar" :alt="foundUser.username" />
        </div>
      </div>
    </div>
    <div class="stat-title text-base-content">{{ foundUser.username }} {{ isAmI ? '(You)' : '' }}</div>
    <div class="stat-desc text-base-content">{{ foundUser.email }}</div>
    <div class="stat-actions">
      <button
        class="btn btn-sm btn-success"
        :disabled="isInvited || isAmI || isAtProject"
        @click="$emit('invite', foundUser.id)"
      >
        Invite
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types'

const { foundUser } = defineProps<{ foundUser: User }>()
defineEmits<(event: 'invite', id: string) => void>()

const { projectTitle } = storeToRefs(useModal())
const { user } = storeToRefs(useUser())
const { getProject } = useProjectsStore()

const isInvited = computed(() => foundUser.invites.some((invite) => invite.title === projectTitle.value))

const isAmI = computed(() => foundUser.id === user.value?.id)

const isAtProject = computed(() => {
  const proj = getProject(projectTitle.value)
  if (proj) return proj.membersId.includes(foundUser.id)
  return false
})
</script>
