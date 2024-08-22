declare global {
  interface Window {
    isDesktop?: boolean
    ethereum?: {
      autoRefreshOnNetworkChange: boolean
      isMetaMask: boolean
      _metamask: {
        isUnlocked: () => Promise<boolean>
      }
      isConnected?: () => boolean
    }
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
    Cypress?
  }
}

// Ensure the file is treated as a module
export {}
