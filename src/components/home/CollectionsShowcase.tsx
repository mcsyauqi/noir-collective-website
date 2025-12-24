'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { collections } from '@/data/collections';

gsap.registerPlugin(ScrollTrigger);

export default function CollectionsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.collection-item', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.collections-grid',
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredCollections = collections.slice(0, 3);

  return (
    <section ref={sectionRef} className="py-32 md:py-48 bg-off-white">
      <div className="container-fluid">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-xs tracking-[0.2em] uppercase text-warm-gray mb-6">
            Jelajahi
          </p>
          <h2 className="text-3xl md:text-5xl font-serif mb-8">Koleksi Kami</h2>
          <p className="text-warm-gray max-w-lg mx-auto text-base leading-relaxed">
            Temukan koleksi yang dikurasi dengan penuh pertimbangan untuk lemari pakaian modern
          </p>
        </div>

        {/* Collections Grid */}
        <div className="collections-grid grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {featuredCollections.map((collection, index) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className={`collection-item group relative overflow-hidden bg-warm-gray/20 ${
                index === 0 ? 'md:row-span-2' : ''
              }`}
            >
              <div
                className={`relative ${
                  index === 0 ? 'aspect-[3/4] md:aspect-auto md:h-full min-h-[500px] md:min-h-[750px]' : 'aspect-[4/5] min-h-[380px]'
                }`}
              >
                <Image
                  src={collection.heroImage}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-black/70 via-noir-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-pure-white">
                  <p className="text-xs tracking-[0.15em] uppercase text-warm-gray mb-4">
                    {collection.season} {collection.year}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-serif mb-5">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-pure-white/80 mb-8 line-clamp-2 leading-relaxed">
                    {collection.tagline}
                  </p>
                  <div className="flex items-center gap-3 text-sm tracking-[0.1em] uppercase group-hover:text-gold-accent transition-colors">
                    <span>Jelajahi</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-16 md:mt-24">
          <Link href="/collections" className="btn-secondary">
            Lihat Semua Koleksi
          </Link>
        </div>
      </div>
    </section>
  );
}
