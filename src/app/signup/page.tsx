'use client'

import React, { useState } from 'react'
import { signup } from '@/app/_lib/actions'
import { FcGoogle } from "react-icons/fc";

const Page = () => {
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    const formData = new FormData(event.currentTarget)
    try {
      await signup(formData)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    }
  }

  return (
    <div>
      <form 
        onSubmit={handleSubmit}
        className='max-w-sm mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-5 border-accent-200 border-2'
      >
        <h1 className="text-2xl text-primary-800 font-bold text-center">Create Account</h1>

        <div>
          <button 
            type="button"
            className='w-full py-2 font-medium flex justify-center items-center gap-[5px] border-primary-700 border-1 text-primary-900 rounded-[5px]'
          > 
            Continue with Google <FcGoogle />
          </button>
        </div>  

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        {error && (
          <div className="text-red-600 font-semibold text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full mt-3 bg-gradient-to-r from-primary-800 to-accent-500 hover:from-primary-900 hover:to-accent-400 text-white py-3 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center gap-3 relative overflow-hidden group"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Page
