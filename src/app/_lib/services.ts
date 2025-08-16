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

// ADMIN SERVICES.

import supabaseAdmin from '@/app/_lib/supabaseAdmin';

export const getAllRegisteredUsers = async () => {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 100,
  });

  if (error) throw new Error(error.message);
  return data.users;
};

export const fetchDashboardStats = async () => {
  try {
    // Get users count
   let page = 1;
let totalUsers = 0;
let done = false;

while (!done) {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers({
    page,
    perPage: 100,
  });

  if (error) throw new Error(error.message);

  totalUsers += data.users.length;

  if (data.users.length < 100) {
    done = true; // Last page reached
  } else {
    page++; // Go to next page
  }
}


    // Get rooms count
    const { count: roomsCount } = await supabaseAdmin
      .from('rooms')
      .select('*', { count: 'exact', head: true });

    // Get bookings count
    const { count: bookingsCount } = await supabaseAdmin
      .from('bookings')
      .select('*', { count: 'exact', head: true });

    // Get available rooms
    const { count: availableRooms } = await supabaseAdmin
      .from('rooms')
      .select('*', { count: 'exact', head: true })
      .eq('availability', true);

   
    // Calculate monthly revenue (confirmed bookings this month)
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    const { data: monthlyBookings } = await supabase
      .from('bookings')
      .select('total_amount')
      .eq('status', 'confirmed')
      .gte('created_at', startOfMonth.toISOString());

    const monthlyRevenue = monthlyBookings?.reduce((sum, booking) => sum + (booking.total_amount || 0), 0) || 0;

    return {
      totalUsers: totalUsers || 0,
      totalRooms: roomsCount || 0,
      totalBookings: bookingsCount || 0,
      monthlyRevenue,
      availableRooms: availableRooms || 0
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      totalUsers: 0,
      totalRooms: 0,
      totalBookings: 0,
      occupancyRate: 0,
      monthlyRevenue: 0,
      availableRooms: 0
    };
  }
};

export const getAllBookings = async () => {
  const { data, error } = await supabaseAdmin
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
      ),
      user:user_id (
        email
      )
    `);

  if (error) throw new Error(error.message);
  return data;
};