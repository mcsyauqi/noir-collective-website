'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { featuredProducts } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.featured-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.featured-title',
          start: 'top 80%',
        },
      });

      gsap.from('.product-item', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.products-grid',
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-40 md:py-60 bg-pure-white">
      <div className="container-fluid">
        {/* Header */}
        <div className="featured-title flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 md:mb-32">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-warm-gray mb-8">
              Pilihan Terkurasi
            </p>
            <h2 className="text-4xl md:text-6xl font-serif">Produk Unggulan</h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-4 text-sm tracking-[0.1em] uppercase hover:text-warm-gray transition-colors group"
          >
            Lihat Semua
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
