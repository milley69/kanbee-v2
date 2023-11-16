<template>
  <div class="tooltip tooltip-bottom" data-tip="Refresh">
    <button class="btn normal-case btn-active btn-ghost relative" @click="refresh">
      <h1 class="font-semibold text-3xl transition-colors" :class="{ 'text-base-300/20': loading }">{{ title }}</h1>
      <span class="loading loading-ring loading-lg absolute" v-show="loading"></span>
    </button>
  </div>
</template>

<script setup lang="ts">
const { title } = defineProps<{ title: string }>()
const { initProjects } = useProjects()

const loading = ref(false)

const refresh = async () => {
  loading.value = true
  await initProjects(true)
  loading.value = false
}
</script>
