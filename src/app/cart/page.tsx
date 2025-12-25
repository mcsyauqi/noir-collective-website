'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { products } from '@/data/products';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price * 15000);
  };

  if (!mounted) {
    return (
      <div style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '100vh', backgroundColor: '#f8f6f3' }}>
        <div className="container">
          <div style={{ height: '40px', backgroundColor: '#e5e5e5', width: '200px', marginBottom: '32px' }} />
          <div style={{ height: '300px', backgroundColor: '#e5e5e5' }} />
        </div>
      </div>
    );
  }

  const total = getTotal();
  const freeShippingThreshold = 333; // ~5jt IDR
  const remainingForFreeShipping = freeShippingThreshold - total;
  const shippingCost = total >= freeShippingThreshold ? 0 : 25;
  const featuredProducts = products.slice(0, 4);

  return (
    <div style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '100vh', backgroundColor: '#f8f6f3' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#888888', marginBottom: '16px' }}>
            Keranjang
          </p>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontFamily: 'Georgia, serif' }}>
            Tas Belanja
          </h1>
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <ShoppingBag size={80} style={{ color: '#e5e5e5', margin: '0 auto 24px' }} />
            <h2 style={{ fontSize: '24px', fontFamily: 'Georgia, serif', marginBottom: '12px' }}>
              Tas belanja Anda kosong
            </h2>
            <p style={{ color: '#888888', marginBottom: '32px' }}>
              Tambahkan sesuatu yang indah ke dalam tas Anda
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
              Lanjut Belanja
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '48px',
              alignItems: 'start',
            }}
          >
            {/* Cart Items */}
            <div style={{ gridColumn: 'span 2' }}>
              {/* Free Shipping Progress */}
              {remainingForFreeShipping > 0 && (
                <div style={{ marginBottom: '32px', padding: '20px', backgroundColor: 'white' }}>
                  <p style={{ fontSize: '14px', textAlign: 'center', marginBottom: '12px' }}>
                    Tambah <span style={{ fontWeight: '500' }}>{formatPrice(remainingForFreeShipping)}</span> lagi untuk gratis ongkir
                  </p>
                  <div style={{ height: '6px', backgroundColor: '#e5e5e5', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        backgroundColor: '#c9a962',
                        width: `${Math.min((total / freeShippingThreshold) * 100, 100)}%`,
                        transition: 'width 0.5s ease',
                      }}
                    />
                  </div>
                </div>
              )}

              {remainingForFreeShipping <= 0 && (
                <div style={{ marginBottom: '32px', padding: '16px', backgroundColor: '#1a1a1a', color: 'white', textAlign: 'center' }}>
                  <p style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    Anda mendapat gratis ongkir!
                  </p>
                </div>
              )}

              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    style={{
                      display: 'flex',
                      gap: '24px',
                      paddingBottom: '32px',
                      borderBottom: '1px solid #e5e5e5',
                    }}
                  >
                    {/* Image */}
                    <Link
                      href={`/product/${item.product.slug}`}
                      style={{
                        position: 'relative',
                        width: '120px',
                        height: '150px',
                        flexShrink: 0,
                        backgroundColor: '#e5e5e5',
                      }}
                    >
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* Details */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <Link
                            href={`/product/${item.product.slug}`}
                            style={{ textDecoration: 'none', color: '#1a1a1a', fontWeight: '500' }}
                          >
                            {item.product.name}
                          </Link>
                          <p style={{ fontSize: '14px', color: '#888888', marginTop: '4px' }}>
                            {item.color} / {item.size}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.size, item.color)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888888' }}
                          aria-label="Hapus item"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        {/* Quantity */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                            style={{
                              width: '36px',
                              height: '36px',
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
                          <span style={{ width: '32px', textAlign: 'center' }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                            style={{
                              width: '36px',
                              height: '36px',
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

                        {/* Price */}
                        <p style={{ fontWeight: '500' }}>
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <Link
                href="/shop"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  marginTop: '32px',
                  color: '#888888',
                  textDecoration: 'none',
                }}
              >
                <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
                Lanjut Belanja
              </Link>
            </div>

            {/* Order Summary */}
            <div>
              <div style={{ backgroundColor: 'white', padding: '32px', position: 'sticky', top: '140px' }}>
                <h2 style={{ fontSize: '18px', fontFamily: 'Georgia, serif', marginBottom: '24px' }}>
                  Ringkasan Pesanan
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#888888' }}>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#888888' }}>Ongkos Kirim</span>
                    <span>{shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#888888' }}>Estimasi Pajak</span>
                    <span>Dihitung saat checkout</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '24px', borderTop: '1px solid #e5e5e5', marginBottom: '32px' }}>
                  <span style={{ fontWeight: '500' }}>Total</span>
                  <span style={{ fontSize: '20px', fontFamily: 'Georgia, serif' }}>
                    {formatPrice(total + shippingCost)}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '16px',
                    backgroundColor: '#1a1a1a',
                    color: 'white',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontSize: '12px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}
                >
                  Lanjut ke Checkout
                </Link>

                {/* Payment Methods */}
                <div style={{ marginTop: '32px', textAlign: 'center' }}>
                  <p style={{ fontSize: '12px', color: '#888888', marginBottom: '12px' }}>
                    Pembayaran aman oleh
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '12px', color: '#888888' }}>Visa</span>
                    <span style={{ fontSize: '12px', color: '#888888' }}>Mastercard</span>
                    <span style={{ fontSize: '12px', color: '#888888' }}>BCA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
