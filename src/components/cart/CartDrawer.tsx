'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal } =
    useCartStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const total = getTotal();
  const freeShippingThreshold = 500;
  const remainingForFreeShipping = freeShippingThreshold - total;

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-noir-black/50 z-50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-md bg-pure-white z-50 transform transition-transform duration-500 ease-out flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-warm-gray/20">
          <h2 className="text-lg tracking-[0.1em] uppercase font-serif">
            Shopping Bag ({items.length})
          </h2>
          <button
            onClick={closeCart}
            className="p-1 hover:text-warm-gray transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {items.length > 0 && remainingForFreeShipping > 0 && (
          <div className="px-6 py-4 bg-off-white">
            <p className="text-xs tracking-[0.05em] text-center mb-2">
              {formatPrice(remainingForFreeShipping)} away from free shipping
            </p>
            <div className="h-1 bg-warm-gray/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold-accent transition-all duration-500"
                style={{
                  width: `${Math.min((total / freeShippingThreshold) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {items.length > 0 && remainingForFreeShipping <= 0 && (
          <div className="px-6 py-3 bg-noir-black text-pure-white text-center">
            <p className="text-xs tracking-[0.1em] uppercase">
              You&apos;ve unlocked free shipping!
            </p>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <ShoppingBag className="w-16 h-16 text-warm-gray/50 mb-6" />
              <p className="text-lg font-serif mb-2">Your bag is empty</p>
              <p className="text-sm text-warm-gray mb-8">
                Add something beautiful to your bag
              </p>
              <button onClick={closeCart} className="btn-primary">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-4"
                >
                  <div className="relative w-24 h-32 bg-off-white flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-warm-gray mb-1">
                          {item.color} / {item.size}
                        </p>
                        <p className="text-sm">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          removeItem(item.product.id, item.size, item.color)
                        }
                        className="text-warm-gray hover:text-noir-black transition-colors h-fit"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity - 1
                          )
                        }
                        className="w-7 h-7 border border-warm-gray/30 flex items-center justify-center hover:border-noir-black transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity + 1
                          )
                        }
                        className="w-7 h-7 border border-warm-gray/30 flex items-center justify-center hover:border-noir-black transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-warm-gray/20 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm tracking-[0.05em]">Subtotal</span>
              <span className="text-lg font-serif">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-warm-gray">
              Shipping and taxes calculated at checkout
            </p>
            <Link
              href="/checkout"
              className="btn-primary w-full text-center"
              onClick={closeCart}
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              className="btn-secondary w-full text-center"
              onClick={closeCart}
            >
              View Bag
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
