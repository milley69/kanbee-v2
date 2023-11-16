<template>
  <div class="flex items-start overflow-x-auto gap-4" v-if="projects[id]">
    <draggable
      v-model="projects[id].kanban"
      group="kanban"
      item-key="id"
      :animation="300"
      @end="updateProject(projects[id])"
      handle=".drag-handle"
      class="flex gap-4 items-start"
    >
      <template #item="{ element: column }: { element: Column }">
        <div class="column bg-base-200 rounded min-w-[250px]">
          <div class="font-medium text-xl bg-base-100 mb-4 flex items-center">
            <button class="btn btn-xs btn-square btn-ghost cursor-move drag-handle">
              <i class="bx bx-grid-vertical bx-mm pb-1"></i>
            </button>
            <input
              type="text"
              class="bg-transparent focus:bg-white px-1 w-4/5 cursor-pointer focus:cursor-text rounded title-input"
              v-model="column.title"
              @blur="updateProject(projects[id])"
              @keyup.enter=";($event.target as HTMLInputElement).blur()"
              @keydown.backspace="
                () => {
                  if (column.title === '') {
                    projects[id].kanban = projects[id].kanban.filter((c) => c.id !== column.id)
                    updateProject(projects[id])
                  }
                }
              "
            />
            <button class="btn btn-square btn-sm btn-outline" @click="openModal('create', projectTitle, column.title)">
              <i class="bx bx-plus bx-sm"></i>
            </button>
          </div>
          <draggable
            v-model="column.tasks"
            :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
            item-key="id"
            :animation="300"
            @start="isDragging = true"
            @end="
              () => {
                updateProject(projects[id])
                isDragging = false
              }
            "
            class="h-full rounded-md p-3 bg-base-200 border-base-300 border-2 min-h-[150px] space-y-3"
            :class="{ 'border-dashed border-primary/30': isDragging }"
          >
            <template #item="{ element: task }: { element: Task }">
              <div>
                <project-task
                  :admin-id="projects[id].adminId"
                  :task="task"
                  @delete="column.tasks = column.tasks.filter((t) => t.id !== $event)"
                />
              </div>
            </template>
          </draggable>
        </div>
      </template>
    </draggable>
    <button class="btn btn-sm btn-active btn-ghost normal-case font-medium text-xl" @click="createColumn">
      <i class="bx bx-plus bx-mm"></i>
      Add Column
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { Column, Task } from '@/types'
import { nanoid } from 'nanoid'
import draggable from 'vuedraggable'

const { projectTitle } = defineProps<{ projectTitle: string }>()

const { openModal } = useModal()
const { getProjectId } = useProjectsStore()
const { newTask, projects } = storeToRefs(useProjectsStore())
const { updateProject } = useProjects()

const id = ref<number>(0)

onMounted(() => {
  id.value = getProjectId(projectTitle)
})

const alt = useKeyModifier('Alt')
const isDragging = ref(false)

const createColumn = () => {
  const column: Column = {
    id: nanoid(),
    title: '',
    tasks: [],
  }
  if (!projects.value[id.value]) return
  projects.value[id.value].kanban.push(column)
  nextTick(() => {
    ;(document.querySelector('.column:last-of-type .title-input') as HTMLInputElement).focus()
  })
}

watch(
  () => newTask.value,
  (task) => {
    if (task && projects.value[id.value]) {
      const _id = projects.value[id.value].kanban.findIndex((k) => k.title === task.columnTitle)
      if (_id !== -1) projects.value[id.value].kanban[_id].tasks.push(task.task)
      updateProject(projects.value[id.value])
      newTask.value = null
    }
  }
)
</script>
