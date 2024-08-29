import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { parsePrefixedAddress } from '@/utils/addresses'

const useSafeAddress = (): string => {
  const queryParams = useParams()
  const { safe = '' } = queryParams
  const fullAddress = Array.isArray(safe) ? safe[0] : safe

  const checksummedAddress = useMemo(() => {
    if (!fullAddress) return ''
    const { address } = parsePrefixedAddress(fullAddress)
    return address
  }, [fullAddress])

  return checksummedAddress
}

export default useSafeAddress
