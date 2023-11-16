import type { IStats } from '@/types'
import { defineStore } from 'pinia'

export const useProfile = defineStore('ProfilePinia', () => {
  const { user } = storeToRefs(useUser())
  const { getLocale } = useLocales()

  const formatted = useDateFormat(user.value?.createdAt, 'DD.MM.YYYY', { locales: getLocale() })

  const dayBefore = computed(() => {
    if (!user.value?.createdAt) return 0
    const diffInTime = new Date().getTime() - new Date(user.value?.createdAt).getTime()
    const diffInDays = Math.round(diffInTime / 8.64e7)
    return diffInDays > 1 ? `${diffInDays} days` : `${diffInDays} day`
  })

  const stats = ref(<IStats[]>[
    { title: `You've been with us since`, value: formatted.value, desc: `That's ${dayBefore.value}` },
    { title: `Projects you created`, value: user.value?.createdProjects },
    { title: 'Count projects', value: user.value?.projectsId.length },
    { title: 'Cycle Timer', value: user.value?.cycleTimer },
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
