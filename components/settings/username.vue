<template>
  <div class="join">
    <input
      ref="input"
      class="input input-bordered join-item w-[11rem]"
      :class="{ 'input-error': error }"
      placeholder="Rick Sanchez"
      min="0"
      v-model.trim="username"
      @keypress.enter="change"
    />
    <button type="button" class="btn btn-neutral join-item rounded-r-full" @click="change">Change</button>
  </div>
</template>

<script setup lang="ts">
const { changeUsername } = useDatabase()
const emit = defineEmits(['toggle'])
const { user } = storeToRefs(useUser())

const username = ref('')
const error = ref(false)

const input = ref(<HTMLInputElement | null>null)

onMounted(() => {
  if (user.value && input.value) {
    username.value = user.value.username
    input.value.focus()
  }
})

const change = async () => {
  if (!user.value) return
  if (user.value.username === username.value) {
    emit('toggle')
    return
  }
  const { done } = await changeUsername(username.value)
  error.value = false
  if (!done) {
    error.value = true
    return
  }
  user.value.username = username.value
  emit('toggle')
}
</script>
