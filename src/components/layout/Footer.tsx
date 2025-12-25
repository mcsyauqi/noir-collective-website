'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const footerLinks = {
  shop: [
    { label: 'Semua Produk', href: '/shop' },
    { label: 'Outerwear', href: '/shop/outerwear' },
    { label: 'Aksesori', href: '/shop/accessories' },
  ],
  about: [
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Keberlanjutan', href: '/sustainability' },
  ],
  help: [
    { label: 'Hubungi Kami', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Pengiriman', href: '/shipping' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1a1a1a', color: 'white' }}>
      {/* Main Footer */}
      <div className="container" style={{ padding: '80px 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                fontSize: '24px',
                fontFamily: 'Georgia, serif',
                letterSpacing: '4px',
                color: 'white',
                textDecoration: 'none',
                marginBottom: '24px',
              }}
            >
              NOIR
            </Link>
            <p
              style={{
                fontSize: '14px',
                lineHeight: '1.8',
                color: '#888888',
                marginTop: '24px',
                maxWidth: '280px',
              }}
            >
              Potongan timeless untuk lemari pakaian modern.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid #333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid #333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid #333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4
              style={{
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              Belanja
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.shop.map((link) => (
                <li key={link.href} style={{ marginBottom: '16px' }}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '14px',
                      color: '#888888',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4
              style={{
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              Tentang
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.about.map((link) => (
                <li key={link.href} style={{ marginBottom: '16px' }}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '14px',
                      color: '#888888',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4
              style={{
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              Bantuan
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.help.map((link) => (
                <li key={link.href} style={{ marginBottom: '16px' }}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '14px',
                      color: '#888888',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: '1px solid #333',
          padding: '24px',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '12px', color: '#888888' }}>
            © {new Date().getFullYear()} NOIR Collective. Hak cipta dilindungi.
          </p>
          <p style={{ fontSize: '11px', color: '#666666' }}>
            Created by{' '}
            <span style={{ color: '#c9a962' }}>Creativism Digital Marketing</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
