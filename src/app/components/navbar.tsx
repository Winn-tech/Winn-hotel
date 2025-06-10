import React from 'react'
import Link from 'next/link';

interface NavProperties {
  label : string
  link : string
}

// import { HomeIcon, UserIcon, HeartIcon, MenuIcon } from 'lucide-react'
const pages: NavProperties[] = [
  { label: 'Home', link: '/' },
  { label: 'about', link: '/' },
  { label: 'pages', link: '/' },
  { label: 'some', link: '/' },
]
const Navbar = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 px-10">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-5">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              {/* <HomeIcon className="h-6 w-6 text-blue-600" /> */}
              <span className="ml-2 text-xl font-bold text-accent-400">
                HotelHu
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            {
               pages.map((page)=>{
                return (
                  <Link href={page.link} key={page.label} className='text-primary-950'>
                     { page.label}
                  </Link>
                )
               })
            }
          </nav>
          <div className="flex items-center space-x-4">
            {/* <button className="p-1 rounded-full text-gray-500 hover:text-blue-600 focus:outline-none">
              <HeartIcon className="h-6 w-6" />
            </button>
            <button className="p-1 rounded-full text-gray-500 hover:text-blue-600 focus:outline-none">
              <UserIcon className="h-6 w-6" />
            </button>
            <button className="md:hidden p-1 rounded-full text-gray-500 hover:text-blue-600 focus:outline-none">
              <MenuIcon className="h-6 w-6" />
            </button> */}
          </div>
        </div>
      </div>
    </header>
  )
}
export default Navbar
