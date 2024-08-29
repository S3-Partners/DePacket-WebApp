import { Container, Typography, Grid } from '@mui/material'
import { useRouter } from 'next/navigation'

import useWallet from '@/hooks/wallets/useWallet'
import OverviewWidget from '@/components/new-packet/create/OverviewWidget'
import type { NamedAddress } from '@/components/new-packet/create/types'
import type { TxStepperProps } from '@/components/new-packet/CardStepper/useCardStepper'
import SetNameStep from '@/components/new-packet/create/steps/SetNameStep'
import OwnerPolicyStep from '@/components/new-packet/create/steps/OwnerPolicyStep'
import ReviewStep from '@/components/new-packet/create/steps/ReviewStep'
import { CreateSafeStatus } from '@/components/new-packet/create/steps/StatusStep'
import { CardStepper } from '@/components/new-packet/CardStepper'
import { AppRoutes } from '@/config/routes'
import { CREATE_PACKET_CATEGORY } from '@/services/analytics'
import type { AlertColor } from '@mui/material'
import type { CreateSafeInfoItem } from '@/components/new-packet/create/CreateSafeInfos'
import CreateSafeInfos from '@/components/new-packet/create/CreateSafeInfos'
import { type ReactElement, useContext, useMemo, useState } from 'react'
import ExternalLink from '@/components/common/ExternalLink'
// import { HelpCenterArticle } from '@/config/constants'
import { type PacketVersion } from '@/types/safeInfo'
// import { getLatestSafeVersion } from '@/utils/chains'
import { useCurrentChain } from '@/hooks/useChains'
import SetRecipientAmountStep from './steps/SetRecipientAmountStep'
import { ModalContext } from '@/components/tx-flow'

export type NewPacketFormData = {
  name: string
  recipient: string
  amount: number
  threshold: number
  owners: NamedAddress[]
  saltNonce: number
  packetVersion: PacketVersion
  safeAddress?: string
  willRelay?: boolean
}

const staticHints: Record<
  number,
  { title: string; variant: AlertColor; steps: { title: string; text: string | ReactElement }[] }
> = {
  1: {
    title: 'Red Packet creation',
    variant: 'info',
    steps: [
      {
        title: 'Network fee',
        text: 'Deploying your Red Packet requires the payment of the associated network fee with your connected wallet. An estimation will be provided in the last step.',
      },
      {
        title: 'Address book privacy',
        text: 'The name of your Red Packet will be stored in a local address book on your device and can be changed at a later stage. It will not be shared with us or any third party.',
      },
    ],
  },
  2: {
    title: 'Red Packet creation',
    variant: 'info',
    steps: [
      {
        title: 'Network fee',
        text: 'Deploying your Red Packet requires the payment of the associated network fee with your connected wallet. An estimation will be provided in the last step.',
      },
      {
        title: 'Address book privacy',
        text: 'The name of your Red Packet will be stored in a local address book on your device and can be changed at a later stage. It will not be shared with us or any third party.',
      },
      {
        title: 'Red Packet setup',
        text: (
          <>
            Prepare for your Red Packet?
            <br />
            {/* <ExternalLink href={HelpCenterArticle.SAFE_SETUP} fontWeight="bold">
              Learn more about setting up your Safe Account.
            </ExternalLink> */}
          </>
        ),
      },
    ],
  },
  3: {
    title: 'Safe Account creation',
    variant: 'info',
    steps: [
      {
        title: 'Wait for the creation',
        text: 'Depending on network usage, it can take some time until the transaction is successfully added to the blockchain and picked up by our services.',
      },
    ],
  },
  4: {
    title: 'Safe Account usage',
    variant: 'success',
    steps: [
      {
        title: 'Connect your Safe Account',
        text: 'In our Safe Apps section you can connect your Safe Account to over 70 dApps directly or via Wallet Connect to interact with any application.',
      },
    ],
  },
}

const CreatePacket = () => {
  const router = useRouter()
  const wallet = useWallet()
  const chain = useCurrentChain()
  const { setFlow } = useContext(ModalContext)
  const [packetName, setPacketName] = useState('')
  const [packetRecipient, setPacketRecipient] = useState('')
  const [packetAmount, setPacketAmount] = useState(0)
  const [dynamicHint, setDynamicHint] = useState<CreateSafeInfoItem>()
  const [activeStep, setActiveStep] = useState(0)

  const CreatePacketSteps: TxStepperProps<NewPacketFormData>['steps'] = [
    {
      title: 'Select network and name of your Red Packet',
      subtitle: 'Select the network on which to create your Red Packet',
      render: (data, onSubmit, onBack, setStep) => (
        <SetNameStep setSafeName={setPacketName} data={data} onSubmit={onSubmit} onBack={onBack} setStep={setStep} />
      ),
    },
    {
      title: 'Input recipient and amount to make Red Packet',
      subtitle: 'Please input the correct recipient address and valid amount',
      render: (data, onSubmit, onBack, setStep) => (
        <SetRecipientAmountStep
          setRecipient={setPacketRecipient}
          setAmount={setPacketAmount}
          data={data}
          onSubmit={onSubmit}
          onBack={onBack}
          setStep={setStep}
        />
      ),
    },
    {
      title: 'Review',
      subtitle:
        "You're about to create a new Red Packet and will have to confirm the transaction with your connected wallet.",
      render: (data, onSubmit, onBack, setStep) => (
        <ReviewStep data={data} onSubmit={onSubmit} onBack={onBack} setStep={setStep} />
      ),
    },
    {
      title: '',
      subtitle: '',
      render: (data, onSubmit, onBack, setStep, setProgressColor, setStepData) => (
        <CreateSafeStatus
          data={data}
          onSubmit={onSubmit}
          onBack={onBack}
          setStep={setStep}
          setProgressColor={setProgressColor}
          setStepData={setStepData}
        />
      ),
    },
  ]

  const staticHint = useMemo(() => staticHints[activeStep], [activeStep])

  const initialStep = 0
  const initialData: NewPacketFormData = {
    name: '',
    recipient: '',
    amount: 0,
    owners: [],
    threshold: 1,
    saltNonce: Date.now(),
    packetVersion: '0.0.1' as PacketVersion,
  }

  const onClose = () => {
    setFlow(undefined)
  }

  return (
    <Container>
      <Grid container columnSpacing={3} justifyContent="center" mt={[2, null, 7]}>
        <Grid item xs={12}>
          <Typography variant="h2" pb={2}>
            Create new Red Packet
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} order={[1, null, 0]}>
          <CardStepper
            initialData={initialData}
            initialStep={initialStep}
            onClose={onClose}
            steps={CreatePacketSteps}
            eventCategory={CREATE_PACKET_CATEGORY}
            setWidgetStep={setActiveStep}
          />
        </Grid>

        <Grid item xs={12} md={4} mb={[3, null, 0]} order={[0, null, 1]}>
          <Grid container spacing={3}>
            {activeStep < 2 && (
              <OverviewWidget packetName={packetName} recipient={packetRecipient} amount={packetAmount} />
            )}
            {wallet?.address && <CreateSafeInfos staticHint={staticHint} dynamicHint={dynamicHint} />}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CreatePacket
