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
    label: 'Shop',
    href: '/shop',
    children: [
      { label: 'All Products', href: '/shop' },
      { label: 'Outerwear', href: '/shop/outerwear' },
      { label: 'Tops', href: '/shop/tops' },
      { label: 'Bottoms', href: '/shop/bottoms' },
      { label: 'Dresses', href: '/shop/dresses' },
      { label: 'Knitwear', href: '/shop/knitwear' },
      { label: 'Accessories', href: '/shop/accessories' },
      { label: 'Shoes', href: '/shop/shoes' },
    ],
  },
  {
    label: 'Collections',
    href: '/collections',
    children: [
      { label: 'Winter Solstice', href: '/collections/winter-solstice' },
      { label: 'Essential Edit', href: '/collections/essential-edit' },
      { label: 'Evening Edit', href: '/collections/evening-edit' },
      { label: 'Conscious Collection', href: '/collections/conscious-collection' },
    ],
  },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'About', href: '/about' },
  { label: 'Sustainability', href: '/sustainability' },
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
        <div className="bg-noir-black text-pure-white text-center py-2.5 px-4">
          <p className="text-[11px] tracking-[0.15em] uppercase">
            Complimentary Shipping on Orders Over $500 | Free Returns
          </p>
        </div>

        <nav className="container-fluid">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 -ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* Desktop Navigation - Left */}
            <div className="hidden md:flex items-center space-x-8">
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
                            className="block px-6 py-2 text-[12px] tracking-[0.05em] hover:bg-off-white transition-colors"
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
            <div className="hidden md:flex items-center space-x-8">
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
            <div className="flex items-center space-x-4 md:space-x-5">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1 hover:text-warm-gray transition-colors"
                aria-label="Search"
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
                aria-label="Open cart"
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
        style={{ top: '88px' }}
      >
        <nav className="container-fluid py-8">
          <div className="space-y-6">
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
                  <div className="mt-3 ml-4 space-y-2">
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

          <div className="mt-12 pt-8 border-t border-warm-gray/30">
            <div className="space-y-4">
              <Link
                href="/account"
                className="flex items-center space-x-3 text-sm tracking-[0.05em]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Account</span>
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
