interface NetworkShortName {
  shortName: string
  chainId: Number
}

export const networks: NetworkShortName[] = [
  { shortName: 'ethereum', chainId: 1 },
  { shortName: 'sepolia', chainId: 11155111 },
]
