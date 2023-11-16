<template>
  <span
    class="w-2 h-2 block bg-base-content rounded-full"
    :class="{ 'bg-primary': step <= steps }"
    v-for="step in 4"
    :key="step"
  ></span>
</template>

<script setup lang="ts">
const { steps } = storeToRefs(useTimer())
</script>
