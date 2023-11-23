<template>
  <div class="pomodoro-grid-template w-full grid gap-y-1">
    <div style="grid-area: 1 / 1 / 2 / 3" class="">
      <timer-clock />
    </div>
    <div style="grid-area: 1 / 3 / 2 / 4" class="flex justify-center">
      <button class="btn btn-ghost uppercase btn-outline" @click="stop()" v-if="isStart">
        {{ $t('actions.pause') }}
      </button>
      <button class="btn btn-ghost uppercase btn-outline" @click="start()" v-else>{{ $t('actions.start') }}</button>
    </div>
    <div style="grid-area: 1 / 4 / 3 / 5" class="flex justify-around flex-col items-center">
      <button class="btn btn-sm btn-ghost btn-circle" @click="reset(true)">
        <i class="bx bx-reset bx-sm"></i>
      </button>
      <button class="btn btn-sm btn-ghost btn-circle" @click="settingsTimer.isOpen = !settingsTimer.isOpen">
        <i class="bx bxs-cog bx-sm"></i>
      </button>
    </div>
    <timer-tabs />
  </div>
  <timer-settings />
</template>

<script setup lang="ts">
const { isStart, settingsTimer } = storeToRefs(useTimer())
const { start, stop, initTimer, reset } = useTimer()

onMounted(initTimer)
</script>

<style scoped>
.pomodoro-grid-template {
  grid-template-columns: repeat(3, 1fr) 50px;
  grid-template-rows: 1fr 50px;
}
</style>
