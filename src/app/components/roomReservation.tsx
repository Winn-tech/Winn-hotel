import React from 'react'

interface RoomReservationProps{
   maxGuests : number;
}
const RoomReservation : React.FC<RoomReservationProps> = ({maxGuests}) => {
  return (
    <article className='shadow-2xl sm:max-w-[30vw] sm:min-w-[30vw] p-3'>
        <div className='flex justify-between w-full'>
            <p className='text-3xl text-primary-800'>Reserve:</p>
            <p className='font-bold text-accent-700'>from </p>
        </div>
        <form action="">
          <label htmlFor="">No of guests?</label>
          <select 
            name='numGuests'
            id='numGuests'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            required>
            <option>
              Select No. of guests
            </option>
             {Array.from({ length: maxGuests }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>

          <label htmlFor="">Anything we should know?</label>
          <input type="text" 
            placeholder='Allergies, special requests, pets'
          />
        </form>
    </article>
  )
}

export default RoomReservation