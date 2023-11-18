<template>
  <div class="stat">
    <div class="stat-title text-base-content">{{ exclusion }}</div>
    <div class="stat-actions space-x-2">
      <button
        class="btn btn-sm bg-success bg-opacity-40 hover:btn-success"
        type="button"
        @click="acceptExclusion(exclusion)"
      >
        {{ randomBtn() }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ exclusion: string }>()

const { acceptExclusion } = useProjects()

const randomBtn = () => {
  const btn = ['Ok', 'Well', 'OYY']
  return btn[Math.floor(Math.random() * btn.length)]
}
</script>
