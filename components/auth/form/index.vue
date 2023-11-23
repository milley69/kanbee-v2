<template>
  <div class="flex flex-col justify-between w-[330px] sm:w-[384px] h-full py-4 px-4">
    <div class="mb-10 w-full mt-8">
      <h1 class="mb-2 text-2xl lg:text-3xl">{{ isLogin ? $t('auth.greeting.in.0') : $t('auth.greeting.up.0') }}</h1>
      <h2 class="text-sm">{{ isLogin ? $t('auth.greeting.in.1') : $t('auth.greeting.up.1') }}</h2>
    </div>

    <div class="form-control w-full">
      <div class="tooltip tooltip-open" data-tip="🚧 Later... 🚧">
        <button class="btn btn-ghost btn-outline w-full" disabled>
          {{ $t('auth.continue') }} Google
          <i class="bx bxl-google bx-sm"></i>
        </button>
        <button class="btn btn-ghost btn-outline w-full mt-4" @click="signInGithub" disabled>
          {{ $t('auth.continue') }} Github
          <i class="bx bxl-github bx-sm"></i>
        </button>
      </div>

      <div class="divider uppercase">{{ $t('utils.or') }}</div>

      <auth-form-sign-in v-if="isLogin" />
      <auth-form-sign-up v-else @create="isLogin = true" />
      <div class="self-center text-sm mt-8 lg:mt-4">
        <div>
          <span class="">{{ isLogin ? $t('auth.footer.in.0') : $t('auth.footer.up.0') }}</span>
          <span class="cursor-pointer underline transition hover:text-primary" @click="isLogin = !isLogin">
            {{ isLogin ? $t('auth.footer.in.1') : $t('auth.footer.up.1') }}
          </span>
        </div>
      </div>
    </div>

    <div class="sm:text-center mb-8">
      <p class="text-xs sm:mx-auto sm:max-w-sm opacity-50">
        {{ $t('auth.footer.0') }}
        <span class="tooltip tooltip-bottom" :data-tip="$t('utils.whoa')">
          <a class="underline cursor-pointer">{{ $t('auth.footer.1') }}</a>
        </span>
        {{ $t('utils.and') }}
        <span class="tooltip tooltip-bottom" :data-tip="$t('utils.whoa')">
          <a class="underline cursor-pointer">{{ $t('auth.footer.2') }}</a> </span
        >{{ locale === 'ru' ? ' Kanbee.' : '.' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { signInGithub } = useAuth()
const isLogin = ref(true)
const { locale } = useI18n()
</script>
