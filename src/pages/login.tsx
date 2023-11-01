import React, { useEffect } from 'react'
import type { ReactElement } from 'react'
import Head from 'next/head'
import CardBox from '../components/CardBox'
import SectionFullScreen from '../components/Section/FullScreen'
import LayoutGuest from '../layouts/Guest'
import { useFormik } from 'formik'
import { signIn, useSession } from 'next-auth/react'

import { useRouter } from 'next/router'
import { getPageTitle } from '../config'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(7),
})

const LoginPage = () => {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      router.push('/')
    }
  }, [router, session])

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      try {
        await signIn('credentials', {
          username: email,
          password: password,
          redirect: false,
        })
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
  })

  const { errors, touched, values, handleChange, handleSubmit } = formik
  const sameClassname =
    'w-full block border placeholder-gray-500 px-5 py-3 leading-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-blue-500 dark:placeholder-gray-400'
  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <SectionFullScreen bg="dark">
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          <header className="mb-10 text-center">
            <h1 className="text-2xl font-bold inline-flex items-center mb-2 space-x-2">
              <svg
                className="hi-mini hi-cube-transparent inline-block w-5 h-5 text-blue-600 dark:text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9.638 1.093a.75.75 0 01.724 0l2 1.104a.75.75 0 11-.724 1.313L10 2.607l-1.638.903a.75.75 0 11-.724-1.313l2-1.104zM5.403 4.287a.75.75 0 01-.295 1.019l-.805.444.805.444a.75.75 0 01-.724 1.314L3.5 7.02v.73a.75.75 0 01-1.5 0v-2a.75.75 0 01.388-.657l1.996-1.1a.75.75 0 011.019.294zm9.194 0a.75.75 0 011.02-.295l1.995 1.101A.75.75 0 0118 5.75v2a.75.75 0 01-1.5 0v-.73l-.884.488a.75.75 0 11-.724-1.314l.806-.444-.806-.444a.75.75 0 01-.295-1.02zM7.343 8.284a.75.75 0 011.02-.294L10 8.893l1.638-.903a.75.75 0 11.724 1.313l-1.612.89v1.557a.75.75 0 01-1.5 0v-1.557l-1.612-.89a.75.75 0 01-.295-1.019zM2.75 11.5a.75.75 0 01.75.75v1.557l1.608.887a.75.75 0 01-.724 1.314l-1.996-1.101A.75.75 0 012 14.25v-2a.75.75 0 01.75-.75zm14.5 0a.75.75 0 01.75.75v2a.75.75 0 01-.388.657l-1.996 1.1a.75.75 0 11-.724-1.313l1.608-.887V12.25a.75.75 0 01.75-.75zm-7.25 4a.75.75 0 01.75.75v.73l.888-.49a.75.75 0 01.724 1.313l-2 1.104a.75.75 0 01-.724 0l-2-1.104a.75.75 0 11.724-1.313l.888.49v-.73a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
              <span>CUIZONE</span>
            </h1>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Welcome, please sign in to your dashboard
            </h2>
          </header>
          <form className="space-y-6 dark:text-gray-100" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                className={sameClassname + (errors.email && touched.email ? ' border-red-600' : '')}
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                placeholder="Enter your email.."
              />
              {errors.email && touched.email && (
                <span className="text-xs text-red-600 mt-1 ml-1">{errors.email}</span>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <input
                className={
                  sameClassname + (errors.password && touched.password ? ' border-red-600' : '')
                }
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                placeholder="Enter your password.."
              />
              {errors.password && touched.password && (
                <span className="text-xs text-red-600 mt-1 ml-1">{errors.password}</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-6 py-3 leading-6 border-blue-700 bg-blue-700 text-white hover:text-white hover:bg-blue-600 hover:border-blue-600 focus:ring focus:ring-blue-400 focus:ring-opacity-50 active:bg-blue-700 active:border-blue-700 dark:focus:ring-blue-400 dark:focus:ring-opacity-90"
            >
              <svg
                className="hi-mini hi-arrow-uturn-right inline-block w-5 h-5 opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Sign In</span>
            </button>
          </form>
          <div className="p-5 md:px-16 grow text-sm text-center bg-gray-50 dark:bg-gray-700/50">
            Don’t have an account yet?
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign up
            </a>
          </div>
        </CardBox>
      </SectionFullScreen>
    </>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}

export default LoginPage

{
}
