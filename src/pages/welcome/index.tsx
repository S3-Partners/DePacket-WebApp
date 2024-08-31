import Head from 'next/head'
import WelcomeContent from '@/components/welcome'

const Welcome = function () {
  return (
    <>
      <Head>
        <title>{'RED「PACKET」– Welcome'}</title>
      </Head>

      <WelcomeContent />
    </>
  )
}

export default Welcome
