<template>
  <span class="loading loading-ring w-12" v-if="isLoading"></span>
  <div class="relative flex flex-col gap-6" v-else>
    <div class="absolute select-none opacity-60 -top-12 -left-12">
      <i class="bx bxs-quote-alt-left text-neutral !text-7xl"></i>
    </div>
    <blockquote class="z-10 max-w-lg text-3xl">
      {{ quote.text }}
    </blockquote>
    <div class="flex items-center gap-4">
      <div class="avatar inline-block">
        <div class="w-12 mask mask-squircle">
          <img :src="quote.avatar" :alt="quote.username" />
        </div>
      </div>

      <span class="flex flex-col">
        <cite class="not-italic font-medium whitespace-nowrap">@{{ quote.username }}</cite>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Quotes } from '@/types'
const { getQuotes } = useQuotes()

const isLoading = computed(() => quote.text === '' && quote.username === '' && quote.avatar === '')

const quote = reactive({
  username: '',
  avatar: '',
  text: '',
})

const fetchQuotes = async () => {
  try {
    const res: Quotes | null = await getQuotes()
    if (res) {
      quote.username = res.username
      quote.avatar = res.avatar
      quote.text = res.text
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(fetchQuotes)
</script>
