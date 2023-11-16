<template>
  <div>Page: help</div>
  <div>
    <pre>{{ user }}</pre>
  </div>
</template>

<script lang="ts" setup>
useHead({ title: 'Help' })
const { user } = storeToRefs(useUser())
</script>
