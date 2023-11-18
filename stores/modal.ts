import { defineStore } from 'pinia'

export type ModalType = 'membersDetail' | 'create' | 'profile-stat' | ''

export const useModal = defineStore('ModalPinia', () => {
  const isActive = ref(false)
  const modalType = ref(<ModalType>'')
  const projectTitle = ref('')
  const columnTitle = ref('')

  const openModal = (type: ModalType, title?: string, column?: string) => {
    isActive.value = true
    modalType.value = type
    // if (title && column) {
    projectTitle.value = title ?? ''
    columnTitle.value = column ?? ''
    // }
  }

  const closeModal = () => {
    isActive.value = false
    modalType.value = ''
    projectTitle.value = ''
    columnTitle.value = ''
  }

  return { isActive, modalType, projectTitle, columnTitle, openModal, closeModal }
})
