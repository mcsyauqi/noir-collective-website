'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';
import { getCollectionBySlug } from '@/data/collections';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

gsap.registerPlugin(ScrollTrigger);

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const collection = getCollectionBySlug(slug);

  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!collection) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      });

      gsap.from('.product-item', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.products-section',
          start: 'top 80%',
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [collection]);

  if (!collection) {
    return (
      <div className="pt-[120px] pb-20 min-h-screen">
        <div className="container-fluid text-center">
          <h1 className="text-4xl font-serif mb-4">Collection Not Found</h1>
          <Link href="/collections" className="btn-primary">
            View All Collections
          </Link>
        </div>
      </div>
    );
  }

  const collectionProducts = products.filter((p) =>
    collection.products.includes(p.id)
  );

  return (
    <div ref={heroRef}>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={collection.heroImage}
            alt={collection.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-noir-black/50" />
        </div>

        <div className="hero-content relative z-10 text-center text-pure-white px-6 max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-gold-accent mb-4">
            {collection.season} {collection.year}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6">
            {collection.name}
          </h1>
          <p className="text-xl md:text-2xl text-accent mb-4">
            &quot;{collection.tagline}&quot;
          </p>
          <p className="text-pure-white/80 max-w-lg mx-auto">
            {collection.description}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section py-20 md:py-32 bg-off-white">
        <div className="container-fluid">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-warm-gray mb-12">
            <Link href="/" className="hover:text-noir-black transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href="/collections"
              className="hover:text-noir-black transition-colors"
            >
              Collections
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-noir-black">{collection.name}</span>
          </nav>

          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              Shop the Collection
            </h2>
            <p className="text-warm-gray">
              {collectionProducts.length} pieces in this collection
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {collectionProducts.map((product) => (
              <div key={product.id} className="product-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Lookbook CTA */}
          <div className="text-center mt-16">
            <Link href="/lookbook" className="btn-secondary">
              View Lookbook
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
