'use client';

import Link from 'next/link';
import Image from 'next/image';
import { featuredProducts } from '@/data/products';

export default function HomePage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price * 15000);
  };

  return (
    <>
      <main>
        {/* HERO */}
        <section className="hero">
          <Image
            src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80"
            alt="NOIR Collection"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="overlay" />
          <div className="hero-content">
            <span className="label">Koleksi Musim Ini</span>
            <h1>Timeless Elegance</h1>
            <p>Temukan koleksi kurasi kami yang dirancang untuk keanggunan abadi dan gaya berkelanjutan.</p>
            <Link href="/collections" className="hero-btn">
              Jelajahi Koleksi
            </Link>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="products">
          <div className="container">
            <div className="section-header">
              <span className="label">Pilihan Terbaik</span>
              <h2>Produk Unggulan</h2>
            </div>
            <div className="products-grid">
              {featuredProducts.slice(0, 4).map((product) => (
                <Link key={product.id} href={`/product/${product.slug}`} className="product-card">
                  <div className="product-image">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      style={{ objectFit: 'cover' }}
                    />
                    {product.badge && (
                      <span className={`badge ${product.badge}`}>
                        {product.badge === 'new' ? 'Baru' : 'Terbatas'}
                      </span>
                    )}
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{formatPrice(product.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="view-all">
              <Link href="/shop" className="view-all-btn">
                Lihat Semua Produk
              </Link>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="about">
          <div className="about-grid">
            <div className="about-image">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                alt="Craftsmanship"
                fill
                sizes="50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="about-content">
              <span className="label">Cerita Kami</span>
              <h2>Dibuat dengan Passion</h2>
              <p>NOIR Collective didirikan dengan keyakinan bahwa fashion harus timeless, bukan sementara. Kami berkomitmen untuk menciptakan pakaian berkualitas tinggi yang menghormati keahlian tradisional sambil merangkul praktik berkelanjutan.</p>
              <p>Setiap potongan dalam koleksi kami dipilih dengan cermat untuk keindahan abadinya, kualitas craftsmanship, dan produksi yang bertanggung jawab.</p>
              <Link href="/about" className="about-link">
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="newsletter">
          <div className="newsletter-content">
            <span className="label">Tetap Terhubung</span>
            <h2>Bergabung dengan Newsletter Kami</h2>
            <p>Dapatkan akses eksklusif ke koleksi baru, penawaran khusus, dan cerita di balik layar.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Alamat email Anda" />
              <button type="submit">Berlangganan</button>
            </form>
          </div>
        </section>
      </main>

      <style jsx>{`
        main {
          padding-top: 80px;
        }

        .label {
          display: block;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #c9a962;
          margin-bottom: 16px;
        }

        /* HERO */
        .hero {
          position: relative;
          height: calc(100vh - 80px);
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 600px;
          padding: 0 24px;
        }
        .hero-content h1 {
          font-size: clamp(36px, 6vw, 56px);
          font-family: Georgia, serif;
          font-weight: 400;
          margin-bottom: 20px;
          letter-spacing: 2px;
        }
        .hero-content p {
          font-size: 16px;
          line-height: 1.8;
          margin-bottom: 32px;
          opacity: 0.9;
        }
        .hero-btn {
          display: inline-block;
          padding: 16px 40px;
          background: transparent;
          border: 1px solid white;
          color: white;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: all 0.3s;
        }
        .hero-btn:hover {
          background: white;
          color: #1a1a1a;
        }

        /* PRODUCTS */
        .products {
          padding: 100px 24px;
          background: #f8f6f3;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .section-header h2 {
          font-size: 32px;
          font-family: Georgia, serif;
          font-weight: 400;
          color: #1a1a1a;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 500px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
        .product-card {
          display: block;
        }
        .product-image {
          position: relative;
          aspect-ratio: 3/4;
          margin-bottom: 16px;
          overflow: hidden;
          background: #e5e5e5;
        }
        .badge {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 6px 12px;
          font-size: 10px;
          letter-spacing: 1px;
          text-transform: uppercase;
          z-index: 1;
        }
        .badge.new {
          background: #1a1a1a;
          color: white;
        }
        .badge.limited {
          background: #c9a962;
          color: #1a1a1a;
        }
        .product-info h3 {
          font-size: 15px;
          font-weight: 400;
          margin-bottom: 8px;
          color: #1a1a1a;
        }
        .product-info p {
          font-size: 14px;
          color: #888;
        }
        .view-all {
          text-align: center;
          margin-top: 48px;
        }
        .view-all-btn {
          display: inline-block;
          padding: 16px 40px;
          background: #1a1a1a;
          color: white;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: background 0.3s;
        }
        .view-all-btn:hover {
          background: #333;
        }

        /* ABOUT */
        .about {
          background: white;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
        }
        .about-image {
          position: relative;
          min-height: 500px;
        }
        .about-content {
          padding: 80px 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .about-content {
            padding: 60px 24px;
          }
        }
        .about-content h2 {
          font-size: 32px;
          font-family: Georgia, serif;
          font-weight: 400;
          margin-bottom: 24px;
          color: #1a1a1a;
        }
        .about-content p {
          font-size: 15px;
          line-height: 1.9;
          color: #666;
          margin-bottom: 20px;
        }
        .about-link {
          display: inline-block;
          margin-top: 16px;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #1a1a1a;
          border-bottom: 1px solid #1a1a1a;
          padding-bottom: 4px;
        }

        /* NEWSLETTER */
        .newsletter {
          background: #1a1a1a;
          padding: 100px 24px;
          text-align: center;
          color: white;
        }
        .newsletter-content {
          max-width: 500px;
          margin: 0 auto;
        }
        .newsletter h2 {
          font-size: 32px;
          font-family: Georgia, serif;
          font-weight: 400;
          margin-bottom: 16px;
        }
        .newsletter p {
          font-size: 15px;
          color: #999;
          margin-bottom: 32px;
          line-height: 1.7;
        }
        .newsletter-form {
          display: flex;
          gap: 12px;
        }
        @media (max-width: 500px) {
          .newsletter-form {
            flex-direction: column;
          }
        }
        .newsletter-form input {
          flex: 1;
          padding: 16px 20px;
          border: 1px solid #333;
          background: transparent;
          color: white;
          font-size: 14px;
        }
        .newsletter-form input::placeholder {
          color: #666;
        }
        .newsletter-form button {
          padding: 16px 32px;
          background: #c9a962;
          color: #1a1a1a;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          border: none;
          transition: background 0.3s;
        }
        .newsletter-form button:hover {
          background: #d4b574;
        }
      `}</style>
    </>
  );
}
