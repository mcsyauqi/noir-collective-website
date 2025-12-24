'use client';

interface MarqueeProps {
  text?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

export default function Marquee({
  text = 'Produk Terbaru — Gratis Ongkir di Atas Rp5.000.000 — Fashion Berkelanjutan — Edisi Terbatas — ',
  speed = 'normal',
}: MarqueeProps) {
  const duration = speed === 'slow' ? '40s' : speed === 'fast' ? '20s' : '30s';

  return (
    <div className="bg-noir-black text-pure-white py-5 overflow-hidden">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${duration} linear infinite`,
        }}
      >
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-sm tracking-[0.2em] uppercase mx-10"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
