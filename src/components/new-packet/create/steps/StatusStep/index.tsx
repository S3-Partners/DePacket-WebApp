import { useCounter } from '@/components/common/Notifications/useCounter'
import type { StepRenderProps } from '@/components/new-packet/CardStepper/useCardStepper'
import type { NewPacketFormData } from '@/components/new-packet/create'
import { getRedirect } from '@/components/new-packet/create/logic'
import { updateAddressBook } from '@/components/new-packet/create/logic/address-book'
import StatusMessage from '@/components/new-packet/create/steps/StatusStep/StatusMessage'
import useUndeployedSafe from '@/components/new-packet/create/steps/StatusStep/useUndeployedSafe'
import lightPalette from '@/components/theme/lightPalette'
import { AppRoutes } from '@/config/routes'
// import { safeCreationPendingStatuses } from '@/features/counterfactual/hooks/usePendingSafeStatuses'
import { SafeCreationEvent, safeCreationSubscribe } from '@/features/counterfactual/services/safeCreationEvents'
import { useCurrentChain } from '@/hooks/useChains'
import Rocket from '@/public/images/common/rocket.svg'
import { CREATE_PACKET_EVENTS, trackEvent } from '@/services/analytics'
import { useAppDispatch } from '@/store'
import { Alert, AlertTitle, Box, Button, Paper, Stack, SvgIcon, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
// import { getLatestSafeVersion } from '@/utils/chains'

const SPEED_UP_THRESHOLD_IN_SECONDS = 15

export const CreateSafeStatus = ({
  data,
  setProgressColor,
  setStep,
  setStepData,
}: StepRenderProps<NewPacketFormData>) => {
  const [status, setStatus] = useState<SafeCreationEvent>(SafeCreationEvent.PROCESSING)
  const [safeAddress, pendingSafe] = useUndeployedSafe()
  const router = useRouter()
  const chain = useCurrentChain()
  const dispatch = useAppDispatch()

  const counter = useCounter(pendingSafe?.status.submittedAt)

  // const isError = status === SafeCreationEvent.FAILED || status === SafeCreationEvent.REVERTED

  // useEffect(() => {
  //   const unsubFns = Object.entries(safeCreationPendingStatuses).map(([event]) =>
  //     safeCreationSubscribe(event as SafeCreationEvent, async () => {
  //       setStatus(event as SafeCreationEvent)
  //     }),
  //   )

  //   return () => {
  //     unsubFns.forEach((unsub) => unsub())
  //   }
  // }, [])

  useEffect(() => {
    if (!chain || !safeAddress) return

    // if (status === SafeCreationEvent.SUCCESS) {
    //   dispatch(updateAddressBook(chain.chainId, safeAddress, data.name, data.owners, data.threshold))
    //   router.push(getRedirect(chain.shortName, safeAddress, router.query?.safeViewRedirectURL))
    // }
  }, [dispatch, chain, data.name, data.owners, data.threshold, router, safeAddress, status])

  // useEffect(() => {
  //   if (!setProgressColor) return

  //   if (isError) {
  //     setProgressColor(lightPalette.error.main)
  //   } else {
  //     setProgressColor(lightPalette.secondary.main)
  //   }
  // }, [isError, setProgressColor])

  // const tryAgain = () => {
  //   trackEvent(CREATE_SAFE_EVENTS.RETRY_CREATE_SAFE)

  //   if (!pendingSafe) {
  //     setStep(0)
  //     return
  //   }

  //   setProgressColor?.(lightPalette.secondary.main)
  //   setStep(2)
  //   setStepData?.({
  //     owners: pendingSafe.props.safeAccountConfig.owners.map((owner) => ({ name: '', address: owner })),
  //     name: '',
  //     threshold: pendingSafe.props.safeAccountConfig.threshold,
  //     saltNonce: Number(pendingSafe.props.safeDeploymentConfig?.saltNonce),
  //     safeAddress,
  //     safeVersion: pendingSafe.props.safeDeploymentConfig?.safeVersion ?? getLatestSafeVersion(chain),
  //   })
  // }

  const onCancel = () => {
    trackEvent(CREATE_PACKET_EVENTS.CANCEL_CREATE_SAFE)
  }

  return (
    <Paper
      sx={{
        textAlign: 'center',
      }}
    >
      <Box p={{ xs: 2, sm: 8 }}>
        <StatusMessage status={status} isError={false} pendingSafe={pendingSafe} />

        {counter && counter > SPEED_UP_THRESHOLD_IN_SECONDS && (
          <Alert severity="warning" icon={<SvgIcon component={Rocket} />} sx={{ mt: 5 }}>
            <AlertTitle>
              <Typography variant="body2" textAlign="left" fontWeight="bold">
                Transaction is taking too long
              </Typography>
            </AlertTitle>
            <Typography variant="body2" textAlign="left">
              Try to speed it up with better gas parameters in your wallet.
            </Typography>
          </Alert>
        )}

        {/* {isError && (
          <Stack direction="row" justifyContent="center" gap={2}>
            <Link href={AppRoutes.welcome.index} passHref>
              <Button variant="outlined" onClick={onCancel}>
                Go to homepage
              </Button>
            </Link>
            <Button variant="contained" onClick={tryAgain}>
              Try again
            </Button>
          </Stack>
        )} */}
      </Box>
    </Paper>
  )
}
