// import { SENTINEL_ADDRESS } from '@safe-global/protocol-kit/dist/src/utils/constants'
import memoize from 'lodash/memoize'
// import { getMultiSendCallOnlyDeployment } from '@safe-global/safe-deployments'
// import type { SafeInfo } from '@safe-global/safe-gateway-typescript-sdk'
// import type { Delay } from '@gnosis.pm/zodiac'
// import type { TransactionAddedEvent } from '@gnosis.pm/zodiac/dist/cjs/types/Delay'
import { toBeHex, type JsonRpcProvider, type TransactionReceipt } from 'ethers'
import { trimTrailingSlash } from '@/utils/url'
import { sameAddress } from '@/utils/addresses'
// import { isMultiSendCalldata } from '@/utils/transaction-calldata'
// import { decodeMultiSendTxs } from '@/utils/transactions'

export const MAX_RECOVERER_PAGE_SIZE = 100

export type RecoveryQueueItem = {
  timestamp: bigint
  validFrom: bigint
  expiresAt: bigint | null
  isMalicious: boolean
  executor: string
}

export type RecoveryStateItem = {
  address: string
  recoverers: Array<string>
  expiry: bigint
  delay: bigint
  txNonce: bigint
  queueNonce: bigint
  queue: Array<RecoveryQueueItem>
}

export type RecoveryState = Array<RecoveryStateItem>
