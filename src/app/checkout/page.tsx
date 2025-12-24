'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ChevronDown, Lock, CreditCard } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice, cn } from '@/lib/utils';

type CheckoutStep = 'information' | 'shipping' | 'payment';

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('information');
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const { items, getTotal } = useCartStore();

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-pure-white">
        <div className="container-fluid py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-warm-gray/20 w-32 mb-8" />
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="h-96 bg-warm-gray/20" />
              <div className="h-64 bg-warm-gray/20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const total = getTotal();
  const freeShippingThreshold = 500;
  const shippingCost = total >= freeShippingThreshold ? 0 : 25;
  const estimatedTax = total * 0.1;
  const orderTotal = total + shippingCost + estimatedTax;

  const steps: { key: CheckoutStep; label: string }[] = [
    { key: 'information', label: 'Information' },
    { key: 'shipping', label: 'Shipping' },
    { key: 'payment', label: 'Payment' },
  ];

  const stepIndex = steps.findIndex((s) => s.key === currentStep);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-pure-white pt-8">
        <div className="container-fluid text-center py-20">
          <h1 className="text-3xl font-serif mb-4">Your bag is empty</h1>
          <Link href="/shop" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pure-white">
      <div className="grid lg:grid-cols-2">
        {/* Left Column - Forms */}
        <div className="order-2 lg:order-1 p-6 md:p-12 lg:p-16">
          {/* Logo */}
          <Link href="/" className="inline-block mb-8">
            <h1 className="text-2xl font-serif tracking-[0.15em]">NOIR</h1>
          </Link>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-warm-gray mb-8 flex-wrap">
            <Link href="/cart" className="hover:text-noir-black transition-colors">
              Bag
            </Link>
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4" />
                <button
                  onClick={() => index <= stepIndex && setCurrentStep(step.key)}
                  disabled={index > stepIndex}
                  className={cn(
                    'transition-colors',
                    step.key === currentStep
                      ? 'text-noir-black'
                      : index < stepIndex
                      ? 'hover:text-noir-black cursor-pointer'
                      : 'text-warm-gray/50 cursor-not-allowed'
                  )}
                >
                  {step.label}
                </button>
              </div>
            ))}
          </nav>

          {/* Mobile Order Summary Toggle */}
          <button
            onClick={() => setShowOrderSummary(!showOrderSummary)}
            className="lg:hidden w-full flex items-center justify-between p-4 bg-off-white mb-8"
          >
            <span className="flex items-center gap-2 text-sm">
              {showOrderSummary ? 'Hide' : 'Show'} order summary
              <ChevronDown
                className={cn(
                  'w-4 h-4 transition-transform',
                  showOrderSummary && 'rotate-180'
                )}
              />
            </span>
            <span className="font-medium">{formatPrice(orderTotal)}</span>
          </button>

          {/* Mobile Order Summary */}
          {showOrderSummary && (
            <div className="lg:hidden mb-8 p-4 bg-off-white">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-4"
                  >
                    <div className="relative w-16 h-20 bg-warm-gray/20 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-noir-black text-pure-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{item.product.name}</p>
                      <p className="text-xs text-warm-gray">
                        {item.color} / {item.size}
                      </p>
                    </div>
                    <p className="text-sm">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Information Step */}
          {currentStep === 'information' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-serif">Contact</h2>
                  <p className="text-sm text-warm-gray">
                    Have an account?{' '}
                    <Link href="/account" className="underline hover:no-underline">
                      Log in
                    </Link>
                  </p>
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full"
                />
                <label className="flex items-center gap-2 mt-3 text-sm">
                  <input type="checkbox" className="w-4 h-4" />
                  Email me with news and offers
                </label>
              </div>

              <div>
                <h2 className="text-lg font-serif mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <select className="w-full">
                    <option>Country/Region</option>
                    <option>Indonesia</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Singapore</option>
                  </select>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First name" />
                    <input type="text" placeholder="Last name" />
                  </div>
                  <input type="text" placeholder="Address" />
                  <input
                    type="text"
                    placeholder="Apartment, suite, etc. (optional)"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <input type="text" placeholder="City" />
                    <input type="text" placeholder="State" />
                    <input type="text" placeholder="ZIP code" />
                  </div>
                  <input type="tel" placeholder="Phone" />
                </div>
              </div>

              <button
                onClick={() => setCurrentStep('shipping')}
                className="btn-primary w-full"
              >
                Continue to Shipping
              </button>
            </div>
          )}

          {/* Shipping Step */}
          {currentStep === 'shipping' && (
            <div className="space-y-6">
              <div className="p-4 bg-off-white">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-warm-gray">Contact</span>
                  <button
                    onClick={() => setCurrentStep('information')}
                    className="text-xs underline"
                  >
                    Change
                  </button>
                </div>
                <p className="text-sm">customer@example.com</p>
              </div>

              <div>
                <h2 className="text-lg font-serif mb-4">Shipping Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 border border-noir-black cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        defaultChecked
                        className="w-4 h-4"
                      />
                      <div>
                        <p className="text-sm">Standard Shipping</p>
                        <p className="text-xs text-warm-gray">3-5 business days</p>
                      </div>
                    </div>
                    <span className="text-sm">
                      {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                    </span>
                  </label>
                  <label className="flex items-center justify-between p-4 border border-warm-gray/30 cursor-pointer hover:border-noir-black transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        className="w-4 h-4"
                      />
                      <div>
                        <p className="text-sm">Express Shipping</p>
                        <p className="text-xs text-warm-gray">1-2 business days</p>
                      </div>
                    </div>
                    <span className="text-sm">{formatPrice(45)}</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep('information')}
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep('payment')}
                  className="btn-primary flex-1"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Payment Step */}
          {currentStep === 'payment' && (
            <div className="space-y-6">
              <div className="p-4 bg-off-white space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Contact</span>
                  <button
                    onClick={() => setCurrentStep('information')}
                    className="text-xs underline"
                  >
                    Change
                  </button>
                </div>
                <p className="text-sm">customer@example.com</p>
                <div className="flex justify-between text-sm pt-2 border-t border-warm-gray/20">
                  <span className="text-warm-gray">Ship to</span>
                  <button
                    onClick={() => setCurrentStep('information')}
                    className="text-xs underline"
                  >
                    Change
                  </button>
                </div>
                <p className="text-sm">123 Example St, City, 12345</p>
              </div>

              <div>
                <h2 className="text-lg font-serif mb-4">Payment</h2>
                <p className="text-sm text-warm-gray mb-4">
                  All transactions are secure and encrypted.
                </p>

                <div className="border border-noir-black">
                  <div className="flex items-center justify-between p-4 bg-off-white">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5" />
                      <span className="text-sm">Credit Card</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs text-warm-gray">Visa</span>
                      <span className="text-xs text-warm-gray">Mastercard</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                    <input type="text" placeholder="Card number" />
                    <input type="text" placeholder="Name on card" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Expiration (MM/YY)" />
                      <input type="text" placeholder="Security code" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-warm-gray">
                <Lock className="w-4 h-4" />
                <span>Your payment information is encrypted and secure</span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep('shipping')}
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button className="btn-primary flex-1">
                  Pay {formatPrice(orderTotal)}
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-warm-gray/20">
            <div className="flex flex-wrap gap-4 text-xs text-warm-gray">
              <Link href="/terms" className="hover:text-noir-black">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-noir-black">
                Privacy Policy
              </Link>
              <Link href="/shipping-returns" className="hover:text-noir-black">
                Shipping & Returns
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="order-1 lg:order-2 hidden lg:block bg-off-white p-12 lg:p-16 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <div className="space-y-6">
            {/* Items */}
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="flex gap-4"
              >
                <div className="relative w-16 h-20 bg-warm-gray/20 flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-noir-black text-pure-white text-xs rounded-full flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm">{item.product.name}</p>
                  <p className="text-xs text-warm-gray">
                    {item.color} / {item.size}
                  </p>
                </div>
                <p className="text-sm">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            ))}

            {/* Promo Code */}
            <div className="flex gap-2 pt-6 border-t border-warm-gray/30">
              <input
                type="text"
                placeholder="Discount code"
                className="flex-1"
              />
              <button className="btn-secondary px-6">Apply</button>
            </div>

            {/* Totals */}
            <div className="space-y-3 pt-6 border-t border-warm-gray/30">
              <div className="flex justify-between text-sm">
                <span className="text-warm-gray">Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-warm-gray">Shipping</span>
                <span>
                  {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-warm-gray">Estimated Tax</span>
                <span>{formatPrice(estimatedTax)}</span>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-warm-gray/30">
              <span className="text-lg">Total</span>
              <span className="text-xl font-serif">{formatPrice(orderTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
