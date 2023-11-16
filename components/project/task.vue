<template>
  <div
    class="card compact card-bordered bg-base-100 shadow-xl group max-w-[250px]"
    tabindex="0"
    @focus="focused = true"
    @blur="focused = false"
  >
    <div class="card-body" v-if="user">
      <span :title="task.createAt.toLocaleString()">{{ task.title }}</span>
      <div class="card-actions" v-if="task.labels.length">
        <div class="badge badge-outline" v-for="(label, index) in task.labels" :key="index" v-show="label !== ''">
          {{ label }}
        </div>
      </div>
      <div class="card-actions justify-between items-center" v-if="formatted">
        <div class="badge badge-outline" :class="{ 'badge-error': isDeadLine }">{{ formatted }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types'

const { task, adminId } = defineProps<{ task: Task; adminId: string }>()

const emit = defineEmits<(event: 'delete', payload: string) => void>()

const { getLocale } = useLocales()
const isAdmin = computed(() => adminId === user.value?.id)
const { user } = storeToRefs(useUser())

const focused = ref(false)
onKeyStroke('Backspace', () => {
  if (focused.value && isAdmin.value) emit('delete', task.id)
})
const formatted = task.deadline ? useDateFormat(task.deadline, 'DD.MM (ddd) | HH:mm', { locales: getLocale() }) : null

const isDeadLine = computed(() => +new Date() >= +new Date(task.deadline ?? ''))
</script>

<style>
.sortable-drag .task {
  transform: rotate(5deg);
}
.sortable-ghost .task {
  position: relative;
}
.sortable-ghost .task::after {
  content: '';
  @apply absolute top-0 bottom-0 left-0 right-0 bg-slate-300;
}

.task:focus,
.task:focus-visible {
  @apply !outline-gray-400;
  outline: gray auto 1px;
}
</style>
