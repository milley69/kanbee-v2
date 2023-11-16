<template>
  <div class="stat">
    <div class="stat-title text-base-content">{{ invite.title }}</div>
    <div class="stat-actions space-x-2">
      <button class="btn btn-sm bg-success bg-opacity-40 hover:btn-success" type="button" @click="acceptInvite(invite)">
        Accept
      </button>
      <button class="btn btn-sm bg-error bg-opacity-40 hover:btn-error" type="button" @click="ignoreInvite(invite)">
        Ignore
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Invites } from '@/types'
defineProps<{ invite: Invites }>()

const { acceptInvite, ignoreInvite } = useProjects()
</script>
