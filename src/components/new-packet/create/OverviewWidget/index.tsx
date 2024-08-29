import ChainIndicator from '@/components/common/ChainIndicator'
import WalletOverview from '@/components/common/WalletOverview'
import { useCurrentChain } from '@/hooks/useChains'
import useWallet from '@/hooks/wallets/useWallet'
import { Box, Card, Grid, Typography } from '@mui/material'
import type { ReactElement } from 'react'
import SafeLogo from '@/public/images/logo-no-text.svg'

import css from '@/components/new-packet/create/OverviewWidget/styles.module.css'
import ConnectWalletButton from '@/components/common/ConnectWallet/ConnectWalletButton'

const LOGO_DIMENSIONS = '22px'

function abbreviateAddress(address = '', startLength = 7, endLength = 4) {
  const start = address.slice(0, startLength)
  const end = address.slice(-endLength)
  return `${start}...${end}`
}

const OverviewWidget = ({
  packetName,
  recipient,
  amount,
}: {
  packetName: string
  recipient: string
  amount: number
}): ReactElement | null => {
  const wallet = useWallet()
  const chain = useCurrentChain()
  const rows = [
    ...(wallet ? [{ title: 'Wallet', component: <WalletOverview wallet={wallet} /> }] : []),
    ...(chain ? [{ title: 'Network', component: <ChainIndicator chainId={chain.chainId} inline /> }] : []),
    ...(packetName !== '' ? [{ title: 'Name', component: <Typography>{packetName}</Typography> }] : []),
    ...(recipient !== ''
      ? [{ title: 'Recipient', component: <Typography>{abbreviateAddress(recipient)}</Typography> }]
      : []),
    ...(amount > 0 ? [{ title: 'Amount', component: <Typography>{amount}</Typography> }] : []),
  ]

  return (
    <Grid item xs={12}>
      <Card className={css.card}>
        <div className={css.header}>
          <SafeLogo alt="Safe logo" width={LOGO_DIMENSIONS} height={LOGO_DIMENSIONS} />
          <Typography variant="h4">Your Red Packet Preview</Typography>
        </div>
        {wallet ? (
          rows.map((row) => (
            <div key={row.title} className={css.row}>
              <Typography variant="body2">{row.title}</Typography>
              {row.component}
            </div>
          ))
        ) : (
          <Box p={2}>
            <Typography variant="body2" color="border.main" textAlign="center" width={1} mb={1}>
              Connect your wallet to continue
            </Typography>
            <ConnectWalletButton />
          </Box>
        )}
      </Card>
    </Grid>
  )
}

export default OverviewWidget
