'use client'
import React, { useEffect } from 'react'
import { Room } from '../types'
import { differenceInDays } from "date-fns";
import { useMainContext } from './context'
import { bookRoom } from '../_lib/actions';
import { useFormStatus } from "react-dom";

interface RoomReservationProps extends Omit<Room, 'max_guests'> {
  maxGuests: number;
}

const RoomReservation : React.FC<RoomReservationProps > = ({ id, title, price , maxGuests }) => {
  const { selected, setSelected, guests, setGuests } = useMainContext();
  const [selectedGuests, setSelectedGuests] = React.useState<string>('');

  // Initialize selectedGuests from context.guests
  useEffect(() => {
    if (guests !== undefined) {
      setSelectedGuests(guests.toString());
    }
  }, [guests]);

  const check_in_date = selected?.from
  const check_out_date = selected?.to
  const numNights : number = check_in_date && check_out_date 
    ? differenceInDays(check_out_date, check_in_date)
    : 1;
  const totalPrice = price *  numNights;

  
  useEffect(() => {
    if (setGuests) {
      const guestsNumber = selectedGuests ? parseInt(selectedGuests) : undefined;
      setGuests(guestsNumber);
    }
  }, [selectedGuests, setGuests]);

  const handleBook = (formData:FormData) =>{
    bookRoom(formData)
    if (setSelected) {
      setSelected({ from: undefined, to: undefined })
    }
    setSelectedGuests('');
    if (setGuests) {
      setGuests(undefined);
    }
  }

  return (
    <article className='shadow-3xl sm:max-w-[30vw] sm:min-w-[30vw] p-3'>
        <div className='flex justify-between w-full border-1 border-primary-400 items-center p-2 mb-4' >
            <p className='text-[12px] text-primary-800 font-bold'>Reserve: {title}</p>
            <p className='text-accent-700 sm:font-bold text-[12px]'>from : <span>{price} / night</span> </p>
        </div>
        <form action={handleBook} className='flex flex-col gap-4'>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="check_in_date" value={check_in_date?.toISOString() || ''} />
          <input type="hidden" name="check_out_date" value={check_out_date?.toISOString() || ''} />
          <input type="hidden" name="num_nights" value={numNights} />
          <input type="hidden" name="total_price" value={totalPrice} />
          <div>
          <select 
            name='numGuests'
            id='numGuests'
            value={selectedGuests}
            onChange={(e) => setSelectedGuests(e.target.value)}
            className='px-5 py-3  text-primary-800 w-full shadow-sm rounded-sm border-1 border-primary-400'
            required>
            <option value="" disabled>
              Select No. of guests
            </option>
             {Array.from({ length: maxGuests }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
          </div>

         <div>
            <label htmlFor="observations" className='mb-2 block'>Anything we should know?</label>
            <input 
              type="text" 
              name="observations"
              id="observations"
              className='px-5 py-3 w-full shadow-sm rounded-sm text-primary-800 border-1 border-primary-400' 
              placeholder='Allergies, special requests, pets'
            />
         </div>

          {
            (check_in_date && check_out_date && selectedGuests) ? (
              <SubmitButton/>
            ) : (
              <div className='text-center'>
                {!check_in_date || !check_out_date ? (
                  <p className='text-accent-500 font-bold'>Select date(s) of stay.</p>
                ) : !selectedGuests ? (
                  <p className='text-accent-500 font-bold'>Select number of guests.</p>
                ) : null}
              </div>
            )
          }
          
        </form>
    </article>
  )
}

export default RoomReservation

const SubmitButton =()=>{
     const {pending} = useFormStatus();
    return (
    <button 
      type="submit"
      disabled={pending}
      className='w-full cursor-pointer bg-gradient-to-r from-primary-800 to-accent-500 hover:from-primary-900 hover:to-accent-400 text-white py-2 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'>
      {pending ? 'Processing...' : 'Book Now'}
    </button>
    )
}
