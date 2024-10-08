import type { Dispatch, SetStateAction } from 'react'
import { type ReactElement } from 'react'
// import { useRouter } from "next/router";
import { IconButton, Paper } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import classnames from 'classnames'
import css from './styles.module.css'
// import ConnectWallet from "@/components/common/ConnectWallet";
// import NetworkSelector from "@/components/common/NetworkSelector";
// import NotificationCenter from "@/components/notification-center/NotificationCenter";
// import SafeLogo from "@/public/images/logo.svg";
// import SafeLogoMobile from "@/public/images/logo-no-text.svg";
import Link from 'next/link'
import ConnectWallet from '../ConnectWallet'
import NetworkSelector from '../NetworkSelector'

type HeaderProps = {
  onMenuToggle?: Dispatch<SetStateAction<boolean>>
  onBatchToggle?: Dispatch<SetStateAction<boolean>>
}

// function getLogoLink(router: ReturnType<typeof useRouter>): Url {
//   return router.pathname === AppRoutes.home || !router.query.safe
//     ? router.pathname === AppRoutes.welcome.accounts
//       ? AppRoutes.welcome.index
//       : AppRoutes.welcome.accounts
//     : { pathname: AppRoutes.home, query: { safe: router.query.safe } };
// }

const Header = ({ onMenuToggle, onBatchToggle }: HeaderProps): ReactElement => {
  // const chainId = useChainId()
  // const safeAddress = useSafeAddress()
  // const showSafeToken = safeAddress && !!getSafeTokenAddress(chainId)
  // const router = useRouter(integration);
  // const enableWc = useHasFeature(FEATURES.NATIVE_WALLETCONNECT)

  // If on the home page, the logo should link to the Accounts or Welcome page, otherwise to the home page
  // const logoHref = getLogoLink(router);

  // const handleMenuToggle = () => {
  //   if (onMenuToggle) {
  //     onMenuToggle((isOpen) => !isOpen);
  //   } else {
  //     router.push(logoHref);
  //   }
  // };

  const handleBatchToggle = () => {
    if (onBatchToggle) {
      onBatchToggle((isOpen) => !isOpen)
    }
  }

  return (
    <Paper className={css.container}>
      <div className={classnames(css.element, css.menuButton)}>
        {onMenuToggle && (
          <IconButton size="large" color="default" aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}
      </div>

      <div className={classnames(css.element, css.logoMobile)}>
        <Link href={''} passHref>
          {/* <SafeLogoMobile alt="Safe logo" /> */}
          RED「PACKET」
        </Link>
      </div>

      <div className={classnames(css.element, css.hideMobile, css.logo)}>
        <Link href={''} passHref className="text-white">
          {/* <SafeLogo alt="Safe logo" /> */}
          <span className="text-white">RED「PACKET」</span>
        </Link>
      </div>

      {/* {showSafeToken && (
        <div className={classnames(css.element, css.hideMobile)}>
          <SafeTokenWidget />
        </div>
      )} */}

      {/* <div className={css.element}>
        <NotificationCenter />
      </div> */}

      {/* {safeAddress && (
        <div className={classnames(css.element, css.hideMobile)}>
          <BatchIndicator onClick={handleBatchToggle} />
        </div>
      )} */}

      <div className={classnames(css.element, css.connectWallet)}>
        <ConnectWallet />
      </div>

      <div className={classnames(css.element, css.networkSelector)}>
        <NetworkSelector />
      </div>
    </Paper>
  )
}

export default Header
