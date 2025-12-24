import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'NOIR Collective | Curated Contemporary Fashion',
  description:
    'Discover curated designer pieces, sustainable fashion, and limited-edition collections at NOIR Collective. Timeless pieces for the modern wardrobe.',
  keywords: [
    'luxury fashion',
    'sustainable fashion',
    'designer clothing',
    'contemporary fashion',
    'premium fashion',
    'ethical fashion',
  ],
  openGraph: {
    title: 'NOIR Collective | Curated Contemporary Fashion',
    description:
      'Discover curated designer pieces, sustainable fashion, and limited-edition collections.',
    type: 'website',
    locale: 'en_US',
    siteName: 'NOIR Collective',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
