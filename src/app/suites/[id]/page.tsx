import { getSingleRoom } from '@/app/_lib/services'
import { RiWifiLine } from "react-icons/ri";
import { TbAirConditioning } from "react-icons/tb";
import { FaShower } from "react-icons/fa";
import { LuBedDouble } from "react-icons/lu";
import { TbUsers } from "react-icons/tb";


import Image from 'next/image'
import RoomReservation from '@/app/components/roomReservation';

interface PageProps {
  params: {
    id: string
  }
}
const  Page =  async ({ params }: PageProps) => {
  console.log(params.id);
  
  const singleRoom = await getSingleRoom(params.id)

  const roomImages = singleRoom?.room_image.split(",")
  const mainImage = roomImages[0]
  const imageOne = roomImages[1]
  const imageTwo = roomImages[2]

  const ammenities = singleRoom.amenities?.split(',')
  
  console.log(singleRoom);
  
  return (
    <>
      <div className='flex justify-start'>
        <p></p>
      </div>
      <div className="grid grid-cols-3 gap-4 py-4 rounded-xl overflow-hidden ">
        <img src={mainImage} alt="Room 1" className="col-span-2 row-span-2 rounded-xl object-cover w-full h-[70vh]" />
        <img src={imageOne} alt="Room 2" className="rounded-xl w-full h-[33vh] object-cover" />
        <img src={imageTwo} alt="Bathroom" className="rounded-xl w-full h-[33vh] object-cover" />
      </div>

      <section className='w-full flex flex-col gap-4 sm:flex-row my-4'>
        <div className=' sm:max-w-[60vw] '>
        <h3 className='text-3xl font-bold text-primary-800 mb-3'>{singleRoom.title.toUpperCase()}</h3>
        <div className='flex  flex-wrap mb-3 font-[500] gap-4 text-accent-300 text-2xl'>
          <p className='flex items-center gap-2'>
             <span>Free wifi</span>
            <span><RiWifiLine/></span>
          </p>

          <p className='flex items-center gap-3'>
            <span>Air conditioning</span>
            <span><TbAirConditioning/></span>
          </p>

          <p className='flex items-center gap-3'>
            <span>Private Bathroom</span>
            <span><FaShower/></span>
          </p>

          <p className='flex items-center gap-3'>
            <span>One king size bed</span>
            <span><LuBedDouble/></span>
          </p>
        </div>
        <div className='text-[20px]'>
           {singleRoom.description}
        </div>

        <div className='my-5'>
          <h2 className='text-primary-800 text-3xl mb-3'>What&apos;s included in this suite? </h2> 
          <ul className='list-inside'>
            {ammenities.map((ammenity, index)=>{
              return(<li className='m-2' key={index}>{ammenity}</li>)
            })}
          </ul>
           
        </div>
       
        </div>
         <RoomReservation maxGuests={singleRoom.max_guests}/>
      </section>


      
      
    </>
  )
}

export default Page