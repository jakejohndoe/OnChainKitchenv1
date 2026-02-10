import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trustless Academy — Learn Web3 by Doing',
  description: 'Interactive blockchain tutorials on real networks. No coding required.',
  openGraph: {
    title: 'Trustless Academy — Learn Web3 by Doing',
    description: 'Interactive blockchain tutorials on real networks. No coding required.',
    url: 'https://trustless.academy/waitlist',
    images: [
      {
        url: '/logos/TA-Hero-Logo-Text.png',
        width: 1200,
        height: 630,
        alt: 'Trustless Academy Logo',
      },
    ],
    siteName: 'Trustless Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trustless Academy — Learn Web3 by Doing',
    description: 'Interactive blockchain tutorials on real networks. No coding required.',
    images: ['/logos/TA-Hero-Logo-Text.png'],
  },
}

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}