<template>
  <div class="drawer-side z-40">
    <label for="drawer" class="drawer-overlay" aria-label="Close menu"></label>
    <aside class="bg-base-200 w-80 h-[inherit] border-r border-base-content/30 flex flex-col justify-between pt-0">
      <div>
        <div class="bg-base-200 sticky top-0 z-20 flex items-center gap-2 bg-opacity-90 py-2 backdrop-blur h-16 ml-8">
          <i class="bx bx-book-heart bx-mm"></i>
          <nuxt-link to="/" class="font-semibold"> Kanbee </nuxt-link>
        </div>
        <header-main-links>
          <div class="h-4"></div>
          <lazy-header-projects />
        </header-main-links>
      </div>
      <div class="px-4 mb-4">
        <header-actions />
      </div>
    </aside>
  </div>
</template>
