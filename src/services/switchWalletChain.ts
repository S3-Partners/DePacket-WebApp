import { toQuantity } from 'ethers'
import { getChainConfig } from '@safe-global/safe-gateway-typescript-sdk'
import { ConnectedWallet, connectWallet, getConnectedWallet } from '@/hooks/wallets/useOnboard'
import { isHardwareWallet, isWalletConnect } from '@/utils/wallets'
import { OnboardAPI } from '@web3-onboard/core'
import get from 'lodash/get'

export const switchWalletChain = async (onboard: OnboardAPI, chainId: string): Promise<ConnectedWallet | null> => {
  const currentWallet = getConnectedWallet(onboard.state.get().wallets)
  if (!currentWallet) return null

  // Onboard incorrectly returns WalletConnect's chainId, so it needs to be switched unconditionally
  if (currentWallet.chainId === chainId && !isWalletConnect(currentWallet)) {
    return currentWallet
  }

  // Hardware wallets cannot switch chains
  if (isHardwareWallet(currentWallet)) {
    await onboard.disconnectWallet({ label: currentWallet.label })
    const wallets = await connectWallet(onboard, { autoSelect: currentWallet.label })
    return wallets ? getConnectedWallet(wallets) : null
  }

  // Onboard doesn't update immediately and otherwise returns a stale wallet if we directly get its state
  return new Promise((resolve) => {
    const source$ = onboard.state.select('wallets').subscribe((newWallets) => {
      const newWallet = getConnectedWallet(newWallets)
      if (newWallet && newWallet.chainId === chainId) {
        source$.unsubscribe()
        resolve(newWallet)
      }
    })

    // Switch chain for all other wallets
    switchOrAddChain(currentWallet.provider, chainId).catch(() => {
      source$.unsubscribe()
      resolve(currentWallet)
    })
  })
}

async function switchOrAddChain(walletProvider: ConnectedWallet['provider'], chainId: string): Promise<void> {
  const UNKNOWN_CHAIN_ERROR_CODE = 4902
  const hexChainId = toQuantity(parseInt(chainId))

  try {
    return await walletProvider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: hexChainId }],
    })
  } catch (error) {
    const errorCode = get(error, 'code') as number | undefined

    // Rabby emits the same error code as MM, but it is nested
    const nestedErrorCode = get(error, 'data.originalError.code') as number | undefined

    if (errorCode === UNKNOWN_CHAIN_ERROR_CODE || nestedErrorCode === UNKNOWN_CHAIN_ERROR_CODE) {
      const chain = await getChainConfig(chainId)

      return walletProvider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: hexChainId,
            chainName: chain.chainName,
            nativeCurrency: chain.nativeCurrency,
            rpcUrls: [chain.publicRpcUri.value],
            blockExplorerUrls: [new URL(chain.blockExplorerUriTemplate.address).origin],
          },
        ],
      })
    }

    throw error
  }
}
