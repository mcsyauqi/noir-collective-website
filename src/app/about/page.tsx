'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div
        style={{
          width: '100%',
          height: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80"
          alt="NOIR Collective"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            color: 'white',
            padding: '20px',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#c9a962',
              marginBottom: '30px',
            }}
          >
            Cerita Kami
          </p>
          <h1
            style={{
              fontSize: '48px',
              fontFamily: 'Georgia, serif',
              fontWeight: 'normal',
              marginBottom: '30px',
            }}
          >
            Seni dalam Berpakaian
          </h1>
          <p
            style={{
              fontSize: '16px',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: '1.8',
              opacity: 0.85,
            }}
          >
            Didirikan pada tahun 2020, NOIR Collective lahir dari keinginan untuk menciptakan fashion yang menghormati manusia dan planet.
          </p>
        </div>
      </div>

      {/* Story */}
      <div style={{ backgroundColor: '#f8f6f3', padding: '100px 20px' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          <div style={{ position: 'relative', height: '500px' }}>
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
              alt="Craftsmanship"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: '#c9a962',
                marginBottom: '20px',
              }}
            >
              Awal Mula Kami
            </p>
            <h2
              style={{
                fontSize: '32px',
                fontFamily: 'Georgia, serif',
                fontWeight: 'normal',
                marginBottom: '30px',
                color: '#1a1a1a',
              }}
            >
              Lebih sedikit, tapi lebih baik.
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: '1.9',
                color: '#666',
                marginBottom: '20px',
              }}
            >
              NOIR Collective didirikan dengan keyakinan sederhana: bahwa fashion harus timeless, bukan sementara. Di dunia fast fashion dan tren yang berlalu, kami memilih jalan berbeda.
            </p>
            <p
              style={{
                fontSize: '15px',
                lineHeight: '1.9',
                color: '#666',
                marginBottom: '20px',
              }}
            >
              Pendiri kami, Maya Hartono, menghabiskan bertahun-tahun bekerja di industri fashion sebelum menyadari perlunya perubahan.
            </p>
            <p
              style={{
                fontSize: '15px',
                lineHeight: '1.9',
                color: '#666',
              }}
            >
              Hari ini, NOIR Collective mewakili pertemuan antara kemewahan dan tanggung jawab.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div style={{ backgroundColor: 'white', padding: '100px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: '#999',
                marginBottom: '15px',
              }}
            >
              Yang Memandu Kami
            </p>
            <h2
              style={{
                fontSize: '32px',
                fontFamily: 'Georgia, serif',
                fontWeight: 'normal',
                color: '#1a1a1a',
              }}
            >
              Nilai-Nilai Kami
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px',
            }}
          >
            {[
              { num: '01', title: 'Desain Sadar', desc: 'Setiap potongan dirancang dengan penuh pertimbangan.' },
              { num: '02', title: 'Produksi Etis', desc: 'Kami bermitra dengan pengrajin yang berbagi komitmen.' },
              { num: '03', title: 'Bahan Berkualitas', desc: 'Kami mencari kain terbaik dari pemasok bersertifikat.' },
              { num: '04', title: 'Estetika Timeless', desc: 'Desain kami merangkul minimalis dan keanggunan.' },
            ].map((item) => (
              <div
                key={item.num}
                style={{
                  textAlign: 'center',
                  padding: '40px 25px',
                  border: '1px solid #eee',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    border: '1px solid #c9a962',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 25px',
                    fontFamily: 'Georgia, serif',
                    fontSize: '14px',
                    color: '#c9a962',
                  }}
                >
                  {item.num}
                </div>
                <h3
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Georgia, serif',
                    fontWeight: 'normal',
                    marginBottom: '12px',
                    color: '#1a1a1a',
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.7' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div style={{ backgroundColor: '#f8f6f3', padding: '100px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: '#999',
                marginBottom: '15px',
              }}
            >
              Kolektif
            </p>
            <h2
              style={{
                fontSize: '32px',
                fontFamily: 'Georgia, serif',
                fontWeight: 'normal',
                color: '#1a1a1a',
              }}
            >
              Tim Kami
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '40px',
            }}
          >
            {[
              { name: 'Maya Hartono', role: 'Founder & Creative Director', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
              { name: 'David Chen', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
              { name: 'Sarah Kim', role: 'Sustainability Director', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
            ].map((member) => (
              <div key={member.name} style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', height: '280px', marginBottom: '25px' }}>
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    style={{ objectFit: 'cover', filter: 'grayscale(100%)' }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Georgia, serif',
                    fontWeight: 'normal',
                    marginBottom: '5px',
                    color: '#1a1a1a',
                  }}
                >
                  {member.name}
                </h3>
                <p style={{ fontSize: '12px', color: '#888' }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          backgroundColor: '#1a1a1a',
          padding: '100px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '32px',
              fontFamily: 'Georgia, serif',
              fontWeight: 'normal',
              color: 'white',
              marginBottom: '25px',
            }}
          >
            Bergabung dalam Perjalanan Kami
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: '#999',
              lineHeight: '1.8',
              marginBottom: '40px',
            }}
          >
            Temukan komitmen kami terhadap fashion berkelanjutan.
          </p>
          <div>
            <Link
              href="/sustainability"
              style={{
                display: 'inline-block',
                padding: '15px 40px',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                textDecoration: 'none',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginRight: '15px',
                marginBottom: '15px',
              }}
            >
              Keberlanjutan
            </Link>
            <Link
              href="/collections"
              style={{
                display: 'inline-block',
                padding: '15px 40px',
                backgroundColor: '#c9a962',
                color: '#1a1a1a',
                textDecoration: 'none',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              Koleksi
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Responsive */}
      <style jsx global>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="gridTemplateColumns: repeat(4"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="gridTemplateColumns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
