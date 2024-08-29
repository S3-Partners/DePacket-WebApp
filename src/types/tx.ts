import { EIP712TypedData } from './signatures'

export declare enum OperationType {
  Call = 0, // 0
  DelegateCall = 1,
}

export interface MetaTransactionData {
  to: string
  value: string
  data: string
  operation?: OperationType
}
export interface PacketTransactionData extends MetaTransactionData {
  operation: OperationType
  packetTxGas: string
  baseGas: string
  gasPrice: string
  gasToken: string
  refundReceiver: string
  nonce: number
}
export interface PacketTransactionDataPartial extends MetaTransactionData {
  packetTxGas?: string
  baseGas?: string
  gasPrice?: string
  gasToken?: string
  refundReceiver?: string
  nonce?: number
}
export interface PacketSignature {
  readonly signer: string
  readonly data: string
  readonly isContractSignature: boolean
  staticPart(dynamicOffset?: string): string
  dynamicPart(): string
}
export interface PacketTransaction {
  readonly data: PacketTransactionData
  readonly signatures: Map<string, PacketSignature>
  getSignature(signer: string): PacketSignature | undefined
  addSignature(signature: PacketSignature): void
  encodedSignatures(): string
}
export interface PacketMessage {
  readonly data: EIP712TypedData | string
  readonly signatures: Map<string, PacketSignature>
  getSignature(signer: string): PacketSignature | undefined
  addSignature(signature: PacketSignature): void
  encodedSignatures(): string
}
export type Transaction = TransactionBase & TransactionOptions
interface TransactionBase {
  to: string
  value: string
  data: string
}
export interface TransactionOptions {
  from?: string
  gasLimit?: number | string
  gasPrice?: number | string
  maxFeePerGas?: number | string
  maxPriorityFeePerGas?: number | string
  nonce?: number
}
export interface BaseTransactionResult {
  hash: string
}
export interface TransactionResult extends BaseTransactionResult {
  transactionResponse: unknown
  options?: TransactionOptions
}
