'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface amount {
    price: number;
}
export default function CheckoutButton({price} : amount) {
//   const [amount, setAmount] = useState(0); 

  const handleClick = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price }),
    });

    const { id } = await res.json();
    const stripe = await stripePromise;

    if (stripe) {
      stripe.redirectToCheckout({ sessionId: id });
    }
  };

  return (
    <div 
        className='flex-1  w-[50%] py-2 bg-gradient-to-r flex justify-center items-center from-primary-800 to-accent-500 hover:from-primary-900 hover:to-accent-400 text-white px-8 rounded cursor-pointer font-semibold'
     
    >
      <input
        type="number"
        min={100}
        step={100}
        value={price}
        // onChange={(e) => setAmount(parseInt(e.target.value))}
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
