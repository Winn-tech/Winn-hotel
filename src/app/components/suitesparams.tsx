'use client'
import React from 'react'
import { useMainContext } from '../components/context'
const Suitesparams = () => {
    const { selected } = useMainContext();
    if(!selected?.to ){
        return ''
    }
  return (
     <div className='w-full m-auto justify-between flex h-fit my-10'>
        <div className='border-2 border-accent-700 h-10 px-2 w-full flex justify-center items-center'>
          <span></span>
          <span>{selected?.from?.toDateString()  }</span>
        </div>
         <div className='border-2 border-accent-700 h-10 w-full'>
            <span>Hello</span>
            <span>{selected?.from?.toDateString()  }</span>
        </div>
         <div className='border-2 border-accent-700 h-10 w-full'>
            <span>Hello</span>
            <span></span>
          
        </div>

      </div>
  )
}

export default Suitesparams