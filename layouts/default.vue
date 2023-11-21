<template>
  <Modals :is-active="isActive">
    <ModalsProfileStat v-if="label === 'profile-stat'" />
    <ModalsMembersDetail v-if="label === 'membersDetail'" />
    <ModalsCreate v-if="label === 'create'" :project-title="projectTitle" :column-title="columnTitle" />
  </Modals>

  <LazyTimer />

  <Body class="transition duration-300 max-h-screen">
    <Header>
      <main class="max-w-[100vw] lg:max-w-[calc(100vw-20rem)] px-6 pb-16">
        <nuxt-page />
      </main>
    </Header>
  </Body>

  <client-only>
    <lazy-ui-toast />
  </client-only>
</template>

<script lang="ts" setup>
import type { Toast } from '@/types'

const { isActive, modalType: label, projectTitle, columnTitle } = storeToRefs(useModal())
const { isConnect } = storeToRefs(useSocket())
const { setToast, setToastWithoutDuration, removeToast } = useToast()

// onMounted(async () => {
//   await initProjects()
// })

const toast = ref<Toast | null>(null)
watch(
  () => isConnect.value,
  (val) => {
    if (val && toast.value) {
      removeToast(toast.value)
      toast.value = null
      setToast('success', 'Вы успешно подключились к серверу!')
    } else {
      toast.value = setToastWithoutDuration('error', 'К сожалению вы отключились от сервера. Пробуем переподключить!')
    }
  }
)
</script>
