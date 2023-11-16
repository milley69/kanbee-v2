<template>
  <div class="drawer max-w-[100vw] lg:drawer-open">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <header-navbar>
      <slot />
    </header-navbar>
    <header-aside />
  </div>
</template>
