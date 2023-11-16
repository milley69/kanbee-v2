<template>
  <section
    class="bg-base-200 min-h-[calc(100vh-4.2rem)] z-0 w-full lg:w-5/12 lg:border-r-2 border-base-content/30 flex justify-center items-center overflow-y-hidden"
  >
    <LazyAuthForm />
  </section>
  <section
    class="bg-base-100 min-h-[calc(100vh-4.2rem)] hidden lg:w-7/12 lg:flex justify-center items-center overflow-y-hidden"
  >
    <ClientOnly>
      <AuthQuote v-if="!isMobile" />
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'

definePageMeta({ layout: 'auth' })
useHead({ title: 'Authorization' })
const { isAuth } = storeToRefs(useUser())

const isMobile = useBreakpoints({ lg: 1024 }).smallerOrEqual('lg')

onMounted(() => {
  if (isAuth.value) useRouter().push('/')
})

watch(
  () => isAuth.value,
  (val) => {
    if (val) useRouter().push('/')
  }
)
</script>
