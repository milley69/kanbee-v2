<template>
  <div class="flex flex-col justify-between w-[330px] sm:w-[384px] h-full py-4 px-4">
    <div class="mb-10 w-full mt-8">
      <h1 class="mb-2 text-2xl lg:text-3xl">{{ isLogin ? 'Welcome back' : 'Get started' }}</h1>
      <h2 class="text-sm">{{ isLogin ? 'Sign in to your account' : 'Create a new account' }}</h2>
    </div>

    <div class="form-control w-full">
      <div class="tooltip tooltip-open" data-tip="🚧 Later... 🚧">
        <button class="btn btn-ghost btn-outline w-full" disabled>
          Continue with Google
          <i class="bx bxl-google bx-sm"></i>
        </button>
        <button class="btn btn-ghost btn-outline w-full mt-4" @click="signInGithub" disabled>
          Continue with Github
          <i class="bx bxl-github bx-sm"></i>
        </button>
      </div>

      <div class="divider">OR</div>

      <auth-form-sign-in v-if="isLogin" />
      <auth-form-sign-up v-else @create="isLogin = true" />
      <div class="self-center text-sm mt-8 lg:mt-4">
        <div>
          <span class="">{{ isLogin ? `Don't have an account? ` : 'Have an account? ' }}</span>
          <span class="cursor-pointer underline transition hover:text-primary" @click="isLogin = !isLogin">
            {{ isLogin ? 'Sign Up Now' : 'Sign In Now' }}
          </span>
        </div>
      </div>
    </div>

    <div class="sm:text-center mb-8">
      <p class="text-xs sm:mx-auto sm:max-w-sm opacity-50">
        By continuing, you agree to Kanbee's
        <span class="tooltip tooltip-bottom" data-tip="whoa?">
          <a class="underline cursor-pointer"> Terms of Service</a>
        </span>
        and
        <span class="tooltip tooltip-bottom" data-tip="whoa?">
          <a class="underline cursor-pointer"> Privacy Policy</a> </span
        >.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { signInGithub } = useAuth()
const isLogin = ref(true)
</script>
