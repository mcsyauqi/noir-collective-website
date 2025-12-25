'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full" style={{ minHeight: '100vh' }}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1920&h=1080&fit=crop&q=85"
          alt="NOIR Collection"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} />
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center text-white"
        style={{ minHeight: '100vh', padding: '120px 24px' }}
      >
        <p
          className="uppercase tracking-widest"
          style={{ fontSize: '12px', letterSpacing: '4px', marginBottom: '32px', color: '#c9a962' }}
        >
          Koleksi 2025
        </p>

        <h1
          className="font-serif"
          style={{ fontSize: 'clamp(48px, 10vw, 96px)', lineHeight: '1.1', marginBottom: '40px' }}
        >
          Definisi Baru
          <br />
          <span style={{ color: '#c9a962' }}>Elegan</span>
        </h1>

        <p
          style={{
            fontSize: '18px',
            lineHeight: '1.8',
            maxWidth: '500px',
            marginBottom: '56px',
            color: 'rgba(255,255,255,0.8)'
          }}
        >
          Potongan kontemporer yang melampaui tren.
          Dibuat untuk mereka yang menghargai kesederhanaan dalam kemewahan.
        </p>

        <div className="flex flex-col sm:flex-row items-center" style={{ gap: '20px' }}>
          <Link
            href="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px 48px',
              backgroundColor: 'white',
              color: '#1a1a1a',
              fontSize: '12px',
              fontWeight: '500',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            Belanja Sekarang
          </Link>
          <Link
            href="/collections"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px 48px',
              backgroundColor: 'transparent',
              color: 'white',
              fontSize: '12px',
              fontWeight: '500',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.5)',
              transition: 'all 0.3s ease'
            }}
          >
            Lihat Koleksi
          </Link>
        </div>
      </div>
    </section>
  );
}
