'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.newsletter-content > *', {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section ref={sectionRef} className="py-48 md:py-64 bg-noir-black">
      <div className="container-fluid">
        <div className="newsletter-content max-w-3xl mx-auto text-center">
          <p className="text-gold-accent text-xs tracking-[0.4em] uppercase mb-10">
            Tetap Terhubung
          </p>

          <h2 className="text-pure-white text-4xl md:text-6xl font-serif mb-10">
            Bergabung dengan Komunitas NOIR
          </h2>

          <p className="text-warm-gray text-lg mb-16 max-w-xl mx-auto leading-relaxed">
            Dapatkan akses eksklusif ke koleksi baru, undangan acara khusus,
            dan penawaran terbatas langsung di inbox Anda.
          </p>

          {submitted ? (
            <div className="py-8">
              <p className="text-gold-accent text-lg mb-4">Terima kasih telah bergabung!</p>
              <p className="text-warm-gray">Kami akan menghubungi Anda segera.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Alamat email Anda"
                className="flex-1 px-8 py-5 bg-transparent border border-warm-gray/50 text-pure-white placeholder:text-warm-gray/50 focus:border-gold-accent outline-none transition-colors"
                required
              />
              <button
                type="submit"
                className="px-12 py-5 bg-pure-white text-noir-black text-sm tracking-[0.15em] uppercase hover:bg-gold-accent transition-colors duration-300"
              >
                Langganan
              </button>
            </form>
          )}

          <p className="text-warm-gray/50 text-sm mt-10">
            Dengan berlangganan, Anda menyetujui kebijakan privasi kami.
          </p>
        </div>
      </div>
    </section>
  );
}
