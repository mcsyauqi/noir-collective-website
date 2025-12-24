'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    title: 'Conscious Design',
    description:
      'Every piece is thoughtfully designed to transcend seasons and trends, ensuring longevity in both style and construction.',
  },
  {
    title: 'Ethical Production',
    description:
      'We partner with artisans and manufacturers who share our commitment to fair wages, safe working conditions, and environmental responsibility.',
  },
  {
    title: 'Quality Materials',
    description:
      'We source the finest fabrics from certified suppliers, prioritizing organic, recycled, and responsibly sourced materials.',
  },
  {
    title: 'Timeless Aesthetic',
    description:
      'Our designs embrace minimalism and elegance, creating pieces that become cherished additions to your wardrobe for years to come.',
  },
];

const team = [
  {
    name: 'Maya Hartono',
    role: 'Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
  {
    name: 'David Chen',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Sarah Kim',
    role: 'Sustainability Director',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      });

      gsap.from('.story-image', {
        scale: 1.1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.story-section',
          start: 'top 60%',
          scrub: 1,
        },
      });

      gsap.from('.value-item', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.values-section',
          start: 'top 75%',
        },
      });

      gsap.from('.team-member', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.team-section',
          start: 'top 75%',
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80"
            alt="NOIR Collective atelier"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-noir-black/50" />
        </div>

        <div className="hero-content relative z-10 text-center text-pure-white px-6 max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-gold-accent mb-4">
            Our Story
          </p>
          <h1 className="text-4xl md:text-6xl font-serif mb-6">
            The Art of Getting Dressed
          </h1>
          <p className="text-lg text-pure-white/80">
            Founded in 2020, NOIR Collective was born from a desire to create
            fashion that respects both people and planet.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section py-20 md:py-32 bg-off-white">
        <div className="container-fluid">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=80"
                alt="Craftsmanship"
                fill
                className="story-image object-cover"
              />
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-gold-accent mb-4">
                Our Beginning
              </p>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                Less, but better.
              </h2>
              <div className="space-y-4 text-warm-gray leading-relaxed">
                <p>
                  NOIR Collective was founded with a simple belief: that fashion
                  should be timeless, not temporary. In a world of fast fashion
                  and fleeting trends, we chose a different path—one of
                  intentionality, quality, and conscious creation.
                </p>
                <p>
                  Our founder, Maya Hartono, spent years working in the fashion
                  industry before recognizing the need for change. The
                  environmental impact of clothing production, the exploitation
                  of garment workers, and the disposable nature of modern
                  fashion demanded a new approach.
                </p>
                <p>
                  Today, NOIR Collective represents the intersection of luxury
                  and responsibility. Each piece in our collection is designed
                  to be worn, loved, and kept—not discarded after a season.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section py-20 md:py-32 bg-pure-white" id="craftsmanship">
        <div className="container-fluid">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-warm-gray mb-3">
              What Guides Us
            </p>
            <h2 className="text-3xl md:text-4xl font-serif">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-item text-center p-6 border border-warm-gray/20 hover:border-gold-accent transition-colors"
              >
                <div className="w-12 h-12 border border-gold-accent flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-serif text-gold-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-lg font-serif mb-3">{value.title}</h3>
                <p className="text-sm text-warm-gray leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section py-20 md:py-32 bg-off-white">
        <div className="container-fluid">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-warm-gray mb-3">
              The Collective
            </p>
            <h2 className="text-3xl md:text-4xl font-serif">Our Team</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="team-member text-center">
                <div className="relative aspect-square mb-6 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="text-lg font-serif mb-1">{member.name}</h3>
                <p className="text-sm text-warm-gray">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-noir-black text-pure-white text-center">
        <div className="container-fluid max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            Join Our Journey
          </h2>
          <p className="text-warm-gray mb-10">
            Discover our commitment to sustainable fashion and explore the
            collections that define conscious luxury.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sustainability"
              className="btn-secondary border-pure-white text-pure-white hover:bg-pure-white hover:text-noir-black"
            >
              Our Sustainability
            </Link>
            <Link
              href="/collections"
              className="btn-primary bg-gold-accent text-noir-black border-gold-accent hover:bg-transparent hover:text-gold-accent"
            >
              Explore Collections
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
