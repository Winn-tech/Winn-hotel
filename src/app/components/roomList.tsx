import React from 'react'
import {getRooms} from '@/app/_lib/services'
import RoomListCard from '@/app/components/roomListCard'

const RoomList = async ()  => {
    const rooms = await getRooms()
   
    
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
    </section>
  )
}

export default RoomList