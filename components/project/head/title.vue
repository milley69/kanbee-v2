<template>
  <div class="dropdown dropdown-open">
    <label tabindex="0" class="btn normal-case btn-active btn-ghost">
      <h1 class="font-semibold text-3xl">{{ title }}</h1>
    </label>
    <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 space-y-2 rounded-box w-52 mt-4">
      <li class="rounded-lg border-accent border">
        <a @click.prevent="initProjects(true)">Refresh</a>
      </li>
      <li class="border-error border rounded-lg" v-if="getAdminByName(title) === user?.id">
        <a class="text-error hover:text-error" @click.prevent="deleteProject(title)">Delete project</a>
      </li>
      <li class="border-error border rounded-lg" v-else>
        <a class="text-error hover:text-error" @click.prevent="leaveProject(title)">Leave from {{ title }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { title } = defineProps<{ title: string }>()
const { initProjects, deleteProject, leaveProject } = useProjects()
const { getAdminByName } = useProjectsStore()
const { user } = storeToRefs(useUser())
</script>
