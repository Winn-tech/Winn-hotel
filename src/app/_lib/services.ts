import { error } from 'console';
import {supabase} from '@/app/_lib/supabase';
import { Room, Booking } from '../types';

export const getRooms = async ():Promise<Room[]> =>{
    const { data: rooms, error } = await supabase
    .from('rooms')
    .select('*')

    if (error) {
        throw new Error(error.message);
    }
    return rooms as Room[]
    }
    

export const getSingleRoom = async (roomId: string): Promise<Room>=>{
  
    let { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', roomId)
    .single();           // Expect exactly one record

    if (error || !data) {
        throw new Error(`Error fetching room: ${error?.message}`);
    }

    return data as Room;
}

 export const createBooking = async (booking:Booking) =>{

const { data, error } = await supabase
  .from('bookings')
  .insert([
    booking
  ])
  .select()


if (error) {
    throw new Error(`Error fetching bookings: ${error.message}`);
}

}

