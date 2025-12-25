'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const newProducts = [
  {
    id: 1,
    name: 'Wool Blend Overcoat',
    price: 'Rp 4.500.000',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop&q=80',
    tag: 'Baru',
  },
  {
    id: 2,
    name: 'Cashmere Turtleneck',
    price: 'Rp 2.800.000',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=1000&fit=crop&q=80',
    tag: 'Baru',
  },
  {
    id: 3,
    name: 'Tailored Trousers',
    price: 'Rp 1.950.000',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop&q=80',
    tag: 'Baru',
  },
  {
    id: 4,
    name: 'Silk Blouse',
    price: 'Rp 2.200.000',
    image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&h=1000&fit=crop&q=80',
    tag: 'Terbatas',
  },
  {
    id: 5,
    name: 'Leather Handbag',
    price: 'Rp 3.800.000',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop&q=80',
    tag: 'Baru',
  },
];

export default function NewArrivals() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.arrivals-header > *', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      gsap.from('.product-card-new', {
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.products-scroll',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section ref={sectionRef} className="py-48 md:py-64 bg-noir-black">
      <div className="container-fluid">
        {/* Header */}
        <div className="arrivals-header flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div>
            <p className="text-gold-accent text-xs tracking-[0.4em] uppercase mb-8">
              Terbaru
            </p>
            <h2 className="text-pure-white text-4xl md:text-6xl font-serif">
              Koleksi Baru
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => scroll('left')}
              className="w-14 h-14 border border-warm-gray text-pure-white flex items-center justify-center hover:border-gold-accent hover:text-gold-accent transition-colors"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-14 h-14 border border-warm-gray text-pure-white flex items-center justify-center hover:border-gold-accent hover:text-gold-accent transition-colors"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Scroll */}
      <div
        ref={scrollRef}
        className="products-scroll flex gap-8 overflow-x-auto hide-scrollbar px-10 md:px-20 lg:px-28 pb-8"
      >
        {newProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="product-card-new group flex-shrink-0 w-[320px] md:w-[380px]"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-warm-gray/20 mb-8">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="380px"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-gold-accent text-noir-black px-4 py-2 text-xs tracking-[0.15em] uppercase">
                  {product.tag}
                </span>
              </div>
            </div>
            <h3 className="text-pure-white text-lg mb-3 group-hover:text-gold-accent transition-colors">
              {product.name}
            </h3>
            <p className="text-warm-gray">{product.price}</p>
          </Link>
        ))}

        {/* View All Card */}
        <Link
          href="/shop"
          className="product-card-new group flex-shrink-0 w-[320px] md:w-[380px] flex items-center justify-center border border-warm-gray/30 hover:border-gold-accent transition-colors"
        >
          <div className="text-center">
            <p className="text-pure-white text-xl font-serif mb-6 group-hover:text-gold-accent transition-colors">
              Lihat Semua
            </p>
            <ArrowRight className="w-6 h-6 text-warm-gray mx-auto group-hover:text-gold-accent transition-colors" />
          </div>
        </Link>
      </div>
    </section>
  );
}
