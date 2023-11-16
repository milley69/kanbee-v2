import endSound from '@/src/audio/bells.wav'
import startSound from '@/src/audio/click.wav'
import pauseSound from '@/src/audio/pop.mp3'
import type { ITimer, StatusTimer } from '@/types'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useTimer = defineStore('TimerPinia', () => {
  const { updateCycleTimer } = useDatabase()

  const times = reactive(<ITimer>{ pomodoro: 0, break: 0, longBreak: 0 })

  const isOpen = ref(false)
  const settingsTimer = reactive({
    isOpen: false,
    isSound: true,
    timer: <ITimer>{ pomodoro: 40, break: 5, longBreak: 15 },
  })
  const steps = ref(0)
  const status = ref(<StatusTimer>'pomodoro')
  const isStart = ref(false)

  const sounds: Record<string, HTMLAudioElement> = {}

  const initAudio = () => {
    sounds.start = new Audio(startSound)
    sounds.pause = new Audio(pauseSound)
    sounds.end = new Audio(endSound)

    for (const key in sounds) {
      if (Object.prototype.hasOwnProperty.call(sounds, key)) {
        sounds[key].volume = 0.2
      }
    }
  }

  const timerInterval = ref(<ReturnType<typeof setInterval> | undefined>undefined)

  const pomoTimer = computed(() => {
    let min = Math.trunc(times.pomodoro / 1000 / 60) % 60
    let sec = Math.trunc(times.pomodoro / 1000) % 60
    return {
      minutes: min > 9 ? min : `0${min}`,
      seconds: sec > 9 ? sec : `0${sec}`,
    }
  })
  const breakTimer = computed(() => {
    let min = Math.trunc(times.break / 1000 / 60) % 60
    let sec = Math.trunc(times.break / 1000) % 60
    return {
      minutes: min > 9 ? min : `0${min}`,
      seconds: sec > 9 ? sec : `0${sec}`,
    }
  })
  const longBreakTimer = computed(() => {
    let min = Math.trunc(times.longBreak / 1000 / 60) % 60
    let sec = Math.trunc(times.longBreak / 1000) % 60
    return {
      minutes: min > 9 ? min : `0${min}`,
      seconds: sec > 9 ? sec : `0${sec}`,
    }
  })
  const changeStatus = (toStatus: StatusTimer) => {
    status.value = toStatus
  }
  const changeStart = () => {
    isStart.value = !isStart.value
  }
  const changeStep = (inc = '+') => {
    if (inc === '+') steps.value++
    else steps.value--
  }

  const playSound = (nameSound: 'start' | 'pause' | 'end') => {
    if (!settingsTimer.isSound) return
    switch (nameSound) {
      case 'start':
        sounds.start.play()
        break
      case 'pause':
        sounds.pause.play()
        break
      case 'end':
        sounds.end.play()
        break
    }
  }

  const start = () => {
    playSound('start')
    const SECONDS = 1000

    switch (status.value) {
      case 'pomodoro':
        timerInterval.value = setInterval(() => {
          times.pomodoro = times.pomodoro - SECONDS
          if (times.pomodoro === 0) changeTimer()
        }, SECONDS)
        break
      case 'break':
        timerInterval.value = setInterval(() => {
          times.break = times.break - SECONDS
          if (times.break === 0) changeTimer()
        }, SECONDS)
        break
      case 'longBreak':
        timerInterval.value = setInterval(() => {
          times.longBreak = times.longBreak - SECONDS
          if (times.longBreak === 0) changeTimer()
        }, SECONDS)
        break
    }

    changeStart()
  }
  const changeTimer = async () => {
    playSound('pause')
    stop()

    if (status.value === 'pomodoro' && steps.value < 4) {
      changeStatus('break')
      reset()
      start()
    } else if (status.value === 'pomodoro') {
      changeStatus('longBreak')
      reset()
      start()
    } else if (status.value === 'break' && steps.value < 4) {
      changeStatus('pomodoro')
      reset()
      changeStep()
      start()
    } else if (status.value === 'longBreak') {
      await updateCycleTimer()
      changeStatus('pomodoro')
      reset(true)
    }
    playSound('end')
  }

  const reset = (full = false) => {
    if (full) steps.value = 0
    initTimer()
  }

  const stop = () => {
    clearInterval(timerInterval.value)
    changeStart()
  }

  const initTimer = () => {
    initAudio()
    const userTime = localStorage.getItem('kanbee-timer-setting')
    if (userTime) {
      const meow = JSON.parse(userTime)
      settingsTimer.isSound = meow.isSound
      settingsTimer.timer.pomodoro = meow.pomodoro
      settingsTimer.timer.break = meow.break
      settingsTimer.timer.longBreak = meow.longBreak
    }
    for (const [key, val] of Object.entries(settingsTimer.timer)) {
      if (val > 60) settingsTimer.timer[key as keyof ITimer] = 60
      if (val <= 0) settingsTimer.timer[key as keyof ITimer] = 1

      times[key as keyof ITimer] = val * 60 * 1000
    }
  }
  const close = () => {
    isOpen.value = false
    stop()
  }

  const changeSettings = (isChangeTimer = true) => {
    localStorage.setItem(
      'kanbee-timer-setting',
      JSON.stringify({ ...settingsTimer.timer, isSound: settingsTimer.isSound })
    )
    if (isChangeTimer)
      for (const [key, val] of Object.entries(settingsTimer.timer)) {
        if (val > 60) settingsTimer.timer[key as keyof ITimer] = 59
        if (val <= 0) settingsTimer.timer[key as keyof ITimer] = 1

        times[key as keyof ITimer] = val * 60 * 1000
      }
  }

  return {
    times,
    steps,
    isOpen,
    status,
    isStart,
    pomoTimer,
    breakTimer,
    settingsTimer,
    longBreakTimer,
    changeSettings,
    changeStatus,
    changeStart,
    changeStep,
    initTimer,
    reset,
    start,
    close,
    stop,
  }
})
