import useWallet from '@/hooks/wallets/useWallet'
import { ethers } from 'ethers'
import ERC6551Account_ABI from '@/abi/ERC6551Account.json'

// const CONTRACT_ADDRESS = '0x8f67ff5233dD6733a9338197C53CA076098400Ba'
const ERC20_ADDRESS = '0xc32cE2198B123D1c1F7FD3A9f54Bff9f975819Fa'

const useRedPacket = () => {
  const wallet = useWallet()

  const executeFunc = async (address: string, encodeData: string) => {
    if (wallet) {
      try {
        const provider = new ethers.BrowserProvider(wallet.provider)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(address, ERC6551Account_ABI, signer)
        const value = 0
        const operation = 0
        return contract.execute(ERC20_ADDRESS, value, encodeData, operation)
      } catch (error) {
        console.error('Error reading contract:', error)
      }
    }
  }

  const encodeFunctionData = (value: string) => {
    const abi = ['function transfer(address to, uint256 amount) public returns (bool)']
    const iface = new ethers.Interface(abi)
    const data = iface.encodeFunctionData('transfer', [wallet?.address, ethers.parseUnits(value)])
    return data
  }

  return {
    executeFunc,
    encodeFunctionData,
  }
}

export default useRedPacket
