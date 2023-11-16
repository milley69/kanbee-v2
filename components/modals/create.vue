<template>
  <h3 class="text-lg font-bold">{{ columnTitle }}</h3>
  <form class="" @submit.prevent="sendTodo">
    <div class="form-control">
      <label class="label">
        <span class="label-text">Title</span>
      </label>
      <input type="text" v-model="title" @focus="checkTitle" class="input input-bordered" />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Labels</span>
      </label>
      <input type="text" v-model="labels" @focus="checkLabels" class="input input-bordered" />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Deadline</span>
      </label>
      <!-- <input type="datetime" v-model="date" class="input input-bordered" /> -->
      <VueDatePicker
        v-model="date"
        vertical
        timezone="Europe/Moscow"
        :teleport="true"
        teleport-center
        :dark="isDark"
        :locale="getLocale()"
        class="input input-bordered"
      />
    </div>
    <div class="form-control my-4">
      <button class="btn btn-active" type="submit" :disabled="!title.length">отправить</button>
    </div>
  </form>
  <!--  -->
  <div class="card compact card-bordered bg-base-100 shadow-xl group">
    <div class="card-body">
      <span>{{ title }}</span>
      <div class="card-actions" v-if="transformedLabels.length">
        <div class="badge badge-outline" v-for="(label, index) in transformedLabels" :key="index" v-show="label !== ''">
          {{ label }}
        </div>
      </div>
      <div class="card-actions justify-between items-center" v-if="date">
        <div class="badge badge-outline">{{ formatted }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { nanoid } from 'nanoid'

const { projectTitle, columnTitle } = defineProps<{ projectTitle: string; columnTitle: string }>()
const { newTask } = storeToRefs(useProjectsStore())
const { closeModal } = useModal()
const { $colorMode } = useNuxtApp()
const { getLocale } = useLocales()

const title = ref(`Todo for ${projectTitle}`)
const labels = ref('Hello World')
const date = ref(new Date())

const isDark = computed(() => $colorMode.value === 'dark')

const formatted = ref()

watch(
  () => date.value,
  (date) => {
    formatted.value = useDateFormat(date, 'DD.MM (ddd) | HH:mm', {
      locales: getLocale(),
    }).value
  },
  { immediate: true }
)

const transformedLabels = computed(() => labels.value.split(' '))

const sendTodo = async () => {
  newTask.value = {
    columnTitle: columnTitle,
    task: {
      deadline: date.value,
      title: title.value,
      labels: transformedLabels.value,
      createAt: new Date(),
      id: nanoid(),
    },
  }
  closeModal()
}

const checkTitle = () => {
  if (title.value === `Todo for ${projectTitle}`) title.value = ''
}
const checkLabels = () => {
  if (labels.value === 'Hello World') labels.value = ''
}
</script>

<style scoped>
.dp__theme_light,
.dp__theme_dark {
  --dp-background-color: transparent;
  --dp-border-color: transparent;
  --dp-menu-border-color: transparent;
  --dp-border-color-hover: transparent;
}
</style>
