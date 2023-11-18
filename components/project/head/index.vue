<template>
  <div class="flex gap-4 items-start flex-col md:flex-row md:items-start">
    <lazy-project-head-title :title="title" />
    <div class="flex justify-center items-start gap-2">
      <lazy-project-head-avatar :title="title" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { title } = defineProps<{ title: string }>()
</script>
