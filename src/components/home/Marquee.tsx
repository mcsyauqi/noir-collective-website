'use client';

interface MarqueeProps {
  text?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

export default function Marquee({
  text = 'New Arrivals — Free Shipping Over $500 — Sustainable Fashion — Limited Edition — ',
  speed = 'normal',
}: MarqueeProps) {
  const duration = speed === 'slow' ? '40s' : speed === 'fast' ? '20s' : '30s';

  return (
    <div className="bg-noir-black text-pure-white py-4 overflow-hidden">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${duration} linear infinite`,
        }}
      >
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-sm tracking-[0.2em] uppercase mx-8"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
