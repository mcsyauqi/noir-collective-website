'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const inWishlist = isInWishlist(product.id);
  const hasSecondImage = product.images.length > 1;
  const availableSizes = product.sizes.filter((s) => s.inStock);
  const defaultSize = availableSizes[0]?.name || product.sizes[0]?.name;
  const defaultColor = product.colors[0]?.name || '';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (defaultSize && product.inStock) {
      addItem(product, defaultSize, defaultColor);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <article
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/product/${product.slug}`} className="block">
          {/* Image Container */}
          <div className="relative aspect-[3/4] bg-off-white overflow-hidden mb-4">
            {/* Primary Image */}
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority={priority}
              className={cn(
                'object-cover transition-opacity duration-500',
                isHovered && hasSecondImage ? 'opacity-0' : 'opacity-100'
              )}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* Secondary Image */}
            {hasSecondImage && (
              <Image
                src={product.images[1]}
                alt={`${product.name} - alternate view`}
                fill
                className={cn(
                  'object-cover transition-opacity duration-500',
                  isHovered ? 'opacity-100' : 'opacity-0'
                )}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            )}

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-3 left-3 z-10">
                <span
                  className={cn('badge', {
                    'badge-new': product.badge === 'new',
                    'badge-limited': product.badge === 'limited',
                    'badge-sold-out': product.badge === 'sold-out',
                  })}
                >
                  {product.badge === 'sold-out' ? 'Sold Out' : product.badge}
                </span>
              </div>
            )}

            {/* Wishlist Button */}
            <button
              onClick={handleWishlist}
              className={cn(
                'absolute top-3 right-3 z-10 p-2 bg-pure-white/90 backdrop-blur-sm transition-all duration-300',
                isHovered ? 'opacity-100' : 'opacity-0'
              )}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                className={cn('w-4 h-4 transition-colors', {
                  'fill-burgundy text-burgundy': inWishlist,
                  'text-noir-black': !inWishlist,
                })}
              />
            </button>

            {/* Quick Actions */}
            <div
              className={cn(
                'absolute bottom-0 left-0 right-0 z-10 flex gap-2 p-4 bg-pure-white/95 backdrop-blur-sm transform transition-all duration-400',
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              )}
            >
              <button
                onClick={handleQuickAdd}
                disabled={!product.inStock}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] tracking-[0.1em] uppercase transition-colors',
                  product.inStock
                    ? 'bg-noir-black text-pure-white hover:bg-noir-black/90'
                    : 'bg-warm-gray/50 text-warm-gray cursor-not-allowed'
                )}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                {product.inStock ? 'Add to Bag' : 'Sold Out'}
              </button>
              <button
                onClick={handleQuickView}
                className="p-2.5 border border-noir-black hover:bg-noir-black hover:text-pure-white transition-colors"
                aria-label="Quick view"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-1">
            <h3 className="text-sm tracking-[0.02em] group-hover:text-warm-gray transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-warm-gray">{product.category}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm">{formatPrice(product.price)}</p>
              {product.originalPrice && (
                <p className="text-sm text-warm-gray line-through">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
            </div>

            {/* Size Availability Indicator */}
            <div className="flex gap-1 pt-1">
              {product.sizes.slice(0, 5).map((size) => (
                <span
                  key={size.name}
                  className={cn(
                    'text-[10px] px-1.5 py-0.5 border',
                    size.inStock
                      ? 'border-warm-gray/30 text-noir-black'
                      : 'border-warm-gray/20 text-warm-gray line-through'
                  )}
                >
                  {size.name}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </article>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
