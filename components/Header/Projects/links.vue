<template>
  <li v-for="id in user?.projectsId" :key="id" class="animate-pulse py-[3px]" v-if="user && !projects.length">
    <span>
      <i class="bx bx-hash text-primary"></i>
      <div class="h-4 w-24 rounded bg-base-content/30" :style="{ width: getWidth() + 'px' }"></div>
    </span>
  </li>
  <li v-for="(link, idx) in projectsTitles" :key="idx" v-else>
    <nuxt-link :to="`/p${link}`" active-class="active">
      <i class="bx bx-hash text-primary"></i>
      {{ link.slice(1).replaceAll('—', ' ') }}
    </nuxt-link>
  </li>
</template>

<script setup lang="ts">
const { projectsTitles, projects } = storeToRefs(useProjectsStore())
const { user } = storeToRefs(useUser())

const width = [96, 105, 120, 140, 110, 145]
const getWidth = () => width[Math.floor(Math.random() * width.length)]
</script>
