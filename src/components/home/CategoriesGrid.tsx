'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categories } from '@/data/collections';

gsap.registerPlugin(ScrollTrigger);

export default function CategoriesGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.category-item', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.categories-container',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-40 md:py-60 bg-pure-white">
      <div className="container-fluid">
        {/* Header */}
        <div className="text-center mb-20 md:mb-32">
          <p className="text-xs tracking-[0.2em] uppercase text-warm-gray mb-8">
            Telusuri Berdasarkan
          </p>
          <h2 className="text-4xl md:text-6xl font-serif">Kategori</h2>
        </div>

        {/* Categories Grid */}
        <div className="categories-container grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 md:gap-10">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop/${category.slug}`}
              className="category-item group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-warm-gray/20 mb-8">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 14vw"
                />
                <div className="absolute inset-0 bg-noir-black/0 group-hover:bg-noir-black/20 transition-colors duration-300" />
              </div>
              <div className="text-center">
                <h3 className="text-sm md:text-base tracking-[0.05em] group-hover:text-warm-gray transition-colors mb-3">
                  {category.name}
                </h3>
                <p className="text-xs text-warm-gray">
                  {category.productCount} produk
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
