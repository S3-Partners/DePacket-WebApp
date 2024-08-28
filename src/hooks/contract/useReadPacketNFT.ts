import { ReadPacketNFT } from '@/types/contracts/ReadPacketNFT'
import useWallet from '@/hooks/wallets/useWallet'
import { ethers } from 'ethers'
import ReadPacketNFT_ABI from '@/abi/ReadPacketNFT.json'

const ReadPacketNFT_ADDRESS = '0xD841a44e21c5F0944d1b022C6172865288F3C077'

const useReadPacketNFT = () => {
  const wallet = useWallet()
  const mintNftFunc = async (address: string | undefined, uri: string) => {
    if (wallet) {
      try {
        const provider = new ethers.BrowserProvider(wallet.provider)
        const signer = await provider.getSigner()
        const readPacketNFT = new ethers.Contract(ReadPacketNFT_ADDRESS, ReadPacketNFT_ABI, signer)
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
