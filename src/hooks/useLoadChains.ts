import { useEffect } from 'react'
import useAsync, { type AsyncResult } from './useAsync'
import { logError, Errors } from '@/services/exceptions'
import { ChainInfo, ChainListResponse } from '@/types/chains'
import { getChainsConfig } from '@/config/chainData'

const getConfigs = async (): Promise<ChainInfo[]> => {
  const data = await getChainsConfig()
  return (data as ChainListResponse).results || []
}

export const useLoadChains = (): AsyncResult<ChainInfo[]> => {
  const [data, error, loading] = useAsync<ChainInfo[]>(getConfigs, [])

  // Log errors
  useEffect(() => {
    if (error) {
      logError(Errors._620, error.message)
    }
  }, [error])

  return [data, error, loading]
}

export default useLoadChains
