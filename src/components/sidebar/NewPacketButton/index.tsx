import { type ReactElement, useContext } from 'react'
import Button from '@mui/material/Button'
import { OVERVIEW_EVENTS, trackEvent } from '@/services/analytics'
// import CheckWallet from '@/components/common/CheckWallet'
import { ModalContext } from '@/components/tx-flow'
// import { NewTxFlow } from '@/components/tx-flow/flows'
import WatchlistAddButton from '../WatchlistAddButton'
import { NewTxFlow } from '@/components/tx-flow/flows'
import NewPacket from '@/components/new-packet/create'

const NewPacketButton = (): ReactElement => {
  const { setFlow } = useContext(ModalContext)

  const onClick = () => {
    setFlow(<NewPacket />)
    trackEvent({ ...OVERVIEW_EVENTS.NEW_TRANSACTION, label: 'sidebar' })
  }

  return (
    // <CheckWallet allowSpendingLimit noTooltip>
    // {(isOk) =>
    //   isOk ? (
    <Button
      data-testid="new-tx-btn"
      onClick={onClick}
      variant="contained"
      size="small"
      disabled={!true}
      fullWidth
      disableElevation
      sx={{ py: 1.3 }}
    >
      New Red Packet
    </Button>
    // ) : (
    //   <WatchlistAddButton />
    //   )
    // }
    // </CheckWallet>
  )
}

export default NewPacketButton
