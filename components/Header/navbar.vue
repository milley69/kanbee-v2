<template>
  <div class="drawer-content">
    <div
      class="bg-base-200 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur-md border-b border-base-content/30"
    >
      <nav class="navbar w-full pr-5">
        <div class="flex flex-1 md:gap-1 lg:gap-2">
          <span class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]" data-tip="Menu">
            <label aria-label="Open menu" for="drawer" class="btn btn-square btn-ghost drawer-button lg:hidden">
              <i class="bx bx-menu bx-sm"></i>
            </label>
          </span>
        </div>
        <div class="flex-0 space-x-2">
          <ui-notification />
          <ui-theme-switcher />
        </div>
      </nav>
    </div>
    <slot />
  </div>
</template>
