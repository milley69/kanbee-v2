<template>
  <button type="button" class="btn btn-square btn-outline" @click="setColorTheme()">
    <i :class="'bx bx-sm ' + isIcon"></i>
  </button>
</template>

<script lang="ts" setup>
import { useBreakpoints } from '@vueuse/core'
const { $colorMode } = useNuxtApp()

const isMobile = useBreakpoints({ sm: 640 }).smallerOrEqual('sm')

const setColorTheme = () => {
  if ($colorMode.preference === 'light') $colorMode.preference = 'dark'
  else if ($colorMode.preference === 'dark') $colorMode.preference = 'system'
  else $colorMode.preference = 'light'
}

const isIcon = computed(() => {
  if ($colorMode.preference == 'dark') return 'bxs-moon'
  else if ($colorMode.preference == 'light') return 'bxs-sun'
  else return isMobile.value ? 'bx-mobile' : 'bx-desktop'
})
</script>
