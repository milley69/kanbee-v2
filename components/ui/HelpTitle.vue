<template>
  <h3 :id="id" class="-ml-8 scroll-mt-16">
    <a aria-hidden="true" tabindex="-1" :href="`#${id}`">
      <span
        class="mr-1 text-base font-bold inline-block align-middle relative -mt-1"
        :class="isHash ? 'text-primary opacity-100' : 'opacity-20 hover:opacity-60'"
        >#</span
      > </a
    >{{ title }}
  </h3>
</template>

<script setup lang="ts">
defineProps<{ title: string; id: string; isHash: boolean }>()
</script>
