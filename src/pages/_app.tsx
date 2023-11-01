import React from 'react'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { store } from '../stores/store'
import { Provider } from 'react-redux'
import '../css/main.css'
import { AuthContextProvider } from '../context/AuthContext'
import Providers from '../context/Provider'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  const title = `Cuizone`

  const description = 'Cuizone'

  return (
    <Provider store={store}>
      <Providers>
        <AuthContextProvider>
          {getLayout(
            <>
              <Head>
                <meta name="description" content={description} />
              </Head>

              <Component {...pageProps} />
            </>
          )}
        </AuthContextProvider>
      </Providers>
    </Provider>
  )
}

export default MyApp
