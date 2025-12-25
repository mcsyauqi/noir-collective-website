'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  Minus,
  Plus,
  Ruler,
  Truck,
  RotateCcw,
  Shield,
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts, products } from '@/data/products';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping'>('details');

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price * 15000);
  };

  useEffect(() => {
    if (product) {
      const availableSize = product.sizes.find((s) => s.inStock);
      const availableColor = product.colors.find((c) => c.inStock);
      setSelectedSize(availableSize?.name || '');
      setSelectedColor(availableColor?.name || '');
    }
  }, [product]);

  if (!product) {
    return (
      <div style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '100vh', backgroundColor: '#f8f6f3' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '40px', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>
            Produk Tidak Ditemukan
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

  const relatedProducts = getRelatedProducts(product);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addItem(product, selectedSize, selectedColor, quantity);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

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
          <Link href={`/shop/${product.category}`} style={{ textDecoration: 'none', color: '#888888', textTransform: 'capitalize' }}>
            {product.category}
          </Link>
          <ChevronRight size={16} />
          <span style={{ color: '#1a1a1a' }}>{product.name}</span>
        </nav>

        {/* Product Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
          }}
        >
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div style={{ position: 'relative', aspectRatio: '3/4', backgroundColor: 'white', marginBottom: '16px', overflow: 'hidden' }}>
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />

              {/* Badge */}
              {product.badge && (
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    padding: '8px 16px',
                    backgroundColor: product.badge === 'new' ? '#1a1a1a' : '#c9a962',
                    color: product.badge === 'new' ? 'white' : '#1a1a1a',
                    fontSize: '10px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  {product.badge === 'sold-out' ? 'Habis' : product.badge === 'new' ? 'Baru' : 'Terbatas'}
                </span>
              )}

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      padding: '12px',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    aria-label="Gambar sebelumnya"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      padding: '12px',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    aria-label="Gambar berikutnya"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px' }}>
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    style={{
                      position: 'relative',
                      width: '80px',
                      height: '100px',
                      backgroundColor: 'white',
                      border: index === currentImageIndex ? '2px solid #1a1a1a' : '2px solid transparent',
                      cursor: 'pointer',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Title & Price */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', color: '#888888', marginBottom: '8px' }}>
                {product.category}
              </p>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>
                {product.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <p style={{ fontSize: '24px' }}>{formatPrice(product.price)}</p>
                {product.originalPrice && (
                  <p style={{ fontSize: '20px', color: '#888888', textDecoration: 'line-through' }}>
                    {formatPrice(product.originalPrice)}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <p style={{ color: '#888888', lineHeight: '1.8', marginBottom: '24px' }}>
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '14px', letterSpacing: '1px', marginBottom: '12px' }}>
                  Warna: <span style={{ color: '#888888' }}>{selectedColor}</span>
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => color.inStock && setSelectedColor(color.name)}
                      disabled={!color.inStock}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: selectedColor === color.name ? '2px solid #1a1a1a' : '2px solid #e5e5e5',
                        backgroundColor: color.hex,
                        cursor: color.inStock ? 'pointer' : 'not-allowed',
                        opacity: color.inStock ? 1 : 0.3,
                        transform: selectedColor === color.name ? 'scale(1.1)' : 'scale(1)',
                        transition: 'all 0.2s ease',
                      }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <p style={{ fontSize: '14px', letterSpacing: '1px' }}>
                  Ukuran: <span style={{ color: '#888888' }}>{selectedSize}</span>
                </p>
                <Link
                  href="/size-guide"
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#888888', textDecoration: 'none' }}
                >
                  <Ruler size={14} />
                  Panduan Ukuran
                </Link>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => size.inStock && setSelectedSize(size.name)}
                    disabled={!size.inStock}
                    style={{
                      minWidth: '52px',
                      padding: '12px 16px',
                      border: selectedSize === size.name ? '1px solid #1a1a1a' : '1px solid #e5e5e5',
                      backgroundColor: selectedSize === size.name ? '#1a1a1a' : 'white',
                      color: selectedSize === size.name ? 'white' : '#1a1a1a',
                      fontSize: '14px',
                      cursor: size.inStock ? 'pointer' : 'not-allowed',
                      opacity: size.inStock ? 1 : 0.3,
                      textDecoration: size.inStock ? 'none' : 'line-through',
                    }}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '14px', letterSpacing: '1px', marginBottom: '12px' }}>Jumlah</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '48px',
                    height: '48px',
                    border: '1px solid #e5e5e5',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="Kurangi jumlah"
                >
                  <Minus size={16} />
                </button>
                <span style={{ width: '32px', textAlign: 'center', fontSize: '18px' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: '48px',
                    height: '48px',
                    border: '1px solid #e5e5e5',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="Tambah jumlah"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || !selectedSize || !selectedColor}
                style={{
                  flex: 1,
                  padding: '16px',
                  backgroundColor: product.inStock && selectedSize && selectedColor ? '#1a1a1a' : '#ccc',
                  color: 'white',
                  fontSize: '12px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: product.inStock && selectedSize && selectedColor ? 'pointer' : 'not-allowed',
                }}
              >
                {product.inStock ? 'Tambah ke Keranjang' : 'Habis Terjual'}
              </button>
              <button
                onClick={() => toggleItem(product)}
                style={{
                  padding: '16px',
                  border: '1px solid #1a1a1a',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                }}
                aria-label={inWishlist ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
              >
                <Heart size={20} style={{ fill: inWishlist ? '#c9a962' : 'transparent', color: inWishlist ? '#c9a962' : '#1a1a1a' }} />
              </button>
            </div>

            {/* Features */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', paddingTop: '24px', marginTop: '24px', borderTop: '1px solid #e5e5e5' }}>
              <div style={{ textAlign: 'center' }}>
                <Truck size={20} style={{ color: '#888888', margin: '0 auto 8px' }} />
                <p style={{ fontSize: '11px', letterSpacing: '1px' }}>Gratis Ongkir</p>
                <p style={{ fontSize: '10px', color: '#888888' }}>Di atas Rp5jt</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <RotateCcw size={20} style={{ color: '#888888', margin: '0 auto 8px' }} />
                <p style={{ fontSize: '11px', letterSpacing: '1px' }}>Gratis Retur</p>
                <p style={{ fontSize: '10px', color: '#888888' }}>Dalam 30 hari</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Shield size={20} style={{ color: '#888888', margin: '0 auto 8px' }} />
                <p style={{ fontSize: '11px', letterSpacing: '1px' }}>Pembayaran Aman</p>
                <p style={{ fontSize: '10px', color: '#888888' }}>100% Terlindungi</p>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ paddingTop: '24px', marginTop: '24px', borderTop: '1px solid #e5e5e5' }}>
              <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                {(['details', 'care', 'shipping'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      fontSize: '14px',
                      letterSpacing: '1px',
                      paddingBottom: '8px',
                      borderBottom: activeTab === tab ? '2px solid #1a1a1a' : '2px solid transparent',
                      background: 'none',
                      border: 'none',
                      borderBottomWidth: '2px',
                      borderBottomStyle: 'solid',
                      borderBottomColor: activeTab === tab ? '#1a1a1a' : 'transparent',
                      color: activeTab === tab ? '#1a1a1a' : '#888888',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}
                  >
                    {tab === 'details' ? 'Detail' : tab === 'care' ? 'Perawatan' : 'Pengiriman'}
                  </button>
                ))}
              </div>

              <div style={{ fontSize: '14px', color: '#888888', lineHeight: '1.8' }}>
                {activeTab === 'details' && (
                  <div>
                    {product.material && (
                      <p style={{ marginBottom: '16px' }}>
                        <strong style={{ color: '#1a1a1a' }}>Bahan:</strong> {product.material}
                      </p>
                    )}
                    {product.details && (
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {product.details.map((detail, i) => (
                          <li key={i} style={{ marginBottom: '8px' }}>• {detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
                {activeTab === 'care' && product.care && (
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {product.care.map((instruction, i) => (
                      <li key={i} style={{ marginBottom: '8px' }}>• {instruction}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'shipping' && (
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '8px' }}>• Gratis ongkir untuk pesanan di atas Rp5.000.000</li>
                    <li style={{ marginBottom: '8px' }}>• Pengiriman standar: 3-5 hari kerja</li>
                    <li style={{ marginBottom: '8px' }}>• Pengiriman ekspres: 1-2 hari kerja</li>
                    <li style={{ marginBottom: '8px' }}>• Pengiriman internasional tersedia</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section style={{ marginTop: '96px' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontFamily: 'Georgia, serif', textAlign: 'center', marginBottom: '48px' }}>
              Lengkapi Tampilan Anda
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '24px',
              }}
            >
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{ position: 'relative', aspectRatio: '3/4', marginBottom: '16px', backgroundColor: 'white' }}>
                    <Image
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 style={{ fontSize: '14px', marginBottom: '4px' }}>{relatedProduct.name}</h3>
                  <p style={{ fontSize: '14px', color: '#888888' }}>{formatPrice(relatedProduct.price)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
