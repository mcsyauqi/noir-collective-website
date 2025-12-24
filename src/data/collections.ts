import { Collection, Category, Lookbook } from '@/types';

export const collections: Collection[] = [
  {
    id: '1',
    name: 'Winter Solstice',
    slug: 'winter-solstice',
    description: 'Meditasi tentang kegelapan dan cahaya. Koleksi ini mengeksplorasi keindahan hari terpendek melalui tekstur kaya, warna mendalam, dan aksen berkilau.',
    tagline: 'Dimana kegelapan bertemu cahaya',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=1000&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=80',
    products: ['1', '2', '6', '8'],
    season: 'Musim Dingin',
    year: '2025',
  },
  {
    id: '2',
    name: 'Essential Edit',
    slug: 'essential-edit',
    description: 'Fondasi lemari pakaian yang dipertimbangkan. Potongan timeless yang dirancang untuk melampaui musim dan tren.',
    tagline: 'Lebih sedikit, tapi lebih baik',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=800&fit=crop&q=80',
    products: ['2', '5', '7', '11'],
    season: 'Sepanjang Musim',
    year: '2025',
  },
  {
    id: '3',
    name: 'Evening Edit',
    slug: 'evening-edit',
    description: 'Keanggunan malam hari untuk wanita modern. Potongan halus yang menarik perhatian melalui kecanggihan yang understated.',
    tagline: 'Setelah gelap',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&h=800&fit=crop&q=80',
    products: ['3', '8', '9', '10'],
    season: 'Sepanjang Musim',
    year: '2025',
  },
  {
    id: '4',
    name: 'Conscious Collection',
    slug: 'conscious-collection',
    description: 'Komitmen kami terhadap keberlanjutan. Potongan yang dibuat dari bahan yang bersumber secara bertanggung jawab dengan dampak lingkungan minimal.',
    tagline: 'Fashion dengan tujuan',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=1000&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=800&fit=crop&q=80',
    products: ['5', '7', '11', '12'],
    season: 'Sepanjang Musim',
    year: '2025',
  },
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'Outerwear',
    slug: 'outerwear',
    description: 'Mantel, blazer, dan jaket yang dibuat untuk lemari pakaian modern',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop&q=80',
    productCount: 2,
  },
  {
    id: '2',
    name: 'Atasan',
    slug: 'tops',
    description: 'Kemeja, blus, dan kaos dalam bahan premium',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=800&fit=crop&q=80',
    productCount: 2,
  },
  {
    id: '3',
    name: 'Bawahan',
    slug: 'bottoms',
    description: 'Celana, rok, dan celana pendek dengan potongan halus',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop&q=80',
    productCount: 2,
  },
  {
    id: '4',
    name: 'Gaun',
    slug: 'dresses',
    description: 'Gaun elegan untuk setiap kesempatan',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop&q=80',
    productCount: 1,
  },
  {
    id: '5',
    name: 'Knitwear',
    slug: 'knitwear',
    description: 'Rajutan mewah dalam kasmir dan wol halus',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop&q=80',
    productCount: 1,
  },
  {
    id: '6',
    name: 'Aksesori',
    slug: 'accessories',
    description: 'Tas, syal, dan sentuhan akhir',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=800&fit=crop&q=80',
    productCount: 3,
  },
  {
    id: '7',
    name: 'Sepatu',
    slug: 'shoes',
    description: 'Alas kaki yang dibuat dari kulit dan suede Italia',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop&q=80',
    productCount: 1,
  },
];

export const lookbooks: Lookbook[] = [
  {
    id: '1',
    title: 'Winter Light',
    slug: 'winter-light',
    description: 'Eksplorasi visual dari potongan paling diidamkan musim ini, diabadikan dalam cahaya ethereal musim dingin Nordic.',
    coverImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=1600&fit=crop&q=80',
    images: [
      {
        id: 'l1-1',
        src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=1600&fit=crop&q=80',
        alt: 'Model dengan mantel wol',
        products: ['6'],
        caption: 'Mantel Wol Merino dalam warna Camel',
      },
      {
        id: 'l1-2',
        src: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&h=1600&fit=crop&q=80',
        alt: 'Model dengan blazer',
        products: ['1'],
        caption: 'Blazer Wol Tailored, Charcoal',
      },
      {
        id: 'l1-3',
        src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=1600&fit=crop&q=80',
        alt: 'Model dengan celana linen',
        products: ['5'],
      },
      {
        id: 'l1-4',
        src: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&h=1600&fit=crop&q=80',
        alt: 'Detail turtleneck kasmir',
        products: ['2'],
        caption: 'Kasmir Mongolia, sangat lembut',
      },
    ],
    season: 'Musim Dingin',
    year: '2025',
  },
  {
    id: '2',
    title: 'After Hours',
    slug: 'after-hours',
    description: 'Keanggunan malam yang diimajinasikan ulang. Koleksi potongan yang dirancang untuk membawa Anda dari senja hingga fajar dengan kecanggihan yang mudah.',
    coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=1600&fit=crop&q=80',
    images: [
      {
        id: 'l2-1',
        src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=1600&fit=crop&q=80',
        alt: 'Styling malam',
        products: ['8', '3'],
      },
      {
        id: 'l2-2',
        src: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&h=1600&fit=crop&q=80',
        alt: 'Gaun rajut ribbed',
        products: ['8'],
        caption: 'Gaun Rajut Ribbed dalam warna Hitam',
      },
      {
        id: 'l2-3',
        src: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&h=1600&fit=crop&q=80',
        alt: 'Boots ankle suede',
        products: ['9'],
        caption: 'Suede Italia, hak yang dibentuk',
      },
    ],
    season: 'Sepanjang Musim',
    year: '2025',
  },
];

export const getCollectionBySlug = (slug: string): Collection | undefined => {
  return collections.find((c) => c.slug === slug);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((c) => c.slug === slug);
};

export const getLookbookBySlug = (slug: string): Lookbook | undefined => {
  return lookbooks.find((l) => l.slug === slug);
};
