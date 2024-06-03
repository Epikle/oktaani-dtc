import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

import './reset.css';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from '../components/Providers';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'oktaaniDTC',
  description: 'A page to help understand diagnostic trouble codes (DTCs).',
  metadataBase: new URL('https://oktaani-dtc.vercel.app'),
};

export default function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {modal}
          <Suspense>
            <Header />
          </Suspense>
          <main>
            <h1>Diagnostic Trouble Codes</h1>
            {children}
          </main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
