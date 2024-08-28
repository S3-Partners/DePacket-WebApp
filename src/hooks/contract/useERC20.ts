import useWallet from '@/hooks/wallets/useWallet'
import { ethers } from 'ethers'
import { abi as erc20Abi } from '@openzeppelin/contracts/build/contracts/ERC20.json'
import { ERC20_ADDRESS } from '@/constant/contract'

const useERC20 = () => {
  const wallet = useWallet()

  const getTokenBalance = async (address: string | undefined) => {
    if (wallet) {
      try {
        const provider = new ethers.BrowserProvider(wallet.provider)
        const contract = new ethers.Contract(ERC20_ADDRESS, erc20Abi, provider)

        return await contract.balanceOf(address)
      } catch (error) {
        console.error('Error reading contract:', error)
      }
    }
  }

  return {
    getTokenBalance,
  }
}

export default useERC20
