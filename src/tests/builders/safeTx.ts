import { Builder, type IBuilder } from '@/tests/Builder'
import { faker } from '@faker-js/faker'
import type { PacketSignature, PacketTransaction } from '@/types/tx'
// import { ZERO_ADDRESS } from '@safe-global/protocol-kit/dist/src/utils/constants'

// TODO: Convert to builder
export const createSafeTx = (data = '0x'): PacketTransaction => {
  return {
    data: {
      to: '0x0000000000000000000000000000000000000000',
      value: '0x0',
      data,
      operation: 0,
      nonce: 100,
    },
    signatures: new Map([]),
    addSignature: function (sig: PacketSignature): void {
      this.signatures.set(sig.signer, sig)
    },
    encodedSignatures: function (): string {
      return Array.from(this.signatures)
        .map(([, sig]) => {
          return [sig.signer, sig.data].join(' = ')
        })
        .join('; ')
    },
  } as PacketTransaction
}

export function safeTxBuilder(): IBuilder<PacketTransaction> {
  return Builder.new<PacketTransaction>().with({
    data: {
      to: faker.finance.ethereumAddress(),
      value: '0x0',
      data: faker.string.hexadecimal({ length: faker.number.int({ max: 500 }) }),
      operation: 0,
      nonce: faker.number.int(),
      packetTxGas: faker.number.toString(),
      gasPrice: faker.number.toString(),
      gasToken: '0x0',
      baseGas: faker.number.toString(),
      refundReceiver: faker.finance.ethereumAddress(),
    },
    signatures: new Map([]),
    addSignature: function (sig: PacketSignature): void {
      this.signatures!.set(sig.signer, sig)
    },
    encodedSignatures: function (): string {
      return Array.from(this.signatures!)
        .map(([, sig]) => {
          return [sig.signer, sig.data].join(' = ')
        })
        .join('; ')
    },
  })
}

export function safeSignatureBuilder(): IBuilder<PacketSignature> {
  return Builder.new<PacketSignature>().with({
    signer: faker.finance.ethereumAddress(),
    data: faker.string.hexadecimal({ length: faker.number.int({ max: 500 }) }),
  })
}
