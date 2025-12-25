'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-inner">
          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" className="logo">NOIR</Link>
            <p className="tagline">Timeless elegance, sustainably crafted</p>
            <div className="social">
              <a href="#" className="social-link"><Instagram size={18} /></a>
              <a href="#" className="social-link"><Facebook size={18} /></a>
              <a href="#" className="social-link"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Links */}
          <div className="footer-links">
            <div className="link-group">
              <h4>Belanja</h4>
              <Link href="/shop">Semua Produk</Link>
              <Link href="/collections">Koleksi</Link>
              <Link href="/lookbook">Lookbook</Link>
            </div>
            <div className="link-group">
              <h4>Tentang</h4>
              <Link href="/about">Cerita Kami</Link>
              <Link href="/sustainability">Keberlanjutan</Link>
            </div>
            <div className="link-group">
              <h4>Bantuan</h4>
              <Link href="/cart">Keranjang</Link>
              <Link href="/wishlist">Wishlist</Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>&copy; 2024 NOIR Collective. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .footer {
          background: #1a1a1a;
          color: white;
          padding: 80px 24px 40px;
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }
        @media (min-width: 768px) {
          .footer-inner {
            grid-template-columns: 1fr 2fr;
          }
        }
        .logo {
          font-family: Georgia, serif;
          font-size: 32px;
          letter-spacing: 8px;
          color: white;
          text-decoration: none;
          display: block;
          margin-bottom: 16px;
        }
        .tagline {
          font-size: 14px;
          color: #888;
          margin-bottom: 24px;
        }
        .social {
          display: flex;
          gap: 16px;
        }
        .social-link {
          color: #888;
          transition: color 0.3s;
        }
        .social-link:hover {
          color: #c9a962;
        }
        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        @media (max-width: 600px) {
          .footer-links {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
        .link-group h4 {
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #c9a962;
          margin-bottom: 20px;
        }
        .link-group :global(a) {
          display: block;
          font-size: 14px;
          color: #888;
          text-decoration: none;
          margin-bottom: 12px;
          transition: color 0.3s;
        }
        .link-group :global(a:hover) {
          color: white;
        }
        .footer-bottom {
          max-width: 1200px;
          margin: 48px auto 0;
          padding-top: 32px;
          border-top: 1px solid #333;
          text-align: center;
        }
        .footer-bottom p {
          font-size: 12px;
          color: #666;
        }
      `}</style>
    </>
  );
}
