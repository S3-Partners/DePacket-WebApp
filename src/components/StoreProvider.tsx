'use client'
import { Provider } from 'react-redux'
import { makeStore, useHydrateStore } from '../store'
import useLoadableStores from '@/hooks/useLoadableStores'
import { useInitOnboard } from '@/hooks/wallets/useOnboard'
import { useInitSession } from '@/hooks/useInitSession'

const reduxStore = makeStore()

const InitApp = () => {
  useHydrateStore(reduxStore)
  useInitSession()
  useLoadableStores()
  useInitOnboard()
  return null
}

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={reduxStore}>
      <InitApp />
      {children}
    </Provider>
  )
}
