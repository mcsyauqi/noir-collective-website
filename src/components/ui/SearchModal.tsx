'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Search, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(products.slice(0, 4));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered.slice(0, 6));
    } else {
      setResults(products.slice(0, 4));
    }
  }, [query]);

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  const popularSearches = ['Wool Coat', 'Cashmere', 'Silk', 'New Arrivals'];

  return (
    <div
      className={cn(
        'fixed inset-0 z-[60] transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-noir-black/80" onClick={handleClose} />

      {/* Modal */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 bg-pure-white transform transition-transform duration-500',
          isOpen ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        <div className="container-fluid py-8">
          {/* Search Input */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-8 pr-4 py-4 text-lg bg-transparent border-b border-warm-gray/30 focus:border-noir-black transition-colors outline-none"
              />
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:text-warm-gray transition-colors"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Popular Searches */}
          {!query && (
            <div className="mb-8">
              <p className="text-xs tracking-[0.1em] uppercase text-warm-gray mb-4">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-3">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 border border-warm-gray/30 text-sm hover:border-noir-black transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs tracking-[0.1em] uppercase text-warm-gray">
                {query ? `Results for "${query}"` : 'Featured Products'}
              </p>
              {query && results.length > 0 && (
                <Link
                  href={`/shop?search=${encodeURIComponent(query)}`}
                  className="text-xs tracking-[0.05em] flex items-center gap-1 hover:text-warm-gray transition-colors"
                  onClick={handleClose}
                >
                  View All <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="group"
                    onClick={handleClose}
                  >
                    <div className="relative aspect-[3/4] bg-off-white mb-3 overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-sm mb-1 group-hover:text-warm-gray transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-warm-gray">
                      {formatPrice(product.price)}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-warm-gray mb-4">
                  No results found for &quot;{query}&quot;
                </p>
                <button
                  onClick={() => setQuery('')}
                  className="text-sm underline hover:no-underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
