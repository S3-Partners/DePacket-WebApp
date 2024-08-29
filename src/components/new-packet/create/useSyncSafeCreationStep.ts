import { useEffect } from 'react'
import type { StepRenderProps } from '@/components/new-packet/CardStepper/useCardStepper'
import type { NewPacketFormData } from '@/components/new-packet/create/index'
import useWallet from '@/hooks/wallets/useWallet'
import useIsWrongChain from '@/hooks/useIsWrongChain'

const useSyncSafeCreationStep = (setStep: StepRenderProps<NewPacketFormData>['setStep']) => {
  const wallet = useWallet()
  const isWrongChain = useIsWrongChain()

  useEffect(() => {
    // Jump to choose name and network step if the wallet is connected to the wrong chain and there is no pending Safe
    if (!wallet || isWrongChain) {
      setStep(0)
      return
    }
  }, [wallet, setStep, isWrongChain])
}

export default useSyncSafeCreationStep
