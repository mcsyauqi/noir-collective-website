'use client';

import Link from 'next/link';
import Image from 'next/image';

const products = [
  {
    id: 1,
    name: 'Wool Blend Coat',
    price: 'Rp 4.500.000',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Cashmere Sweater',
    price: 'Rp 2.800.000',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Tailored Trousers',
    price: 'Rp 1.950.000',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Silk Blouse',
    price: 'Rp 2.200.000',
    image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&h=800&fit=crop&q=80',
  },
];

export default function Products() {
  return (
    <section style={{ padding: '120px 0', backgroundColor: '#f8f6f3' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#888888',
              marginBottom: '24px'
            }}
          >
            Koleksi Terbaru
          </p>
          <h2
            className="font-serif"
            style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: '#1a1a1a' }}
          >
            Produk Unggulan
          </h2>
        </div>

        {/* Products Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px'
          }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div>
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '3/4',
                    marginBottom: '24px',
                    overflow: 'hidden',
                    backgroundColor: '#e5e5e5'
                  }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '400', marginBottom: '8px' }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: '14px', color: '#888888' }}>
                  {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: 'center', marginTop: '80px' }}>
          <Link
            href="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px 48px',
              backgroundColor: '#1a1a1a',
              color: 'white',
              fontSize: '12px',
              fontWeight: '500',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            Lihat Semua Produk
          </Link>
        </div>
      </div>
    </section>
  );
}
