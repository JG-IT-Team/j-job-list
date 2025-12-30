import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JobsGlobal - Find Your Dream Job',
  description: 'Browse thousands of jobs in the Middle East and beyond.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
