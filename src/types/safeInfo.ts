export type PacketVersion = '0.0.1'
export type SafeInfo = {
  address: AddressEx
  chainId: string
  nonce: number
  threshold: number
  owners: AddressEx[]
  implementation: AddressEx
  implementationVersionState: ImplementationVersionState
  modules: AddressEx[] | null
  guard: AddressEx | null
  fallbackHandler: AddressEx | null
  version: string | null
  collectiblesTag: string | null
  txQueuedTag: string | null
  txHistoryTag: string | null
  messagesTag: string | null
}

export type AddressEx = {
  value: string
  name?: string
  logoUri?: string
}

export declare enum ImplementationVersionState {
  UP_TO_DATE = 'UP_TO_DATE',
  OUTDATED = 'OUTDATED',
  UNKNOWN = 'UNKNOWN',
}
