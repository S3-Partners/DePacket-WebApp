import useERC6551Account from '@/hooks/contract/useERC6551Account'
import useRedPacketFactory from '@/hooks/contract/useRedPacketFactory'
import useWallet from '@/hooks/wallets/useWallet'
import { Button } from '@mui/material'
import { ReactElement } from 'react'
import useERC20 from '@/hooks/contract/useERC20'

type OpenButtonProps = {}

const OpenButton = ({ openSuccess }: { openSuccess: () => void }): ReactElement => {
  const ERC6551Account = useERC6551Account()
  const RedPacketFactory = useRedPacketFactory()
  const wallet = useWallet()
  const ERC20 = useERC20()

  const openclick = () => {
    openSuccess()
    RedPacketFactory.getAccount(10).then((account) => {
      console.log('account', account)
      ERC20.getTokenBalance(account).then((balance) => {
        console.log('balance', balance)
        const data = ERC6551Account.encodeTransferFunctionData(balance)
        console.log('encodeData', data)
        ERC6551Account.executeFunc(account, data).then((res) => {
          console.log('executeFunc', res)
          res.wait().then((receipt: any) => {
            console.log('Contract method was executed successfully')
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
      <Button variant="contained" color="error" onClick={openclick}>
        OPEN
      </Button>
    </>
  )
}

export default OpenButton
