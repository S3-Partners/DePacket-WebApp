import { ReactElement, useContext, useEffect, useState } from 'react'

import classnames from 'classnames'
import css from './styles.module.css'
import Header from '@/components/common/Header'
import LoadingError from '../LoadingError'
import Footer from '../Footer'
import { useIsSidebarRoute } from '@/hooks/useIsSidebarRoute'
import SideDrawer from './SideDrawer'
import { ModalContext } from '@/components/tx-flow'

const PageLayout = ({ pathname, children }: { pathname: string; children: ReactElement }): ReactElement => {
  const [isSidebarRoute, isAnimated] = useIsSidebarRoute(pathname)
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true)
  const [isBatchOpen, setBatchOpen] = useState<boolean>(false)
  const { setFullWidth } = useContext(ModalContext)

  useEffect(() => {
    setFullWidth(!isSidebarOpen)
  }, [isSidebarOpen, setFullWidth])

  return (
    <>
      <header className={css.header}>
        <Header onMenuToggle={isSidebarRoute ? setSidebarOpen : undefined} onBatchToggle={setBatchOpen} />{' '}
      </header>

      {isSidebarRoute && <SideDrawer isOpen={isSidebarOpen} onToggle={setSidebarOpen} />}

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
