<template>
  <div class="tabs tabs-bordered items-center" style="grid-area: 2 / 1 / 3 / 4">
    <a
      class="tab tab-bordered"
      :class="{ 'tab-active': tab.event === status }"
      v-for="tab in tabs"
      :key="tab.title"
      @click="changeStatus(tab.event)"
    >
      {{ $t(tab.title) }}
    </a>
  </div>
</template>

<script setup lang="ts">
import type { StatusTimer } from '@/types'

const { status } = storeToRefs(useTimer())
const { changeStatus } = useTimer()

interface Tabs {
  title: string
  event: StatusTimer
}

const tabs: Tabs[] = [
  { title: 'Pomodoro', event: 'pomodoro' },
  { title: 'timer.tabs.shortBreak', event: 'break' },
  { title: 'timer.tabs.longBreak', event: 'longBreak' },
]
</script>
