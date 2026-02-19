import type { Metadata } from 'next';
import './globals.css';
import { Sidenav } from '@/components/layout/Sidenav';
import { NetworkFromUrl } from '@/components/NetworkFromUrl';
import { BigIntPolyfill } from '@/components/BigIntPolyfill';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Web3ToolKit',
  description: 'A toolkit for the web3 - generate seed phrases, derive keys, check balances, and more.',
  openGraph: {
    title: 'Web3ToolKit',
    description: 'A toolkit for the web3 - generate seed phrases, derive keys, check balances, and more.',
    type: 'website',
    siteName: 'Web3ToolKit',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3ToolKit',
    description: 'A toolkit for the web3 - generate seed phrases, derive keys, check balances, and more.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <BigIntPolyfill />
          <Suspense fallback={null}>
            <NetworkFromUrl />
          </Suspense>
          <div className="flex min-h-screen">
            <div className="w-[6.5rem] shrink-0 border-r border-border">
              <Sidenav />
            </div>
            <div className="grow overflow-auto">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
