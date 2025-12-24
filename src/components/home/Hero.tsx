'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.15,
        delay: 0.3,
      });

      gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.9,
      });

      gsap.from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.2,
      });

      gsap.from('.scroll-indicator', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=1080&fit=crop&q=80"
          alt="Fashion editorial"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-noir-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-pure-white px-8 md:px-16 max-w-5xl mx-auto">
        <p className="hero-subtitle text-xs md:text-sm tracking-[0.3em] uppercase mb-12 md:mb-16 text-warm-gray">
          Koleksi Musim Dingin 2025
        </p>

        <h1 className="overflow-hidden mb-14 md:mb-16">
          <span className="hero-line block text-editorial">
            Seni dalam
          </span>
          <span className="hero-line block text-editorial text-accent">
            Berpakaian
          </span>
        </h1>

        <p className="hero-subtitle max-w-xl mx-auto text-base md:text-lg text-pure-white/80 mb-16 md:mb-20 leading-relaxed">
          Terkurasi. Sadar. Kontemporer. <br />
          Potongan timeless untuk lemari pakaian modern.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
          <Link
            href="/collections/winter-solstice"
            className="btn-primary bg-pure-white text-noir-black border-pure-white hover:bg-transparent hover:text-pure-white"
          >
            Temukan Koleksi
          </Link>
          <Link
            href="/shop"
            className="btn-secondary border-pure-white text-pure-white hover:bg-pure-white hover:text-noir-black"
          >
            Belanja Sekarang
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="scroll-indicator absolute bottom-20 left-1/2 -translate-x-1/2 text-pure-white flex flex-col items-center gap-4 cursor-pointer z-10"
        aria-label="Scroll to content"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Gulir</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>

      {/* Side Text */}
      <div className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <p className="text-[10px] tracking-[0.2em] text-pure-white/60 uppercase rotate-[-90deg] origin-left whitespace-nowrap">
          Est. 2020 — Jakarta, Indonesia
        </p>
      </div>
    </section>
  );
}
