'use client'
import { toast } from 'react-toastify';
import React, { useState } from 'react'
import Link from 'next/link'
import { login } from '@/app/_lib/actions'
import { FcGoogle } from "react-icons/fc";
import { createClient } from '@/app/utils/supabase/client'
const Page = () => {
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(formData: FormData) {
    try {
      await login(formData)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Login failed')
      }
    }
  }

 const handleGoogleLogin = async () => {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
      
    })
    toast.success('Login successful! Welcome back.');
    if (error) {
      console.error('Error signing in with Google:', error.message)
      setError(error.message)
    }
  } catch (err: unknown) {
    console.error('Google login error:', err)
    if (err instanceof Error) {
      setError(err.message)
    } else {
      setError('Google login failed')
    }
  }
}

  return (
    <>
      <form
        className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-5 border-accent-200 border-2"
        action={handleLogin}
      >
        <h1 className="text-2xl text-primary-800 font-bold text-center">Sign in</h1>
        <div>
          <button 
            type='button'
           onClick={() => {
              handleGoogleLogin()
            }}
            className='w-full py-2 font-medium border-primary-700 border-1 flex justify-center items-center gap-[5px] text-primary-900 rounded-[5px]'>Continue with Google <FcGoogle /></button>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm font-semibold">
            {error}
          </div>
        )}

        <div >
          <button
            type="submit"
            className="w-full mt-8 bg-gradient-to-r from-primary-800 to-accent-500 hover:from-primary-900 hover:to-accent-400 text-white py-3 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center gap-3 relative overflow-hidden group"

          >
            Log in
          </button>
          <Link href={"/signup"} >
            <p className="mt-3">Do not have an account? <span className='text-accent-600'>sign up</span></p>
          </Link>
        </div>
      </form>
    </>
  )
}

export default Page


