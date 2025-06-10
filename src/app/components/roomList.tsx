import React from 'react'
import Image from 'next/image'
import {getRooms} from '@/app/_lib/services'
import { log } from 'console'

const RoomList = async ()  => {
    const rooms = await getRooms()
    console.log(rooms);
    

  return (
    <section className='py-5'>
        <h3 className='text-primary-700 text-2xl font-bold'>Our rooms:</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ' >
            {rooms.map((room)=>{
                return(
                   <div key={room.id} className='p-4 w-auto bg-accent-50 shadow-2xl h-fit' >
                       <div className='w-full h-[160px] aspect-square relative ' >
                          <Image src={room.room_image}  alt={room.title} fill className='object-cover rounded-2xl' />
                       </div>
                       <div className='mt-3 '>
                         <h2 className='font-bold text-primary-950 uppercase text-lg'> {room.title}</h2>
                         <p className='mt-1.5 font-light capitalize'>{room.room_type}</p>
                         <div className='flex justify-between items-center'>
                            <p className='font-bold text-primary-800'>{room.price} per night</p>
                            <p className=' bg-gradient-to-r from-primary-800 to-accent-500 hover:from-primary-900 hover:to-accent-400 text-sm text-white py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center gap-3 relative overflow-hidden group'>
                                <span>Details</span>
                                <span></span>
                            </p>
                         </div>
                       </div>
                   </div>
                )
            })}
    </div>
    </section>
  )
}

export default RoomList