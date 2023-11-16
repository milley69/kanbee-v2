<template>
  <div class="dropdown dropdown-end" v-if="user">
    <div class="indicator" v-if="user.invites.length">
      <span class="indicator-item indicator-middle indicator-start badge badge-accent">{{ user.invites.length }}</span>
      <label tabindex="0" class="btn btn-square btn-outline">
        <i class="bx bx-sm bxs-bell"></i>
      </label>
    </div>
    <label tabindex="0" class="btn btn-square btn-outline" v-else>
      <i class="bx bx-sm bxs-bell"></i>
    </label>
    <div class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box min-w-[15rem] mt-4">
      <div tabindex="0" v-if="user.invites.length">
        <span class="font-medium"><i class="bx bx-group bx-mm bx-fw"></i>Invites</span>
        <div class="divider my-0"></div>
        <div class="stats shadow mb-2" v-for="invite in user.invites" :key="invite.id">
          <ui-notification-invite :invite="invite" />
        </div>
      </div>
      <div class="flex p-2 w-full" v-else>
        <p class="w-full"><i class="bx bxs-bot bx-sm bx-fw"></i>: No notifications were found</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = storeToRefs(useUser())
</script>
