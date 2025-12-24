'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
}: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const inWishlist = isInWishlist(product.id);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Set default selections
      const availableSize = product.sizes.find((s) => s.inStock);
      const availableColor = product.colors.find((c) => c.inStock);
      setSelectedSize(availableSize?.name || '');
      setSelectedColor(availableColor?.name || '');
      setQuantity(1);
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, product]);

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addItem(product, selectedSize, selectedColor, quantity);
      onClose();
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-noir-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-pure-white mx-4 overflow-hidden animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:text-warm-gray transition-colors"
          aria-label="Close quick view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 max-h-[90vh]">
          {/* Image Gallery */}
          <div className="relative aspect-[3/4] md:aspect-auto bg-off-white">
            <Image
              src={product.images[currentImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
            />

            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-pure-white/80 hover:bg-pure-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-pure-white/80 hover:bg-pure-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        'w-2 h-2 rounded-full transition-colors',
                        index === currentImageIndex
                          ? 'bg-noir-black'
                          : 'bg-warm-gray/50'
                      )}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-4 left-4">
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
          </div>

          {/* Product Details */}
          <div className="p-8 md:p-10 overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
            <div className="space-y-6">
              {/* Title & Price */}
              <div>
                <p className="text-xs tracking-[0.1em] uppercase text-warm-gray mb-2">
                  {product.category}
                </p>
                <h2 className="text-2xl font-serif mb-3">{product.name}</h2>
                <div className="flex items-center gap-3">
                  <p className="text-xl">{formatPrice(product.price)}</p>
                  {product.originalPrice && (
                    <p className="text-lg text-warm-gray line-through">
                      {formatPrice(product.originalPrice)}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-warm-gray leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div>
                  <p className="text-xs tracking-[0.1em] uppercase mb-3">
                    Color: <span className="text-warm-gray">{selectedColor}</span>
                  </p>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => color.inStock && setSelectedColor(color.name)}
                        disabled={!color.inStock}
                        className={cn(
                          'w-8 h-8 rounded-full border-2 transition-all',
                          selectedColor === color.name
                            ? 'border-noir-black scale-110'
                            : 'border-transparent',
                          !color.inStock && 'opacity-30 cursor-not-allowed'
                        )}
                        style={{ backgroundColor: color.hex }}
                        aria-label={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs tracking-[0.1em] uppercase">
                    Size: <span className="text-warm-gray">{selectedSize}</span>
                  </p>
                  <Link
                    href="/size-guide"
                    className="text-xs underline hover:no-underline"
                    onClick={onClose}
                  >
                    Size Guide
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => size.inStock && setSelectedSize(size.name)}
                      disabled={!size.inStock}
                      className={cn(
                        'min-w-[48px] px-4 py-2 border text-sm transition-all',
                        selectedSize === size.name
                          ? 'border-noir-black bg-noir-black text-pure-white'
                          : 'border-warm-gray/30 hover:border-noir-black',
                        !size.inStock &&
                          'opacity-30 cursor-not-allowed line-through'
                      )}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-xs tracking-[0.1em] uppercase mb-3">Quantity</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-warm-gray/30 flex items-center justify-center hover:border-noir-black transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-warm-gray/30 flex items-center justify-center hover:border-noir-black transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || !selectedSize || !selectedColor}
                  className={cn(
                    'flex-1 btn-primary',
                    (!product.inStock || !selectedSize || !selectedColor) &&
                      'opacity-50 cursor-not-allowed hover:bg-noir-black hover:text-pure-white'
                  )}
                >
                  {product.inStock ? 'Add to Bag' : 'Sold Out'}
                </button>
                <button
                  onClick={() => toggleItem(product)}
                  className="p-4 border border-noir-black hover:bg-noir-black hover:text-pure-white transition-colors"
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart
                    className={cn('w-5 h-5', {
                      'fill-burgundy text-burgundy': inWishlist,
                    })}
                  />
                </button>
              </div>

              {/* View Full Details */}
              <Link
                href={`/product/${product.slug}`}
                className="block text-center text-sm underline hover:no-underline"
                onClick={onClose}
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
