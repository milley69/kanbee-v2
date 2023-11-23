<template>
  <h3 class="font-bold text-lg">{{ $t('modals.profile') }}</h3>
  <div v-for="(stat, idx) in stats" class="form-control">
    <label class="label justify-normal gap-3 cursor-pointer">
      <input type="checkbox" class="toggle" :checked="statsItems.includes(idx)" @change="change(idx)" />
      <span class="label-text">{{ $t(stat.title) }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
const { statsItems } = storeToRefs(useProfile())
const { stats, change } = useProfile()
</script>
