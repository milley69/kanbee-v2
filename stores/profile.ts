import type { IStats } from '@/types'
import { defineStore } from 'pinia'

export const useProfile = defineStore('ProfilePinia', () => {
  const { user } = storeToRefs(useUser())
  const { locale } = useI18n()

  const formatted = useDateFormat(user.value?.createdAt, 'DD.MM.YYYY', { locales: locale.value })

  const dayBefore = computed(() => {
    if (!user.value?.createdAt) return 0
    const diffInTime = new Date().getTime() - new Date(user.value?.createdAt).getTime()
    const diffInDays = Math.round(diffInTime / 8.64e7)
    if (diffInDays > 1) {
      return locale.value === 'en_US' ? `That's ${diffInDays} days` : `Это ${diffInDays} дней`
    } else {
      return locale.value === 'ru_RU' ? `Это ${diffInDays} день` : `That's ${diffInDays} day`
    }
  })

  const stats = ref(<IStats[]>[
    { title: 'profile.since', value: formatted.value, desc: dayBefore.value },
    { title: 'profile.created', value: user.value?.createdProjects },
    { title: 'profile.count', value: user.value?.projectsId.length },
    { title: 'profile.cycle', value: user.value?.cycleTimer },
  ])
  const statsItems = ref(<number[]>[])
  const statsItemsHide = ref(<number[]>[0, 1, 2, 3])

  const change = (idx: number) => {
    if (statsItems.value.includes(idx)) {
      const id = statsItems.value.findIndex((el) => el === idx)
      if (id !== -1) statsItems.value.splice(id, 1)
      statsItemsHide.value.push(idx)
    } else {
      const id = statsItemsHide.value.findIndex((el) => el === idx)
      if (id !== -1) statsItemsHide.value.splice(id, 1)
      statsItems.value.push(idx)
    }
    updateLS()
  }

  const randomize = () => {
    statsItems.value.sort(() => (Math.random() > 0.5 ? 1 : -1))
    updateLS()
  }

  const updateLS = () => localStorage.setItem('kanbee-stat-profile', JSON.stringify(statsItems.value))

  const initProfile = () => {
    const lsStat = localStorage.getItem('kanbee-stat-profile')
    if (lsStat) statsItems.value = JSON.parse(lsStat)
    else statsItems.value = [0, 1, 2]
    statsItems.value.forEach((el) => {
      const idx = statsItemsHide.value.findIndex((item) => item === el)
      if (idx !== -1) statsItemsHide.value.splice(idx, 1)
    })
  }

  return {
    statsItems,
    stats,
    change,
    randomize,
    initProfile,
  }
})
