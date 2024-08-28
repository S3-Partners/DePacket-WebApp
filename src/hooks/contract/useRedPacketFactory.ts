import useWallet from '@/hooks/wallets/useWallet'
import { ethers } from 'ethers'
import RedPacketFactory_ABI from '@/abi/RedPacketFactory.json'
import { REDPACKETFACTORY_ADDRESS } from '@/constant/contract'

const useRedPacketFactory = () => {
  const wallet = useWallet()

  const getAccount = async (tokenId: number) => {
    if (wallet) {
      try {
        const provider = new ethers.BrowserProvider(wallet.provider)
        const contract = new ethers.Contract(REDPACKETFACTORY_ADDRESS, RedPacketFactory_ABI, provider)

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
