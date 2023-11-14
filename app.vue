<template>
  <div>
    <NuxtWelcome />
  </div>
</template>

<script lang="ts" setup>
const { connectSocket } = useConnectSocket()
onMounted(() => {
  connectSocket()
})
</script>
