<template>
  <h3 class="text-lg font-bold mb-4">Members detail</h3>
  <div class="join join-vertical w-full">
    <div class="collapse collapse-arrow join-item border border-base-300">
      <input type="radio" name="my-accordion-4" />
      <div class="collapse-title text-xl font-medium">Invite</div>
      <div class="collapse-content">
        <ModalsMembersDetailAdd />
      </div>
    </div>
    <div class="collapse collapse-arrow join-item border border-base-300" v-if="isHaveForExclude">
      <input type="radio" name="my-accordion-4" />
      <div class="collapse-title text-xl font-medium">Exclude</div>
      <div class="collapse-content">
        <ModalsMembersDetailRemove />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getProject } = useProjectsStore()
const { projectTitle } = storeToRefs(useModal())

const isHaveForExclude = computed(() => {
  const project = getProject(projectTitle.value)
  if (project) return project.membersId.length > 1
  return false
})
</script>
