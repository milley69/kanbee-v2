<template>
  <nuxt-link to="/help" class="btn w-full justify-start" ref="infoBtn">
    <span class="w-10">
      <i class="bx bx-info-circle bx-sm" :class="{ 'bx-tada': isHoverInfo }"></i>
    </span>
    Help
  </nuxt-link>
  <div class="dropdown dropdown-top w-full" v-if="user">
    <label tabindex="0" class="btn w-full justify-start">
      <div class="w-10">
        <img :src="user.avatar" :alt="user?.username" class="mask mask-squircle" />
      </div>
      {{ user?.username }}
    </label>
    <ul tabindex="0" class="mb-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
      <li>
        <nuxt-link to="/profile" class="justify-between" activeClass="active">
          Profile
          <span class="badge">New</span>
        </nuxt-link>
      </li>
      <li><nuxt-link to="/p" activeClass="active">Temp</nuxt-link></li>
      <li @click="logOut"><a>Logout</a></li>
    </ul>
  </div>
  <button type="button" class="btn w-full justify-start" @click="logOut" v-else>
    <span class="w-10"><i class="bx bxs-log-out bx-sm"></i></span>Logout
  </button>
</template>

<script setup lang="ts">
const { logOut } = useAuth()

const { user } = storeToRefs(useUser())

const infoBtn = ref<HTMLParagraphElement | null>()
const isHoverInfo = useElementHover(infoBtn)
</script>
