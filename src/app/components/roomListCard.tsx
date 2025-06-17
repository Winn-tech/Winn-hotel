import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { Room } from '../types';

interface RoomListCardProps {
  room: Room;
}

const RoomListCard = ({room}: RoomListCardProps) => {
   const roomImages = room.room_image.split(",")
  const mainImage = roomImages[0]
  return (
    <div key={room.id} className='p-4 w-auto bg-accent-50 shadow-2xl h-fit' >
        <div className='w-full h-[160px] aspect-square relative ' >
            <Image src={mainImage}  alt={room.title} fill className='object-cover rounded-2xl' />
        </div>
        <div className='mt-3 '>
            <h2 className='font-bold text-primary-950 uppercase text-lg'> {room.title}</h2>
            <p className='mt-1.5 font-light capitalize'>{room.room_type}</p>
            <div className='flex justify-between items-center'>
                <p className='font-bold text-primary-800'>{room.price} per night</p>
                <Link href={`/suites/${room.id}`}>
                    <p className=' bg-gradient-to-r from-primary-800 to-accent-500 hover:from-primary-900 hover:to-accent-400 text-sm text-white py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center gap-3 relative overflow-hidden group'>
                    <span>Details</span>
                    <span></span>
                </p>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default RoomListCard