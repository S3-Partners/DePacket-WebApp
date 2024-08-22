'use client'

import { useHydrateStore } from '@/store'
import useLoadableStores from './useLoadableStores'
import { useInitOnboard } from './wallets/useOnboard'

export const useInit = (reduxStore: any) => {
  useHydrateStore(reduxStore)
  useLoadableStores()
  useInitOnboard()
}
