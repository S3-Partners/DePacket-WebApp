import ChainIndicator from '@/components/common/ChainIndicator'
import { useDarkMode } from '@/hooks/useDarkMode'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import type { SelectChangeEvent } from '@mui/material'
import { ListSubheader, MenuItem, Select, Skeleton } from '@mui/material'
import partition from 'lodash/partition'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useChains from '@/hooks/useChains'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import css from './styles.module.css'
import { useChainId } from '@/hooks/useChainId'
import { type ReactElement, useEffect, useMemo } from 'react'
import { useCallback } from 'react'
import { AppRoutes } from '@/config/routes'
import useWallet from '@/hooks/wallets/useWallet'
import { useAppSelector } from '@/store'
import { selectChains } from '@/store/slices/chainsSlice'

const NetworkSelector = (props: { onChainSelect?: () => void }): ReactElement => {
  const isDarkMode = useDarkMode()
  const theme = useTheme()
  const { configs } = useChains()
  const chainId = useChainId()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const isWalletConnected = !!useWallet()
  const [testNets, prodNets] = useMemo(() => partition(configs, (config) => config.isTestnet), [configs])
  const chains = useAppSelector(selectChains)

  const getNetworkLink = useCallback(
    (shortName: string) => {
      const shouldKeepPath = !searchParams.get('safe')
      const basePath = shouldKeepPath
        ? pathname
        : isWalletConnected
          ? AppRoutes.welcome.accounts
          : AppRoutes.welcome.index
      const url = new URL(basePath, window.location.origin)
      url.searchParams.set('chain', shortName)
      if (searchParams.get('safeViewRedirectURL')) {
        url.searchParams.set('safeViewRedirectURL', searchParams.get('safeViewRedirectURL')!.toString())
      }
      return url.toString()
    },
    [pathname, searchParams, isWalletConnected],
  )

  const onChange = (event: SelectChangeEvent) => {
    event.preventDefault()
    const newChainId = event.target.value
    const shortName = configs.find((item) => item.chainId === newChainId)?.shortName
    if (shortName) {
      router.push(getNetworkLink(shortName))
    }
  }

  const renderMenuItem = useCallback(
    (chainId: string, isSelected: boolean) => {
      const chain = chains.data.find((chain) => chain.chainId === chainId)
      if (!chain) return null
      return (
        <MenuItem key={chainId} value={chainId} sx={{ '&:hover': { backgroundColor: 'inherit' } }}>
          <Link href={getNetworkLink(chain.shortName)} onClick={props.onChainSelect} className={css.item}>
            <ChainIndicator responsive={isSelected} chainId={chain.chainId} inline />
          </Link>
        </MenuItem>
      )
    },
    [chains.data, getNetworkLink, props.onChainSelect],
  )

  useEffect(() => {
    // Force a re-render or state update if needed
    console.log('ChainId changed:', chainId)
    console.log('当前路径:', pathname)
  }, [chainId, pathname])

  return configs.length ? (
    <Select
      value={chainId}
      onChange={onChange}
      size="small"
      className={css.select}
      variant="standard"
      IconComponent={ExpandMoreIcon}
      renderValue={(value) => renderMenuItem(value, true)}
      MenuProps={{
        transitionDuration: 0,
        sx: {
          '& .MuiPaper-root': {
            overflow: 'auto',
          },
          ...(isDarkMode
            ? {
                '& .Mui-selected, & .Mui-selected:hover': {
                  backgroundColor: `${theme.palette.secondary.background} !important`,
                },
              }
            : {}),
        },
      }}
      sx={{
        '& .MuiSelect-select': {
          py: 0,
        },
      }}
    >
      {prodNets.map((chain) => renderMenuItem(chain.chainId, false))}

      <ListSubheader className={css.listSubHeader}>Testnets</ListSubheader>

      {testNets.map((chain) => renderMenuItem(chain.chainId, false))}
    </Select>
  ) : (
    <Skeleton width={94} height={31} sx={{ mx: 2 }} />
  )
}

export default NetworkSelector
