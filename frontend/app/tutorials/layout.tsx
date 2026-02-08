import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tutorials | Trustless Academy',
  description: 'Interactive Web3 tutorials for beginners. Learn blockchain, Ethereum, and token standards through hands-on experiences.',
  openGraph: {
    title: 'Tutorials | Trustless Academy',
    description: 'Interactive Web3 tutorials for beginners. Learn blockchain, Ethereum, and token standards through hands-on experiences.',
    url: 'https://trustless.academy/tutorials',
  },
  twitter: {
    title: 'Tutorials | Trustless Academy',
    description: 'Interactive Web3 tutorials for beginners. Learn blockchain, Ethereum, and token standards through hands-on experiences.',
  },
}

export default function TutorialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}