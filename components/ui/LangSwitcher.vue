<template>
  <transition name="slide-up" mode="out-in">
    <button
      v-if="locale === 'ru_RU'"
      @click="locale = 'en_US'"
      aria-label="Toggle language"
      type="button"
      class="button_toggle_theme btn btn-square btn-outline"
    >
      EN
    </button>
    <button
      v-else
      @click="locale = 'ru_RU'"
      type="button"
      aria-label="Toggle language"
      class="button_toggle_theme btn btn-square btn-outline"
    >
      RU
    </button>
  </transition>
</template>

<script setup>
const { locale } = useI18n()

watch(
  () => locale.value,
  (locale) => {
    localStorage.setItem('kanbee-language', locale)
  }
)
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
