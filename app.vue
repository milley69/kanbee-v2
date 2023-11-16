<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `Kanbee | ${titleChunk}` : 'Kanbee'
  },
})

const { connectSocket } = useConnectSocket()
const { amIAuth } = useAuth()

onMounted(() => {
  amIAuth()
  connectSocket()
})
</script>

<style>
.qwe {
  border: 1px solid salmon;
}
.qwe2 > * {
  border: 1px solid salmon;
}
.qwe3 * {
  border: 1px solid salmon;
}
</style>
