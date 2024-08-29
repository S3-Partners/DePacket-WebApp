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

// Social
export const DISCORD_URL = 'https://chat.safe.global'

// contract
export const ERC6551ACCOUNT_CONTRACT_ADDRESS = '0x15467f9a899dFDef3361FaC4BEaA9520F6C41423'
export const ERC20_ADDRESS = '0xc32cE2198B123D1c1F7FD3A9f54Bff9f975819Fa'
export const READPACKETNFT_ADDRESS = '0xD841a44e21c5F0944d1b022C6172865288F3C077'
export const REDPACKET_ADDRESS = '0xD841a44e21c5F0944d1b022C6172865288F3C077'
export const REDPACKETFACTORY_ADDRESS = '0xe3D25F88835Ab7a1761eb2234A2608B25d3487c0'

//Red PacketList
import template1 from '@/public/images/redPackgesTemplate/template1.png'
import template2 from '@/public/images/redPackgesTemplate/template2.png'
import template3 from '@/public/images/redPackgesTemplate/template3.png'
import template4 from '@/public/images/redPackgesTemplate/template4.png'
import template5 from '@/public/images/redPackgesTemplate/template5.png'
export const IMG_ARRAY = [
  { id: 1, url: template1, alt: 'red-packet' },
  { id: 2, url: template2, alt: 'red-packet' },
  { id: 3, url: template3, alt: 'red-packet' },
  { id: 4, url: template4, alt: 'red-packet' },
  { id: 5, url: template5, alt: 'red-packet' },
]
