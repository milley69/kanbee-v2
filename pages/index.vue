<template>
  <div>Page: foo</div>
  <form @submit.prevent="send">
    <input type="text" v-model="text" class="input-bordered input" />
    <button class="btn" type="submit">Send</button>
  </form>
</template>

<script lang="ts" setup>
const text = ref('')

const { socket } = storeToRefs(useSocket())

const send = () => {
  if (!socket.value || !text.value.length) return
  socket.value.emit('server-path', text.value)
  text.value = ''
}
</script>
