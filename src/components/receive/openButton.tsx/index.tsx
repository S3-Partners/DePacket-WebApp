import useERC6551Account from '@/hooks/contract/useERC6551Account'
import useRedPacketFactory from '@/hooks/contract/useRedPacketFactory'
import useWallet from '@/hooks/wallets/useWallet'
import { Button } from '@mui/material'
import { ReactElement } from 'react'
import useERC20 from '@/hooks/contract/useERC20'

type OpenButtonProps = {}

const OpenButton = (): ReactElement => {
  const ERC6551Account = useERC6551Account()
  const RedPacketFactory = useRedPacketFactory()
  const wallet = useWallet()
  const ERC20 = useERC20()

  const openclick = () => {
    RedPacketFactory.getAccount(10).then((account) => {
      console.log('account', account)
      ERC20.getTokenBalance(account).then((balance) => {
        console.log('balance', balance)
        const data = ERC6551Account.encodeTransferFunctionData(balance)
        console.log('encodeData', data)
        ERC6551Account.executeFunc(account, data).then((res) => {
          console.log('executeFunc', res)
          ERC20.getTokenBalance(wallet?.address).then((meRes) => {
            console.log('meRes', meRes)
          })
        })
      })
    })
  }
  const getBalances = () => {
    RedPacketFactory.getAccount(3).then((account) => {
      ERC20.getTokenBalance(account).then((meRes) => {
        console.log('meRes', meRes)
      })
    })
  }

  return (
    <>
      <Button onClick={openclick}>OPEN</Button>
      <Button onClick={getBalances}>getBalances</Button>
    </>
  )
}

export default OpenButton
