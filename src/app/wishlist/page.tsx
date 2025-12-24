'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlist';
import ProductCard from '@/components/product/ProductCard';
import { featuredProducts } from '@/data/products';

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const { items } = useWishlistStore();

  useEffect(() => {
    setMounted(true);
    useWishlistStore.persist.rehydrate();
  }, []);

  if (!mounted) {
    return (
      <div className="pt-[120px] pb-20 min-h-screen">
        <div className="container-fluid">
          <div className="animate-pulse">
            <div className="h-10 bg-warm-gray/20 w-48 mb-8" />
            <div className="grid grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-warm-gray/20" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[120px] pb-20 min-h-screen">
      <div className="container-fluid">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif mb-2">My Wishlist</h1>
          <p className="text-warm-gray">{items.length} items saved</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-20 h-20 text-warm-gray/30 mx-auto mb-6" />
            <h2 className="text-2xl font-serif mb-3">Your wishlist is empty</h2>
            <p className="text-warm-gray mb-8">
              Save your favorite items to purchase later
            </p>
            <Link href="/shop" className="btn-primary">
              Start Shopping
            </Link>

            {/* Recommended Products */}
            <div className="mt-20">
              <h3 className="text-xl font-serif mb-8">You Might Like</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
