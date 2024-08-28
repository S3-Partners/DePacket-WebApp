import useWallet from '@/hooks/wallets/useWallet'
import { ethers } from 'ethers'
import ERC6551Account from '@/abi/ERC6551Account.json'

// const CONTRACT_ADDRESS = '0x8f67ff5233dD6733a9338197C53CA076098400Ba'
const CONTRACT_ADDRESS = '0x15467f9a899dFDef3361FaC4BEaA9520F6C41423'

const useRedPacket = () => {
  const wallet = useWallet()

  const executeFunc = async () => {
    if (wallet) {
      try {
        const provider = new ethers.BrowserProvider(wallet.provider)
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ERC6551Account, provider)

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
