'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const instagramPosts = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=600&fit=crop&q=80',
    likes: 1243,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=600&fit=crop&q=80',
    likes: 892,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop&q=80',
    likes: 1567,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop&q=80',
    likes: 2103,
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&q=80',
    likes: 756,
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop&q=80',
    likes: 1891,
  },
];

export default function InstagramFeed() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.insta-item', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.insta-grid',
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 bg-off-white">
      <div className="container-fluid">
        {/* Header */}
        <div className="text-center mb-16">
          <a
            href="https://instagram.com/noircollective"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 group"
          >
            <Instagram className="w-6 h-6" />
            <span className="text-sm tracking-[0.1em] uppercase group-hover:text-warm-gray transition-colors">
              @noircollective
            </span>
          </a>
          <h2 className="text-3xl md:text-4xl font-serif mt-5">
            Belanja Tampilan
          </h2>
        </div>

        {/* Instagram Grid */}
        <div className="insta-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/noircollective"
              target="_blank"
              rel="noopener noreferrer"
              className="insta-item group relative aspect-square overflow-hidden"
            >
              <Image
                src={post.image}
                alt="Postingan Instagram"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-noir-black/0 group-hover:bg-noir-black/50 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-pure-white text-center">
                  <Instagram className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm">{post.likes.toLocaleString()} suka</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
