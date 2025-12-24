'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EditorialSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.editorial-image', {
        scale: 1.1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.editorial-container',
          start: 'top 60%',
          scrub: 1,
        },
      });

      gsap.from('.editorial-text > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.editorial-text',
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-noir-black text-pure-white">
      <div className="container-fluid">
        <div className="editorial-container grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=80"
              alt="Brand philosophy"
              fill
              className="editorial-image object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="editorial-text">
            <p className="text-xs tracking-[0.2em] uppercase text-gold-accent mb-4">
              Our Philosophy
            </p>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
              Less, but better. Timeless pieces for the modern wardrobe.
            </h2>
            <p className="text-warm-gray mb-8 leading-relaxed">
              At NOIR Collective, we believe in the power of considered choices. Each
              piece in our collection is thoughtfully designed to transcend trends,
              crafted from the finest materials, and made to last. We partner with
              artisans who share our commitment to quality and sustainability.
            </p>
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-gold-accent" />
                <p className="text-sm tracking-[0.1em]">Sustainably Sourced Materials</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-gold-accent" />
                <p className="text-sm tracking-[0.1em]">Artisan Craftsmanship</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-gold-accent" />
                <p className="text-sm tracking-[0.1em]">Timeless Design</p>
              </div>
            </div>
            <Link
              href="/about"
              className="btn-secondary border-pure-white text-pure-white hover:bg-pure-white hover:text-noir-black"
            >
              Discover Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
