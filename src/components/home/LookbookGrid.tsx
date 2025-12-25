'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const lookbookItems = [
  {
    id: 1,
    title: 'Monochrome Elegance',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=1600&fit=crop&q=80',
    size: 'large',
  },
  {
    id: 2,
    title: 'Urban Minimalism',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1000&fit=crop&q=80',
    size: 'small',
  },
  {
    id: 3,
    title: 'Evening Luxe',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop&q=80',
    size: 'small',
  },
  {
    id: 4,
    title: 'Timeless Tailoring',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=800&fit=crop&q=80',
    size: 'wide',
  },
];

export default function LookbookGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lookbook-title', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      gsap.from('.lookbook-item', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.lookbook-grid',
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-48 md:py-64 bg-off-white">
      <div className="container-fluid">
        {/* Header */}
        <div className="lookbook-title text-center mb-24 md:mb-32">
          <p className="text-xs tracking-[0.4em] uppercase text-warm-gray mb-8">
            Editorial
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-10">
            Lookbook
          </h2>
          <p className="text-warm-gray text-lg max-w-xl mx-auto">
            Jelajahi inspirasi gaya dari koleksi terbaru kami
          </p>
        </div>

        {/* Bento Grid */}
        <div className="lookbook-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Large Item */}
          <Link
            href="/lookbook"
            className="lookbook-item group relative overflow-hidden lg:row-span-2 aspect-[3/4] lg:aspect-auto"
          >
            <Image
              src={lookbookItems[0].image}
              alt={lookbookItems[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir-black/80 via-noir-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-10">
              <p className="text-gold-accent text-xs tracking-[0.2em] uppercase mb-4">
                01 — Featured
              </p>
              <h3 className="text-pure-white text-2xl md:text-3xl font-serif mb-6">
                {lookbookItems[0].title}
              </h3>
              <div className="flex items-center gap-3 text-pure-white text-sm tracking-[0.1em] uppercase group-hover:text-gold-accent transition-colors">
                <span>Lihat</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Small Items */}
          {lookbookItems.slice(1, 3).map((item, index) => (
            <Link
              key={item.id}
              href="/lookbook"
              className="lookbook-item group relative overflow-hidden aspect-[4/5]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-black/80 via-noir-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-gold-accent text-xs tracking-[0.2em] uppercase mb-3">
                  0{index + 2}
                </p>
                <h3 className="text-pure-white text-xl font-serif mb-4">
                  {item.title}
                </h3>
                <ArrowUpRight className="w-4 h-4 text-pure-white group-hover:text-gold-accent transition-colors" />
              </div>
            </Link>
          ))}

          {/* Wide Item */}
          <Link
            href="/lookbook"
            className="lookbook-item group relative overflow-hidden lg:col-span-2 aspect-[16/9]"
          >
            <Image
              src={lookbookItems[3].image}
              alt={lookbookItems[3].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir-black/80 via-noir-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-10">
              <p className="text-gold-accent text-xs tracking-[0.2em] uppercase mb-4">
                04 — Collection
              </p>
              <h3 className="text-pure-white text-2xl md:text-3xl font-serif mb-6">
                {lookbookItems[3].title}
              </h3>
              <div className="flex items-center gap-3 text-pure-white text-sm tracking-[0.1em] uppercase group-hover:text-gold-accent transition-colors">
                <span>Jelajahi</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>

        {/* CTA */}
        <div className="text-center mt-20 md:mt-28">
          <Link
            href="/lookbook"
            className="inline-flex items-center justify-center px-14 py-6 border border-noir-black text-noir-black text-sm tracking-[0.2em] uppercase hover:bg-noir-black hover:text-pure-white transition-colors duration-300"
          >
            Lihat Semua Lookbook
          </Link>
        </div>
      </div>
    </section>
  );
}
