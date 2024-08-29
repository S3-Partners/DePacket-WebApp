import { useCallback } from 'react'
import type { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk'
import type { PackgeModelList } from '@/types/packgeModelList'

import SafeAppCard from '@/components/safe-apps/SafeAppCard'
import AddCustomSafeAppCard from '@/components/safe-apps/AddCustomSafeAppCard'
import SafeAppPreviewDrawer from '@/components/safe-apps/SafeAppPreviewDrawer'
import SafeAppsListHeader from '@/components/safe-apps/SafeAppsListHeader'
import SafeAppsZeroResultsPlaceholder from '@/components/safe-apps/SafeAppsZeroResultsPlaceholder'
import useSafeAppPreviewDrawer from '@/hooks/safe-apps/useSafeAppPreviewDrawer'
import css from './styles.module.css'
import { Skeleton } from '@mui/material'
import { useOpenedSafeApps } from '@/hooks/safe-apps/useOpenedSafeApps'
import PackgeAppCard from '../PacketAppCard'
// import NativeSwapsCard from '@/components/safe-apps/NativeSwapsCard'

type PacketAppListProps = {
  packetAppList: PackgeModelList[]
}

const PacketAppList = ({ packetAppList }: PacketAppListProps) => {
  const handleSafeAppClick = useCallback((packgeList: PackgeModelList[]) => {}, [])

  return (
    <>
      {/* Safe Apps List Header */}
      <SafeAppsListHeader title={'title'} amount={12} />

      <ul data-testid="apps-list" className={css.safeAppsContainer}>
        {/* Flat list filtered by search query */}
        {packetAppList.map((packetApp) => (
          <li key={packetApp.id}>
            <PackgeAppCard
              safeApp={packetApp}
              // isBookmarked={bookmarkedSafeAppsId?.has(packageApp.id)}
              // onBookmarkSafeApp={onBookmarkSafeApp}
              // removeCustomApp={removeCustomApp}
              // onClickSafeApp={handleSafeAppClick(packageApp)}
              // openPreviewDrawer={openPreviewDrawer}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default PacketAppList
