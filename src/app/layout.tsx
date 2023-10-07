import type { Metadata } from 'next';

import './reset.css';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from '../components/Providers';

export const metadata: Metadata = {
  title: 'oktaaniDTC',
  description: 'A page to help understand diagnostic trouble codes (DTCs).',
};

export default function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {modal}
          <Header />
          <main>
            <h1>Diagnostic Trouble Codes</h1>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
