<template>
  <div
    class="grid transition-all duration-500 mt-2"
    :class="settingsTimer.isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
  >
    <div class="overflow-hidden">
      <div class="divider m-0"></div>
      <div class="form-control">
        <label class="label w-max gap-2 cursor-pointer">
          <span class="label-text">{{ $t('timer.settings.audio') }}</span>
          <input type="checkbox" class="toggle" v-model="settingsTimer.isSound" />
        </label>
      </div>
      <div class="divider m-0"></div>
      <div class="grid grid-cols-4 items-end pb-3">
        <div class="form-control max-w-[6rem]">
          <label class="label">
            <span class="label-text">Pomodoro</span>
          </label>
          <input
            type="number"
            placeholder="40"
            v-model="settingsTimer.timer.pomodoro"
            class="input input-bordered input-sm w-20"
            :disabled="isStart"
            min="1"
            max="60"
          />
        </div>
        <div class="form-control max-w-[6rem]">
          <label class="label">
            <span class="label-text">{{ $t('timer.tabs.break') }}</span>
          </label>
          <input
            type="number"
            placeholder="5"
            v-model="settingsTimer.timer.break"
            class="input input-bordered input-sm w-20"
            :disabled="isStart"
            min="1"
            max="60"
          />
        </div>
        <div class="form-control max-w-[6rem]">
          <label class="label">
            <span class="label-text">{{ $t('timer.tabs.longBreak') }}</span>
          </label>
          <input
            type="number"
            placeholder="15"
            v-model="settingsTimer.timer.longBreak"
            class="input input-bordered input-sm w-20"
            :disabled="isStart"
            min="1"
            max="60"
          />
        </div>
        <button class="btn btn-outline btn-sm" :disabled="isStart" @click="changeSettings()">
          {{ $t('actions.save') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { settingsTimer, isStart } = storeToRefs(useTimer())
const { changeSettings } = useTimer()

watch(
  () => settingsTimer.value.isSound,
  () => {
    changeSettings(false)
  }
)
</script>
