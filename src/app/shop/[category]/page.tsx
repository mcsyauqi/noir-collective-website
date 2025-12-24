'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { products } from '@/data/products';
import { categories, getCategoryBySlug } from '@/data/collections';
import ProductCard from '@/components/product/ProductCard';
import { cn } from '@/lib/utils';

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
];

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const category = getCategoryBySlug(categorySlug);

  const [sortBy, setSortBy] = useState('newest');

  const categoryProducts = useMemo(() => {
    let result = products.filter((p) => p.category === categorySlug);

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (a.badge === 'new' ? -1 : 1));
        break;
    }

    return result;
  }, [categorySlug, sortBy]);

  if (!category) {
    return (
      <div className="pt-[120px] pb-20 min-h-screen">
        <div className="container-fluid text-center">
          <h1 className="text-4xl font-serif mb-4">Category Not Found</h1>
          <Link href="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[120px] pb-20 min-h-screen">
      <div className="container-fluid">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-warm-gray mb-8">
          <Link href="/" className="hover:text-noir-black transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/shop" className="hover:text-noir-black transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-noir-black">{category.name}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">{category.name}</h1>
          <p className="text-warm-gray max-w-lg">{category.description}</p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-warm-gray/20">
          <Link
            href="/shop"
            className={cn(
              'px-4 py-2 text-sm border transition-colors',
              'border-warm-gray/30 hover:border-noir-black'
            )}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/${cat.slug}`}
              className={cn(
                'px-4 py-2 text-sm border transition-colors',
                cat.slug === categorySlug
                  ? 'border-noir-black bg-noir-black text-pure-white'
                  : 'border-warm-gray/30 hover:border-noir-black'
              )}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <p className="text-sm text-warm-gray">
            {categoryProducts.length} products
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm bg-transparent border-none outline-none cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-warm-gray mb-4">No products in this category yet</p>
            <Link href="/shop" className="btn-primary">
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
