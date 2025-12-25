'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section style={{ padding: '120px 0', backgroundColor: '#f8f6f3' }}>
      <div className="container">
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#c9a962',
              marginBottom: '24px'
            }}
          >
            Newsletter
          </p>

          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              color: '#1a1a1a',
              marginBottom: '24px'
            }}
          >
            Bergabung dengan NOIR
          </h2>

          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#888888',
              marginBottom: '48px'
            }}
          >
            Dapatkan akses eksklusif ke koleksi baru dan penawaran khusus.
          </p>

          {submitted ? (
            <div style={{ padding: '40px 0' }}>
              <p style={{ color: '#c9a962', fontSize: '18px', marginBottom: '8px' }}>
                Terima kasih!
              </p>
              <p style={{ color: '#888888' }}>
                Kami akan menghubungi Anda segera.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Alamat email Anda"
                  required
                  style={{
                    flex: '1',
                    minWidth: '200px',
                    padding: '20px 24px',
                    fontSize: '14px',
                    border: '1px solid #e5e5e5',
                    backgroundColor: 'white',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '20px 40px',
                    backgroundColor: '#1a1a1a',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '500',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Langganan
                </button>
              </div>
              <p style={{ fontSize: '12px', color: '#888888' }}>
                Dengan berlangganan, Anda menyetujui kebijakan privasi kami.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
