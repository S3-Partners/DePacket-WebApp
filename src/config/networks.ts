interface NetworkShortName {
  shortName: string
  chainId: Number
}

export const networks: NetworkShortName[] = [
  { shortName: 'eth', chainId: 1 },
  { shortName: 'sep', chainId: 11155111 },
  { shortName: 'gno', chainId: 100 },
  { shortName: 'matic', chainId: 137 },
  { shortName: 'zkevm', chainId: 1101 },
  { shortName: 'bnb', chainId: 56 },
  { shortName: 'arb1', chainId: 42161 },
  { shortName: 'oeth', chainId: 10 },
  { shortName: 'base', chainId: 8453 },
  { shortName: 'linea', chainId: 59144 },
  { shortName: 'zksync', chainId: 324 },
  { shortName: 'scr', chainId: 534352 },
  { shortName: 'xlayer', chainId: 196 },
  { shortName: 'celo', chainId: 42220 },
  { shortName: 'avax', chainId: 43114 },
  { shortName: 'aurora', chainId: 1313161554 },
  { shortName: 'basesep', chainId: 84532 },
]
