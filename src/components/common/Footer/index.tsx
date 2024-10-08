import type { ReactElement, ReactNode } from 'react'
import { SvgIcon, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import css from './styles.module.css'
import { AppRoutes } from '@/config/routes'
import packageJson from '../../../../package.json'
import ExternalLink from '../ExternalLink'
import MUILink from '@mui/material/Link'
import { palette } from '@/styles/palette'
// import { IS_DEV, IS_OFFICIAL_HOST } from '@/config/constants'

const footerPages = [
  AppRoutes.welcome.index,
  AppRoutes.settings.index,
  AppRoutes.imprint,
  AppRoutes.privacy,
  AppRoutes.cookie,
  AppRoutes.terms,
  AppRoutes.licenses,
]

const FooterLink = ({ children, href }: { children: ReactNode; href: string }): ReactElement => {
  return href ? (
    <Link href={href} passHref legacyBehavior>
      <MUILink color={palette.text.primary}>{children}</MUILink>
    </Link>
  ) : (
    <MUILink color={palette.text.primary}>{children}</MUILink>
  )
}

const Footer = (): ReactElement | null => {
  const pathName = usePathname()

  if (!footerPages.some((path) => pathName.startsWith(path))) {
    return null
  }

  // const getHref = (path: string): string => {
  //   return pathName === path ? '' : path
  // }

  return (
    <footer className={css.container}>
      <ul>
        ß
        <li>
          <Typography variant="caption">&copy;2022–{new Date().getFullYear()} Core Contributors S3 Partners</Typography>
        </li>
        <li>
          <FooterLink href={''}>Terms</FooterLink>
        </li>
        <li>
          <FooterLink href={''}>Privacy</FooterLink>
        </li>
        <li>
          <FooterLink href={''}>Licenses</FooterLink>
        </li>
        <li>
          <FooterLink href={''}>Imprint</FooterLink>
        </li>
        <li>
          <FooterLink href={''}>Cookie policy</FooterLink>
        </li>
        <li>
          <FooterLink href={''}>Preferences</FooterLink>
        </li>
        {/* <li>
              <ExternalLink href={packageJson.homepage} noIcon sx={{ span: { textDecoration: "underline" } }}>
                Help
              </ExternalLink>
            </li> */}
        <li>
          <ExternalLink color={palette.text.primary} href={`${packageJson.homepage}`} noIcon>
            <SvgIcon component={GitHubIcon} inheritViewBox fontSize="inherit" sx={{ mr: 0.5 }} /> v{packageJson.version}
          </ExternalLink>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
