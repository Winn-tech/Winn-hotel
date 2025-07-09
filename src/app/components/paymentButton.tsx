'use client';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface props {
    price: number;
    status: string;
    id: string;
}

export default function CheckoutButton({ price, status, id }: props) {
  const handleClick = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price, status, id }), 
    });

    const { id: sessionId } = await res.json(); 
    const stripe = await stripePromise;

    if (stripe) {
      stripe.redirectToCheckout({ sessionId });
    }
  };

  return (
    <div 
      className='flex-1 w-[50%] py-2 bg-gradient-to-r flex justify-center items-center from-primary-800 to-accent-500 hover:from-primary-900 hover:to-accent-400 text-white px-8 rounded cursor-pointer font-semibold'
    >
      <input
        type="number"
        min={100}
        step={100}
        value={price}
        className="border rounded px-2 py-1"
        readOnly
        hidden
      />
      <button
        onClick={handleClick}
        className='cursor-pointer'
      >
        Pay ${(price).toFixed(2)}
      </button>
    </div>
  );
}