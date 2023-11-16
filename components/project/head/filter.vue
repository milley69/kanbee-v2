<template>
  <div class="flex justify-end">
    <div class="join">
      <input
        class="input input-bordered join-item w-[142px] md:w-auto"
        v-model="inputTitle"
        v-if="filter === 'title'"
        placeholder="Search"
        @keypress.enter="searchHandler"
      />
      <input
        class="input input-bordered join-item w-[142px] md:w-auto"
        v-model="inputLabel"
        v-else-if="filter === 'label'"
        placeholder="Search"
        @keypress.enter="searchHandler"
      />
      <input
        class="input input-bordered join-item w-[142px] md:w-auto"
        v-else-if="filter === 'date'"
        type="date"
        v-model.date="inputDate"
        @keypress.enter="searchHandler"
      />
      <input
        class="input input-bordered join-item w-[142px] md:w-auto"
        :disabled="filter === 'filter'"
        placeholder="Search"
        v-else
      />
      <select class="select select-bordered join-item capitalize" v-model="filter" @change="reset">
        <option v-for="(option, idx) in options" :key="idx" :value="option">
          {{ option }}
        </option>
      </select>
      <button class="btn btn-outline join-item" :disabled="filter === 'filter'" @click="searchHandler">Search</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
const emit = defineEmits<{
  (event: 'title', title: string): void
  (event: 'label', label: string): void
  (event: 'date', date: string): void
}>()

type Filter = 'filter' | 'title' | 'label' | 'date'

const filter = ref(<Filter>'filter')

const options: Filter[] = ['filter', 'title', 'label', 'date']

const inputTitle = ref('')
const inputLabel = ref('')
const inputDate = ref('')

onMounted(() => reset())

const searchHandler = () => {
  if (filter.value === 'title') emit('title', inputTitle.value)
  else if (filter.value === 'label') emit('label', inputLabel.value)
  else if (filter.value === 'date') emit('date', inputDate.value)
}

const reset = () => {
  inputTitle.value = ''
  inputLabel.value = ''
  inputDate.value = useDateFormat(new Date(), 'YYYY-MM-DD').value

  emit('title', inputTitle.value)
  emit('label', inputLabel.value)
  emit('date', inputDate.value)
}
</script>
