'use client';

import Link from 'next/link';
import Image from 'next/image';

const values = [
  {
    title: 'Desain Sadar',
    description: 'Setiap potongan dirancang dengan penuh pertimbangan untuk melampaui musim dan tren.',
  },
  {
    title: 'Produksi Etis',
    description: 'Kami bermitra dengan pengrajin yang berbagi komitmen terhadap upah adil dan kondisi kerja yang aman.',
  },
  {
    title: 'Bahan Berkualitas',
    description: 'Kami mencari kain terbaik dari pemasok bersertifikat, mengutamakan bahan organik dan daur ulang.',
  },
  {
    title: 'Estetika Timeless',
    description: 'Desain kami merangkul minimalis dan keanggunan, menciptakan potongan yang bertahan lama.',
  },
];

const team = [
  {
    name: 'Maya Hartono',
    role: 'Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
  {
    name: 'David Chen',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Sarah Kim',
    role: 'Sustainability Director',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80"
            alt="NOIR Collective atelier"
            fill
            priority
            className="object-cover"
          />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            color: 'white',
            padding: '0 24px',
            maxWidth: '800px',
          }}
        >
          <p style={{ fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#c9a962', marginBottom: '24px' }}>
            Cerita Kami
          </p>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontFamily: 'Georgia, serif', marginBottom: '24px' }}>
            Seni dalam Berpakaian
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            Didirikan pada tahun 2020, NOIR Collective lahir dari keinginan untuk menciptakan fashion yang menghormati manusia dan planet.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section style={{ padding: '120px 0', backgroundColor: '#f8f6f3' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '80px',
              alignItems: 'center',
            }}
          >
            <div style={{ position: 'relative', aspectRatio: '4/5' }}>
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=80"
                alt="Craftsmanship"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p style={{ fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#c9a962', marginBottom: '24px' }}>
                Awal Mula Kami
              </p>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontFamily: 'Georgia, serif', marginBottom: '32px' }}>
                Lebih sedikit, tapi lebih baik.
              </h2>
              <div style={{ color: '#888888', lineHeight: '1.8', fontSize: '16px' }}>
                <p style={{ marginBottom: '24px' }}>
                  NOIR Collective didirikan dengan keyakinan sederhana: bahwa fashion harus timeless, bukan sementara. Di dunia fast fashion dan tren yang berlalu, kami memilih jalan berbeda—jalan kesengajaan, kualitas, dan kreasi sadar.
                </p>
                <p style={{ marginBottom: '24px' }}>
                  Pendiri kami, Maya Hartono, menghabiskan bertahun-tahun bekerja di industri fashion sebelum menyadari perlunya perubahan. Dampak lingkungan dari produksi pakaian, eksploitasi pekerja garmen, dan sifat sekali pakai fashion modern menuntut pendekatan baru.
                </p>
                <p>
                  Hari ini, NOIR Collective mewakili pertemuan antara kemewahan dan tanggung jawab. Setiap potongan dalam koleksi kami dirancang untuk dipakai, dicintai, dan disimpan—bukan dibuang setelah satu musim.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '120px 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#888888', marginBottom: '16px' }}>
              Yang Memandu Kami
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontFamily: 'Georgia, serif' }}>
              Nilai-Nilai Kami
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '32px',
            }}
          >
            {values.map((value, index) => (
              <div
                key={index}
                style={{
                  textAlign: 'center',
                  padding: '40px 24px',
                  border: '1px solid #e5e5e5',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    border: '1px solid #c9a962',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    fontFamily: 'Georgia, serif',
                    fontSize: '18px',
                    color: '#c9a962',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontSize: '18px', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>
                  {value.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#888888', lineHeight: '1.8' }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: '120px 0', backgroundColor: '#f8f6f3' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#888888', marginBottom: '16px' }}>
              Kolektif
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontFamily: 'Georgia, serif' }}>
              Tim Kami
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '48px',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            {team.map((member) => (
              <div key={member.name} style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', aspectRatio: '1', marginBottom: '24px', overflow: 'hidden' }}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    style={{ filter: 'grayscale(100%)' }}
                  />
                </div>
                <h3 style={{ fontSize: '18px', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>
                  {member.name}
                </h3>
                <p style={{ fontSize: '14px', color: '#888888' }}>
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: '120px 0',
          backgroundColor: '#1a1a1a',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontFamily: 'Georgia, serif', marginBottom: '24px' }}>
            Bergabung dalam Perjalanan Kami
          </h2>
          <p style={{ color: '#888888', marginBottom: '48px', fontSize: '16px', lineHeight: '1.8' }}>
            Temukan komitmen kami terhadap fashion berkelanjutan dan jelajahi koleksi yang mendefinisikan kemewahan sadar.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <Link
              href="/sustainability"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px 48px',
                backgroundColor: 'transparent',
                color: 'white',
                fontSize: '12px',
                fontWeight: '500',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              Keberlanjutan Kami
            </Link>
            <Link
              href="/collections"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px 48px',
                backgroundColor: '#c9a962',
                color: '#1a1a1a',
                fontSize: '12px',
                fontWeight: '500',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Jelajahi Koleksi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
