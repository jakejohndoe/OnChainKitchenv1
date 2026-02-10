import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trustless Academy — Web3 clicks when you click things',
  description: 'Interactive blockchain tutorials on real networks. No coding required.',
  openGraph: {
    title: 'Trustless Academy — Web3 clicks when you click things',
    description: 'Interactive blockchain tutorials on real networks. No coding required.',
    url: 'https://trustless.academy/waitlist',
    images: [
      {
        url: 'https://trustless.academy/logos/TA-Hero-Logo-Text.png',
        width: 1200,
        height: 630,
        alt: 'Trustless Academy Logo',
      },
    ],
    siteName: 'Trustless Academy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trustless Academy — Web3 clicks when you click things',
    description: 'Interactive blockchain tutorials on real networks. No coding required.',
    images: ['https://trustless.academy/logos/TA-Hero-Logo-Text.png'],
    site: '@jakejohndoe',
    creator: '@jakejohndoe',
  },
}

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}