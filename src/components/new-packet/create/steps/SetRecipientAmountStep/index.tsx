import { InputAdornment, Tooltip, SvgIcon, Typography, Box, Divider, Button, Grid } from '@mui/material'
import { FormProvider, useForm, Validate } from 'react-hook-form'
// import { useMnemonicSafeName } from '@/hooks/useMnemonicName'
import InfoIcon from '@/public/images/notifications/info.svg'
import NetworkSelector from '@/components/common/NetworkSelector'
import type { StepRenderProps } from '@/components/new-packet/CardStepper/useCardStepper'
import type { NewPacketFormData } from '@/components/new-packet/create'

import css from '@/components/new-packet/create/steps/SetNameStep/styles.module.css'
import layoutCss from '@/components/new-packet/create/styles.module.css'
import useIsWrongChain from '@/hooks/useIsWrongChain'
import NetworkWarning from '@/components/new-packet/create/NetworkWarning'
import NameInput from '@/components/common/NameInput'
import { CREATE_PACKET_EVENTS, trackEvent } from '@/services/analytics'
import { AppRoutes } from '@/config/routes'
import MUILink from '@mui/material/Link'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import NoWalletConnectedWarning from '../../NoWalletConnectedWarning'
import { type PacketVersion } from '@/types/safeInfo'
import { useCurrentChain } from '@/hooks/useChains'
import { useEffect, useState } from 'react'
// import { getLatestSafeVersion } from '@/utils/chains'

type SetRecipientStepForm = {
  recipient: string
  amount: number
  packetVersion: PacketVersion
}

enum SetRecipientStepFields {
  recipient = 'recipient',
  amount = 'amount',
  packetVersion = 'packetVersion',
}

const SET_NAME_STEP_FORM_ID = 'create-packet-set-recipient-amount-step-form'

function SetRecipientAmountStep({
  data,
  onSubmit,
  setRecipient,
  setAmount,
  ...props
}: StepRenderProps<NewPacketFormData> & {
  setRecipient: (recipient: string) => void
  setAmount: (amount: number) => void
}) {
  const [error, setError] = useState<boolean>(false)
  const [helperText, setHelperText] = useState<string>('')
  const router = useRouter()
  const fallbackRecipient = ''
  const fallbackAmount = ''
  const isWrongChain = useIsWrongChain()

  const chain = useCurrentChain()

  const formMethods = useForm<SetRecipientStepForm>({
    mode: 'all',
    defaultValues: data,
  })

  const {
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = formMethods

  const onFormSubmit = (data: Pick<NewPacketFormData, 'recipient' | 'amount'>) => {
    const { recipient, amount } = data
    setRecipient(recipient)
    setAmount(amount)
    onSubmit({ ...data, recipient, amount })

    if (data.recipient) {
      trackEvent(CREATE_PACKET_EVENTS.RECIPIENT)
    }
  }

  const onBack = () => {
    trackEvent(CREATE_PACKET_EVENTS.CANCEL_CREATE_SAFE_FORM)
    props.onBack()
  }

  const validateAmount: Validate<string> = (value) => {
    return parseInt(value) > 0 || 'Amount must be greater than 0'
  }

  // whenever the chain switches we need to update the latest Safe version
  useEffect(() => {
    setValue(SetRecipientStepFields.packetVersion, '0.0.1')
  }, [chain, setValue])

  const isDisabled = isWrongChain || !isValid

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onFormSubmit)} id={SET_NAME_STEP_FORM_ID}>
        <Box className={layoutCss.row}>
          <NameInput
            required
            name={SetRecipientStepFields.recipient}
            label={errors?.[SetRecipientStepFields.recipient]?.message || 'Recipient'}
            placeholder={fallbackRecipient}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <Tooltip
                  title="This recipient address is stored locally and will never be shared with us or any third parties."
                  arrow
                  placement="top"
                >
                  <InputAdornment position="end">
                    <SvgIcon component={InfoIcon} inheritViewBox />
                  </InputAdornment>
                </Tooltip>
              ),
            }}
          />
        </Box>
        <Divider />
        <Box className={layoutCss.row}>
          <NameInput
            required
            name={SetRecipientStepFields.amount}
            label={errors?.[SetRecipientStepFields.amount]?.message || 'Amount'}
            placeholder={fallbackAmount}
            InputLabelProps={{ shrink: true }}
            type="number"
            validate={validateAmount}
            InputProps={{
              inputProps: { min: 0 },
              endAdornment: (
                <Tooltip
                  title="This amount is stored locally and will never be shared with us or any third parties."
                  arrow
                  placement="top"
                >
                  <InputAdornment position="end">
                    <SvgIcon component={InfoIcon} inheritViewBox />
                  </InputAdornment>
                </Tooltip>
              ),
            }}
          />
        </Box>
        <Divider />
        <Box className={layoutCss.row}>
          <Box display="flex" flexDirection="row" justifyContent="space-between" gap={3}>
            <Button data-testid="cancel-btn" variant="outlined" onClick={onBack} size="small">
              back
            </Button>
            <Button data-testid="next-btn" type="submit" variant="contained" size="stretched" disabled={isDisabled}>
              Next
            </Button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  )
}

export default SetRecipientAmountStep
