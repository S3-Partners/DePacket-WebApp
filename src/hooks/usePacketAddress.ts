import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { parsePrefixedAddress } from '@/utils/addresses'

const usePacketAddress = (): string => {
  const { safe = '' } = useParams()
  const fullAddress = Array.isArray(safe) ? safe[0] : safe

  const checksummedAddress = useMemo(() => {
    if (!fullAddress) return ''
    const { address } = parsePrefixedAddress(fullAddress)
    return address
  }, [fullAddress])

  return checksummedAddress
}

export default usePacketAddress
