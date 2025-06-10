import { error } from 'console';
import {supabase} from '@/app/_lib/supabase';
import { Room } from '../types';

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