'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';

const footerLinks = {
  shop: [
    { label: 'New Arrivals', href: '/shop?filter=new' },
    { label: 'Best Sellers', href: '/shop?filter=bestsellers' },
    { label: 'Outerwear', href: '/shop/outerwear' },
    { label: 'Knitwear', href: '/shop/knitwear' },
    { label: 'Accessories', href: '/shop/accessories' },
    { label: 'Gift Cards', href: '/gift-cards' },
  ],
  about: [
    { label: 'Our Story', href: '/about' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Craftsmanship', href: '/about#craftsmanship' },
    { label: 'Press', href: '/press' },
    { label: 'Careers', href: '/careers' },
  ],
  help: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Shipping & Returns', href: '/shipping-returns' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Care Instructions', href: '/care' },
    { label: 'Track Order', href: '/track-order' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-noir-black text-pure-white">
      {/* Newsletter Section */}
      <div className="container-fluid py-16 md:py-24 border-b border-white/10">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-serif mb-4">
            Join the NOIR Community
          </h3>
          <p className="text-warm-gray text-sm mb-8">
            Be the first to know about new arrivals, exclusive offers, and
            insider access to private sales.
          </p>

          {subscribed ? (
            <div className="animate-fade-in">
              <p className="text-gold-accent">
                Thank you for subscribing. Welcome to NOIR.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 bg-transparent border border-white/30 text-pure-white placeholder:text-warm-gray focus:border-gold-accent outline-none text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-pure-white text-noir-black hover:bg-gold-accent transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Links Section */}
      <div className="container-fluid py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <h2 className="text-2xl font-serif tracking-[0.15em]">NOIR</h2>
            </Link>
            <p className="text-sm text-warm-gray mb-6 max-w-xs">
              Curated. Conscious. Contemporary. Timeless pieces for the modern
              wardrobe.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-white/20 hover:border-gold-accent hover:text-gold-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-white/20 hover:border-gold-accent hover:text-gold-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-white/20 hover:border-gold-accent hover:text-gold-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase mb-6">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-gray hover:text-pure-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase mb-6">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-gray hover:text-pure-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase mb-6">
              Customer Care
            </h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-gray hover:text-pure-white transition-colors"
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
      <div className="container-fluid py-6 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-warm-gray">
            <Link href="/privacy" className="hover:text-pure-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-pure-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="hover:text-pure-white transition-colors">
              Accessibility
            </Link>
          </div>
          <p className="text-xs text-warm-gray">
            © {new Date().getFullYear()} NOIR Collective. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
