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
    <section ref={sectionRef} className="py-20 md:py-32 bg-pure-white">
      <div className="container-fluid">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs tracking-[0.2em] uppercase text-warm-gray mb-3">
            Browse By
          </p>
          <h2 className="text-3xl md:text-4xl font-serif">Categories</h2>
        </div>

        {/* Categories Grid */}
        <div className="categories-container grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop/${category.slug}`}
              className="category-item group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-off-white mb-3">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-noir-black/0 group-hover:bg-noir-black/20 transition-colors duration-300" />
              </div>
              <div className="text-center">
                <h3 className="text-sm tracking-[0.05em] group-hover:text-warm-gray transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-warm-gray mt-1">
                  {category.productCount} {category.productCount === 1 ? 'item' : 'items'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
