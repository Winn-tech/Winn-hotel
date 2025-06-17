'use client'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { IoFilterSharp } from "react-icons/io5";
import { getRooms } from '../_lib/services';


import { useState } from 'react';

const SuitesFilter = () => {
    const [showFilter, setShowFilter] = useState( false)
    const [roomTypes, setRoomTypes] = useState<string[]>([])

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathName = usePathname()
    
   useEffect(() => {
    const fetchRoomTypes = async () => {
      const rooms = await getRooms()
      const types = Array.from(new Set(rooms.map(room => room.room_type)))
      const allTypes = ['all', ...types]
      setRoomTypes(allTypes)
    }

    fetchRoomTypes()
  }, [])
  
  const handleFilterTogle =()=>{
     setShowFilter(!showFilter)
    }

    const activeFilter = searchParams.get('room_class') ?? 'all'

    const handleFilter = (type: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('room_class', type)
      router.replace(`${pathName}?${params}`);     
    }
    
  return (
    <div className="flex justify-between py-2.5 px-4 items-center relative">
        <p className='font-bold capitalize'>
          Suites : 
          <span className='text-accent-600 text-sm ml-1'>{activeFilter}</span>
        </p>
        <p onClick={handleFilterTogle} className='cursor-pointer p-3 bg-accent-100 '><IoFilterSharp /></p>
        {
        showFilter && (
          <div onClick={handleFilterTogle} className='w-fit h-fit absolute top-13 border-accent-200 border-2 right-0 bg-accent-50 z-2 p-4 shadow-2xl cursor-pointer text-primary-700 font-[400] flex flex-col gap-3'>
            <ul>
              {
                roomTypes.map((type, index) => (
                  <li key={index} onClick={()=>handleFilter(type)} className='hover:text-accent-500'>{type}</li>
                ))
              }
            </ul>
          </div>
        )
      }
    
      </div>
  )
}

export default SuitesFilter