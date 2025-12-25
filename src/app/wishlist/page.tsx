'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, X, ShoppingBag } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlist';
import { useCartStore } from '@/store/cart';
import { products } from '@/data/products';

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();

  useEffect(() => {
    setMounted(true);
    useWishlistStore.persist.rehydrate();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price * 15000);
  };

  const handleAddToCart = (product: typeof items[0]) => {
    addItem(product, product.sizes[0].name, product.colors[0].name, 1);
    removeItem(product.id);
  };

  if (!mounted) {
    return (
      <div style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '100vh', backgroundColor: '#f8f6f3' }}>
        <div className="container">
          <div style={{ height: '40px', backgroundColor: '#e5e5e5', width: '200px', margin: '0 auto 32px' }} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '24px',
            }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ aspectRatio: '3/4', backgroundColor: '#e5e5e5' }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const featuredProducts = products.slice(0, 4);

  return (
    <div style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '100vh', backgroundColor: '#f8f6f3' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#888888', marginBottom: '16px' }}>
            Favorit Anda
          </p>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>
            Wishlist Saya
          </h1>
          <p style={{ color: '#888888' }}>{items.length} item tersimpan</p>
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <Heart size={80} style={{ color: '#e5e5e5', margin: '0 auto 24px' }} />
            <h2 style={{ fontSize: '24px', fontFamily: 'Georgia, serif', marginBottom: '12px' }}>
              Wishlist Anda kosong
            </h2>
            <p style={{ color: '#888888', marginBottom: '32px' }}>
              Simpan item favorit untuk dibeli nanti
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
              Mulai Belanja
            </Link>

            {/* Recommended Products */}
            <div style={{ marginTop: '80px' }}>
              <h3 style={{ fontSize: '20px', fontFamily: 'Georgia, serif', marginBottom: '32px' }}>
                Anda Mungkin Suka
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '24px',
                }}
              >
                {featuredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div style={{ position: 'relative', aspectRatio: '3/4', marginBottom: '16px', backgroundColor: '#e5e5e5' }}>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 style={{ fontSize: '14px', marginBottom: '4px' }}>{product.name}</h4>
                    <p style={{ fontSize: '14px', color: '#888888' }}>{formatPrice(product.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '32px',
            }}
          >
            {items.map((product) => (
              <div key={product.id} style={{ position: 'relative' }}>
                {/* Remove Button */}
                <button
                  onClick={() => removeItem(product.id)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 10,
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                  aria-label="Hapus dari wishlist"
                >
                  <X size={16} />
                </button>

                {/* Image */}
                <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '3/4',
                      marginBottom: '16px',
                      backgroundColor: '#e5e5e5',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {product.badge && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
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
                </Link>

                {/* Details */}
                <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>{product.name}</h3>
                  <p style={{ fontSize: '14px', color: '#888888', marginBottom: '16px' }}>
                    {formatPrice(product.price)}
                  </p>
                </Link>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#1a1a1a',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}
                >
                  <ShoppingBag size={14} />
                  Tambah ke Keranjang
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
