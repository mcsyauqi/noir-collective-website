'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { collections } from '@/data/collections';

export default function CollectionsPage() {
  return (
    <div style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '100vh', backgroundColor: '#f8f6f3' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p style={{ fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#888888', marginBottom: '16px' }}>
            Jelajahi
          </p>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontFamily: 'Georgia, serif', marginBottom: '24px' }}>
            Koleksi Kami
          </h1>
          <p style={{ color: '#888888', maxWidth: '600px', margin: '0 auto', lineHeight: '1.8' }}>
            Temukan koleksi yang dikurasi dengan penuh pertimbangan untuk lemari pakaian modern.
            Setiap potongan menceritakan kisah keahlian dan desain sadar.
          </p>
        </div>

        {/* Collections List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '120px' }}>
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '64px',
                alignItems: 'center',
              }}
            >
              {/* Image */}
              <Link
                href={`/collections/${collection.slug}`}
                style={{
                  position: 'relative',
                  aspectRatio: '4/5',
                  overflow: 'hidden',
                  order: index % 2 === 1 ? 2 : 1,
                }}
              >
                <Image
                  src={collection.heroImage}
                  alt={collection.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Link>

              {/* Content */}
              <div style={{ order: index % 2 === 1 ? 1 : 2 }}>
                <p style={{ fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a962', marginBottom: '16px' }}>
                  {collection.season} {collection.year}
                </p>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>
                  {collection.name}
                </h2>
                <p style={{ fontSize: '18px', color: '#888888', marginBottom: '16px', fontStyle: 'italic' }}>
                  &quot;{collection.tagline}&quot;
                </p>
                <p style={{ color: '#888888', lineHeight: '1.8', marginBottom: '32px' }}>
                  {collection.description}
                </p>
                <Link
                  href={`/collections/${collection.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: '#1a1a1a',
                  }}
                >
                  Jelajahi Koleksi
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
