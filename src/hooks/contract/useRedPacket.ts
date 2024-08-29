import useWallet from '@/hooks/wallets/useWallet'
import { ethers } from 'ethers'
import ERC6551Account from '@/abi/ERC6551Account.json'
import { REDPACKET_ADDRESS } from '@/config/constants'

const useRedPacket = () => {
  const wallet = useWallet()

  const executeFunc = async () => {
    if (wallet) {
      try {
        const provider = new ethers.BrowserProvider(wallet.provider)
        const contract = new ethers.Contract(REDPACKET_ADDRESS, ERC6551Account, provider)

        const to = '0xRecipientAddress'
        const value = ethers.parseEther('0')
        const data = '0x'
        const operation = 0

        const result = await contract.execute(to, value, data, operation)
        console.log('result', result)
      } catch (error) {
        console.error('Error reading contract:', error)
      }
    }
  }

  return {
    executeFunc,
  }
}

export default useRedPacket
