import { minLength, safeParse, string, toTrimmed } from 'valibot'

const UsernameSchema = string([toTrimmed(), minLength(1, 'Пожалуйста, введите ваше имя.')])
// maxLength(10, 'Извините, но максимум 10 символов'),

export const useValidator = () => {
  const validateUsername = (username: string) => {
    const result = safeParse(UsernameSchema, username)
    if (result.success) return { success: true, error: null }
    return { success: false, error: result.issues }
  }
  return { validateUsername }
}
