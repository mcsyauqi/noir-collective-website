'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text > *', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.2,
        delay: 0.5,
      });

      gsap.from('.hero-image-container', {
        scale: 1.2,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.3,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen bg-noir-black">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left - Text Content */}
        <div className="flex flex-col justify-center px-10 md:px-20 lg:px-28 py-32 lg:py-20 order-2 lg:order-1">
          <div className="hero-text max-w-xl">
            <p className="text-gold-accent text-xs tracking-[0.4em] uppercase mb-10">
              Koleksi 2025
            </p>

            <h1 className="text-pure-white text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.95] mb-12">
              Definisi
              <br />
              <span className="text-gold-accent">Baru</span>
              <br />
              Elegan
            </h1>

            <p className="text-warm-gray text-lg md:text-xl leading-relaxed mb-16 max-w-md">
              Potongan kontemporer yang melampaui tren. Dibuat untuk mereka yang menghargai kesederhanaan dalam kemewahan.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-12 py-5 bg-pure-white text-noir-black text-sm tracking-[0.2em] uppercase hover:bg-gold-accent transition-colors duration-300"
              >
                Belanja Koleksi
              </Link>
              <Link
                href="/lookbook"
                className="inline-flex items-center justify-center px-12 py-5 border border-warm-gray text-pure-white text-sm tracking-[0.2em] uppercase hover:border-gold-accent hover:text-gold-accent transition-colors duration-300"
              >
                Lihat Lookbook
              </Link>
            </div>
          </div>
        </div>

        {/* Right - Image */}
        <div className="hero-image-container relative h-[60vh] lg:h-auto order-1 lg:order-2 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&h=1600&fit=crop&q=90"
            alt="NOIR Collection"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir-black via-transparent to-transparent lg:bg-gradient-to-r lg:from-noir-black/30 lg:via-transparent lg:to-transparent" />

          {/* Floating Badge */}
          <div className="absolute bottom-10 right-10 bg-pure-white/10 backdrop-blur-md px-8 py-6 text-pure-white">
            <p className="text-xs tracking-[0.2em] uppercase mb-2">Edisi Terbatas</p>
            <p className="text-2xl font-serif">Winter Solstice</p>
          </div>
        </div>
      </div>
    </section>
  );
}
