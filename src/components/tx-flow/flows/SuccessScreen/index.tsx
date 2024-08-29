import StatusStepper from './StatusStepper'
import { Button, Container, Divider, Paper } from '@mui/material'
import classnames from 'classnames'
import Link from 'next/link'
import css from './styles.module.css'
import { useAppSelector } from '@/store'
import { PendingStatus, selectPendingTxById } from '@/store/slices/pendingTxsSlice'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useCurrentChain } from '@/hooks/useChains'
import { TxEvent, txSubscribe } from '@/services/tx/txEvents'
import useSafeInfo from '@/hooks/useSafeInfo'
import { ModalContext } from '../..'
import LoadingSpinner, { SpinnerStatus } from '@/components/new-packet/create/steps/StatusStep/LoadingSpinner'
import { ProcessingStatus } from '@/components/tx-flow/flows/SuccessScreen/statuses/ProcessingStatus'
import { IndexingStatus } from '@/components/tx-flow/flows/SuccessScreen/statuses/IndexingStatus'
import { DefaultStatus } from '@/components/tx-flow/flows/SuccessScreen/statuses/DefaultStatus'
import useDecodeTx from '@/hooks/useDecodeTx'
// import { isSwapConfirmationViewOrder } from '@/utils/transaction-guards'
import type { PacketTransaction } from '@/types/tx'
import { getTxLink } from '@/utils/tx-link'

interface Props {
  /** The ID assigned to the transaction in the client-gateway */
  txId?: string
  /** For module transaction, pass the transaction hash while the `txId` is not yet available */
  txHash?: string
  /** The multisig transaction object */
  packetTx?: PacketTransaction
}

const SuccessScreen = ({ txId, txHash, packetTx }: Props) => {
  const [localTxHash, setLocalTxHash] = useState<string | undefined>(txHash)
  const [error, setError] = useState<Error>()
  const { setFlow } = useContext(ModalContext)
  const chain = useCurrentChain()
  const pendingTx = useAppSelector((state) => (txId ? selectPendingTxById(state, txId) : undefined))
  const { safeAddress } = useSafeInfo()
  const status = !txId && txHash ? PendingStatus.INDEXING : pendingTx?.status
  const pendingTxHash = pendingTx && 'txHash' in pendingTx ? pendingTx.txHash : undefined
  const txLink = chain && txId && getTxLink(txId, chain, safeAddress)
  const [decodedData] = useDecodeTx(packetTx)
  // const isSwapOrder = isSwapConfirmationViewOrder(decodedData)

  useEffect(() => {
    if (!pendingTxHash) return

    setLocalTxHash(pendingTxHash)
  }, [pendingTxHash])

  useEffect(() => {
    const unsubFns: Array<() => void> = ([TxEvent.FAILED, TxEvent.REVERTED] as const).map((event) =>
      txSubscribe(event, (detail) => {
        if (detail.txId === txId && pendingTx) setError(detail.error)
      }),
    )

    return () => unsubFns.forEach((unsubscribe) => unsubscribe())
  }, [txId, pendingTx])

  const onClose = useCallback(() => {
    setFlow(undefined)
  }, [setFlow])

  const isSuccess = status === undefined
  const spinnerStatus = error ? SpinnerStatus.ERROR : isSuccess ? SpinnerStatus.SUCCESS : SpinnerStatus.PROCESSING

  let StatusComponent
  switch (status) {
    case PendingStatus.PROCESSING:
    case PendingStatus.RELAYING:
      // status can only have these values if txId & pendingTx are defined
      StatusComponent = <ProcessingStatus txId={txId!} pendingTx={pendingTx!} />
      break
    case PendingStatus.INDEXING:
      StatusComponent = <IndexingStatus />
      break
    default:
      StatusComponent = <DefaultStatus error={error} />
  }

  return (
    <Container
      component={Paper}
      disableGutters
      sx={{
        textAlign: 'center',
        maxWidth: `${900 - 75}px`, // md={11}
      }}
      maxWidth={false}
    >
      <div className={css.row}>
        <LoadingSpinner status={spinnerStatus} />
        {StatusComponent}
      </div>

      {!error && (
        <>
          <Divider />
          <div className={css.row}>
            <StatusStepper status={status} txHash={localTxHash} />
          </div>
        </>
      )}

      <Divider />

      <div className={classnames(css.row, css.buttons)}>
        {/* {isSwapOrder && (
          <Button data-testid="finish-transaction-btn" variant="outlined" size="small" onClick={onClose}>
            Back to swaps
          </Button>
        )} */}

        {txLink && (
          <Link {...txLink} passHref target="_blank" rel="noreferrer" legacyBehavior>
            <Button data-testid="view-transaction-btn" variant={'outlined'} size="small" onClick={onClose}>
              View transaction
            </Button>
          </Link>
        )}

        {/* {!isSwapOrder && (
          <Button data-testid="finish-transaction-btn" variant="contained" size="small" onClick={onClose}>
            Finish
          </Button>
        )} */}
      </div>
    </Container>
  )
}

export default SuccessScreen
