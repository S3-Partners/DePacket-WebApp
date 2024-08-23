'use client'
import Head from 'next/head'
import WelcomeContent from '@/components/welcome'

const Welcome = function () {
  return (
    <>
      <Head>
        <title>{'Safe{Wallet} – Welcome'}</title>
      </Head>

      <WelcomeContent />
    </>
  )
}

export default Welcome
