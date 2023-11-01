'use client'

import { useContext, createContext, ReactNode } from 'react'
import axiosInstance from '../interceptor'
import { useRouter } from 'next/navigation'
import { setUser } from '../stores/mainSlice'
import { useDispatch } from 'react-redux'

type AuthContextType = {
  signinUsernamePassword: (email: string, password: string) => void
}

const authContextDefaultValues: AuthContextType = {
  signinUsernamePassword: (email, password) => {},
}

type ILoginResponse = {
  id?: number
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

const AuthContext = createContext<AuthContextType>(authContextDefaultValues)

type AuthContextProviderProps = {
  children: ReactNode
}

export const UserAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const signinUsernamePassword = async (email: string, password: string) => {
    const response = await axiosInstance.post('/api/auth/signin', {
      email: email,
      password: password,
    })
    const loginResponse: ILoginResponse = response.data
    if (response.data?.type === 'new_password_required') {
      router.push(`/activationpage/${response.data.activationCode}`)
    } else {
      dispatch(
        setUser({
          name:
            loginResponse.firstname === 'n/a'
              ? loginResponse.username
              : `${loginResponse.firstname}  ${loginResponse.lastname}`,
          email: loginResponse.email,
        })
      )
      router.push('/')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signinUsernamePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
