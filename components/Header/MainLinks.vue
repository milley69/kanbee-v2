<template>
  <ul class="menu menu-md px-4 py-0">
    <li v-for="link in links" :key="link.title">
      <nuxt-link :to="link.path" activeClass="active">
        <i :class="'bx bx-mm ' + link.icon"></i>
        {{ link.title }}
      </nuxt-link>
    </li>
    <li v-if="isAdmin">
      <nuxt-link to="/dashboard" activeClass="active">
        <i class="bx bx-bug bx-mm"></i>
        Dashboard
      </nuxt-link>
    </li>
    <li>
      <a href="#" @click.prevent.stop="isOpen = true">
        <i class="bx bx-timer bx-mm"></i>
        Timer
      </a>
    </li>
    <slot />
  </ul>
</template>

<script lang="ts" setup>
const { isOpen } = storeToRefs(useTimer())
const { isAdmin } = storeToRefs(useUser())
const links = [
  { path: '/', title: 'Inbox', icon: 'bx-home-heart' },
  { path: '/profile', title: 'My Activity', icon: 'bx-popsicle' },
]
</script>
