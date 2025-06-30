'use server';

import { createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { supabase } from '@/app/_lib/supabase';
import { Room, Booking, BookingWithRoom } from '../types';
import { revalidatePath } from 'next/cache';

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
  const supabase = await createClient() 

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user?.id) {
    throw new Error('User not authenticated');
  }

  const userId = session.user.id;

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
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user?.id) {
    console.log('Session error or missing user:', sessionError);
    return [];
  }

  const userId = session.user.id;

  const { data: bookings, error } = await supabase
    .from('bookings')
    .select(`
      id,
      check_in_date,
      check_out_date,
      total_price,
      num_nights,
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

  // Map to ensure 'room' is always a single object (not array or undefined)
  const bookingsWithRoomObject = bookings?.map((booking: any) => ({
    ...booking,
    room: booking.room && !Array.isArray(booking.room) ? booking.room : booking.room?.[0] ?? null,
  }));

  return bookingsWithRoomObject ?? [];
};

export const deleteBooking = async (bookingId: string) => {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) {
    throw new Error(`Error deleting booking: ${error.message}`);
  }
  console.log('deleting book',bookingId);
  
  //  revalidatePath('/bookings');
}