'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';

const footerLinks = {
  shop: [
    { label: 'Produk Terbaru', href: '/shop?filter=new' },
    { label: 'Terlaris', href: '/shop?filter=bestsellers' },
    { label: 'Outerwear', href: '/shop/outerwear' },
    { label: 'Knitwear', href: '/shop/knitwear' },
    { label: 'Aksesori', href: '/shop/accessories' },
    { label: 'Kartu Hadiah', href: '/gift-cards' },
  ],
  about: [
    { label: 'Cerita Kami', href: '/about' },
    { label: 'Keberlanjutan', href: '/sustainability' },
    { label: 'Keahlian', href: '/about#craftsmanship' },
    { label: 'Pers', href: '/press' },
    { label: 'Karir', href: '/careers' },
  ],
  help: [
    { label: 'Hubungi Kami', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Pengiriman & Pengembalian', href: '/shipping-returns' },
    { label: 'Panduan Ukuran', href: '/size-guide' },
    { label: 'Petunjuk Perawatan', href: '/care' },
    { label: 'Lacak Pesanan', href: '/track-order' },
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
      <div className="container-fluid py-20 md:py-28 border-b border-white/10">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-serif mb-5">
            Bergabung dengan Komunitas NOIR
          </h3>
          <p className="text-warm-gray text-sm mb-10">
            Jadilah yang pertama mengetahui produk terbaru, penawaran eksklusif, dan
            akses ke penjualan pribadi.
          </p>

          {subscribed ? (
            <div className="animate-fade-in">
              <p className="text-gold-accent">
                Terima kasih telah berlangganan. Selamat datang di NOIR.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda"
                required
                className="flex-1 px-4 py-3 bg-transparent border border-white/30 text-pure-white placeholder:text-warm-gray focus:border-gold-accent outline-none text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-pure-white text-noir-black hover:bg-gold-accent transition-colors"
                aria-label="Berlangganan"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Links Section */}
      <div className="container-fluid py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-8">
              <h2 className="text-2xl font-serif tracking-[0.15em]">NOIR</h2>
            </Link>
            <p className="text-sm text-warm-gray mb-8 max-w-xs leading-relaxed">
              Terkurasi. Sadar. Kontemporer. Potongan timeless untuk lemari pakaian modern.
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
            <h4 className="text-xs tracking-[0.15em] uppercase mb-8">Belanja</h4>
            <ul className="space-y-4">
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
            <h4 className="text-xs tracking-[0.15em] uppercase mb-8">Tentang</h4>
            <ul className="space-y-4">
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
            <h4 className="text-xs tracking-[0.15em] uppercase mb-8">
              Layanan Pelanggan
            </h4>
            <ul className="space-y-4">
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
      <div className="container-fluid py-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-8 text-xs text-warm-gray">
            <Link href="/privacy" className="hover:text-pure-white transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="hover:text-pure-white transition-colors">
              Syarat & Ketentuan
            </Link>
            <Link href="/accessibility" className="hover:text-pure-white transition-colors">
              Aksesibilitas
            </Link>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs text-warm-gray">
              © {new Date().getFullYear()} NOIR Collective. Hak cipta dilindungi.
            </p>
            <p className="text-xs text-warm-gray/60 mt-2">
              Created by <span className="text-gold-accent">Creativism Digital Marketing</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
