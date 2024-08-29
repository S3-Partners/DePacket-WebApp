import { OperationType, PacketTransactionData } from './tx'

export interface Eip3770Address {
  prefix: string
  address: string
}
export interface PacketEIP712Args {
  packetAddress: string
  packetVersion: string
  chainId: bigint
  data: PacketTransactionData | EIP712TypedData | string
}
export interface EIP712TxTypes {
  EIP712Domain: {
    type: string
    name: string
  }[]
  packetTx: {
    type: string
    name: string
  }[]
}
export interface EIP712MessageTypes {
  EIP712Domain: {
    type: string
    name: string
  }[]
  packetMessage: [
    {
      type: 'bytes'
      name: 'message'
    },
  ]
}
export type EIP712Types = EIP712TxTypes | EIP712MessageTypes
export interface EIP712TypedDataTx {
  types: EIP712TxTypes
  domain: {
    chainId?: string
    verifyingContract: string
  }
  primaryType: 'PacketTx'
  message: {
    to: string
    value: string
    data: string
    operation: OperationType
    packetTxGas: string
    baseGas: string
    gasPrice: string
    gasToken: string
    refundReceiver: string
    nonce: number
  }
}
export interface EIP712TypedDataMessage {
  types: EIP712MessageTypes
  domain: {
    chainId?: number
    verifyingContract: string
  }
  primaryType: 'PacketMessage'
  message: {
    message: string
  }
}
interface TypedDataDomain {
  name?: string
  version?: string
  chainId?: unknown
  verifyingContract?: string
  salt?: ArrayLike<number> | string
}
interface TypedDataTypes {
  name: string
  type: string
}
type TypedMessageTypes = {
  [key: string]: TypedDataTypes[]
}
export interface EIP712TypedData {
  domain: TypedDataDomain
  types: TypedMessageTypes
  message: Record<string, unknown>
  primaryType?: string
}
export type PacketMultisigConfirmationResponse = {
  readonly owner: string
  readonly submissionDate: string
  readonly transactionHash?: string
  readonly confirmationType?: string
  readonly signature: string
  readonly signatureType?: string
}
export type PacketMultisigConfirmationListResponse = {
  readonly count: number
  readonly next?: string
  readonly previous?: string
  readonly results: PacketMultisigConfirmationResponse[]
}
export type PacketMultisigTransactionResponse = {
  readonly packet: string
  readonly to: string
  readonly value: string
  readonly data?: string
  readonly operation: number
  readonly gasToken: string
  readonly packetTxGas: number
  readonly baseGas: number
  readonly gasPrice: string
  readonly refundReceiver?: string
  readonly nonce: number
  readonly executionDate: string
  readonly submissionDate: string
  readonly modified: string
  readonly blockNumber?: number
  readonly transactionHash: string
  readonly packetTxHash: string
  readonly executor?: string
  readonly proposer: string
  readonly isExecuted: boolean
  readonly isSuccessful?: boolean
  readonly ethGasPrice?: string
  readonly gasUsed?: number
  readonly fee?: string
  readonly origin: string
  readonly dataDecoded?: string
  readonly confirmationsRequired: number
  readonly confirmations?: PacketMultisigConfirmationResponse[]
  readonly trusted: boolean
  readonly signatures?: string
}
