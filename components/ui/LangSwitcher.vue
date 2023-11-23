<template>
  <transition name="slide-up" mode="out-in" appear>
    <button
      v-if="locale !== 'en'"
      @click="switchLang('en')"
      aria-label="Toggle language"
      type="button"
      class="button_toggle_theme btn btn-square btn-outline"
    >
      EN
    </button>
    <button
      v-else
      @click="switchLang('ru')"
      type="button"
      aria-label="Toggle language"
      class="button_toggle_theme btn btn-square btn-outline"
    >
      RU
    </button>
  </transition>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const switchLang = (lg) => {
  console.log('lg: ', lg)
  localStorage.lang = lg
  locale.value = localStorage.lang
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateX(-15px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateX(-15px);
}
</style>
