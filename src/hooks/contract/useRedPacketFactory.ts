import useWallet from '@/hooks/wallets/useWallet'
import { ethers } from 'ethers'
import RedPacketFactory_ABI from '@/abi/RedPacketFactory.json'

const CONTRACT_ADDRESS = '0xe3D25F88835Ab7a1761eb2234A2608B25d3487c0'

const useRedPacketFactory = () => {
  const wallet = useWallet()

  const getAccount = async (tokenId: number) => {
    if (wallet) {
      try {
        const provider = new ethers.BrowserProvider(wallet.provider)
        const contract = new ethers.Contract(CONTRACT_ADDRESS, RedPacketFactory_ABI, provider)

        return await contract.getAccount(tokenId)
      } catch (error) {
        console.error('Error reading contract:', error)
      }
    }
  }

  return {
    getAccount,
  }
}

export default useRedPacketFactory
