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
          height: '100vh',
          minHeight: '600px',
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
            maxWidth: '700px',
          }}
        >
          <p style={{
            fontSize: '11px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#c9a962',
            marginBottom: '32px',
            fontWeight: '500'
          }}>
            Cerita Kami
          </p>
          <h1 style={{
            fontSize: '48px',
            fontFamily: 'Georgia, serif',
            marginBottom: '32px',
            fontWeight: '400',
            lineHeight: '1.2'
          }}>
            Seni dalam Berpakaian
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: '1.9',
            maxWidth: '550px',
            margin: '0 auto'
          }}>
            Didirikan pada tahun 2020, NOIR Collective lahir dari keinginan untuk menciptakan fashion yang menghormati manusia dan planet.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section style={{ padding: '140px 24px', backgroundColor: '#f8f6f3' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '80px', alignItems: 'center' }}>
            {/* Image */}
            <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '125%' }}>
                <Image
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=80"
                  alt="Craftsmanship"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: '1 1 400px', maxWidth: '550px' }}>
              <p style={{
                fontSize: '11px',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: '#c9a962',
                marginBottom: '24px',
                fontWeight: '500'
              }}>
                Awal Mula Kami
              </p>
              <h2 style={{
                fontSize: '36px',
                fontFamily: 'Georgia, serif',
                marginBottom: '40px',
                fontWeight: '400',
                lineHeight: '1.3',
                color: '#1a1a1a'
              }}>
                Lebih sedikit, tapi lebih baik.
              </h2>
              <div style={{ color: '#666666', lineHeight: '1.9', fontSize: '15px' }}>
                <p style={{ marginBottom: '28px' }}>
                  NOIR Collective didirikan dengan keyakinan sederhana: bahwa fashion harus timeless, bukan sementara. Di dunia fast fashion dan tren yang berlalu, kami memilih jalan berbeda—jalan kesengajaan, kualitas, dan kreasi sadar.
                </p>
                <p style={{ marginBottom: '28px' }}>
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
      <section style={{ padding: '140px 24px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{
              fontSize: '11px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#999999',
              marginBottom: '20px',
              fontWeight: '500'
            }}>
              Yang Memandu Kami
            </p>
            <h2 style={{
              fontSize: '36px',
              fontFamily: 'Georgia, serif',
              fontWeight: '400',
              color: '#1a1a1a'
            }}>
              Nilai-Nilai Kami
            </h2>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
            {values.map((value, index) => (
              <div
                key={index}
                style={{
                  flex: '1 1 260px',
                  maxWidth: '280px',
                  textAlign: 'center',
                  padding: '48px 32px',
                  border: '1px solid #e8e8e8',
                  backgroundColor: 'white',
                }}
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    border: '1px solid #c9a962',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 28px',
                    fontFamily: 'Georgia, serif',
                    fontSize: '16px',
                    color: '#c9a962',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 style={{
                  fontSize: '17px',
                  fontFamily: 'Georgia, serif',
                  marginBottom: '16px',
                  fontWeight: '400',
                  color: '#1a1a1a'
                }}>
                  {value.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#777777', lineHeight: '1.8' }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: '140px 24px', backgroundColor: '#f8f6f3' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{
              fontSize: '11px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#999999',
              marginBottom: '20px',
              fontWeight: '500'
            }}>
              Kolektif
            </p>
            <h2 style={{
              fontSize: '36px',
              fontFamily: 'Georgia, serif',
              fontWeight: '400',
              color: '#1a1a1a'
            }}>
              Tim Kami
            </h2>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', justifyContent: 'center' }}>
            {team.map((member) => (
              <div key={member.name} style={{ flex: '1 1 250px', maxWidth: '280px', textAlign: 'center' }}>
                <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', marginBottom: '28px', overflow: 'hidden' }}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    style={{ filter: 'grayscale(100%)' }}
                  />
                </div>
                <h3 style={{
                  fontSize: '17px',
                  fontFamily: 'Georgia, serif',
                  marginBottom: '8px',
                  fontWeight: '400',
                  color: '#1a1a1a'
                }}>
                  {member.name}
                </h3>
                <p style={{ fontSize: '13px', color: '#888888', letterSpacing: '0.5px' }}>
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
          padding: '140px 24px',
          backgroundColor: '#1a1a1a',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '550px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontFamily: 'Georgia, serif',
            marginBottom: '28px',
            fontWeight: '400',
            lineHeight: '1.3'
          }}>
            Bergabung dalam Perjalanan Kami
          </h2>
          <p style={{
            color: '#999999',
            marginBottom: '56px',
            fontSize: '15px',
            lineHeight: '1.9'
          }}>
            Temukan komitmen kami terhadap fashion berkelanjutan dan jelajahi koleksi yang mendefinisikan kemewahan sadar.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <Link
              href="/sustainability"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '18px 48px',
                backgroundColor: 'transparent',
                color: 'white',
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.25)',
                transition: 'all 0.3s ease',
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
                padding: '18px 48px',
                backgroundColor: '#c9a962',
                color: '#1a1a1a',
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              Jelajahi Koleksi
            </Link>
          </div>
        </div>
      </section>

      {/* Responsive styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          section > div > div[style*="flex-wrap"] {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
