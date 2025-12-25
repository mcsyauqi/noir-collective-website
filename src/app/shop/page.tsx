'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SlidersHorizontal, X } from 'lucide-react';
import { products } from '@/data/products';

function ShopContent() {
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    let result = [...products];

    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [searchParams, sortBy]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price * 15000);
  };

  return (
    <div style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '100vh', backgroundColor: '#f8f6f3' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#888888', marginBottom: '16px' }}>
            Temukan
          </p>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>
            Semua Produk
          </h1>
          <p style={{ color: '#888888', maxWidth: '500px', margin: '0 auto' }}>
            Jelajahi koleksi fashion berkelanjutan dan timeless kami
          </p>
        </div>

        {/* Toolbar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '48px',
            paddingBottom: '24px',
            borderBottom: '1px solid #e5e5e5',
          }}
        >
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <SlidersHorizontal size={16} />
            Filter
          </button>

          <p style={{ fontSize: '14px', color: '#888888' }}>
            {filteredProducts.length} produk
          </p>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              fontSize: '14px',
              padding: '8px 16px',
              border: '1px solid #e5e5e5',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            <option value="newest">Terbaru</option>
            <option value="price-asc">Harga: Rendah ke Tinggi</option>
            <option value="price-desc">Harga: Tinggi ke Rendah</option>
          </select>
        </div>

        {/* Product Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '40px',
          }}
        >
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div>
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '3/4',
                    marginBottom: '20px',
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
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ color: '#888888', marginBottom: '16px' }}>
              Tidak ada produk yang cocok
            </p>
          </div>
        )}
      </div>

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 50,
          }}
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '300px',
              backgroundColor: 'white',
              padding: '24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '18px', fontFamily: 'Georgia, serif' }}>Filter</h2>
              <button onClick={() => setIsFilterOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            <p style={{ color: '#888888', fontSize: '14px' }}>
              Filter sedang dalam pengembangan
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ShopLoading() {
  return (
    <div style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '100vh', backgroundColor: '#f8f6f3' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ height: '16px', backgroundColor: '#e5e5e5', width: '100px', margin: '0 auto 16px' }} />
          <div style={{ height: '48px', backgroundColor: '#e5e5e5', width: '250px', margin: '0 auto 16px' }} />
          <div style={{ height: '16px', backgroundColor: '#e5e5e5', width: '300px', margin: '0 auto' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              <div style={{ aspectRatio: '3/4', backgroundColor: '#e5e5e5', marginBottom: '20px' }} />
              <div style={{ height: '16px', backgroundColor: '#e5e5e5', width: '75%', marginBottom: '8px' }} />
              <div style={{ height: '14px', backgroundColor: '#e5e5e5', width: '50%' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopContent />
    </Suspense>
  );
}
