import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join the Waitlist | Trustless Academy',
  description: 'Join the Trustless Academy waitlist to be the first to know about new tutorials, courses, and interactive Web3 learning experiences.',
  openGraph: {
    title: 'Join the Waitlist | Trustless Academy',
    description: 'Be the first to know about new tutorials, courses, and interactive Web3 learning experiences.',
    url: 'https://trustless.academy/waitlist',
  },
  twitter: {
    title: 'Join the Waitlist | Trustless Academy',
    description: 'Be the first to know about new tutorials, courses, and interactive Web3 learning experiences.',
  },
}

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}