'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { getCollectionBySlug } from '@/data/collections';
import { products } from '@/data/products';

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const collection = getCollectionBySlug(slug);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price * 15000);
  };

  if (!collection) {
    return (
      <div style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '100vh', backgroundColor: '#f8f6f3' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '40px', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>
            Koleksi Tidak Ditemukan
          </h1>
          <Link
            href="/collections"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              backgroundColor: '#1a1a1a',
              color: 'white',
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Lihat Semua Koleksi
          </Link>
        </div>
      </div>
    );
  }

  const collectionProducts = products.filter((p) =>
    collection.products.includes(p.id)
  );

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src={collection.heroImage}
            alt={collection.name}
            fill
            priority
            className="object-cover"
          />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            color: 'white',
            padding: '0 24px',
            maxWidth: '800px',
          }}
        >
          <p style={{ fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#c9a962', marginBottom: '16px' }}>
            {collection.season} {collection.year}
          </p>
          <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontFamily: 'Georgia, serif', marginBottom: '24px' }}>
            {collection.name}
          </h1>
          <p style={{ fontSize: '20px', fontStyle: 'italic', marginBottom: '16px' }}>
            &quot;{collection.tagline}&quot;
          </p>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto' }}>
            {collection.description}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section style={{ padding: '120px 0', backgroundColor: '#f8f6f3' }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#888888', marginBottom: '48px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#888888' }}>
              Beranda
            </Link>
            <ChevronRight size={16} />
            <Link href="/collections" style={{ textDecoration: 'none', color: '#888888' }}>
              Koleksi
            </Link>
            <ChevronRight size={16} />
            <span style={{ color: '#1a1a1a' }}>{collection.name}</span>
          </nav>

          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>
              Belanja Koleksi
            </h2>
            <p style={{ color: '#888888' }}>
              {collectionProducts.length} produk dalam koleksi ini
            </p>
          </div>

          {/* Products Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '32px',
            }}
          >
            {collectionProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '3/4',
                    marginBottom: '16px',
                    overflow: 'hidden',
                    backgroundColor: '#e5e5e5',
                  }}
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {product.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        padding: '6px 12px',
                        backgroundColor: product.badge === 'new' ? '#1a1a1a' : '#c9a962',
                        color: product.badge === 'new' ? 'white' : '#1a1a1a',
                        fontSize: '10px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {product.badge === 'new' ? 'Baru' : 'Terbatas'}
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '400', marginBottom: '8px' }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: '14px', color: '#888888' }}>
                  {formatPrice(product.price)}
                </p>
              </Link>
            ))}
          </div>

          {/* Lookbook CTA */}
          <div style={{ textAlign: 'center', marginTop: '64px' }}>
            <Link
              href="/lookbook"
              style={{
                display: 'inline-block',
                padding: '16px 40px',
                backgroundColor: 'transparent',
                color: '#1a1a1a',
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1px solid #1a1a1a',
              }}
            >
              Lihat Lookbook
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
