'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Leaf, Recycle, Heart, Globe, Award, Droplets } from 'lucide-react';

const initiatives = [
  {
    icon: Leaf,
    title: 'Bahan Organik',
    description:
      'Kami mengutamakan kapas organik bersertifikat GOTS, linen, dan serat alami lainnya yang ditanam tanpa pestisida berbahaya.',
    stat: '78%',
    statLabel: 'Bahan Organik',
  },
  {
    icon: Recycle,
    title: 'Kain Daur Ulang',
    description:
      'Koleksi kami menggabungkan wol, kasmir, dan poliester daur ulang, memberikan kehidupan baru pada material yang ada.',
    stat: '35%',
    statLabel: 'Konten Daur Ulang',
  },
  {
    icon: Droplets,
    title: 'Konservasi Air',
    description:
      'Mitra manufaktur kami menggunakan teknik pewarnaan inovatif yang mengurangi konsumsi air hingga 90%.',
    stat: '50JT',
    statLabel: 'Liter Terhemat',
  },
  {
    icon: Globe,
    title: 'Netral Karbon',
    description:
      'Kami mengimbangi emisi karbon melalui proyek reboisasi terverifikasi dan investasi energi terbarukan.',
    stat: '100%',
    statLabel: 'Karbon Offset',
  },
  {
    icon: Heart,
    title: 'Upah Adil',
    description:
      'Setiap pekerja dalam rantai pasokan kami menerima upah yang adil, kondisi kerja yang aman, dan akses ke layanan kesehatan.',
    stat: '2.000+',
    statLabel: 'Pengrajin Didukung',
  },
  {
    icon: Award,
    title: 'Mitra Bersertifikat',
    description:
      'Kami bekerja eksklusif dengan pabrik bersertifikat OEKO-TEX, GOTS, dan organisasi Fair Trade.',
    stat: '100%',
    statLabel: 'Pemasok Bersertifikat',
  },
];

const certifications = [
  { name: 'GOTS Certified', description: 'Global Organic Textile Standard' },
  { name: 'OEKO-TEX', description: 'Standard 100 Certification' },
  { name: 'Fair Trade', description: 'Certified Production' },
  { name: 'B Corp', description: 'Pending Certification' },
];

