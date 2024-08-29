import { useParams } from 'next/navigation'
import { sanitizeUrl } from '@/utils/url'
import { useEffect, useMemo, useState } from 'react'

const useSafeAppUrl = (): string | undefined => {
  const params = useParams()
  const [appUrl, setAppUrl] = useState<string | undefined>()

  useEffect(() => {
    setAppUrl(params.appUrl?.toString())
  }, [params])

  return useMemo(() => (appUrl ? sanitizeUrl(appUrl) : undefined), [appUrl])
}

export { useSafeAppUrl }
