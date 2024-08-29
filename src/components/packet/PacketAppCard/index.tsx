import Link from 'next/link'
import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { resolveHref } from 'next/dist/client/resolve-href'
import classNames from 'classnames'
import type { ReactNode, SyntheticEvent } from 'react'
import type { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk'
import type { NextRouter } from 'next/router'

import type { UrlObject } from 'url'
import SafeAppIconCard from '@/components/safe-apps/SafeAppIconCard'
import SafeAppActionButtons from '@/components/safe-apps/SafeAppActionButtons'
import SafeAppTags from '@/components/safe-apps/SafeAppTags'
import { isOptimizedForBatchTransactions } from '@/components/safe-apps/utils'
import { AppRoutes } from '@/config/routes'
import BatchIcon from '@/public/images/apps/batch-icon.svg'
import css from './styles.module.css'
import { PackgData } from '@/types/packgeModelList'

type PackgeAppCard = {
  safeApp: PackgData
  onClickSafeApp?: () => void
  isBookmarked?: boolean
  onBookmarkSafeApp?: (safeAppId: number) => void
  removeCustomApp?: (safeApp: SafeAppData) => void
  openPreviewDrawer?: (safeApp: SafeAppData) => void
}

const SafeAppCard = ({
  safeApp,
  onClickSafeApp,
  isBookmarked,
  onBookmarkSafeApp,
  removeCustomApp,
  openPreviewDrawer,
}: PackgeAppCard) => {
  // const router = useRouter()

  // const safeAppUrl = getSafeAppUrl(router, safeApp.url)

  return (
    <SafeAppCardGridView
      safeApp={safeApp}
      safeAppUrl={''}
      isBookmarked={isBookmarked}
      onBookmarkSafeApp={onBookmarkSafeApp}
      removeCustomApp={removeCustomApp}
      onClickSafeApp={onClickSafeApp}
      openPreviewDrawer={openPreviewDrawer}
    />
  )
}

export default SafeAppCard

export const getSafeAppUrl = (router: NextRouter, safeAppUrl: string) => {
  const shareUrlObj: UrlObject = {
    pathname: AppRoutes.apps.open,
    query: { safe: router.query.safe, appUrl: safeAppUrl },
  }

  return resolveHref(router, shareUrlObj)
}

type SafeAppCardViewProps = {
  safeApp: PackgData
  onClickSafeApp?: () => void
  safeAppUrl: string
  isBookmarked?: boolean
  onBookmarkSafeApp?: (safeAppId: number) => void
  removeCustomApp?: (safeApp: SafeAppData) => void
  openPreviewDrawer?: (safeApp: SafeAppData) => void
}

const SafeAppCardGridView = ({
  safeApp,
  onClickSafeApp,
  safeAppUrl,
  isBookmarked,
  onBookmarkSafeApp,
  removeCustomApp,
  openPreviewDrawer,
}: SafeAppCardViewProps) => {
  return (
    <SafeAppCardContainer safeAppUrl={safeAppUrl} onClickSafeApp={onClickSafeApp} height="100%">
      {/* Safe App Header */}
      <CardHeader className={css.safeAppHeader} action={<>{/* Safe App Action Buttons */}</>} />

      <CardContent className={css.safeAppContent}>
        {/* Safe App Title */}
        <Typography className={css.safeAppTitle} gutterBottom variant="h5">
          {/* {safeApp.name} */}
        </Typography>

        {/* Safe App Description */}
        <Typography className={css.safeAppDescription} variant="body2" color="text.secondary">
          {/* {safeApp.description} */}
        </Typography>

        {/* Safe App Tags */}
      </CardContent>
    </SafeAppCardContainer>
  )
}

type SafeAppCardContainerProps = {
  onClickSafeApp?: () => void
  safeAppUrl: string
  children: ReactNode
  height?: string
  className?: string
}

export const SafeAppCardContainer = ({
  children,
  safeAppUrl,
  onClickSafeApp,
  height,
  className,
}: SafeAppCardContainerProps) => {
  const handleClickSafeApp = (event: SyntheticEvent) => {
    if (onClickSafeApp) {
      event.preventDefault()
      onClickSafeApp()
    }
  }

  return (
    <Link href={safeAppUrl} passHref rel="noreferrer" onClick={handleClickSafeApp}>
      <Card className={classNames(css.safeAppContainer, className)} sx={{ height }}>
        {children}
      </Card>
    </Link>
  )
}
