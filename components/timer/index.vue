<template>
  <Transition name="bounce">
    <Draggable
      class="fixed select-none z-[9999] hover:shadow-md transition-shadow bg-base-300 rounded-lg min-w-[415px] px-4 py-2"
      :initial-value="{ x: innerWidth / 4.2, y: 80 }"
      :prevent-default="true"
      v-show="isOpen"
      :handle="handle"
      storage-key="kanbee-timer-pos"
      storage-type="local"
    >
      <div ref="handle" class="cursor-move flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span>Pomodoro</span>
          <timer-steps />
        </div>
        <div>
          <div class="tooltip tooltip-left" :data-tip="$t('timer.close')">
            <button class="btn btn-sm btn-ghost" @click="close">
              <i class="bx bx-minus"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="divider m-0"></div>
      <timer-pomodoro />
    </Draggable>
  </Transition>
</template>

<script setup lang="ts">
import { UseDraggable as Draggable } from '@vueuse/components'
import { isClient } from '@vueuse/shared'

const { close } = useTimer()
const { isOpen } = storeToRefs(useTimer())

const handle = ref()

const innerWidth = isClient ? window.innerWidth : 200
</script>

<style scoped>
.bounce-enter-active {
  -webkit-animation: slide-in-blurred-bottom 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
  animation: slide-in-blurred-bottom 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
}
.bounce-leave-active {
  -webkit-animation: slide-in-blurred-bottom 0.6s cubic-bezier(0.23, 1, 0.32, 1) both reverse;
  animation: slide-in-blurred-bottom 0.6s cubic-bezier(0.23, 1, 0.32, 1) both reverse;
}
@-webkit-keyframes slide-in-blurred-bottom {
  0% {
    -webkit-transform: translateY(1000px) scaleY(2.5) scaleX(0.2);
    transform: translateY(1000px) scaleY(2.5) scaleX(0.2);
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) scaleY(1) scaleX(1);
    transform: translateY(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
}
@keyframes slide-in-blurred-bottom {
  0% {
    -webkit-transform: translateY(1000px) scaleY(2.5) scaleX(0.2);
    transform: translateY(1000px) scaleY(2.5) scaleX(0.2);
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) scaleY(1) scaleX(1);
    transform: translateY(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
}
</style>
