<template>
  <section class="">
    <div class="prose prose-sm md:prose-base w-full max-w-4xl flex-grow pt-10">
      <h1>Help</h1>
      <p>Не большая памятка для комфортной работы в Kanbee</p>
      <ul class="list-none">
        <li>
          <lazy-ui-help-title
            title="Переименование колонки"
            id="rename-column"
            :is-hash="whichHash === '#rename-column'"
          />
          <i class="block"><code>Работает только у создателя проекта</code></i>
          <p>
            При нажатии на название колонки, появиться обводка для редактирования, сохранение будет произведено после
            того как Вы смените фокус на, что- то другое.
          </p>
        </li>
        <li>
          <lazy-ui-help-title
            title="Удаление колонки"
            id="deleting-column"
            :is-hash="whichHash === '#deleting-column'"
          />
          <i class="block"><code>Работает только у создателя проекта</code></i>
          <p>
            Следуя инструкции из <a href="#rename-column">#Переименование колонки</a>, Вам нужно удалить название
            полностью и дополнительно нажать на
            <kbd class="kbd kbd-xs" :class="{ 'text-neutral-content': isDark }">backspace</kbd>. <br />
            <span class="bg-warning/20">
              <i class="bx bx-error bx-fw"></i> Будьте осторожны ведь при удалении колонки все задачи что были в ней
              будут безвозвратно удалены.
            </span>
          </p>
        </li>
        <li>
          <lazy-ui-help-title title="Удаление задачи" id="deleting-task" :is-hash="whichHash === '#deleting-task'" />
          <i class="block"><code>Работает только у создателя проекта</code></i>
          <p>
            <span><i class="bx bx-desktop bx-fw"></i>: </span>
            При выборе задачи путем нажатия
            <kbd class="kbd kbd-xs" :class="{ 'text-neutral-content': isDark }">ЛКМ</kbd>, появиться обводка и далее при
            нажатии <kbd class="kbd kbd-xs" :class="{ 'text-neutral-content': isDark }">backspace</kbd>, задача
            удалиться без Вашего подтверждения.
          </p>
          <p>
            <span><i class="bx bx-mobile-alt bx-fw"></i>: </span>
            При выборе задачи путем нажатия, появиться в правом верхнем углу
            <kbd class="kbd" :class="{ 'text-neutral-content': isDark }">x</kbd>, при нажатии на него, задача удалиться
            без Вашего подтверждения.
          </p>
        </li>
        <li>
          <lazy-ui-help-title title="Клонирование задачи" id="cloning-task" :is-hash="whichHash === '#cloning-task'" />
          <p>
            <span><i class="bx bx-desktop bx-fw"></i>: </span>
            При перетаскивании задачи удерживайте
            <kbd class="kbd kbd-xs" :class="{ 'text-neutral-content': isDark }">ALT</kbd>, таким образом задача будет
            скопирована.
          </p>
          <p>
            <span><i class="bx bx-mobile-alt bx-fw"></i>: </span>
            Не поддерживается.
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
