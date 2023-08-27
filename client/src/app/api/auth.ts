import type { AxiosError } from 'axios'
import type { ISignInFx, ISignUpFx } from '@/types/auth'
import { toast } from 'react-toastify'
import { api } from '@/app/axiosClient'
import { HTTPStatus } from '@/constants'
import { createEffect } from 'effector'

export const singUpFx = createEffect(
  async ({ email, password, url, username }: ISignUpFx) => {
    const { data } = await api.post(url, { email, password, username })

    if (data.warningMessage) {
      toast.warning(data.warningMessage)
      return
    }
    // TODO: rewrite all texts to constants file
    toast.success('Registration completed successfully')

    return data
  }
)

export const singInFx = createEffect(
  async ({ password, url, username }: ISignInFx) => {
    const { data } = await api.post(url, { password, username })

    toast.success('Signed in')

    return data
  }
)

export const checkUserAuthFx = createEffect(async (url: string) => {
  try {
    const { data } = await api.get(url)

    return data
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response) {
      if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
        return false
      }
    }

    toast.error((error as Error).message)
  }
})

export const logoutFx = createEffect(async (url: string) => {
  try {
    await api.get(url)
  } catch (error) {
    toast.error((error as Error).message)
  }
})
