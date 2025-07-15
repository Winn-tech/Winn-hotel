import React from 'react'
import { getSuitesWithPagination} from '@/app/_lib/services'
import RoomListCard from '@/app/components/roomListCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const RoomList = async ()  => {
    const rooms = await getSuitesWithPagination() 
  return (
    <section className='py-5'>
        <h3 className='text-primary-700 text-2xl font-bold'>Our rooms:</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ' >
            {rooms.map((room)=>{
                return(
                   <RoomListCard room={room} key={room.id}/>
                )
            })}
    </div>
    <Link href='/suites'>
       <div className='flex justify-end my-9 '>
       <p className='flex gap-1.5 text-primary-900 hover:text-accent-800 hover:gap-2'>
       <span className='font-bold'>See more </span>
       <span className='text-16px'><ArrowRight/></span>
     </p>
    </div>
    </Link>
    </section>
  )
}

export default RoomList