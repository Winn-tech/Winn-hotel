import { getSingleRoom } from '@/app/_lib/services'
import { RiWifiLine } from "react-icons/ri";
import { TbAirConditioning } from "react-icons/tb";
import { FaShower } from "react-icons/fa";
import { LuBedDouble } from "react-icons/lu";
import RoomReservation from '@/app/components/roomReservation';
import DatePicker from '@/app/components/datePicker';

interface PageProps {
  params: {
    id: string
  }
}
const  Page =  async ({ params }: PageProps) => {
  const { id } =  await params;
  
  const singleRoom = await getSingleRoom(id)

  const roomImages = singleRoom?.room_image.split(",")
  const mainImage = roomImages[0]
  const imageOne = roomImages[1]
  const imageTwo = roomImages[2]

  const ammenities = singleRoom.amenities?.split(',')
  

  
  
  return (
    <>
      <div className='flex justify-start'>
        <p></p>
      </div>
      <div className="sm:grid grid-cols-3 gap-4 py-4 rounded-xl block overflow-hidden ">
        <img src={mainImage} alt="Room 1" className="col-span-2 row-span-2 rounded-xl object-cover w-full h-[45vh] sm:h-[70vh]" />
        <img src={imageOne} alt="Room 2" className="rounded-xl w-full h-[33vh] object-cover hidden sm:block" />
        <img src={imageTwo} alt="Bathroom" className="rounded-xl w-full h-[33vh] object-cover hidden sm:block" />
      </div>

      <section className='w-full flex flex-col gap-4 sm:flex-row my-4'>
        <div className=' sm:max-w-[60vw] '>
        <h3 className='text-2xl sm:3xl font-bold text-primary-800 mb-3'>{singleRoom.title.toUpperCase()}</h3>
        <div className='flex  flex-wrap mb-3 font-[500] gap-4 text-accent-300 text-2xl'>
          <p className='flex items-center gap-2'>
            <span><RiWifiLine/></span>
             <span>Free wifi</span>
          </p>

          <p className='flex items-center gap-3'>
            <span><TbAirConditioning/></span>
            <span>Air conditioning</span>
          </p>

          <p className='flex items-center gap-3'>
            <span><FaShower/></span>
            <span>Private Bathroom</span>
          </p>

          <p className='flex items-center gap-3'>
            <span><LuBedDouble/></span>
            <span>One king size bed</span>
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
        <RoomReservation {...singleRoom} maxGuests={singleRoom.max_guests}/>
        </div>
        
         <DatePicker numNights={singleRoom.max_booking_night} />
      </section>


      
      
    </>
  )
}

export default Page