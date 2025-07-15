'use server';
import { supabase } from '@/app/_lib/supabase';
import { Room, Booking, BookingWithRoom } from '../types';

export const getRooms = async (): Promise<Room[]> => {
  const { data: rooms, error } = await supabase
    .from('rooms')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return rooms as Room[];
};

export const getSingleRoom = async (roomId: string): Promise<Room> => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', roomId)
    .single();

  if (error || !data) {
    throw new Error(`Error fetching room: ${error?.message}`);
  }

  return data as Room;
};

import { createClient } from '@/app/utils/supabase/server'

export const createBooking = async (booking: Booking) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user?.id) {
    throw new Error('User not authenticated');
  }

  const userId = user.id;

  const { data, error } = await supabase
    .from('bookings')
    .insert([{ ...booking, user_id: userId }])
    .select();

  if (error) {
    throw new Error(`Error creating booking: ${error.message}`);
  }

  return data;
};

export const getBookings = async (): Promise<BookingWithRoom[]> => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user?.id) {
    console.log('User error or missing user:', userError);
    return [];
  }

  const userId = user.id;

  const { data: bookings, error } = await supabase
    .from('bookings')
    .select(`
      id,
      check_in_date,
      check_out_date,
      total_price,
      num_nights,
      status,
      num_guests,
      room:room_id (
        room_type,
        title,
        room_image
      )
    `)
    .eq('user_id', userId);

  if (error) {
    throw new Error(`Error fetching bookings: ${error.message}`);
  }

  const bookingsWithRoomObject = bookings?.map((booking) => ({
    ...booking,
    room: booking.room && !Array.isArray(booking.room) ? booking.room : booking.room?.[0] ?? null,
  }));

  return bookingsWithRoomObject ?? [];
};

export const getSuitesWithPagination = async (): Promise<Room[]> => {
  const { data: rooms, error } = await supabase
    .from('rooms')
    .select('*')
    .range(0, 9);

  if (error) {
    throw new Error(error?.message);
  }

  return rooms as Room[];
};


// updating the booking status
// export const updateBookingStatus = async (bookingId: string) => {
//   const { data: { user }, error: userError } = await supabase.auth.getUser();
//   if (userError || !user?.id) throw new Error('Authentication required');
  
//   const { data, error } = await supabase
//     .from('bookings')
//     .update({ status: 'paid' })
//     .eq('id', bookingId)
//     .eq('user_id', user.id)
//     .select()
//     .single();

//   if (error) throw new Error(error.message);
//   return data;
// };


// Updated booking service with flexible authentication
export const updateBookingStatus = async (bookingId: string, bypassAuth: boolean = false) => {
  const supabase = await createClient();
  
  if (!bypassAuth) {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.id) throw new Error('Authentication required');
    
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'paid' })
      .eq('id', bookingId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  } else {

    // For webhook use - bypass auth and user_id check
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'paid' })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
};