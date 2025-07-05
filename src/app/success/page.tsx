// app/success/page.tsx
'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="max-w-md text-center p-8 bg-white rounded-2xl shadow-md border border-green-100">
        <CheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-green-700 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. We've received your Booking successfully.
        </p>
      <div className='flex gap-1 flex-col sm:flex-row'>
          <Link
          href="/"
          className="inline-block border-2 border-primary-600 text-primary-500 px-5 py-2 rounded-lg hover:bg-green-700 hover:text-white transition"
        >
          Back to Home
        </Link>

         <Link
          href="/bookings"
          className="inline-block bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Back to Bookings
        </Link>
      </div>
      </div>
    </main>
  );
}