export default function SustainabilityPage() {
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
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1920&q=80"
            alt="Sustainable fashion"
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
            Komitmen Kami
          </p>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontFamily: 'Georgia, serif', marginBottom: '24px' }}>
            Fashion dengan Tujuan
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            Kami percaya kemewahan dan keberlanjutan tidak saling eksklusif.
            Setiap karya yang kami ciptakan dirancang untuk meminimalkan dampak lingkungan
            sambil memaksimalkan keindahan dan daya tahan.
          </p>
        </div>
      </section>

      {/* Mission Section */}
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
            <div>
              <p style={{ fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#c9a962', marginBottom: '24px' }}>
                Misi Kami
              </p>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontFamily: 'Georgia, serif', marginBottom: '32px' }}>
                Mendefinisikan Ulang Fashion Mewah
              </h2>
              <div style={{ color: '#888888', lineHeight: '1.8', fontSize: '16px' }}>
                <p style={{ marginBottom: '24px' }}>
                  Industri fashion adalah salah satu pencemar terbesar di dunia. Di NOIR Collective, kami berkomitmen untuk menjadi bagian dari solusi, bukan masalah.
                </p>
                <p style={{ marginBottom: '24px' }}>
                  Dari mencari bahan organik dan daur ulang hingga bermitra dengan produsen etis, setiap keputusan yang kami buat mempertimbangkan dampaknya terhadap manusia dan planet.
                </p>
                <p>
                  Tujuan kami adalah membuktikan bahwa fashion yang indah dan berkualitas tinggi dapat diciptakan secara bertanggung jawab—dan konsumen tidak harus mengorbankan nilai-nilai mereka demi gaya.
                </p>
              </div>
            </div>

            <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden' }}>
              <Image
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
                alt="Sustainable materials"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section style={{ padding: '120px 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#888888', marginBottom: '16px' }}>
              Dampak Kami
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontFamily: 'Georgia, serif' }}>
              Inisiatif Keberlanjutan
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
            }}
          >
            {initiatives.map((initiative, index) => (
              <div
                key={index}
                style={{
                  padding: '32px',
                  border: '1px solid #e5e5e5',
                }}
              >
                <initiative.icon size={32} style={{ color: '#c9a962', marginBottom: '24px' }} />
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '36px', fontFamily: 'Georgia, serif', color: '#1a1a1a' }}>
                    {initiative.stat}
                  </span>
                  <span style={{ fontSize: '14px', color: '#888888', marginLeft: '8px' }}>
                    {initiative.statLabel}
                  </span>
                </div>
                <h3 style={{ fontSize: '18px', fontFamily: 'Georgia, serif', marginBottom: '12px' }}>
                  {initiative.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#888888', lineHeight: '1.8' }}>
                  {initiative.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supply Chain Section */}
      <section style={{ padding: '120px 0', backgroundColor: '#1a1a1a', color: 'white' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '80px',
              alignItems: 'center',
            }}
          >
            <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
              <Image
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80"
                alt="Artisan craftsmanship"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p style={{ fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#c9a962', marginBottom: '24px' }}>
                Transparansi
              </p>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontFamily: 'Georgia, serif', marginBottom: '32px' }}>
                Kenali Rantai Pasokan Anda
              </h2>
              <div style={{ color: '#888888', lineHeight: '1.8', marginBottom: '32px' }}>
                <p style={{ marginBottom: '16px' }}>
                  Kami percaya Anda berhak tahu dari mana pakaian Anda berasal. Itulah mengapa kami menjaga transparansi penuh tentang rantai pasokan kami.
                </p>
                <p>
                  Setiap pakaian dapat dilacak kembali ke asalnya—dari pertanian tempat kapas ditanam hingga pengrajin yang menjahit jahitan terakhir.
                </p>
              </div>

              {/* Journey Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'Sumber Bahan',
                  'Produksi Kain',
                  'Desain & Pembuatan Pola',
                  'Produksi Pengrajin',
                  'Kontrol Kualitas',
                  'Pengemasan Berkelanjutan',
                ].map((step, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid #c9a962',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        color: '#c9a962',
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <span style={{ fontSize: '14px' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section style={{ padding: '120px 0', backgroundColor: '#f8f6f3' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#888888', marginBottom: '16px' }}>
              Standar Terverifikasi
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontFamily: 'Georgia, serif' }}>
              Sertifikasi Kami
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            {certifications.map((cert, index) => (
              <div
                key={index}
                style={{
                  textAlign: 'center',
                  padding: '32px 24px',
                  backgroundColor: 'white',
                  border: '1px solid #e5e5e5',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#f8f6f3',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <Award size={24} style={{ color: '#c9a962' }} />
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>{cert.name}</h3>
                <p style={{ fontSize: '12px', color: '#888888' }}>{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '120px 0', backgroundColor: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontFamily: 'Georgia, serif', marginBottom: '24px' }}>
            Belanja dengan Sadar
          </h2>
          <p style={{ color: '#888888', marginBottom: '48px', fontSize: '16px', lineHeight: '1.8' }}>
            Setiap pembelian mendukung praktik berkelanjutan dan produksi etis.
            Bergabunglah dengan kami dalam menciptakan industri fashion yang lebih bertanggung jawab.
          </p>
          <Link
            href="/collections"
            style={{
              display: 'inline-block',
              padding: '20px 48px',
              backgroundColor: '#1a1a1a',
              color: 'white',
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Jelajahi Koleksi
          </Link>
        </div>
      </section>
    </div>
  );
}
