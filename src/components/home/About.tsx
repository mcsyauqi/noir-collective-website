'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <section style={{ padding: '120px 0', backgroundColor: '#1a1a1a' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '80px',
            alignItems: 'center'
          }}
        >
          {/* Image */}
          <div
            style={{
              position: 'relative',
              aspectRatio: '4/5',
              backgroundColor: '#333333'
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop&q=80"
              alt="NOIR Philosophy"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div style={{ color: 'white' }}>
            <p
              style={{
                fontSize: '12px',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: '#c9a962',
                marginBottom: '32px'
              }}
            >
              Filosofi Kami
            </p>

            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                lineHeight: '1.3',
                marginBottom: '32px'
              }}
            >
              Lebih sedikit, tapi lebih baik
            </h2>

            <p
              style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '48px'
              }}
            >
              Di NOIR Collective, kami percaya pada kekuatan pilihan yang dipertimbangkan.
              Setiap potongan dalam koleksi kami dirancang untuk melampaui tren,
              dibuat dari bahan-bahan terbaik, dan dibuat untuk bertahan lama.
            </p>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '48px', height: '1px', backgroundColor: '#c9a962' }} />
                <span style={{ fontSize: '14px', letterSpacing: '1px' }}>Bahan Berkelanjutan</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '48px', height: '1px', backgroundColor: '#c9a962' }} />
                <span style={{ fontSize: '14px', letterSpacing: '1px' }}>Keahlian Pengrajin</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '48px', height: '1px', backgroundColor: '#c9a962' }} />
                <span style={{ fontSize: '14px', letterSpacing: '1px' }}>Desain Timeless</span>
              </div>
            </div>

            <Link
              href="/about"
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
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              Tentang Kami
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
