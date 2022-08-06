import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import SessionLogin from '@/components/SessionLogin'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SessionLogin />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
