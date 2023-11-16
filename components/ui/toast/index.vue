<template>
  <TransitionGroup
    name="toast"
    tag="div"
    class="toast-animation fixed max-w-[20rem] min-w-[20rem] z-[999] flex flex-col gap-2 p-4 left-auto bottom-auto right-0 top-0 translate-x-0 translate-y-0"
  >
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="alert cursor-pointer relative max-w-[20rem]"
      @click.prevent="removeToast(toast)"
    >
      <i class="text-info bx bx-info-circle bx-tada bx-sm" v-if="toast.type === 'info'"></i>
      <i class="text-success bx bx-check-circle bx-tada bx-sm" v-else-if="toast.type === 'success'"></i>
      <i class="text-warning bx bx-error bx-tada bx-sm" v-else-if="toast.type === 'warning'"></i>
      <i class="text-error bx bx-x-circle bx-tada bx-sm" v-else-if="toast.type === 'error'"></i>

      <span>{{ toast.message }}</span>
      <ui-toast-progress :duration="toast.duration" />
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
const { removeToast } = useToast()
const { toasts } = storeToRefs(useToast())
</script>

<style scoped>
.toast-enter-from,
.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition: 0.35s ease all;
}

.toast-animation > * {
  animation: toast-pop 0.25s ease-out;
}
</style>
