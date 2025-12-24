'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { cn } from '@/lib/utils';
import CartDrawer from '@/components/cart/CartDrawer';
import SearchModal from '@/components/ui/SearchModal';

const navigation = [
  {
    label: 'Belanja',
    href: '/shop',
    children: [
      { label: 'Semua Produk', href: '/shop' },
      { label: 'Outerwear', href: '/shop/outerwear' },
      { label: 'Atasan', href: '/shop/tops' },
      { label: 'Bawahan', href: '/shop/bottoms' },
      { label: 'Gaun', href: '/shop/dresses' },
      { label: 'Knitwear', href: '/shop/knitwear' },
      { label: 'Aksesori', href: '/shop/accessories' },
      { label: 'Sepatu', href: '/shop/shoes' },
    ],
  },
  {
    label: 'Koleksi',
    href: '/collections',
    children: [
      { label: 'Winter Solstice', href: '/collections/winter-solstice' },
      { label: 'Essential Edit', href: '/collections/essential-edit' },
      { label: 'Evening Edit', href: '/collections/evening-edit' },
      { label: 'Conscious Collection', href: '/collections/conscious-collection' },
    ],
  },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'Tentang', href: '/about' },
  { label: 'Keberlanjutan', href: '/sustainability' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const cartCount = mounted ? getItemCount() : 0;
  const wishlistCount = mounted ? wishlistItems.length : 0;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-off-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        )}
      >
        {/* Announcement Bar */}
        <div className="bg-noir-black text-pure-white text-center py-3 px-4">
          <p className="text-[11px] tracking-[0.15em] uppercase">
            Gratis Ongkir untuk Pesanan di Atas Rp5.000.000 | Gratis Pengembalian
          </p>
        </div>

        <nav className="container-fluid">
          <div className="flex items-center justify-between h-18 md:h-22">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 -ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* Desktop Navigation - Left */}
            <div className="hidden md:flex items-center space-x-10">
              {navigation.slice(0, 3).map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="text-[12px] tracking-[0.1em] uppercase hover:text-warm-gray transition-colors"
                  >
                    {item.label}
                  </Link>

                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-4 animate-fade-in">
                      <div className="bg-pure-white shadow-lg min-w-[200px] py-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-6 py-2.5 text-[12px] tracking-[0.05em] hover:bg-off-white transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Logo */}
            <Link
              href="/"
              className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none"
            >
              <h1 className="text-xl md:text-2xl font-serif tracking-[0.15em]">
                NOIR
              </h1>
            </Link>

            {/* Desktop Navigation - Right */}
            <div className="hidden md:flex items-center space-x-10">
              {navigation.slice(3).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[12px] tracking-[0.1em] uppercase hover:text-warm-gray transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-5 md:space-x-6">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1 hover:text-warm-gray transition-colors"
                aria-label="Cari"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/wishlist"
                className="p-1 hover:text-warm-gray transition-colors relative hidden md:block"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-noir-black text-pure-white text-[10px] rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/account"
                className="p-1 hover:text-warm-gray transition-colors hidden md:block"
              >
                <User className="w-5 h-5" />
              </Link>

              <button
                onClick={openCart}
                className="p-1 hover:text-warm-gray transition-colors relative"
                aria-label="Buka keranjang"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-noir-black text-pure-white text-[10px] rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-off-white transform transition-transform duration-500 md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ top: '96px' }}
      >
        <nav className="container-fluid py-10">
          <div className="space-y-8">
            {navigation.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="text-lg tracking-[0.1em] uppercase block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mt-4 ml-4 space-y-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="text-sm text-warm-gray block"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-14 pt-10 border-t border-warm-gray/30">
            <div className="space-y-5">
              <Link
                href="/account"
                className="flex items-center space-x-3 text-sm tracking-[0.05em]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Akun</span>
              </Link>
              <Link
                href="/wishlist"
                className="flex items-center space-x-3 text-sm tracking-[0.05em]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="w-5 h-5" />
                <span>Wishlist ({wishlistCount})</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
