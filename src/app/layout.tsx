import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'NOIR Collective | Fashion Kontemporer Terkurasi',
  description: 'Temukan koleksi desainer pilihan, fashion berkelanjutan, dan koleksi edisi terbatas di NOIR Collective.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
