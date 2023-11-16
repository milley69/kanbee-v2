<template>
  <div v-if="status === 'pomodoro'">
    <span class="countdown font-mono font-semibold text-5xl">
      <span :style="`--value: ${pomoTimer.minutes}`"></span>:
      <span :style="`--value: ${pomoTimer.seconds}`"></span>
    </span>
  </div>
  <div v-else-if="status === 'break'">
    <span class="countdown font-mono font-semibold text-5xl">
      <span :style="`--value: ${breakTimer.minutes}`"></span>:
      <span :style="`--value: ${breakTimer.seconds}`"></span>
    </span>
  </div>
  <div v-else>
    <span class="countdown font-mono font-semibold text-5xl">
      <span :style="`--value: ${longBreakTimer.minutes}`"></span>:
      <span :style="`--value: ${longBreakTimer.seconds}`"></span>
    </span>
  </div>
</template>

<script setup lang="ts">
const { status, pomoTimer, breakTimer, longBreakTimer } = storeToRefs(useTimer())
</script>
