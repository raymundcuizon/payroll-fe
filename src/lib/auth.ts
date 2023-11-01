import { User } from 'next-auth'
import axiosInstance from '../interceptor'

type LoginFn = (username: string, password: string) => Promise<User>

type ILoginResponse = {
  id: number
  username: string
  email: string
  firstname: string
  lastname: string
  mobileNumber?: string
  userType?: string
  accessToken?: string
  refreshToken?: string
  type?: string
  activationCode?: string
}

export const login: LoginFn = async (username, password) => {
  try {
    const response = await axiosInstance.post('/api/auth/signin', {
      email: username,
      password: password,
    })

    const loginResponse: ILoginResponse = response.data

    const name =
      loginResponse.firstname === 'n/a'
        ? loginResponse.username
        : `${loginResponse.firstname}  ${loginResponse.lastname}`

    return {
      email: loginResponse.email,
      id: loginResponse.id,
      name: name,
    }
  } catch (error) {
    throw new Error('User Not Found!')
  }
}
