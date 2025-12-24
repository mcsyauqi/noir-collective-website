'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice, cn } from '@/lib/utils';
import { featuredProducts } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  if (!mounted) {
    return (
      <div className="pt-[120px] pb-20 min-h-screen">
        <div className="container-fluid">
          <div className="animate-pulse">
            <div className="h-10 bg-warm-gray/20 w-48 mb-8" />
            <div className="h-64 bg-warm-gray/20" />
          </div>
        </div>
      </div>
    );
  }

  const total = getTotal();
  const freeShippingThreshold = 500;
  const remainingForFreeShipping = freeShippingThreshold - total;
  const shippingCost = total >= freeShippingThreshold ? 0 : 25;

  return (
    <div className="pt-[120px] pb-20 min-h-screen">
      <div className="container-fluid">
        {/* Page Header */}
        <h1 className="text-3xl md:text-4xl font-serif mb-8">Shopping Bag</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-20 h-20 text-warm-gray/30 mx-auto mb-6" />
            <h2 className="text-2xl font-serif mb-3">Your bag is empty</h2>
            <p className="text-warm-gray mb-8">
              Add something beautiful to your bag
            </p>
            <Link href="/shop" className="btn-primary">
              Continue Shopping
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
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Free Shipping Progress */}
              {remainingForFreeShipping > 0 && (
                <div className="mb-8 p-4 bg-off-white">
                  <p className="text-sm text-center mb-2">
                    Add{' '}
                    <span className="font-medium">
                      {formatPrice(remainingForFreeShipping)}
                    </span>{' '}
                    more for free shipping
                  </p>
                  <div className="h-1.5 bg-warm-gray/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold-accent transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          (total / freeShippingThreshold) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {remainingForFreeShipping <= 0 && (
                <div className="mb-8 p-4 bg-noir-black text-pure-white text-center">
                  <p className="text-sm tracking-[0.1em] uppercase">
                    You&apos;ve unlocked free shipping!
                  </p>
                </div>
              )}

              {/* Items */}
              <div className="space-y-8">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-6 pb-8 border-b border-warm-gray/20"
                  >
                    {/* Image */}
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="relative w-28 h-36 md:w-36 md:h-44 bg-off-white flex-shrink-0"
                    >
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <div>
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="font-medium hover:text-warm-gray transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-warm-gray mt-1">
                            {item.color} / {item.size}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            removeItem(item.product.id, item.size, item.color)
                          }
                          className="text-warm-gray hover:text-noir-black transition-colors h-fit"
                          aria-label="Remove item"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-end justify-between">
                        {/* Quantity */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                item.quantity - 1
                              )
                            }
                            className="w-9 h-9 border border-warm-gray/30 flex items-center justify-center hover:border-noir-black transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                item.quantity + 1
                              )
                            }
                            className="w-9 h-9 border border-warm-gray/30 flex items-center justify-center hover:border-noir-black transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <p className="font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-sm mt-8 hover:text-warm-gray transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-off-white p-8 sticky top-32">
                <h2 className="text-lg font-serif mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-gray">Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-gray">Shipping</span>
                    <span>
                      {shippingCost === 0
                        ? 'Free'
                        : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-gray">Estimated Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-warm-gray/20 mb-8">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-serif">
                    {formatPrice(total + shippingCost)}
                  </span>
                </div>

                <Link href="/checkout" className="btn-primary w-full text-center">
                  Proceed to Checkout
                </Link>

                {/* Payment Methods */}
                <div className="mt-8 text-center">
                  <p className="text-xs text-warm-gray mb-3">
                    Secure checkout powered by
                  </p>
                  <div className="flex justify-center gap-4">
                    <span className="text-xs text-warm-gray">Visa</span>
                    <span className="text-xs text-warm-gray">Mastercard</span>
                    <span className="text-xs text-warm-gray">PayPal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
