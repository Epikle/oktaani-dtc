import type { Metadata } from 'next';

import './reset.css';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'oktaaniDTC',
  description: 'A page to help understand diagnostic trouble codes (DTCs).',
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {modal}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
