<template>
  <div
    class="flex flex-shrink-0 flex-wrap justify-between items-center px-3 cursor-pointer"
    @click="isOpenProjects = !isOpenProjects"
  >
    <p>
      <i class="bx bx-chevron-down pt-px scale-110 bx-fw" v-if="isOpenProjects"></i>
      <i class="bx bx-chevron-up pt-px scale-110 bx-fw" v-else></i>
      <span>Projects</span>
    </p>
    <button class="btn btn-ghost btn-square btn-sm" @click.stop="handleNewProject">
      <i class="bx bx-plus"></i>
    </button>
  </div>
  <div class="grid transition-all duration-500" :class="isOpenProjects ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
    <ul class="overflow-hidden">
      <lazy-header-projects-links />

      <li v-if="newProject.isOpen">
        <input
          v-model="newProject.name"
          ref="newProjectInput"
          type="text"
          class="input input-bordered pl-5"
          @keydown.enter="addProject"
          @focusout="newProject.isOpen = false"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const isOpenProjects = ref(true)

const { addProjectTitle, convertHashToPath } = useProjectsStore()

const newProjectInput = ref<HTMLInputElement | null>(null)
const newProject = reactive({
  isOpen: false,
  name: '# ',
})

const addProject = () => {
  addProjectTitle(newProject.name, true)
  useRouter().push(`/p${convertHashToPath(newProject.name)}`)
  newProject.isOpen = false
}

const handleNewProject = () => {
  if (!isOpenProjects.value) isOpenProjects.value = true
  newProject.isOpen = true
  nextTick(() => {
    if (newProjectInput.value) newProjectInput.value.focus()
  })
}

watch(
  () => newProject,
  (val) => {
    if (!val.name.includes('#')) newProject.isOpen = false
    if (!val.isOpen) newProject.name = '# '
    if (val.name.includes('/')) {
      newProject.name = newProject.name.replaceAll('/', '')
    }
  },
  { deep: true }
)
</script>
