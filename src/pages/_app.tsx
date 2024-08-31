import { ReactElement, ReactNode, Suspense } from 'react'
import '@/styles/globals.css'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, type Theme } from '@mui/material/styles'
import { ModalProvider } from '@/components/tx-flow'
import PageLayout from '@/components/common/PageLayout'
import createEmotionCache from '@/utils/createEmotionCache'
import { CacheProvider, EmotionCache } from '@emotion/react'
import PacketThemeProvider from '@/components/theme/PacketThemeProvider'
import { useDarkMode } from '@/hooks/useDarkMode'
import WalletProvider from '@/components/common/WalletProvider'
import { Provider } from 'react-redux'
import { makeStore, useHydrateStore } from '../store'
import useLoadableStores from '@/hooks/useLoadableStores'
import { useInitOnboard } from '@/hooks/wallets/useOnboard'
import { useInitSession } from '@/hooks/useInitSession'
import { useInitWeb3 } from '@/hooks/wallets/useInitWeb3'
import { AppProps } from 'next/app'
import Notifications from '@/components/common/Notifications'
import Head from 'next/head'
import MetaTags from '@/components/common/MetaTags'
import { GATEWAY_URL_PRODUCTION, GATEWAY_URL_STAGING, IS_PRODUCTION } from '@/config/constants'
import { cgwDebugStorage } from '@/components/sidebar/DebugToggle'

const GATEWAY_URL = IS_PRODUCTION || cgwDebugStorage.get() ? GATEWAY_URL_PRODUCTION : GATEWAY_URL_STAGING

const reduxStore = makeStore()

const InitApp = () => {
  useHydrateStore(reduxStore)
  useInitSession()
  useLoadableStores()
  useInitOnboard()
  useInitWeb3()
  return null
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

const AppProviders = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const isDarkMode = useDarkMode()
  const themeMode = isDarkMode ? 'dark' : 'light'

  return (
    <PacketThemeProvider mode={themeMode}>
      {(themeMode: Theme) => (
        <ThemeProvider theme={themeMode}>
          <Suspense>
            <WalletProvider>
              <ModalProvider>{children}</ModalProvider>
            </WalletProvider>
          </Suspense>
        </ThemeProvider>
      )}
    </PacketThemeProvider>
  )
}

interface WebCoreAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const WebCoreApp = ({
  Component,
  pageProps,
  router,
  emotionCache = clientSideEmotionCache,
}: WebCoreAppProps): ReactElement => {
  return (
    <Provider store={reduxStore}>
      <Head>
        <title key="default-title">{'Safe{Wallet}'}</title>
        <MetaTags prefetchUrl={GATEWAY_URL} />
      </Head>
      <CacheProvider value={emotionCache}>
        <AppProviders>
          <CssBaseline />
          <InitApp />
          <PageLayout pathname={router.pathname}>
            <Component {...pageProps} />
          </PageLayout>
          <Notifications />
        </AppProviders>
      </CacheProvider>
    </Provider>
  )
}

export default WebCoreApp
