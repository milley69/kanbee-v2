export const useStorage = () => {
  const { $supabase } = useNuxtApp()
  const { user } = storeToRefs(useUser())

  const imageMeow: string[] = ['meow1.png', 'meow2.png', 'meow3.png', 'meow4.png', 'meow5.png']

  const updateAvatar = async (image: FormData) => {
    if (!user.value) return false
    const oldAvatar = user.value.avatar.split('/')[8]
    try {
      if (!imageMeow.includes(oldAvatar)) {
        const { error: errorDel } = await $supabase.storage.from('avatars').remove([oldAvatar])
        if (errorDel) throw errorDel
      }
      const id = Math.floor(Number(new Date()) * Math.random())
      const { error } = await $supabase.storage.from('avatars').upload(`${id}.png`, image, { upsert: true })
      if (error) throw error
      await updateAvatarInDB(id)
      return true
    } catch (error) {
      console.log('error: ', error)
      return false
    }
  }

  const updateAvatarInDB = async (id: number) => {
    if (!user.value) return
    const avatar = `https://drimoiqxfujniunvknha.supabase.co/storage/v1/object/public/avatars/${id}.png`
    await $supabase.from('profiles').update({ avatar }).eq('id', user.value.id)
    user.value.avatar = avatar
  }

  return { updateAvatar }
}
