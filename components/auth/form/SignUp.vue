<template>
  <div class="card flex-shrink-0 w-full pt-0">
    <form class="card-body p-0" @submit.prevent="signUpHandler">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Username</span>
        </label>
        <input
          type="text"
          placeholder="milley"
          v-model="form.username"
          class="input input-bordered"
          :class="{ 'input-error': formError.username }"
        />
        <label class="label" v-if="formError.username">
          <span class="label-text text-error">{{ formError.username }}</span>
        </label>
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input
          type="text"
          placeholder="you@example.com"
          autocomplete="email"
          v-model="form.email"
          class="input input-bordered"
          :class="{ 'input-error': formError.email }"
        />
        <label class="label" v-if="formError.email">
          <span class="label-text text-error">{{ formError.email }}</span>
        </label>
      </div>
      <div class="form-control relative">
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input
          :type="isHidePasswd ? 'text' : 'password'"
          :placeholder="isHidePasswd ? 'oh hello' : '********'"
          autocomplete="current-password"
          v-model="form.password"
          class="input input-bordered"
          :class="{ 'input-error': formError.password }"
        />
        <label class="label" v-if="formError.password">
          <span class="label-text text-error">{{ formError.password }}</span>
        </label>
        <span class="absolute right-3 top-12" @click="isHidePasswd = !isHidePasswd">
          <i
            class="bx bx-sm hover:text-opacity-100 cursor-pointer text-base-content"
            :class="isHidePasswd ? 'bx-show' : 'bx-hide text-opacity-50'"
          ></i>
        </span>
      </div>
      <div class="form-control mt-6">
        <button type="submit" class="btn btn-primary" :class="{ 'btn-disabled': !isSign }">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['create'])
const { signUp } = useAuth()
const { setToast } = useToast()
const router = useRouter()

const isHidePasswd = ref(false)
const form = reactive({
  username: '',
  email: '',
  password: '',
})
const formError = reactive({
  username: '',
  email: '',
  password: '',
})
const isSign = computed(() => Boolean(form.email) && Boolean(form.password))

const signUpHandler = async () => {
  const data = useAuthValidator({ email: form.email, password: form.password, name: form.username }, 'signUp')
  if (!data) return

  const res = await signUp(form.email, form.password, form.username)
  if (res) {
    emit('create')
    setToast('success', 'Поздравляю, вы зарегистрированы!')
  }
}
</script>
