'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image'
import {logout} from '@/app/_lib/actions'
import {toast} from 'react-toastify'
import { usePathname } from 'next/navigation'
import { LogOut, Menu } from 'lucide-react';
import { useMainContext } from './context'

interface NavProperties {
  label : string
  link : string
}
const pages: NavProperties[] = [
  { label: 'Home', link: '/' },
  { label: 'about', link: '/about' },
  { label: 'suites', link: '/suites' },
  { label: 'Bookings', link: '/bookings' },
]

const Navbar = () => {

  const {isLoggedIn, setIsLoggedIn} = useMainContext();
  const {setCollapsed} = useMainContext()

 

  const handlelogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      toast.success('Logout successful!');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
  const openSideBar = () =>{
    setCollapsed(false)
  }
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 px-10">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-5">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center" >
              <div className='h-[70px] w-[70px] relative'>
              <Image alt='logo' fill src='https://ftdxflkcjyiawkvbdgmx.supabase.co/storage/v1/object/sign/logo/ChatGPT%20Image%20Jun%206,%202025,%2001_22_58%20PM.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZjMwYTVlMS1kMzNlLTQzZDQtYjkyNS0xYmE3MzcxZGE5ZjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvL0NoYXRHUFQgSW1hZ2UgSnVuIDYsIDIwMjUsIDAxXzIyXzU4IFBNLnBuZyIsImlhdCI6MTc1MDA3OTMxNiwiZXhwIjoxNzgxNjE1MzE2fQ.ofDtvLgcx4Oa-s9WT3YUCS7T8odwBUBP8mv642ojKh0'/>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            {
               pages.map((page)=>{
                return (
                  <Link href={page.link} key={page.label} className={`text-primary-700 ${usePathname() === page.link ? 'border-b-accent-500 border-b-2' : ''} hover:border-b-2 hover:border-accent-500 capitalize`}>
                     { page.label}
                  </Link>
                )
               })
            }
          </nav>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <button onClick={handlelogout} className="text-primary-700 hover:text-accent-500">
                <LogOut className='w-6 h-6' />
              </button>
            ) : (
              <Link href="/login" className="text-primary-700 hover:text-accent-500">
                Login
              </Link>
            )}
            <button
              onClick={openSideBar}
              className="p-2 rounded focus:outline-none none  sm:hidden"
              aria-label="Toggle sidebar"
            >
               <Menu size={24} className='text-primary-800' onClick={openSideBar}/>
            </button>
           
          </div>
        </div>
      </div>
    </header>
  )
}
export default Navbar
