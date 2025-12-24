'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { collections } from '@/data/collections';

gsap.registerPlugin(ScrollTrigger);

export default function CollectionsPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.collection-card', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.collections-list',
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="pt-[120px] pb-20 min-h-screen">
      <div className="container-fluid">
        {/* Page Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-xs tracking-[0.2em] uppercase text-warm-gray mb-3">
            Explore
          </p>
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Our Collections</h1>
          <p className="text-warm-gray max-w-lg mx-auto">
            Discover thoughtfully curated collections designed for the modern
            wardrobe. Each piece tells a story of craftsmanship and conscious design.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="collections-list space-y-20 md:space-y-32">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={`collection-card grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <Link
                href={`/collections/${collection.slug}`}
                className={`relative aspect-[4/5] overflow-hidden group ${
                  index % 2 === 1 ? 'md:order-2' : ''
                }`}
              >
                <Image
                  src={collection.heroImage}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-noir-black/0 group-hover:bg-noir-black/20 transition-colors duration-300" />
              </Link>

              {/* Content */}
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <p className="text-xs tracking-[0.15em] uppercase text-gold-accent mb-3">
                  {collection.season} {collection.year}
                </p>
                <h2 className="text-3xl md:text-5xl font-serif mb-4">
                  {collection.name}
                </h2>
                <p className="text-lg text-warm-gray italic mb-4">
                  &quot;{collection.tagline}&quot;
                </p>
                <p className="text-warm-gray leading-relaxed mb-8">
                  {collection.description}
                </p>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase hover:text-warm-gray transition-colors group"
                >
                  Explore Collection
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
