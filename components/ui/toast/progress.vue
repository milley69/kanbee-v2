<template>
  <progress
    class="progress w-[17.5rem] rounded-none left-1/2 rounded-b-full -translate-x-1/2 absolute -bottom-px"
    :value="value"
    :max="duration / 10"
  ></progress>
</template>

<script setup lang="ts">
const { duration } = defineProps<{ duration: number }>()

const value = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    value.value += 1
    if (value.value === duration) clearInterval(interval)
  }, 10)
})
</script>

<style scoped>
progress.progress::-webkit-progress-value {
  border-radius: 0px !important;
}
</style>
