'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, Grid, LayoutGrid, X } from 'lucide-react';
import { products } from '@/data/products';
import { categories } from '@/data/collections';
import ProductCard from '@/components/product/ProductCard';
import { cn } from '@/lib/utils';

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Sellers', value: 'bestsellers' },
];

const priceRanges = [
  { label: 'Under $200', min: 0, max: 200 },
  { label: '$200 - $400', min: 200, max: 400 },
  { label: '$400 - $600', min: 400, max: 600 },
  { label: 'Over $600', min: 600, max: Infinity },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    const filterType = searchParams.get('filter');

    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply filter type
    if (filterType === 'new') {
      result = result.filter((p) => p.badge === 'new');
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Apply price filter
    if (selectedPriceRanges.length > 0) {
      result = result.filter((p) =>
        selectedPriceRanges.some((index) => {
          const range = priceRanges[index];
          return p.price >= range.min && p.price < range.max;
        })
      );
    }

    // Apply sorting
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
      default:
        break;
    }

    setFilteredProducts(result);
  }, [searchParams, sortBy, selectedCategories, selectedPriceRanges]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const togglePriceRange = (index: number) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedPriceRanges.length > 0;

  return (
    <div className="pt-[120px] pb-20 min-h-screen">
      <div className="container-fluid">
        {/* Page Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-warm-gray mb-3">
            Discover
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">All Products</h1>
          <p className="text-warm-gray max-w-md mx-auto">
            Explore our curated collection of timeless, sustainable fashion pieces
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-warm-gray/20">
          {/* Filter Toggle */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 text-sm tracking-[0.05em] hover:text-warm-gray transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="w-5 h-5 bg-noir-black text-pure-white text-[10px] rounded-full flex items-center justify-center">
                {selectedCategories.length + selectedPriceRanges.length}
              </span>
            )}
          </button>

          {/* Product Count */}
          <p className="text-sm text-warm-gray hidden md:block">
            {filteredProducts.length} products
          </p>

          {/* Sort & Grid Controls */}
          <div className="flex items-center gap-6">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm bg-transparent border-none outline-none cursor-pointer pr-6"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Grid Toggle */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setGridCols(2)}
                className={cn(
                  'p-1.5 transition-colors',
                  gridCols === 2 ? 'text-noir-black' : 'text-warm-gray'
                )}
                aria-label="2 columns"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={cn(
                  'p-1.5 transition-colors',
                  gridCols === 3 ? 'text-noir-black' : 'text-warm-gray'
                )}
                aria-label="3 columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={cn(
                  'p-1.5 transition-colors',
                  gridCols === 4 ? 'text-noir-black' : 'text-warm-gray'
                )}
                aria-label="4 columns"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <rect x="0" y="0" width="3" height="7" />
                  <rect x="4.33" y="0" width="3" height="7" />
                  <rect x="8.66" y="0" width="3" height="7" />
                  <rect x="13" y="0" width="3" height="7" />
                  <rect x="0" y="9" width="3" height="7" />
                  <rect x="4.33" y="9" width="3" height="7" />
                  <rect x="8.66" y="9" width="3" height="7" />
                  <rect x="13" y="9" width="3" height="7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside
            className={cn(
              'fixed md:static inset-0 z-40 md:z-auto bg-pure-white md:bg-transparent transform transition-transform md:transform-none md:w-64 flex-shrink-0',
              isFilterOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
              !isFilterOpen && 'md:hidden lg:block'
            )}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-warm-gray/20 md:hidden">
              <h2 className="text-lg font-serif">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-0 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)] md:max-h-none">
              {/* Active Filters */}
              {hasActiveFilters && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs tracking-[0.1em] uppercase">
                      Active Filters
                    </h3>
                    <button
                      onClick={clearFilters}
                      className="text-xs text-warm-gray hover:text-noir-black underline"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className="flex items-center gap-1 px-3 py-1 bg-off-white text-xs"
                      >
                        {cat}
                        <X className="w-3 h-3" />
                      </button>
                    ))}
                    {selectedPriceRanges.map((index) => (
                      <button
                        key={index}
                        onClick={() => togglePriceRange(index)}
                        className="flex items-center gap-1 px-3 py-1 bg-off-white text-xs"
                      >
                        {priceRanges[index].label}
                        <X className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              <div>
                <h3 className="text-xs tracking-[0.1em] uppercase mb-4">
                  Category
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.slug)}
                        onChange={() => toggleCategory(category.slug)}
                        className="w-4 h-4 border border-warm-gray/50 accent-noir-black"
                      />
                      <span className="text-sm group-hover:text-warm-gray transition-colors">
                        {category.name}
                      </span>
                      <span className="text-xs text-warm-gray ml-auto">
                        ({category.productCount})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-xs tracking-[0.1em] uppercase mb-4">Price</h3>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPriceRanges.includes(index)}
                        onChange={() => togglePriceRange(index)}
                        className="w-4 h-4 border border-warm-gray/50 accent-noir-black"
                      />
                      <span className="text-sm group-hover:text-warm-gray transition-colors">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Apply Button */}
            <div className="p-6 border-t border-warm-gray/20 md:hidden">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="btn-primary w-full"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div
                className={cn('grid gap-6', {
                  'grid-cols-1 sm:grid-cols-2': gridCols === 2,
                  'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3': gridCols === 3,
                  'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4': gridCols === 4,
                })}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-warm-gray mb-4">
                  No products match your criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="text-sm underline hover:no-underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-noir-black/50 z-30 md:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
}

function ShopLoading() {
  return (
    <div className="pt-[120px] pb-20 min-h-screen">
      <div className="container-fluid">
        <div className="text-center mb-12">
          <div className="h-4 bg-warm-gray/20 w-24 mx-auto mb-3 animate-pulse" />
          <div className="h-12 bg-warm-gray/20 w-64 mx-auto mb-4 animate-pulse" />
          <div className="h-4 bg-warm-gray/20 w-80 mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-warm-gray/20 mb-4" />
              <div className="h-4 bg-warm-gray/20 w-3/4 mb-2" />
              <div className="h-4 bg-warm-gray/20 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopContent />
    </Suspense>
  );
}
