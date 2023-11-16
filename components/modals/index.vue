<template>
  <input type="checkbox" :checked="isActive" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <slot />
    </div>
    <div class="modal-backdrop" @click="closeModal">Close</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ isActive: boolean }>()
const { closeModal } = useModal()
</script>
