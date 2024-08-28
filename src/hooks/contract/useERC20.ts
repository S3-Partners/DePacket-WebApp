import useWallet from '@/hooks/wallets/useWallet'
import { ethers } from 'ethers'
import ERC6551Account_ABI from '@/abi/ERC6551Account.json'
import { abi as erc20Abi } from '@openzeppelin/contracts/build/contracts/ERC20.json'

const CONTRACT_ADDRESS = '0xc32cE2198B123D1c1F7FD3A9f54Bff9f975819Fa'

const useERC20 = () => {
  const wallet = useWallet()

  const getTokenBalance = async (address: string | undefined) => {
    if (wallet) {
      try {
        const provider = new ethers.BrowserProvider(wallet.provider)
        const contract = new ethers.Contract(CONTRACT_ADDRESS, erc20Abi, provider)

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
