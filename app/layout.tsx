import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Priyansh Sonthalia — Full-Stack Engineer',
  description:
    'CS undergrad at SRM building full-stack AI systems and network tools. Interning at Smoad Networks, previously Samsung R&D.',
  keywords: ['full-stack engineer', 'AI systems', 'network tools', 'React', 'FastAPI', 'Next.js', 'SRM'],
  authors: [{ name: 'Priyansh Sonthalia' }],
  openGraph: {
    title: 'Priyansh Sonthalia — Full-Stack Engineer',
    description: 'Building full-stack AI systems, network tools, and the weird corners between.',
    url: 'https://priyanshsonthalia.dev',
    siteName: 'Priyansh Sonthalia',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Priyansh Sonthalia — Full-Stack Engineer',
    description: 'Building full-stack AI systems, network tools, and the weird corners between.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio.theme');
                  if (!theme) theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>{children}</body>
    </html>
  )
}
