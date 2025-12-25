'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { lookbooks } from '@/data/collections';
import { products } from '@/data/products';

export default function LookbookPage() {
  const [selectedImage, setSelectedImage] = useState<{
    lookbook: typeof lookbooks[0];
    image: typeof lookbooks[0]['images'][0];
  } | null>(null);

  const getProductsForImage = (productIds: string[]) => {
    return productIds
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean);
  };

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
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p style={{ fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#888888', marginBottom: '16px' }}>
            Editorial
          </p>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontFamily: 'Georgia, serif', marginBottom: '24px' }}>
            Lookbook
          </h1>
          <p style={{ color: '#888888', maxWidth: '500px', margin: '0 auto', lineHeight: '1.8' }}>
            Jelajahi visi editorial kami. Klik gambar untuk belanja tampilan dan temukan potongan yang menginspirasi setiap cerita.
          </p>
        </div>

        {/* Lookbooks */}
        {lookbooks.map((lookbook) => (
          <section key={lookbook.id} style={{ marginBottom: '120px' }}>
            {/* Lookbook Header */}
            <div style={{ marginBottom: '48px' }}>
              <p style={{ fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a962', marginBottom: '8px' }}>
                {lookbook.season} {lookbook.year}
              </p>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>
                {lookbook.title}
              </h2>
              <p style={{ fontSize: '14px', color: '#888888', maxWidth: '500px' }}>
                {lookbook.description}
              </p>
            </div>

            {/* Lookbook Images Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '16px',
              }}
            >
              {lookbook.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage({ lookbook, image })}
                  style={{
                    position: 'relative',
                    aspectRatio: index === 0 ? '4/5' : '3/4',
                    overflow: 'hidden',
                    border: 'none',
                    cursor: 'pointer',
                    gridColumn: index === 0 ? 'span 2' : 'span 1',
                    gridRow: index === 0 ? 'span 2' : 'span 1',
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {image.products.length > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '16px',
                        left: '16px',
                        right: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        padding: '12px 16px',
                      }}
                    >
                      <span style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Belanja Tampilan
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ShoppingBag size={14} />
                        <span style={{ fontSize: '12px' }}>{image.products.length}</span>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.9)',
          }}
        >
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              padding: '8px',
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
            }}
            aria-label="Tutup"
          >
            <X size={24} />
          </button>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              maxWidth: '1000px',
              width: '100%',
              margin: '0 16px',
              backgroundColor: 'white',
            }}
          >
            {/* Image */}
            <div style={{ position: 'relative', aspectRatio: '3/4' }}>
              <Image
                src={selectedImage.image.src}
                alt={selectedImage.image.alt}
                fill
                className="object-cover"
              />
            </div>

            {/* Products */}
            <div style={{ padding: '32px', overflowY: 'auto', maxHeight: '80vh' }}>
              <p style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: '#888888', marginBottom: '8px' }}>
                Belanja Tampilan
              </p>
              <h3 style={{ fontSize: '24px', fontFamily: 'Georgia, serif', marginBottom: '24px' }}>
                {selectedImage.lookbook.title}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {getProductsForImage(selectedImage.image.products).map(
                  (product) =>
                    product && (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={() => setSelectedImage(null)}
                        style={{
                          display: 'flex',
                          gap: '16px',
                          textDecoration: 'none',
                          color: 'inherit',
                        }}
                      >
                        <div style={{ position: 'relative', width: '80px', height: '100px', flexShrink: 0, backgroundColor: '#f8f6f3' }}>
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '14px', marginBottom: '4px' }}>{product.name}</h4>
                          <p style={{ fontSize: '12px', color: '#888888', marginBottom: '8px' }}>
                            {product.shortDescription}
                          </p>
                          <p style={{ fontSize: '14px' }}>{formatPrice(product.price)}</p>
                        </div>
                        <ArrowRight size={16} style={{ color: '#888888', alignSelf: 'center' }} />
                      </Link>
                    )
                )}
              </div>

              <Link
                href={`/collections/${selectedImage.lookbook.slug}`}
                onClick={() => setSelectedImage(null)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '16px',
                  marginTop: '32px',
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontSize: '12px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                Lihat Koleksi Lengkap
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
