'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag, Heart, Search } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/shop', label: 'Belanja' },
  { href: '/collections', label: 'Koleksi' },
  { href: '/lookbook', label: 'Lookbook' },
  { href: '/about', label: 'Tentang' },
  { href: '/sustainability', label: 'Keberlanjutan' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <>
      <header className="header">
        <div className="header-inner">
          {/* Logo */}
          <Link href="/" className="logo">
            NOIR
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="icons">
            <Link href="/wishlist" className="icon-link">
              <Heart size={20} />
              {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </Link>
            <Link href="/cart" className="icon-link">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`mobile-link ${pathname === link.href ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.98);
          border-bottom: 1px solid #eee;
        }
        .header-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          font-family: Georgia, serif;
          font-size: 28px;
          letter-spacing: 8px;
          color: #1a1a1a;
          text-decoration: none;
        }
        .desktop-nav {
          display: none;
          gap: 40px;
        }
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex;
          }
        }
        .nav-link {
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #666;
          text-decoration: none;
          transition: color 0.3s;
        }
        .nav-link:hover,
        .nav-link.active {
          color: #1a1a1a;
        }
        .icons {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .icon-link {
          position: relative;
          color: #1a1a1a;
        }
        .badge {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 18px;
          height: 18px;
          background: #c9a962;
          color: #1a1a1a;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        .mobile-menu-btn {
          display: flex;
          color: #1a1a1a;
        }
        @media (min-width: 900px) {
          .mobile-menu-btn {
            display: none;
          }
        }
        .mobile-menu {
          position: absolute;
          top: 80px;
          left: 0;
          right: 0;
          background: white;
          border-bottom: 1px solid #eee;
          padding: 20px 24px;
        }
        .mobile-link {
          display: block;
          padding: 12px 0;
          font-size: 14px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #666;
          text-decoration: none;
          border-bottom: 1px solid #f0f0f0;
        }
        .mobile-link:last-child {
          border-bottom: none;
        }
        .mobile-link.active {
          color: #1a1a1a;
        }
      `}</style>
    </>
  );
}
