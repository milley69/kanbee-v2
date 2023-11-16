import { ValiError, email, minLength, object, parse, string, toTrimmed } from 'valibot'

type Type = 'signIn' | 'signUp'
const signInSchema = object({
  email: string([
    toTrimmed(),
    minLength(1, 'Пожалуйста, введите свой адрес электронной почты.'),
    email('Адрес электронной почты не правильного формата.'),
  ]),
  password: string([
    minLength(1, 'Пожалуйста, введите пароль.'),
    minLength(6, 'Ваш пароль должен состоять из 8 или более символов.'),
  ]),
})
const signUpSchema = object({
  name: string([minLength(1, 'Пожалуйста, введите ваше имя.')]),
  email: string([
    toTrimmed(),
    minLength(1, 'Пожалуйста, введите свой адрес электронной почты.'),
    email('Адрес электронной почты не правильного формата.'),
  ]),
  password: string([
    minLength(1, 'Пожалуйста, введите пароль.'),
    minLength(6, 'Ваш пароль должен состоять из 8 или более символов.'),
  ]),
})

interface UserData {
  email: string
  password: string
  name?: string
}

export const useAuthValidator = ({ email, password, name }: UserData, type: Type) => {
  const { setError, removeError } = useUser()
  removeError()
  let body

  try {
    if (type == 'signIn') {
      body = parse(signInSchema, { email, password })
    } else if (type == 'signUp') {
      body = parse(signUpSchema, { email, password, name })
    }
    return { valid: true, body }
  } catch (error: any) {
    console.log('error: ', error.message)
    let errors: Record<string, string | any> = {}
    if (error instanceof ValiError) {
      const valiIssues = error.issues
      for (const element of valiIssues) {
        errors['message'] = element.message
        if (element.path) errors['key'] = element.path[0].key
        break
      }
      console.log('errors: ', errors)
      setError(errors.key, errors.message)
    }
    return false
  }
}
