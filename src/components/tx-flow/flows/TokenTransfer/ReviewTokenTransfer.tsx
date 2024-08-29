import { useContext, useEffect, useMemo } from 'react'
// import useBalances from '@/hooks/useBalances'
import SignOrExecuteForm, { type SubmitCallback } from '@/components/tx/SignOrExecuteForm'
import SendAmountBlock from '@/components/tx-flow/flows/TokenTransfer/SendAmountBlock'
// import SendToBlock from '@/components/tx/SendToBlock'
import { createTokenTransferParams } from '@/services/tx/tokenTransferParams'
// import { createTx } from '@/services/tx/tx-sender'
import type { TokenTransferParams } from '.'
import { SafeTxContext } from '../../SafeTxProvider'
import { safeParseUnits } from '@/utils/formatters'
import { TokenType, type TokenInfo } from '@/types/common'

const ReviewTokenTransfer = ({
  params,
  onSubmit,
  txNonce,
}: {
  params: TokenTransferParams
  onSubmit: SubmitCallback
  txNonce?: number
}) => {
  const { setSafeTx, setSafeTxError, setNonce } = useContext(SafeTxContext)
  // const { balances } = useBalances()
  // const token = balances.items.find((item) => item.tokenInfo.address === params.tokenAddress)

  // const amountInWei = useMemo(
  //   () => safeParseUnits(params.amount, token?.tokenInfo.decimals)?.toString() || '0',
  //   [params.amount, token?.tokenInfo.decimals],
  // )
  const amountInWei = 1000
  const token = {
    tokenInfo: { type: TokenType.ERC20, address: '0x0', decimals: 18, symbol: 'MTK', name: 'MyToken', logoUri: '' },
  }

  useEffect(() => {
    if (txNonce !== undefined) {
      setNonce(txNonce)
    }

    // if (!token) return

    const txParams = createTokenTransferParams(
      params.recipient,
      params.amount,
      // token.tokenInfo.decimals,
      18,
      '0x0',
    )

    // createTx(txParams, txNonce).then(setSafeTx).catch(setSafeTxError)
  }, [params, txNonce, setNonce, setSafeTx, setSafeTxError])

  return (
    <SignOrExecuteForm onSubmit={onSubmit}>
      {token && <SendAmountBlock amountInWei={amountInWei} tokenInfo={token.tokenInfo} />}

      {/* <SendToBlock address={params.recipient} /> */}
    </SignOrExecuteForm>
  )
}

export default ReviewTokenTransfer
