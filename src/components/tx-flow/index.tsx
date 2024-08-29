'use client'
import { createContext, ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import useChainId from '@/hooks/useChainId'
import usePacketAddress from '@/hooks/usePacketAddress'
import { usePathname } from 'next/navigation'
import TxModalDialog from '@/components/common/TxModalDialog'
import { SuccessScreenFlow } from './flows'

const noop = () => {}

export type ModalContextType = {
  flow: JSX.Element | undefined
  setFlow: (txFlow: ModalContextType['flow'], onClose?: () => void, shouldWarn?: boolean) => void
  setFullWidth: (fullWidth: boolean) => void
}

export const ModalContext = createContext<ModalContextType>({
  flow: undefined,
  setFlow: noop,
  setFullWidth: noop,
})

const confirmClose = () => {
  return confirm('Closing this window will discard your current progress.')
}

export const ModalProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [flow, setFlow] = useState<ModalContextType['flow']>(undefined)
  const [fullWidth, setFullWidth] = useState<boolean>(false)
  const shouldWarn = useRef<boolean>(true)
  const onClose = useRef<() => void>(noop)
  const packetId = useChainId() + usePacketAddress()
  const prevPacketId = useRef<string>(packetId ?? '')
  const pathname = usePathname()
  const prevPathname = useRef<string | null>(pathname)

  const handleModalClose = useCallback(() => {
    if (shouldWarn.current && !confirmClose()) {
      return
    }

    onClose.current()
    onClose.current = noop
    setFlow(undefined)
  }, [])

  // Open a new flow, close the previous one if any
  const setNewFlow = useCallback(
    (newTxFlow: ModalContextType['flow'], newOnClose?: () => void, newShouldWarn?: boolean) => {
      setFlow((prev) => {
        if (prev === newTxFlow) return prev

        // If a new flow is triggered, close the current one
        if (prev && newTxFlow && newTxFlow.type !== SuccessScreenFlow) {
          if (shouldWarn.current && !confirmClose()) {
            return prev
          }
          onClose.current()
        }

        onClose.current = newOnClose ?? noop
        shouldWarn.current = newShouldWarn ?? true

        return newTxFlow
      })
    },
    [],
  )
  // Close the modal when the user navigates to a different Safe or route
  useEffect(() => {
    if (packetId === prevPacketId.current && pathname === prevPathname.current) return

    prevPacketId.current = packetId
    prevPathname.current = pathname

    if (flow) {
      handleModalClose()
    }
  }, [flow, packetId, pathname, handleModalClose])

  return (
    <ModalContext.Provider value={{ flow, setFlow: setNewFlow, setFullWidth }}>
      {children}

      <TxModalDialog open={!!flow} onClose={handleModalClose} fullWidth={fullWidth}>
        {flow}
      </TxModalDialog>
    </ModalContext.Provider>
  )
}
