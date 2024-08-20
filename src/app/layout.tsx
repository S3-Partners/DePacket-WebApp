import { ReactNode } from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import CssBaseline from "@mui/material/CssBaseline";
import type { Theme } from "@mui/material/styles";

import PageLayout from "@/components/common/PageLayout";
import { useRouter } from "next/router";
import createEmotionCache from "@/utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import PacketThemeProvider from "@/components/theme/PacketThemeProvider";
import { useDarkMode } from "@/hooks/useDarkMode";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export const AppProviders = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const isDarkMode = useDarkMode();
  const themeMode = isDarkMode ? "dark" : "light";

  return <PacketThemeProvider mode={themeMode}>{children}</PacketThemeProvider>;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <CssBaseline />
          <PageLayout>{children}</PageLayout>
        </AppProviders>
      </body>
    </html>
  );
}
