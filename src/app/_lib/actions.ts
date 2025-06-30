'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/app/utils/supabase/server'
import { createBooking, getBookings } from './services'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    console.log('Login error:', error.message);
    // Instead of redirecting, throw error to be handled in the UI
    throw new Error(error.message)
  }

  revalidatePath('/', 'layout')
  redirect('/suites')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match')
  }
  const data = {
    email: email,
    password: password,
    options: {
      data: {
        name: name,
      },
    },
  }
  const { error } = await supabase.auth.signUp(data)
  if (error) {
    redirect('/error')
  }
  revalidatePath('/', 'layout')
  redirect('/login')
}


 export const logout = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function checkAuthStatus() {
  const supabase = await createClient(); 
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting session:', error.message);
    return { isLoggedIn: false, user: null };
  }
  return { isLoggedIn: !!user, user: user || null };
}


export async function bookRoom(formData: FormData) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      throw new Error('You must be logged in to book a room.')
    }
    const room_id = formData.get('id') as string
    const check_in_date = formData.get('check_in_date') as string
    const check_out_date = formData.get('check_out_date') as string
    const num_nights = parseInt(formData.get('num_nights') as string, 10)
    const total_price = parseFloat(formData.get('total_price') as string)
    const num_guests = Number(formData.get('numGuests') || 1)

    console.log('Room booking attempt:', {
      room_id,
      user_id: user.id,
      user_email: user.email,
      check_in_date,
      check_out_date,
      num_nights,
      total_price,
      num_guests
    })
    

    await createBooking({
      room_id,
      user_email: user.email,
      check_in_date,
      check_out_date,
      num_nights,
      total_price,
      num_guests
    })

    revalidatePath('/suites')
    redirect('/bookings')
    
    
  } catch (error) {
    console.error('Error in bookRoom:', error)
    throw error
  }
}


export const deleteBookingAction = async (booking_id: string) => {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error('deleteBookingAction: Authentication error:', userError?.message);
        throw new Error('You must be logged in to delete a booking.');
    }

    // Fetch user's bookings to ensure authorization
    const userBookings = await getBookings(); // This already filters by user_id
    const isBookingBelongsToUser = userBookings.some(booking => booking.id === booking_id);

    if (!isBookingBelongsToUser) {
        console.warn(`deleteBookingAction: Unauthorized attempt to delete booking_id: ${booking_id} by user: ${user.id}`);
        throw new Error('You can only delete your own bookings');
    }

    console.log(`Attempting to delete booking ${booking_id} for user ${user.id}`);
    const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', booking_id);

    if (error) {
        console.error(`Supabase delete error for booking ${booking_id}:`, error.message);
        throw new Error(`Failed to delete booking from database: ${error.message}`);
    }

    console.log(`Successfully deleted booking ${booking_id}. Revalidating path.`);
    revalidatePath('/bookings');
};