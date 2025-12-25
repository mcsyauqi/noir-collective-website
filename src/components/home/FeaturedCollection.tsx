'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedCollection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.featured-image', {
        scale: 1.2,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.from('.featured-content > *', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.featured-content',
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&q=85"
          alt="Winter Solstice Collection"
          fill
          className="featured-image object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-noir-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-fluid py-48 md:py-64">
        <div className="featured-content max-w-3xl">
          <p className="text-gold-accent text-xs tracking-[0.4em] uppercase mb-10">
            Koleksi Unggulan
          </p>

          <h2 className="text-pure-white text-5xl md:text-7xl lg:text-8xl font-serif leading-[1] mb-12">
            Winter
            <br />
            Solstice
          </h2>

          <p className="text-pure-white/80 text-lg md:text-xl leading-relaxed mb-16 max-w-xl">
            Koleksi yang terinspirasi dari keheningan malam musim dingin.
            Potongan-potongan yang menggabungkan kehangatan dan keanggunan
            dalam harmoni yang sempurna.
          </p>

          <div className="flex flex-wrap gap-8 mb-20">
            <div>
              <p className="text-4xl md:text-5xl font-serif text-pure-white mb-3">24</p>
              <p className="text-warm-gray text-sm tracking-[0.1em] uppercase">Potongan</p>
            </div>
            <div className="w-[1px] bg-warm-gray/30" />
            <div>
              <p className="text-4xl md:text-5xl font-serif text-pure-white mb-3">100%</p>
              <p className="text-warm-gray text-sm tracking-[0.1em] uppercase">Sustainable</p>
            </div>
            <div className="w-[1px] bg-warm-gray/30" />
            <div>
              <p className="text-4xl md:text-5xl font-serif text-pure-white mb-3">Edisi</p>
              <p className="text-warm-gray text-sm tracking-[0.1em] uppercase">Terbatas</p>
            </div>
          </div>

          <Link
            href="/collections/winter-solstice"
            className="inline-flex items-center justify-center px-14 py-6 bg-pure-white text-noir-black text-sm tracking-[0.2em] uppercase hover:bg-gold-accent transition-colors duration-300"
          >
            Jelajahi Koleksi
          </Link>
        </div>
      </div>

      {/* Side Text */}
      <div className="absolute right-10 md:right-20 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <p className="text-[11px] tracking-[0.3em] text-pure-white/40 uppercase rotate-90 origin-center whitespace-nowrap">
          Winter Solstice 2025 — Limited Edition
        </p>
      </div>
    </section>
  );
}
