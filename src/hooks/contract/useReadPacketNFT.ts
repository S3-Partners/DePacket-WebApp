import useWallet from '@/hooks/wallets/useWallet'
import { ethers } from 'ethers'
import ReadPacketNFT_ABI from '@/abi/ReadPacketNFT.json'
import { READPACKETNFT_ADDRESS } from '@/constant/contract'

const useReadPacketNFT = () => {
  const wallet = useWallet()
  const mintNftFunc = async (address: string | undefined, uri: string) => {
    if (wallet) {
      try {
        const provider = new ethers.BrowserProvider(wallet.provider)
        const signer = await provider.getSigner()
        const readPacketNFT = new ethers.Contract(READPACKETNFT_ADDRESS, ReadPacketNFT_ABI, signer)
        // const address = '0xd51b4c5483513CF83071fb2E0dF7dbf30c4AC503'
        // const uri = '123123123'
        const result = await readPacketNFT.mint(address, uri)
        console.log('result', result)
        return result
      } catch (error) {
        console.error('Error reading contract:', error)
      }
    }
  }

  return {
    mintNftFunc,
  }
}

export default useReadPacketNFT
