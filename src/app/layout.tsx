import { Suspense } from 'react';
import './reset.css';
import './globals.css';
import type { Metadata } from 'next';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'oktaaniDTC',
  description: 'A page to help understand diagnostic trouble codes (DTCs).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="bubble" />
        <Header />
        <Suspense fallback="loading...">
          <main>{children}</main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
