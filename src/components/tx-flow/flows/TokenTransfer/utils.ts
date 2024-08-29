// import useIsOnlySpendingLimitBeneficiary from '@/hooks/useIsOnlySpendingLimitBeneficiary'
// import useSpendingLimit from '@/hooks/useSpendingLimit'
// import { useVisibleBalances } from '@/hooks/useVisibleBalances'
import useWallet from '@/hooks/wallets/useWallet'
import { useAppSelector } from '@/store'
import { TokenInfo, TokenType } from '@/types/common'
// import { selectSpendingLimits } from '@/store/slices/spendingLimitsSlice'
import { sameAddress } from '@/utils/addresses'
import { type SafeBalanceResponse } from '@safe-global/safe-gateway-typescript-sdk'

export const useTokenAmount = (selectedToken: SafeBalanceResponse['items'][0] | undefined) => {
  // const spendingLimit = useSpendingLimit(selectedToken?.tokenInfo)

  // const spendingLimitAmount = BigInt(spendingLimit?.amount || 0) - BigInt(spendingLimit?.spent || 0)
  const spendingLimitAmount = BigInt(0) - BigInt(0)
  const totalAmount = BigInt(selectedToken?.balance || 0)

  return { totalAmount, spendingLimitAmount }
}

export const useVisibleTokens = () => {
  // const isOnlySpendingLimitBeneficiary = useIsOnlySpendingLimitBeneficiary()
  // const { balances } = useVisibleBalances()
  // const spendingLimits = useAppSelector(selectSpendingLimits)
  const wallet = useWallet()

  // if (isOnlySpendingLimitBeneficiary) {
  //   return balances.items.filter(({ tokenInfo }) => {
  //     return spendingLimits?.some(({ beneficiary, token }) => {
  //       return sameAddress(beneficiary, wallet?.address) && sameAddress(tokenInfo.address, token.address)
  //     })
  //   })
  // }

  // return balances.items
  const items: {
    tokenInfo: TokenInfo
    balance: string
    fiatBalance: string
    fiatConversion: string
  }[] = [
    {
      tokenInfo: {
        type: TokenType.ERC20,
        address: '0x123',
        decimals: 18,
        name: 'Token Name',
        symbol: 'TKN',
        logoUri: '',
      },
      fiatBalance: '0',
      balance: '0',
      fiatConversion: '',
    },
  ]

  return items
}
