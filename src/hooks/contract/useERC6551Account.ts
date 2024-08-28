import useWallet from '@/hooks/wallets/useWallet'
import { ethers } from 'ethers'
import ERC6551Account_ABI from '@/abi/ERC6551Account.json'
import { ERC20_ADDRESS } from '@/constant/contract'

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

  const encodeTransferFunctionData = (value: any) => {
    const abi = ['function transfer(address to, uint256 amount) public returns (bool)']
    const iface = new ethers.Interface(abi)
    const data = iface.encodeFunctionData('transfer', [wallet?.address, value])
    return data
  }

  return {
    executeFunc,
    encodeTransferFunctionData,
  }
}

export default useRedPacket
