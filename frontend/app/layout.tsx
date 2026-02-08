import type { Metadata } from 'next'
import "./globals.css";
import ClientProviders from './client-providers'

export const metadata: Metadata = {
  title: 'Trustless Academy - Learn Web3 by Doing',
  description: 'Interactive blockchain tutorials for everyone, no coding required. Experience ERC-20, ERC-721, and ERC-1155 tokens through our On-Chain Kitchen tutorial.',
  keywords: ['blockchain', 'ethereum', 'web3', 'tutorial', 'education', 'erc20', 'erc721', 'erc1155', 'crypto', 'beginner', 'interactive'],
  authors: [{ name: 'Trustless Academy' }],
  creator: 'Trustless Academy',
  publisher: 'Trustless Academy',
  metadataBase: new URL('https://trustless.academy'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trustless.academy',
    siteName: 'Trustless Academy',
    title: 'Trustless Academy - Learn Web3 by Doing',
    description: 'Interactive blockchain tutorials for everyone. No coding required - just curiosity!',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Trustless Academy - Learn Web3 by Doing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trustless Academy - Learn Web3 by Doing',
    description: 'Interactive blockchain tutorials for everyone. No coding required - just curiosity!',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f59e0b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-amber-50 min-h-screen font-sans">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
