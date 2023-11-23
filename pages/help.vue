<template>
  <section class="">
    <div class="prose prose-sm md:prose-base w-full max-w-4xl flex-grow pt-10">
      <h1>{{ $t('aside.help') }}</h1>
      <p>{{ $t('help.description') }}</p>
      <ul class="list-none">
        <li>
          <lazy-ui-help-title
            :title="$t('help.renameColumn.title')"
            id="rename-column"
            :is-hash="whichHash === '#rename-column'"
          />
          <i class="block">
            <code>{{ $t('help.adminOnly') }}</code>
          </i>

          <p>{{ $t('help.renameColumn.description') }}</p>
        </li>
        <li>
          <lazy-ui-help-title
            :title="$t('help.deletingColumn.title')"
            id="deleting-column"
            :is-hash="whichHash === '#deleting-column'"
          />
          <i class="block"
            ><code>{{ $t('help.adminOnly') }}</code></i
          >
          <p>
            {{ $t('help.deletingColumn.description.0') }}
            <a href="#rename-column">#{{ $t('help.renameColumn.title') }}</a
            >{{ $t('help.deletingColumn.description.1') }}
            <kbd class="kbd kbd-xs" :class="{ 'text-neutral-content': isDark }">backspace</kbd>. <br />
            <span class="bg-warning/20">
              <i class="bx bx-error bx-fw"></i> {{ $t('help.deletingColumn.description.2') }}
            </span>
          </p>
        </li>
        <li>
          <lazy-ui-help-title
            :title="$t('help.deletingTask.title')"
            id="deleting-task"
            :is-hash="whichHash === '#deleting-task'"
          />
          <i class="block"
            ><code>{{ $t('help.adminOnly') }}</code></i
          >
          <p>
            <span><i class="bx bx-desktop bx-fw"></i>: </span>
            {{ $t('help.deletingTask.description.0') }}
            <kbd class="kbd kbd-xs" :class="{ 'text-neutral-content': isDark }">
              {{ $t('help.deletingTask.mouse') }}</kbd
            >
            {{ $t('help.deletingTask.description.1') }}
            <kbd class="kbd kbd-xs" :class="{ 'text-neutral-content': isDark }">backspace</kbd>
            {{ $t('help.deletingTask.description.2') }}
          </p>
          <p>
            <span><i class="bx bx-mobile-alt bx-fw"></i>: </span>
            {{ $t('help.deletingTask.description.3') }}
            <kbd class="kbd" :class="{ 'text-neutral-content': isDark }">x</kbd>
            {{ $t('help.deletingTask.description.4') }}
          </p>
        </li>
        <li>
          <lazy-ui-help-title
            :title="$t('help.cloningTask.title')"
            id="cloning-task"
            :is-hash="whichHash === '#cloning-task'"
          />
          <p>
            <span><i class="bx bx-desktop bx-fw"></i>: </span>
            {{ $t('help.cloningTask.description.0') }}
            <kbd class="kbd kbd-xs" :class="{ 'text-neutral-content': isDark }">ALT</kbd>
            {{ $t('help.cloningTask.description.1') }}
          </p>
          <p>
            <span><i class="bx bx-mobile-alt bx-fw"></i>: </span>
            {{ $t('help.cloningTask.description.2') }}
          </p>
        </li>
      </ul>
    </div>
    <div class="flex justify-center opacity-0 transition-opacity hover:opacity-75">
      <p>Press <kbd class="kbd kbd-sm">F</kbd> to pay respects.</p>
    </div>
  </section>
</template>

<script lang="ts" setup>
useHead({ title: 'Help' })
const { $colorMode } = useNuxtApp()
const isDark = computed(() => $colorMode.value === 'dark')
const whichHash = computed(() => useRoute().hash)
</script>
