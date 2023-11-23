<template>
  <div class="flex flex-col gap-4 group pr-10 w-[300px]">
    <div class="stats stats-vertical shadow overflow-hidden" ref="statsList">
      <div class="stat" v-for="stat in statsItems" :key="stat" v-if="statsItems.length">
        <div class="stat-title">{{ $t(stats[stat].title) }}</div>
        <div class="stat-value">{{ stats[stat].value }}</div>
        <div class="stat-desc">{{ stats[stat].desc }}</div>
      </div>
    </div>
    <div
      class="stats stats-vertical shadow overflow-hidden group-hover:visible"
      :class="{ invisible: statsItems.length }"
    >
      <div class="stat">
        <div class="stat-value text-center">
          <button class="btn" @click="openModal('profile-stat')">
            <i class="bx bx-plus bx-md"></i>
          </button>
          <button class="btn" title="randomize" @click="randomize">
            <i class="bx bx-revision bx-md"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import autoAnimate from '@formkit/auto-animate'

const { statsItems, stats } = storeToRefs(useProfile())
const { initProfile, randomize } = useProfile()
const { openModal } = useModal()

const statsList = ref(<HTMLDivElement | null>null)

onMounted(() => {
  if (statsList.value) autoAnimate(statsList.value)
  initProfile()
})
</script>
