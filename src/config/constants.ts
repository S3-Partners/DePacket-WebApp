import WelcomePacket from '@/public/images/cat-packet.jpg'

export const IS_PRODUCTION = process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true'
export const IS_DEV = process.env.NODE_ENV === 'development'

// Help Center
export const HELP_CENTER_URL = ''

// Legal
export const IS_OFFICIAL_HOST = process.env.NEXT_PUBLIC_IS_OFFICIAL_HOST === 'true'

// Magic numbers
export const POLLING_INTERVAL = 15_000
export const BASE_TX_GAS = 21_000
export const LS_NAMESPACE = 'SAFE_v2__'
export const LATEST_SAFE_VERSION = process.env.NEXT_PUBLIC_SAFE_VERSION || '0.0.1'

// Wallets
// export const WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID || ''
export const WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID
export const TREZOR_APP_URL = 'app.packet.global'
export const TREZOR_EMAIL = 'support@packet.global'

// Access keys
export const INFURA_TOKEN = process.env.NEXT_PUBLIC_INFURA_TOKEN || ''

// Apps
export const SAFE_APPS_INFURA_TOKEN = process.env.NEXT_PUBLIC_SAFE_APPS_INFURA_TOKEN || INFURA_TOKEN

// Red Packet
export const WELCOME_RED_PACKET_IMG = { url: WelcomePacket, alt: 'red-packet' }

// Safe Apps tags
export enum SafeAppsTag {
  NFT = 'nft',
  TX_BUILDER = 'transaction-builder',
  DASHBOARD_FEATURED = 'dashboard-widgets',
  SAFE_GOVERNANCE_APP = 'safe-governance-app',
  WALLET_CONNECT = 'wallet-connect',
  ONRAMP = 'onramp',
}

// Google Tag Manager
export const GOOGLE_TAG_MANAGER_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || ''
export const GOOGLE_TAG_MANAGER_AUTH_LIVE = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_LIVE_AUTH || ''
export const GOOGLE_TAG_MANAGER_AUTH_LATEST = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_LATEST_AUTH || ''
export const GOOGLE_TAG_MANAGER_DEVELOPMENT_AUTH = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_DEVELOPMENT_AUTH || ''
