import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@radix-ui/themes/styles.css';

import './globals.css';
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Service Catalog',
  description: 'ČSAS Service Catalog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <ThemeProvider attribute='class'>
        <body className={inter.className}>
          <Theme>
            <Header />
            {children}
          </Theme>
        </body>
      </ThemeProvider>
    </html>
  );
}
