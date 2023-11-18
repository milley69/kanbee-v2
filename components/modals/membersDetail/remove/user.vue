<template>
  <div class="stat relative !overflow-x-hidden !overflow-y-hidden">
    <div class="stat-figure">
      <div class="avatar">
        <div class="w-12 mask mask-squircle">
          <img :src="foundUser.avatar" :alt="foundUser.username" />
        </div>
      </div>
    </div>
    <div class="stat-title text-base-content">{{ foundUser.username }} {{ isAmI ? '(You)' : '' }}</div>
    <div class="stat-desc text-base-content">{{ foundUser.email }}</div>
    <div class="stat-actions">
      <button class="btn btn-sm btn-error" :class="{ invisible: !isAtProject }" :disabled="isAmI" @click="tryToExile">
        {{ areYouSure ? 'Are you sure?' : 'Exile' }}
      </button>
    </div>
    <div
      v-if="!isAtProject"
      class="absolute text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%+2rem)] skeleton h-8 rotate-[30deg] bg-error/90 pointer-events-none"
    >
      <span class="text-error-content text-base leading-8 uppercase">Exiled</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types'

const { foundUser } = defineProps<{ foundUser: User }>()
const emit = defineEmits<(event: 'exile', id: string) => void>()

const { projectTitle } = storeToRefs(useModal())
const { user } = storeToRefs(useUser())
const { getProject } = useProjectsStore()

const areYouSure = ref(false)

const isAmI = computed(() => foundUser.id === user.value?.id)

const isAtProject = computed(() => {
  const proj = getProject(projectTitle.value)
  if (proj) return foundUser.projectsId.includes(proj.id)
  return false
})

const tryToExile = () => {
  if (!areYouSure.value) {
    areYouSure.value = true
    return
  }
  emit('exile', foundUser.id)
}
</script>
