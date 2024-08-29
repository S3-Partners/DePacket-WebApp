import { useWeb3ReadOnly } from '@/hooks/wallets/web3'
import useWallet from '@/hooks/wallets/useWallet'
import useAsync from '@/hooks/useAsync'
import { useCurrentChain } from '@/hooks/useChains'
import { type SafeCreationProps } from '@/components/new-packet/create/logic'
import { type PacketVersion } from '@/types/safeInfo'

// export const useEstimateSafeCreationGas = (
//   safeParams: SafeCreationProps,
//   safeVersion?: SafeVersion,
// ): {
//   gasLimit?: bigint
//   gasLimitError?: Error
//   gasLimitLoading: boolean
// } => {
//   const web3ReadOnly = useWeb3ReadOnly()
//   const chain = useCurrentChain()
//   const wallet = useWallet()

//   const [gasLimit, gasLimitError, gasLimitLoading] = useAsync<bigint>(() => {
//     if (!wallet?.address || !chain || !web3ReadOnly) return

//     return estimateSafeCreationGas(chain, web3ReadOnly, wallet.address, safeParams, safeVersion)
//   }, [wallet, chain, web3ReadOnly, safeParams, safeVersion])

//   return { gasLimit, gasLimitError, gasLimitLoading }
// }
