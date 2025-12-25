'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
      <main>
        {/* HERO */}
        <section className="hero">
          <Image
            src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80"
            alt="NOIR"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="overlay" />
          <div className="hero-content">
            <span className="label">Cerita Kami</span>
            <h1>Seni dalam Berpakaian</h1>
            <p>Didirikan pada tahun 2020, NOIR Collective lahir dari keinginan untuk menciptakan fashion yang menghormati manusia dan planet.</p>
          </div>
        </section>

        {/* STORY */}
        <section className="story">
          <div className="story-container">
            <div className="story-image">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                alt="Craftsmanship"
                fill
                sizes="50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="story-text">
              <span className="label">Awal Mula Kami</span>
              <h2>Lebih sedikit, tapi lebih baik.</h2>
              <p>NOIR Collective didirikan dengan keyakinan sederhana: bahwa fashion harus timeless, bukan sementara.</p>
              <p>Pendiri kami, Maya Hartono, menghabiskan bertahun-tahun bekerja di industri fashion sebelum menyadari perlunya perubahan.</p>
              <p>Hari ini, NOIR Collective mewakili pertemuan antara kemewahan dan tanggung jawab.</p>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="values">
          <div className="section-header">
            <span className="label-gray">Yang Memandu Kami</span>
            <h2>Nilai-Nilai Kami</h2>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <span className="num">01</span>
              <h3>Desain Sadar</h3>
              <p>Setiap potongan dirancang dengan penuh pertimbangan.</p>
            </div>
            <div className="value-card">
              <span className="num">02</span>
              <h3>Produksi Etis</h3>
              <p>Kami bermitra dengan pengrajin yang berbagi komitmen.</p>
            </div>
            <div className="value-card">
              <span className="num">03</span>
              <h3>Bahan Berkualitas</h3>
              <p>Kami mencari kain terbaik dari pemasok bersertifikat.</p>
            </div>
            <div className="value-card">
              <span className="num">04</span>
              <h3>Estetika Timeless</h3>
              <p>Desain kami merangkul minimalis dan keanggunan.</p>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="team">
          <div className="section-header">
            <span className="label-gray">Kolektif</span>
            <h2>Tim Kami</h2>
          </div>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"
                  alt="Maya Hartono"
                  fill
                  sizes="300px"
                  style={{ objectFit: 'cover', filter: 'grayscale(100%)' }}
                />
              </div>
              <h3>Maya Hartono</h3>
              <p>Founder & Creative Director</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
                  alt="David Chen"
                  fill
                  sizes="300px"
                  style={{ objectFit: 'cover', filter: 'grayscale(100%)' }}
                />
              </div>
              <h3>David Chen</h3>
              <p>Head of Design</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <Image
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80"
                  alt="Sarah Kim"
                  fill
                  sizes="300px"
                  style={{ objectFit: 'cover', filter: 'grayscale(100%)' }}
                />
              </div>
              <h3>Sarah Kim</h3>
              <p>Sustainability Director</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <h2>Bergabung dalam Perjalanan Kami</h2>
          <p>Temukan komitmen kami terhadap fashion berkelanjutan.</p>
          <div className="cta-buttons">
            <Link href="/sustainability" className="btn-outline">Keberlanjutan</Link>
            <Link href="/collections" className="btn-gold">Koleksi</Link>
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
          margin-bottom: 20px;
        }

        .label-gray {
          display: block;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 20px;
        }

        /* HERO */
        .hero {
          position: relative;
          height: 100vh;
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
          font-size: clamp(32px, 5vw, 42px);
          font-family: Georgia, serif;
          font-weight: 400;
          margin-bottom: 20px;
        }
        .hero-content p {
          font-size: 16px;
          line-height: 1.8;
          opacity: 0.9;
        }

        /* STORY */
        .story {
          background: #f8f6f3;
          padding: 100px 24px;
        }
        .story-container {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .story-container {
            grid-template-columns: 1fr;
          }
        }
        .story-image {
          position: relative;
          height: 500px;
        }
        @media (max-width: 900px) {
          .story-image {
            height: 400px;
          }
        }
        .story-text h2 {
          font-size: 32px;
          font-family: Georgia, serif;
          font-weight: 400;
          margin-bottom: 30px;
          color: #1a1a1a;
        }
        .story-text p {
          font-size: 15px;
          line-height: 1.9;
          color: #666;
          margin-bottom: 20px;
        }

        /* VALUES */
        .values {
          background: white;
          padding: 100px 24px;
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
        .values-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .values-grid {
            grid-template-columns: 1fr;
          }
        }
        .value-card {
          text-align: center;
          padding: 40px 20px;
          border: 1px solid #eee;
        }
        .num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border: 1px solid #c9a962;
          margin: 0 auto 20px;
          font-family: Georgia, serif;
          font-size: 14px;
          color: #c9a962;
        }
        .value-card h3 {
          font-size: 16px;
          font-family: Georgia, serif;
          font-weight: 400;
          margin-bottom: 10px;
          color: #1a1a1a;
        }
        .value-card p {
          font-size: 13px;
          color: #888;
          line-height: 1.7;
        }

        /* TEAM */
        .team {
          background: #f8f6f3;
          padding: 100px 24px;
        }
        .team-grid {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }
        @media (max-width: 900px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .team-grid {
            grid-template-columns: 1fr;
          }
        }
        .team-member {
          text-align: center;
        }
        .member-image {
          position: relative;
          height: 280px;
          margin-bottom: 20px;
        }
        @media (max-width: 600px) {
          .member-image {
            height: 300px;
          }
        }
        .team-member h3 {
          font-size: 16px;
          font-family: Georgia, serif;
          font-weight: 400;
          margin-bottom: 5px;
          color: #1a1a1a;
        }
        .team-member p {
          font-size: 12px;
          color: #888;
        }

        /* CTA */
        .cta {
          background: #1a1a1a;
          padding: 100px 24px;
          text-align: center;
          color: white;
        }
        .cta h2 {
          font-size: 32px;
          font-family: Georgia, serif;
          font-weight: 400;
          margin-bottom: 20px;
        }
        .cta p {
          font-size: 15px;
          color: #999;
          margin-bottom: 40px;
        }
        .cta-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-outline {
          display: inline-block;
          padding: 15px 35px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: all 0.3s;
        }
        .btn-outline:hover {
          background: white;
          color: #1a1a1a;
        }
        .btn-gold {
          display: inline-block;
          padding: 15px 35px;
          background: #c9a962;
          color: #1a1a1a;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: background 0.3s;
        }
        .btn-gold:hover {
          background: #d4b574;
        }
      `}</style>
    </>
  );
}
