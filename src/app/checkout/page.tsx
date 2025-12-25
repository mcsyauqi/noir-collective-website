'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ChevronDown, Lock, CreditCard } from 'lucide-react';
import { useCartStore } from '@/store/cart';

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState<'information' | 'shipping' | 'payment'>('information');
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const { items, getTotal } = useCartStore();

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
      <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
        <div className="container" style={{ padding: '32px 24px' }}>
          <div style={{ height: '32px', backgroundColor: '#e5e5e5', width: '120px', marginBottom: '32px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div style={{ height: '400px', backgroundColor: '#e5e5e5' }} />
            <div style={{ height: '250px', backgroundColor: '#e5e5e5' }} />
          </div>
        </div>
      </div>
    );
  }

  const total = getTotal();
  const freeShippingThreshold = 333;
  const shippingCost = total >= freeShippingThreshold ? 0 : 25;
  const estimatedTax = total * 0.1;
  const orderTotal = total + shippingCost + estimatedTax;

  const steps = [
    { key: 'information' as const, label: 'Informasi' },
    { key: 'shipping' as const, label: 'Pengiriman' },
    { key: 'payment' as const, label: 'Pembayaran' },
  ];

  const stepIndex = steps.findIndex((s) => s.key === currentStep);

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'white', paddingTop: '140px' }}>
        <div className="container" style={{ textAlign: 'center', padding: '80px 24px' }}>
          <h1 style={{ fontSize: '32px', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>
            Tas belanja Anda kosong
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
            Lanjut Belanja
          </Link>
        </div>
      </div>
    );
  }

  const inputStyle = {
    width: '100%',
    padding: '16px',
    fontSize: '14px',
    border: '1px solid #e5e5e5',
    outline: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {/* Left Column - Forms */}
        <div style={{ padding: '48px 24px', order: 2 }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'inline-block', marginBottom: '32px', textDecoration: 'none', color: '#1a1a1a' }}>
            <h1 style={{ fontSize: '24px', fontFamily: 'Georgia, serif', letterSpacing: '4px' }}>NOIR</h1>
          </Link>

          {/* Breadcrumb */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#888888', marginBottom: '32px', flexWrap: 'wrap' }}>
            <Link href="/cart" style={{ textDecoration: 'none', color: '#888888' }}>
              Tas
            </Link>
            {steps.map((step, index) => (
              <div key={step.key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ChevronRight size={16} />
                <button
                  onClick={() => index <= stepIndex && setCurrentStep(step.key)}
                  disabled={index > stepIndex}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: index <= stepIndex ? 'pointer' : 'not-allowed',
                    color: step.key === currentStep ? '#1a1a1a' : index < stepIndex ? '#888888' : '#ccc',
                    fontSize: '14px',
                  }}
                >
                  {step.label}
                </button>
              </div>
            ))}
          </nav>

          {/* Mobile Order Summary Toggle */}
          <button
            onClick={() => setShowOrderSummary(!showOrderSummary)}
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: '#f8f6f3',
              marginBottom: '32px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              {showOrderSummary ? 'Sembunyikan' : 'Tampilkan'} ringkasan pesanan
              <ChevronDown size={16} style={{ transform: showOrderSummary ? 'rotate(180deg)' : 'none' }} />
            </span>
            <span style={{ fontWeight: '500' }}>{formatPrice(orderTotal)}</span>
          </button>

          {/* Mobile Order Summary */}
          {showOrderSummary && (
            <div style={{ marginBottom: '32px', padding: '16px', backgroundColor: '#f8f6f3' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    style={{ display: 'flex', gap: '16px' }}
                  >
                    <div style={{ position: 'relative', width: '64px', height: '80px', backgroundColor: '#e5e5e5', flexShrink: 0 }}>
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          width: '20px',
                          height: '20px',
                          backgroundColor: '#1a1a1a',
                          color: 'white',
                          fontSize: '10px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {item.quantity}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px' }}>{item.product.name}</p>
                      <p style={{ fontSize: '12px', color: '#888888' }}>
                        {item.color} / {item.size}
                      </p>
                    </div>
                    <p style={{ fontSize: '14px' }}>
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Information Step */}
          {currentStep === 'information' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '18px', fontFamily: 'Georgia, serif' }}>Kontak</h2>
                  <p style={{ fontSize: '14px', color: '#888888' }}>
                    Punya akun?{' '}
                    <Link href="/account" style={{ textDecoration: 'underline', color: '#888888' }}>
                      Masuk
                    </Link>
                  </p>
                </div>
                <input type="email" placeholder="Email" style={inputStyle} />
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', fontSize: '14px' }}>
                  <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                  Email saya dengan berita dan penawaran
                </label>
              </div>

              <div>
                <h2 style={{ fontSize: '18px', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>Alamat Pengiriman</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <select style={inputStyle}>
                    <option>Negara/Wilayah</option>
                    <option>Indonesia</option>
                    <option>Singapura</option>
                    <option>Malaysia</option>
                  </select>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <input type="text" placeholder="Nama depan" style={inputStyle} />
                    <input type="text" placeholder="Nama belakang" style={inputStyle} />
                  </div>
                  <input type="text" placeholder="Alamat" style={inputStyle} />
                  <input type="text" placeholder="Apartemen, suite, dll. (opsional)" style={inputStyle} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <input type="text" placeholder="Kota" style={inputStyle} />
                    <input type="text" placeholder="Provinsi" style={inputStyle} />
                    <input type="text" placeholder="Kode pos" style={inputStyle} />
                  </div>
                  <input type="tel" placeholder="Telepon" style={inputStyle} />
                </div>
              </div>

              <button
                onClick={() => setCurrentStep('shipping')}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  fontSize: '12px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Lanjut ke Pengiriman
              </button>
            </div>
          )}

          {/* Shipping Step */}
          {currentStep === 'shipping' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ padding: '16px', backgroundColor: '#f8f6f3' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                  <span style={{ color: '#888888' }}>Kontak</span>
                  <button
                    onClick={() => setCurrentStep('information')}
                    style={{ fontSize: '12px', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Ubah
                  </button>
                </div>
                <p style={{ fontSize: '14px' }}>customer@example.com</p>
              </div>

              <div>
                <h2 style={{ fontSize: '18px', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>Metode Pengiriman</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '2px solid #1a1a1a', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input type="radio" name="shipping" defaultChecked style={{ width: '16px', height: '16px' }} />
                      <div>
                        <p style={{ fontSize: '14px' }}>Pengiriman Standar</p>
                        <p style={{ fontSize: '12px', color: '#888888' }}>3-5 hari kerja</p>
                      </div>
                    </div>
                    <span style={{ fontSize: '14px' }}>
                      {shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}
                    </span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid #e5e5e5', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input type="radio" name="shipping" style={{ width: '16px', height: '16px' }} />
                      <div>
                        <p style={{ fontSize: '14px' }}>Pengiriman Ekspres</p>
                        <p style={{ fontSize: '12px', color: '#888888' }}>1-2 hari kerja</p>
                      </div>
                    </div>
                    <span style={{ fontSize: '14px' }}>{formatPrice(45)}</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => setCurrentStep('information')}
                  style={{
                    flex: 1,
                    padding: '16px',
                    backgroundColor: 'white',
                    color: '#1a1a1a',
                    fontSize: '12px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    border: '1px solid #1a1a1a',
                    cursor: 'pointer',
                  }}
                >
                  Kembali
                </button>
                <button
                  onClick={() => setCurrentStep('payment')}
                  style={{
                    flex: 1,
                    padding: '16px',
                    backgroundColor: '#1a1a1a',
                    color: 'white',
                    fontSize: '12px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Lanjut ke Pembayaran
                </button>
              </div>
            </div>
          )}

          {/* Payment Step */}
          {currentStep === 'payment' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ padding: '16px', backgroundColor: '#f8f6f3' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                  <span style={{ color: '#888888' }}>Kontak</span>
                  <button
                    onClick={() => setCurrentStep('information')}
                    style={{ fontSize: '12px', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Ubah
                  </button>
                </div>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>customer@example.com</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px', paddingTop: '16px', borderTop: '1px solid #e5e5e5' }}>
                  <span style={{ color: '#888888' }}>Kirim ke</span>
                  <button
                    onClick={() => setCurrentStep('information')}
                    style={{ fontSize: '12px', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Ubah
                  </button>
                </div>
                <p style={{ fontSize: '14px' }}>Jl. Contoh No. 123, Jakarta, 12345</p>
              </div>

              <div>
                <h2 style={{ fontSize: '18px', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>Pembayaran</h2>
                <p style={{ fontSize: '14px', color: '#888888', marginBottom: '16px' }}>
                  Semua transaksi aman dan terenkripsi.
                </p>

                <div style={{ border: '1px solid #1a1a1a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#f8f6f3' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <CreditCard size={20} />
                      <span style={{ fontSize: '14px' }}>Kartu Kredit</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#888888' }}>Visa</span>
                      <span style={{ fontSize: '12px', color: '#888888' }}>Mastercard</span>
                    </div>
                  </div>
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <input type="text" placeholder="Nomor kartu" style={inputStyle} />
                    <input type="text" placeholder="Nama di kartu" style={inputStyle} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <input type="text" placeholder="Kadaluarsa (MM/YY)" style={inputStyle} />
                      <input type="text" placeholder="Kode keamanan" style={inputStyle} />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#888888' }}>
                <Lock size={16} />
                <span>Informasi pembayaran Anda terenkripsi dan aman</span>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => setCurrentStep('shipping')}
                  style={{
                    flex: 1,
                    padding: '16px',
                    backgroundColor: 'white',
                    color: '#1a1a1a',
                    fontSize: '12px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    border: '1px solid #1a1a1a',
                    cursor: 'pointer',
                  }}
                >
                  Kembali
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '16px',
                    backgroundColor: '#1a1a1a',
                    color: 'white',
                    fontSize: '12px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Bayar {formatPrice(orderTotal)}
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #e5e5e5' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: '#888888' }}>
              <Link href="/terms" style={{ textDecoration: 'none', color: '#888888' }}>
                Syarat Layanan
              </Link>
              <Link href="/privacy" style={{ textDecoration: 'none', color: '#888888' }}>
                Kebijakan Privasi
              </Link>
              <Link href="/shipping-returns" style={{ textDecoration: 'none', color: '#888888' }}>
                Pengiriman & Pengembalian
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary (Desktop) */}
        <div
          style={{
            display: 'none',
            backgroundColor: '#f8f6f3',
            padding: '48px',
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflowY: 'auto',
            order: 1,
          }}
          className="desktop-summary"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Items */}
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                style={{ display: 'flex', gap: '16px' }}
              >
                <div style={{ position: 'relative', width: '64px', height: '80px', backgroundColor: '#e5e5e5', flexShrink: 0 }}>
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      width: '20px',
                      height: '20px',
                      backgroundColor: '#1a1a1a',
                      color: 'white',
                      fontSize: '10px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.quantity}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px' }}>{item.product.name}</p>
                  <p style={{ fontSize: '12px', color: '#888888' }}>
                    {item.color} / {item.size}
                  </p>
                </div>
                <p style={{ fontSize: '14px' }}>
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            ))}

            {/* Promo Code */}
            <div style={{ display: 'flex', gap: '8px', paddingTop: '24px', borderTop: '1px solid #e5e5e5' }}>
              <input
                type="text"
                placeholder="Kode diskon"
                style={{ flex: 1, padding: '12px 16px', fontSize: '14px', border: '1px solid #e5e5e5' }}
              />
              <button
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'white',
                  color: '#1a1a1a',
                  fontSize: '12px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  border: '1px solid #1a1a1a',
                  cursor: 'pointer',
                }}
              >
                Terapkan
              </button>
            </div>

            {/* Totals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '24px', borderTop: '1px solid #e5e5e5' }}>
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
                <span>{formatPrice(estimatedTax)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '24px', borderTop: '1px solid #e5e5e5' }}>
              <span style={{ fontSize: '16px' }}>Total</span>
              <span style={{ fontSize: '20px', fontFamily: 'Georgia, serif' }}>{formatPrice(orderTotal)}</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 1024px) {
          .desktop-summary {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
