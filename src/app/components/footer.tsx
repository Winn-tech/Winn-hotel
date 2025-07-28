'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return null;
  }

  return (
    <footer className="bg-primary-900 text-white mt-7 sm:px-15 px-5">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 grid-cols-1 md:grid-cols-4">
       
        <div>
          <h2 className="text-2xl font-bold mb-3">Winn Hotel</h2>
          <p className="text-gray-400 text-sm">
            The better by far home.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/suites" className="hover:text-white">Suites</Link></li>
            <li><Link href="/bookings" className="hover:text-white">Bookings</Link></li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> olugodwin99@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +234 00 123 000
            </li>
            <li className="text-gray-400">
              123 Lorem St, Lagos, Nigeria
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500">
              <Facebook />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-400">
              <Twitter />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500">
              <Instagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Winn Hotel. All rights reserved.
      </div>
    </footer>
  );
}
