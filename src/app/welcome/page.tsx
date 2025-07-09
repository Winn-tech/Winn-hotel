import React from 'react'
import Link from 'next/link'

const SignUPconfirm = () => {
  return (
    <div className='w-full h-[50vh] flex items-center justify-center'>
        <div className='h-fit flex justify-center flex-col gap-4 items-center'>
          <p className='text-2xl'>A confirmation / LoginIn mail has been sent to the provided email.</p>
          <Link href= '/'> 
           <button className='bg-primary-800 text-white px-4 py-2 rounded'>Return to Home</button>
          </Link>
        </div>
    </div>
  )
}

export default SignUPconfirm