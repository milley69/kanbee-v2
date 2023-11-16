<template>
  <section class="h-screen max-w-[100vw] lg:max-w-[calc(100vw-20rem)] my-4">
    <lazy-project-head :title="project.replaceAll('—', ' ')" />
    <div class="w-full py-2 border-b border-base-content/30">
      <lazy-project-head-filter />
    </div>
    <div class="mt-4 pb-16 h-full overflow-hidden">
      <lazy-project-board :projectTitle="project" />
      <!-- <lazy-project-board :projectTitle="project" :key="refreshedCount" /> -->
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['projects'] })

const { params } = useRoute()
const { refreshedCount } = storeToRefs(useProjectsStore())

const project = computed(() => (typeof params.project === 'string' ? params.project : params.project[0]))
useHead({ title: project.value })
</script>
