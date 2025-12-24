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
    <section ref={sectionRef} className="py-32 md:py-48 bg-noir-black text-pure-white">
      <div className="container-fluid">
        <div className="editorial-container grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-warm-gray/20">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&h=1250&fit=crop&q=80"
              alt="Filosofi brand"
              fill
              className="editorial-image object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text Content */}
          <div className="editorial-text">
            <p className="text-xs tracking-[0.2em] uppercase text-gold-accent mb-8">
              Filosofi Kami
            </p>
            <h2 className="text-3xl md:text-5xl font-serif mb-10 leading-tight">
              Lebih sedikit, tapi lebih baik. Potongan timeless untuk lemari pakaian modern.
            </h2>
            <p className="text-warm-gray mb-14 leading-relaxed text-base md:text-lg">
              Di NOIR Collective, kami percaya pada kekuatan pilihan yang dipertimbangkan. Setiap
              potongan dalam koleksi kami dirancang dengan penuh perhatian untuk melampaui tren,
              dibuat dari bahan-bahan terbaik, dan dibuat untuk bertahan lama. Kami bermitra dengan
              pengrajin yang berbagi komitmen kami terhadap kualitas dan keberlanjutan.
            </p>
            <div className="space-y-6 mb-16">
              <div className="flex items-center gap-8">
                <div className="w-16 h-[1px] bg-gold-accent" />
                <p className="text-sm tracking-[0.1em]">Bahan Bersumber Berkelanjutan</p>
              </div>
              <div className="flex items-center gap-8">
                <div className="w-16 h-[1px] bg-gold-accent" />
                <p className="text-sm tracking-[0.1em]">Keahlian Pengrajin</p>
              </div>
              <div className="flex items-center gap-8">
                <div className="w-16 h-[1px] bg-gold-accent" />
                <p className="text-sm tracking-[0.1em]">Desain Timeless</p>
              </div>
            </div>
            <Link
              href="/about"
              className="btn-secondary border-pure-white text-pure-white hover:bg-pure-white hover:text-noir-black"
            >
              Temukan Cerita Kami
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
