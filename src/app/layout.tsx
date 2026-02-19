import type { Metadata } from 'next';
import { Syne, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Sidenav } from '@/components/layout/Sidenav';
import { NetworkFromUrl } from '@/components/NetworkFromUrl';
import { BigIntPolyfill } from '@/components/BigIntPolyfill';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Suspense } from 'react';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-code',
  display: 'swap',
});

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
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ThemeProvider>
          <BigIntPolyfill />
          <Suspense fallback={null}>
            <NetworkFromUrl />
          </Suspense>
          <div className="flex min-h-screen">
            <Sidenav />
            <main className="grow overflow-auto">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
