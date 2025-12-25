'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.statement-word', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      gsap.from('.statement-line', {
        scaleX: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-48 md:py-64 bg-off-white">
      <div className="container-fluid">
        <div className="max-w-6xl mx-auto text-center">
          <div className="overflow-hidden mb-16">
            <p className="statement-word text-xs tracking-[0.4em] uppercase text-warm-gray">
              Filosofi Kami
            </p>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1] mb-20">
            <span className="statement-word inline-block">Kami percaya</span>{' '}
            <span className="statement-word inline-block">pada</span>{' '}
            <span className="statement-word inline-block text-gold-accent">kekuatan</span>{' '}
            <span className="statement-word inline-block">kesederhanaan.</span>
            <br className="hidden md:block" />
            <span className="statement-word inline-block">Setiap</span>{' '}
            <span className="statement-word inline-block">jahitan</span>{' '}
            <span className="statement-word inline-block">menceritakan</span>{' '}
            <span className="statement-word inline-block text-gold-accent">kisah.</span>
          </h2>

          <div className="statement-line h-[1px] w-32 bg-gold-accent mx-auto mb-20 origin-left" />

          <div className="grid md:grid-cols-3 gap-16 md:gap-20 text-left md:text-center">
            <div className="statement-word">
              <p className="text-5xl md:text-6xl font-serif text-noir-black mb-6">01</p>
              <h3 className="text-lg tracking-[0.1em] uppercase mb-4">Keberlanjutan</h3>
              <p className="text-warm-gray leading-relaxed">
                Bahan ramah lingkungan dari sumber terpercaya di seluruh dunia.
              </p>
            </div>
            <div className="statement-word">
              <p className="text-5xl md:text-6xl font-serif text-noir-black mb-6">02</p>
              <h3 className="text-lg tracking-[0.1em] uppercase mb-4">Keahlian</h3>
              <p className="text-warm-gray leading-relaxed">
                Dibuat oleh pengrajin ahli dengan perhatian pada setiap detail.
              </p>
            </div>
            <div className="statement-word">
              <p className="text-5xl md:text-6xl font-serif text-noir-black mb-6">03</p>
              <h3 className="text-lg tracking-[0.1em] uppercase mb-4">Timeless</h3>
              <p className="text-warm-gray leading-relaxed">
                Desain yang melampaui musim dan tren yang berlalu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
