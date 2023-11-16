<template>
  <div class="hero h-[calc(100vh-8rem)]" v-if="user">
    <div class="hero-content flex-col lg:flex-row">
      <div class="relative group">
        <img :src="user.avatar" :alt="user.username" class="max-w-xs rounded-lg shadow-2xl mask mask-squircle" />
        <span class="absolute top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button type="button" class="btn btn-circle btn-sm" @click="isOpenAvatar = !isOpenAvatar">
            <i class="bx bxs-edit"></i>
          </button>
        </span>
      </div>
      <div class="space-y-4">
        <Transition name="slide-up" mode="out-in">
          <div class="flex items-center gap-2 group" v-if="!isOpenUsername">
            <h1 class="text-5xl font-bold text-center lg:text-left max-w-min">
              {{ user.username }}
            </h1>
            <i class="bx bxl-google bx-sm qwe -mt-4" v-if="user.provider === 'GOOGLE'"></i>
            <i class="bx bxl-github bx-sm -mt-4" v-if="user.provider === 'GITHUB'"></i>
            <button
              type="button"
              class="btn btn-outline btn-ghost btn-circle btn-sm opacity-0 group-hover:opacity-100 transition-opacity"
              @click="isOpenUsername = !isOpenUsername"
            >
              <i class="bx bxs-edit"></i>
            </button>
          </div>
          <SettingsUsername v-else @toggle="isOpenUsername = false" />
        </Transition>
        <Transition name="slide-up" mode="out-in">
          <SettingsStats v-if="!isOpenAvatar" />
          <SettingsAvatar v-else @toggle="isOpenAvatar = false" />
        </Transition>
      </div>
    </div>
  </div>
  <div class="flex flex-col gap-2 justify-center items-center h-[calc(100vh-8rem)]" v-else>
    <h1>Who are you?</h1>
    <span
      >Please
      <nuxt-link to="/sign-in" class="underline underline-offset-2">Sign in</nuxt-link>
      to continue.</span
    >
  </div>
</template>

<script setup lang="ts">
const { user } = storeToRefs(useUser())
useHead({ title: user.value?.username ?? 'Profile' })

const isOpenAvatar = ref(false)
const isOpenUsername = ref(false)
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
</style>
