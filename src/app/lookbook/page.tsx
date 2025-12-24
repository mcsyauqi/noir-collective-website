'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { lookbooks } from '@/data/collections';
import { getProductBySlug, products } from '@/data/products';
import { formatPrice, cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function LookbookPage() {
  const [selectedImage, setSelectedImage] = useState<{
    lookbook: typeof lookbooks[0];
    image: typeof lookbooks[0]['images'][0];
  } | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lookbook-item', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.lookbook-grid',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getProductsForImage = (productIds: string[]) => {
    return productIds
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean);
  };

  return (
    <div ref={sectionRef} className="pt-[120px] pb-20 min-h-screen">
      <div className="container-fluid">
        {/* Page Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-xs tracking-[0.2em] uppercase text-warm-gray mb-3">
            Editorial
          </p>
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Lookbook</h1>
          <p className="text-warm-gray max-w-lg mx-auto">
            Explore our editorial vision. Click on any image to shop the look
            and discover the pieces that inspire each story.
          </p>
        </div>

        {/* Lookbooks */}
        {lookbooks.map((lookbook) => (
          <section key={lookbook.id} className="mb-24 md:mb-32">
            {/* Lookbook Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-gold-accent mb-2">
                  {lookbook.season} {lookbook.year}
                </p>
                <h2 className="text-2xl md:text-3xl font-serif">
                  {lookbook.title}
                </h2>
              </div>
              <p className="text-sm text-warm-gray max-w-md">
                {lookbook.description}
              </p>
            </div>

            {/* Lookbook Images Grid */}
            <div className="lookbook-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lookbook.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage({ lookbook, image })}
                  className={cn(
                    'lookbook-item relative overflow-hidden group',
                    index === 0 && 'md:col-span-2 md:row-span-2',
                    index === 0 ? 'aspect-[4/5]' : 'aspect-[3/4]'
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-noir-black/0 group-hover:bg-noir-black/30 transition-colors duration-300" />

                  {/* Shop indicator */}
                  {image.products.length > 0 && (
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center justify-between bg-pure-white/95 backdrop-blur-sm p-3">
                        <span className="text-xs tracking-[0.1em] uppercase">
                          Shop the Look
                        </span>
                        <div className="flex items-center gap-1">
                          <ShoppingBag className="w-4 h-4" />
                          <span className="text-xs">
                            {image.products.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Caption */}
                  {image.caption && (
                    <div className="absolute top-4 left-4">
                      <p className="text-xs text-pure-white bg-noir-black/50 px-2 py-1">
                        {image.caption}
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-noir-black/90">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 text-pure-white hover:text-warm-gray transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid lg:grid-cols-2 max-w-6xl w-full max-h-[90vh] mx-4">
            {/* Image */}
            <div className="relative aspect-[3/4] lg:aspect-auto">
              <Image
                src={selectedImage.image.src}
                alt={selectedImage.image.alt}
                fill
                className="object-cover"
              />
            </div>

            {/* Products */}
            <div className="bg-pure-white p-8 overflow-y-auto max-h-[50vh] lg:max-h-none">
              <p className="text-xs tracking-[0.15em] uppercase text-warm-gray mb-2">
                Shop the Look
              </p>
              <h3 className="text-2xl font-serif mb-6">
                {selectedImage.lookbook.title}
              </h3>

              {selectedImage.image.caption && (
                <p className="text-warm-gray mb-6 text-sm italic">
                  {selectedImage.image.caption}
                </p>
              )}

              <div className="space-y-6">
                {getProductsForImage(selectedImage.image.products).map(
                  (product) =>
                    product && (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={() => setSelectedImage(null)}
                        className="flex gap-4 group"
                      >
                        <div className="relative w-20 h-24 bg-off-white flex-shrink-0">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm mb-1 group-hover:text-warm-gray transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-xs text-warm-gray mb-2">
                            {product.shortDescription}
                          </p>
                          <p className="text-sm">{formatPrice(product.price)}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-warm-gray group-hover:text-noir-black transition-colors self-center" />
                      </Link>
                    )
                )}
              </div>

              <Link
                href={`/collections/${selectedImage.lookbook.slug}`}
                className="btn-primary w-full mt-8 text-center"
                onClick={() => setSelectedImage(null)}
              >
                View Full Collection
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
