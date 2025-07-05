// 'use client';

import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function CancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="max-w-md text-center p-8 bg-white rounded-2xl shadow-md border border-red-100">
        <XCircle className="text-red-600 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-red-700 mb-2">Payment Canceled</h1>
        <p className="text-gray-600 mb-6">
          Your payment was not completed. You can try again anytime.
        </p>
        <Link
          href="/"
          className="inline-block bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
