'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Heart, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import CartDrawer from '@/components/cart/CartDrawer';
import SearchModal from '@/components/ui/SearchModal';

const navigation = [
  { label: 'Belanja', href: '/shop' },
  { label: 'Koleksi', href: '/collections' },
  { label: 'Tentang', href: '/about' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { openCart, getItemCount } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = mounted ? getItemCount() : 0;
  const wishlistCount = mounted ? wishlistItems.length : 0;

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.3s ease',
          backgroundColor: isScrolled ? 'rgba(248, 246, 243, 0.98)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        }}
      >
        {/* Announcement Bar */}
        <div
          style={{
            backgroundColor: '#1a1a1a',
            color: 'white',
            textAlign: 'center',
            padding: '12px 24px',
            fontSize: '11px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          Gratis Ongkir untuk Pesanan di Atas Rp5.000.000
        </div>

        {/* Main Navigation */}
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '80px',
            }}
          >
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: 'none',
                padding: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              className="mobile-menu-btn"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <nav style={{ display: 'flex', gap: '48px' }} className="desktop-nav">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    fontSize: '12px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: isScrolled ? '#1a1a1a' : 'white',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link
              href="/"
              style={{
                fontSize: '28px',
                fontFamily: 'Georgia, serif',
                letterSpacing: '4px',
                textDecoration: 'none',
                color: isScrolled ? '#1a1a1a' : 'white',
                transition: 'color 0.3s ease',
              }}
            >
              NOIR
            </Link>

            {/* Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <button
                onClick={() => setIsSearchOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isScrolled ? '#1a1a1a' : 'white',
                  transition: 'color 0.3s ease',
                }}
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link
                href="/wishlist"
                style={{
                  position: 'relative',
                  color: isScrolled ? '#1a1a1a' : 'white',
                  transition: 'color 0.3s ease',
                }}
                className="desktop-only"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      width: '18px',
                      height: '18px',
                      backgroundColor: '#c9a962',
                      color: '#1a1a1a',
                      fontSize: '10px',
                      fontWeight: '600',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                onClick={openCart}
                style={{
                  position: 'relative',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isScrolled ? '#1a1a1a' : 'white',
                  transition: 'color 0.3s ease',
                }}
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      width: '18px',
                      height: '18px',
                      backgroundColor: '#c9a962',
                      color: '#1a1a1a',
                      fontSize: '10px',
                      fontWeight: '600',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '130px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#f8f6f3',
            zIndex: 99,
            padding: '40px 24px',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  fontSize: '18px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: '#1a1a1a',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .desktop-only {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
