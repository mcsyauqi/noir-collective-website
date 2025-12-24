import { Collection, Category, Lookbook } from '@/types';

export const collections: Collection[] = [
  {
    id: '1',
    name: 'Winter Solstice',
    slug: 'winter-solstice',
    description: 'A meditation on darkness and light. This collection explores the beauty of the shortest day through rich textures, deep hues, and luminous accents.',
    tagline: 'Where darkness meets light',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=1000&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=1080&fit=crop&q=80',
    products: ['1', '2', '6', '8'],
    season: 'Winter',
    year: '2025',
  },
  {
    id: '2',
    name: 'Essential Edit',
    slug: 'essential-edit',
    description: 'The building blocks of a considered wardrobe. Timeless pieces designed to transcend seasons and trends.',
    tagline: 'Less, but better',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=1080&fit=crop&q=80',
    products: ['2', '5', '7', '11'],
    season: 'All Seasons',
    year: '2025',
  },
  {
    id: '3',
    name: 'Evening Edit',
    slug: 'evening-edit',
    description: 'After-dark elegance for the modern woman. Refined pieces that command attention through understated sophistication.',
    tagline: 'After dark',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&h=1080&fit=crop&q=80',
    products: ['3', '8', '9', '10'],
    season: 'All Seasons',
    year: '2025',
  },
  {
    id: '4',
    name: 'Conscious Collection',
    slug: 'conscious-collection',
    description: 'Our commitment to sustainability. Pieces crafted from responsibly sourced materials with minimal environmental impact.',
    tagline: 'Fashion with purpose',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=1000&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&h=1080&fit=crop&q=80',
    products: ['5', '7', '11', '12'],
    season: 'All Seasons',
    year: '2025',
  },
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'Outerwear',
    slug: 'outerwear',
    description: 'Coats, blazers, and jackets crafted for the modern wardrobe',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop&q=80',
    productCount: 2,
  },
  {
    id: '2',
    name: 'Tops',
    slug: 'tops',
    description: 'Shirts, blouses, and tees in premium fabrics',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop&q=80',
    productCount: 2,
  },
  {
    id: '3',
    name: 'Bottoms',
    slug: 'bottoms',
    description: 'Trousers, skirts, and shorts with refined tailoring',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop&q=80',
    productCount: 2,
  },
  {
    id: '4',
    name: 'Dresses',
    slug: 'dresses',
    description: 'Elegant dresses for every occasion',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop&q=80',
    productCount: 1,
  },
  {
    id: '5',
    name: 'Knitwear',
    slug: 'knitwear',
    description: 'Luxurious knits in cashmere and fine wool',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop&q=80',
    productCount: 1,
  },
  {
    id: '6',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Bags, scarves, and finishing touches',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop&q=80',
    productCount: 3,
  },
  {
    id: '7',
    name: 'Shoes',
    slug: 'shoes',
    description: 'Footwear crafted in Italian leather and suede',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop&q=80',
    productCount: 1,
  },
];

export const lookbooks: Lookbook[] = [
  {
    id: '1',
    title: 'Winter Light',
    slug: 'winter-light',
    description: 'A visual exploration of the season\'s most coveted pieces, captured in the ethereal light of a Nordic winter.',
    coverImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=1600&fit=crop&q=80',
    images: [
      {
        id: 'l1-1',
        src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=1600&fit=crop&q=80',
        alt: 'Model in wool coat',
        products: ['6'],
        caption: 'The Merino Wool Coat in Camel',
      },
      {
        id: 'l1-2',
        src: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&h=1600&fit=crop&q=80',
        alt: 'Model in tailored blazer',
        products: ['1'],
        caption: 'Tailored Wool Blazer, Charcoal',
      },
      {
        id: 'l1-3',
        src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=1600&fit=crop&q=80',
        alt: 'Model in linen trousers',
        products: ['5'],
      },
      {
        id: 'l1-4',
        src: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&h=1600&fit=crop&q=80',
        alt: 'Cashmere turtleneck detail',
        products: ['2'],
        caption: 'Mongolian Cashmere, incredibly soft',
      },
    ],
    season: 'Winter',
    year: '2025',
  },
  {
    id: '2',
    title: 'After Hours',
    slug: 'after-hours',
    description: 'Evening elegance reimagined. A collection of pieces designed to carry you from dusk to dawn with effortless sophistication.',
    coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=1600&fit=crop&q=80',
    images: [
      {
        id: 'l2-1',
        src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=1600&fit=crop&q=80',
        alt: 'Evening styling',
        products: ['8', '3'],
      },
      {
        id: 'l2-2',
        src: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&h=1600&fit=crop&q=80',
        alt: 'Ribbed knit dress',
        products: ['8'],
        caption: 'The Ribbed Knit Dress in Black',
      },
      {
        id: 'l2-3',
        src: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&h=1600&fit=crop&q=80',
        alt: 'Suede ankle boots',
        products: ['9'],
        caption: 'Italian suede, sculpted heel',
      },
    ],
    season: 'All Seasons',
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
