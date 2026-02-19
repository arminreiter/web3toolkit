import type { Metadata } from 'next';
import { Chakra_Petch, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Sidenav } from '@/components/layout/Sidenav';
import { NetworkFromUrl } from '@/components/NetworkFromUrl';
import { BigIntPolyfill } from '@/components/BigIntPolyfill';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Suspense } from 'react';

const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const manrope = Manrope({
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
  icons: {
    icon: [
      { url: '/img/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/img/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/img/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/img/apple-icon.png',
  },
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
    <html lang="en" suppressHydrationWarning className={`${chakraPetch.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ThemeProvider>
          <BigIntPolyfill />
          <Suspense fallback={null}>
            <NetworkFromUrl />
          </Suspense>
          <div className="flex min-h-screen">
            <Sidenav />
            <main className="grow overflow-auto pt-14 md:pt-0">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
