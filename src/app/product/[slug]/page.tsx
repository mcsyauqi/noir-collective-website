'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  Minus,
  Plus,
  Ruler,
  Truck,
  RotateCcw,
  Shield,
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { formatPrice, cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import ProductCard from '@/components/product/ProductCard';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping'>('details');

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  useEffect(() => {
    if (product) {
      const availableSize = product.sizes.find((s) => s.inStock);
      const availableColor = product.colors.find((c) => c.inStock);
      setSelectedSize(availableSize?.name || '');
      setSelectedColor(availableColor?.name || '');
    }
  }, [product]);

  if (!product) {
    return (
      <div className="pt-[120px] pb-20 min-h-screen">
        <div className="container-fluid text-center">
          <h1 className="text-4xl font-serif mb-4">Product Not Found</h1>
          <Link href="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addItem(product, selectedSize, selectedColor, quantity);
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
          <Link
            href={`/shop/${product.category}`}
            className="hover:text-noir-black transition-colors capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-noir-black">{product.name}</span>
        </nav>

        {/* Product Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-off-white overflow-hidden">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />

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

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-pure-white/80 hover:bg-pure-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-pure-white/80 hover:bg-pure-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      'relative w-20 h-24 bg-off-white overflow-hidden border-2 transition-colors',
                      index === currentImageIndex
                        ? 'border-noir-black'
                        : 'border-transparent'
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="space-y-6">
              {/* Title & Price */}
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-warm-gray mb-2">
                  {product.category}
                </p>
                <h1 className="text-3xl md:text-4xl font-serif mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3">
                  <p className="text-2xl">{formatPrice(product.price)}</p>
                  {product.originalPrice && (
                    <p className="text-xl text-warm-gray line-through">
                      {formatPrice(product.originalPrice)}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-warm-gray leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div>
                  <p className="text-sm tracking-[0.05em] mb-3">
                    Color: <span className="text-warm-gray">{selectedColor}</span>
                  </p>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => color.inStock && setSelectedColor(color.name)}
                        disabled={!color.inStock}
                        className={cn(
                          'w-10 h-10 rounded-full border-2 transition-all',
                          selectedColor === color.name
                            ? 'border-noir-black scale-110'
                            : 'border-warm-gray/30',
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
                  <p className="text-sm tracking-[0.05em]">
                    Size: <span className="text-warm-gray">{selectedSize}</span>
                  </p>
                  <Link
                    href="/size-guide"
                    className="flex items-center gap-1 text-xs hover:text-warm-gray transition-colors"
                  >
                    <Ruler className="w-4 h-4" />
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
                        'min-w-[52px] px-4 py-3 border text-sm transition-all',
                        selectedSize === size.name
                          ? 'border-noir-black bg-noir-black text-pure-white'
                          : 'border-warm-gray/30 hover:border-noir-black',
                        !size.inStock &&
                          'opacity-30 cursor-not-allowed line-through hover:border-warm-gray/30'
                      )}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-sm tracking-[0.05em] mb-3">Quantity</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 border border-warm-gray/30 flex items-center justify-center hover:border-noir-black transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 border border-warm-gray/30 flex items-center justify-center hover:border-noir-black transition-colors"
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
                    'flex-1 btn-primary text-center',
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

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-warm-gray/20">
                <div className="text-center">
                  <Truck className="w-5 h-5 mx-auto mb-2 text-warm-gray" />
                  <p className="text-[11px] tracking-[0.05em]">Free Shipping</p>
                  <p className="text-[10px] text-warm-gray">Over $500</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-5 h-5 mx-auto mb-2 text-warm-gray" />
                  <p className="text-[11px] tracking-[0.05em]">Free Returns</p>
                  <p className="text-[10px] text-warm-gray">Within 30 days</p>
                </div>
                <div className="text-center">
                  <Shield className="w-5 h-5 mx-auto mb-2 text-warm-gray" />
                  <p className="text-[11px] tracking-[0.05em]">Secure Payment</p>
                  <p className="text-[10px] text-warm-gray">100% Protected</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="pt-6 border-t border-warm-gray/20">
                <div className="flex gap-6 mb-6">
                  {(['details', 'care', 'shipping'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        'text-sm tracking-[0.05em] pb-2 border-b-2 transition-colors capitalize',
                        activeTab === tab
                          ? 'border-noir-black text-noir-black'
                          : 'border-transparent text-warm-gray hover:text-noir-black'
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="text-sm text-warm-gray leading-relaxed">
                  {activeTab === 'details' && (
                    <div className="space-y-4">
                      {product.material && (
                        <p>
                          <strong className="text-noir-black">Material:</strong>{' '}
                          {product.material}
                        </p>
                      )}
                      {product.details && (
                        <ul className="space-y-1">
                          {product.details.map((detail, i) => (
                            <li key={i}>• {detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                  {activeTab === 'care' && product.care && (
                    <ul className="space-y-1">
                      {product.care.map((instruction, i) => (
                        <li key={i}>• {instruction}</li>
                      ))}
                    </ul>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="space-y-2">
                      <p>• Complimentary shipping on orders over $500</p>
                      <p>• Standard delivery: 3-5 business days</p>
                      <p>• Express delivery: 1-2 business days</p>
                      <p>• International shipping available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <h2 className="text-2xl md:text-3xl font-serif text-center mb-12">
              Complete the Look
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
