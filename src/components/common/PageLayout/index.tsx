'use client'
import { ReactElement, useState } from 'react'
import { usePathname } from 'next/navigation'

import classnames from 'classnames'
import css from './styles.module.css'
import Header from '@/components/common/Header'
import LoadingError from '../LoadingError'
import Footer from '../Footer'
import { useIsSidebarRoute } from '@/hooks/useIsSidebarRoute'
import { makeStore, useHydrateStore } from '@/store'
import useLoadableStores from '@/hooks/useLoadableStores'

const reduxStore = makeStore()

const InitApp = (): null => {
  useHydrateStore(reduxStore)
  useLoadableStores()
  // useInitOnboard()
  return null
}

const PageLayout = ({ children }: { children: React.ReactNode }): ReactElement => {
  const pathname = usePathname()
  const [isSidebarRoute, isAnimated] = useIsSidebarRoute(pathname)
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true)
  const [isBatchOpen, setBatchOpen] = useState<boolean>(false)

  return (
    <>
      <header className={css.header}>
        <Header onMenuToggle={isSidebarRoute ? setSidebarOpen : undefined} onBatchToggle={setBatchOpen} />{' '}
      </header>

      {/* {isSidebarRoute && <SideDrawer isOpen={isSidebarOpen} onToggle={setSidebarOpen} />} */}

      <div
        className={classnames(css.main, {
          [css.mainNoSidebar]: !isSidebarOpen || !isSidebarRoute,
          [css.mainAnimated]: isSidebarRoute && isAnimated,
        })}
      >
        <div className={css.content}>
          <LoadingError>{children}</LoadingError>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default PageLayout
