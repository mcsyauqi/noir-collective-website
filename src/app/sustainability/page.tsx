'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Recycle, Heart, Globe, Award, Droplets } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const initiatives = [
  {
    icon: Leaf,
    title: 'Organic Materials',
    description:
      'We prioritize GOTS-certified organic cotton, linen, and other natural fibers that are grown without harmful pesticides.',
    stat: '78%',
    statLabel: 'Organic Materials',
  },
  {
    icon: Recycle,
    title: 'Recycled Fabrics',
    description:
      'Our collections incorporate recycled wool, cashmere, and polyester, giving new life to existing materials.',
    stat: '35%',
    statLabel: 'Recycled Content',
  },
  {
    icon: Droplets,
    title: 'Water Conservation',
    description:
      'Our manufacturing partners use innovative dyeing techniques that reduce water consumption by up to 90%.',
    stat: '50M',
    statLabel: 'Liters Saved',
  },
  {
    icon: Globe,
    title: 'Carbon Neutral',
    description:
      'We offset our carbon emissions through verified reforestation projects and renewable energy investments.',
    stat: '100%',
    statLabel: 'Carbon Offset',
  },
  {
    icon: Heart,
    title: 'Fair Wages',
    description:
      'Every worker in our supply chain receives fair wages, safe working conditions, and access to healthcare.',
    stat: '2,000+',
    statLabel: 'Artisans Supported',
  },
  {
    icon: Award,
    title: 'Certified Partners',
    description:
      'We work exclusively with factories certified by OEKO-TEX, GOTS, and Fair Trade organizations.',
    stat: '100%',
    statLabel: 'Certified Suppliers',
  },
];

const certifications = [
  { name: 'GOTS Certified', description: 'Global Organic Textile Standard' },
  { name: 'OEKO-TEX', description: 'Standard 100 Certification' },
  { name: 'Fair Trade', description: 'Certified Production' },
  { name: 'B Corp', description: 'Pending Certification' },
];

export default function SustainabilityPage() {
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

      gsap.from('.initiative-item', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.initiatives-grid',
          start: 'top 75%',
        },
      });

      gsap.from('.stat-number', {
        textContent: 0,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.initiatives-grid',
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
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1920&q=80"
            alt="Sustainable fashion"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-noir-black/50" />
        </div>

        <div className="hero-content relative z-10 text-center text-pure-white px-6 max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-gold-accent mb-4">
            Our Commitment
          </p>
          <h1 className="text-4xl md:text-6xl font-serif mb-6">
            Fashion with Purpose
          </h1>
          <p className="text-lg text-pure-white/80">
            We believe luxury and sustainability are not mutually exclusive.
            Every piece we create is designed to minimize environmental impact
            while maximizing beauty and longevity.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-32 bg-off-white">
        <div className="container-fluid">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-gold-accent mb-4">
                Our Mission
              </p>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                Redefining Luxury Fashion
              </h2>
              <div className="space-y-4 text-warm-gray leading-relaxed">
                <p>
                  The fashion industry is one of the world&apos;s largest
                  polluters. At NOIR Collective, we&apos;re committed to being
                  part of the solution, not the problem.
                </p>
                <p>
                  From sourcing organic and recycled materials to partnering
                  with ethical manufacturers, every decision we make considers
                  its impact on people and planet.
                </p>
                <p>
                  Our goal is to prove that beautiful, high-quality fashion can
                  be created responsibly—and that consumers don&apos;t have to
                  compromise their values for style.
                </p>
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
                alt="Sustainable materials"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="py-20 md:py-32 bg-pure-white">
        <div className="container-fluid">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-warm-gray mb-3">
              Our Impact
            </p>
            <h2 className="text-3xl md:text-4xl font-serif">
              Sustainability Initiatives
            </h2>
          </div>

          <div className="initiatives-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <div
                key={index}
                className="initiative-item p-8 border border-warm-gray/20 hover:border-gold-accent transition-colors"
              >
                <initiative.icon className="w-8 h-8 text-gold-accent mb-6" />
                <div className="mb-4">
                  <span className="stat-number text-4xl font-serif text-noir-black">
                    {initiative.stat}
                  </span>
                  <span className="text-sm text-warm-gray ml-2">
                    {initiative.statLabel}
                  </span>
                </div>
                <h3 className="text-lg font-serif mb-3">{initiative.title}</h3>
                <p className="text-sm text-warm-gray leading-relaxed">
                  {initiative.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supply Chain Section */}
      <section className="py-20 md:py-32 bg-noir-black text-pure-white">
        <div className="container-fluid">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative aspect-[4/5] overflow-hidden order-2 md:order-1">
              <Image
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80"
                alt="Artisan craftsmanship"
                fill
                className="object-cover"
              />
            </div>

            <div className="order-1 md:order-2">
              <p className="text-xs tracking-[0.2em] uppercase text-gold-accent mb-4">
                Transparency
              </p>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                Know Your Supply Chain
              </h2>
              <div className="space-y-4 text-warm-gray leading-relaxed mb-8">
                <p>
                  We believe you have the right to know where your clothes come
                  from. That&apos;s why we maintain complete transparency about
                  our supply chain.
                </p>
                <p>
                  Each garment can be traced back to its origins—from the farm
                  where the cotton was grown to the artisan who sewed the final
                  stitch.
                </p>
              </div>

              {/* Journey Steps */}
              <div className="space-y-4">
                {[
                  'Material Sourcing',
                  'Fabric Production',
                  'Design & Pattern Making',
                  'Artisan Production',
                  'Quality Control',
                  'Sustainable Packaging',
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 border border-gold-accent flex items-center justify-center text-xs text-gold-accent">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 md:py-32 bg-off-white">
        <div className="container-fluid">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-warm-gray mb-3">
              Verified Standards
            </p>
            <h2 className="text-3xl md:text-4xl font-serif">
              Our Certifications
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="text-center p-6 bg-pure-white border border-warm-gray/20"
              >
                <div className="w-16 h-16 bg-off-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-gold-accent" />
                </div>
                <h3 className="text-sm font-medium mb-1">{cert.name}</h3>
                <p className="text-xs text-warm-gray">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-pure-white text-center">
        <div className="container-fluid max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            Shop Consciously
          </h2>
          <p className="text-warm-gray mb-10">
            Every purchase supports sustainable practices and ethical production.
            Join us in creating a more responsible fashion industry.
          </p>
          <Link href="/collections/conscious-collection" className="btn-primary">
            Explore Conscious Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
