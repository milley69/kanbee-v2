<template>
  <li v-for="id in user?.projectsId" :key="id" class="animate-pulse py-[3px]" v-if="user && !projects.length">
    <span>
      <i class="bx bx-hash text-primary"></i>
      <div class="h-4 w-24 rounded skeleton bg-base-content/30" :style="{ width: getWidth() + 'px' }"></div>
    </span>
  </li>
  <li v-for="project in projects" :key="project.id">
    <nuxt-link :to="`/p/${project.title}`" active-class="active">
      <i class="bx bx-hash text-primary"></i>
      {{ project.title.replaceAll('—', ' ') }}
    </nuxt-link>
  </li>
</template>

<script setup lang="ts">
const { projects } = storeToRefs(useProjectsStore())
const { user } = storeToRefs(useUser())

const width = [96, 105, 120, 140, 110, 145]
const getWidth = () => width[Math.floor(Math.random() * width.length)]
</script>
