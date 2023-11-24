<template>
  <NuxtLayout>
    <NuxtPage
      :transition="{
        name: 'my',
        mode: 'out-in',
        onBeforeEnter,
      }"
    />
  </NuxtLayout>
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `Kanbee | ${titleChunk}` : 'Kanbee'
  },
})

const { finalizePendingLocaleChange, locale } = useI18n()

const onBeforeEnter = async () => {
  await finalizePendingLocaleChange()
}

const { connectSocket } = useConnectSocket()
const { amIAuth } = useAuth()

const initLang = () => {
  const lang = localStorage.getItem('kanbee-language')
  if (lang) locale.value = lang
}

onMounted(() => {
  initLang()
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

.my-enter-active,
.my-leave-active {
  transition: opacity 0.3s;
}
.my-enter,
.my-leave-active {
  opacity: 0;
}
</style>
