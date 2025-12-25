'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { products } from '@/data/products';
import { categories, getCategoryBySlug } from '@/data/collections';

const sortOptions = [
  { label: 'Terbaru', value: 'newest' },
  { label: 'Harga: Rendah ke Tinggi', value: 'price-asc' },
  { label: 'Harga: Tinggi ke Rendah', value: 'price-desc' },
];

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const category = getCategoryBySlug(categorySlug);

  const [sortBy, setSortBy] = useState('newest');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price * 15000);
  };

  const categoryProducts = useMemo(() => {
    let result = products.filter((p) => p.category === categorySlug);

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (a.badge === 'new' ? -1 : 1));
        break;
    }

    return result;
  }, [categorySlug, sortBy]);

  if (!category) {
    return (
      <div style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '100vh', backgroundColor: '#f8f6f3' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '40px', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>
            Kategori Tidak Ditemukan
          </h1>
          <Link
            href="/shop"
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
            Kembali ke Toko
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '100vh', backgroundColor: '#f8f6f3' }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#888888', marginBottom: '32px', flexWrap: 'wrap' }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#888888' }}>
            Beranda
          </Link>
          <ChevronRight size={16} />
          <Link href="/shop" style={{ textDecoration: 'none', color: '#888888' }}>
            Belanja
          </Link>
          <ChevronRight size={16} />
          <span style={{ color: '#1a1a1a' }}>{category.name}</span>
        </nav>

        {/* Page Header */}
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>
            {category.name}
          </h1>
          <p style={{ color: '#888888', maxWidth: '500px' }}>{category.description}</p>
        </div>

        {/* Category Navigation */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid #e5e5e5' }}>
          <Link
            href="/shop"
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              border: '1px solid #e5e5e5',
              textDecoration: 'none',
              color: '#1a1a1a',
              backgroundColor: 'white',
            }}
          >
            Semua
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/${cat.slug}`}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                border: cat.slug === categorySlug ? '1px solid #1a1a1a' : '1px solid #e5e5e5',
                backgroundColor: cat.slug === categorySlug ? '#1a1a1a' : 'white',
                color: cat.slug === categorySlug ? 'white' : '#1a1a1a',
                textDecoration: 'none',
              }}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '32px' }}>
          <p style={{ fontSize: '14px', color: '#888888' }}>
            {categoryProducts.length} produk
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              fontSize: '14px',
              padding: '8px 16px',
              border: '1px solid #e5e5e5',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        {categoryProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {categoryProducts.map((product) => (
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
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ color: '#888888', marginBottom: '16px' }}>
              Belum ada produk di kategori ini
            </p>
            <Link
              href="/shop"
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
              Jelajahi Semua Produk
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
