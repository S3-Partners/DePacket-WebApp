'use client'
import { AppRoutes } from '@/config/routes'
import { Paper, SvgIcon, Typography, Divider, Box, Button, Link } from '@mui/material'
import SafeLogo from '@/public/images/logo-text.svg'
import css from './styles.module.css'
import { useRouter } from 'next/navigation'
import useWallet from '@/hooks/wallets/useWallet'
import { useCallback, useEffect, useState } from 'react'
import WalletLogin from './WalletLogin'

const WelcomeLogin = () => {
  const router = useRouter()
  const wallet = useWallet()
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const onLogin = useCallback(() => {
    setShouldRedirect(true)
  }, [])

  useEffect(() => {
    if (!shouldRedirect) return

    // if (wallet && isLoaded) {
    //   if (hasSafes) {
    //     router.push({ pathname: AppRoutes.welcome.accounts, query: router.query })
    //   } else {
    //     trackEvent(CREATE_SAFE_EVENTS.OPEN_SAFE_CREATION)
    //     router.push({ pathname: AppRoutes.newSafe.create, query: router.query })
    //   }
    // }
  }, [router, wallet, shouldRedirect])

  return (
    <Paper className={css.loginCard} data-testid="welcome-login">
      <Box className={css.loginContent}>
        {/* <SvgIcon component={SafeLogo} inheritViewBox sx={{ height: '24px', width: '80px', ml: '-8px' }} /> */}

        <Typography variant="h6" mt={6} fontWeight={700}>
          Get started
        </Typography>

        <Typography mb={2} textAlign="center">
          {wallet
            ? 'Open your existing Packet Accounts or create a new one'
            : 'Connect your wallet to create a new 「Packet」 Account or open an existing one'}
        </Typography>

        <WalletLogin onLogin={onLogin} />
      </Box>
    </Paper>
  )
}

export default WelcomeLogin
