<template>
  <div class="navbar bg-base-100 border-b border-base-content/30">
    <div class="flex-1">
      <span class="btn btn-ghost normal-case text-xl">Kanbee</span>
    </div>
    <div class="flex-none">
      <ui-theme-switcher />
    </div>
  </div>
  <main class="max-w-[100vw] flex">
    <nuxt-page />
  </main>

  <client-only>
    <lazy-ui-toast />
  </client-only>
</template>

<script lang="ts" setup></script>
