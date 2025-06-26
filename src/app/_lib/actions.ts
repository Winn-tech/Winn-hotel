'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { createClient } from '@/app/utils/supabase/server'
import { createBooking } from './services'

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

    console.log('Room booking attempt:', {
      room_id,
      user_id: user.id,
      user_email: user.email,
      check_in_date,
      check_out_date,
      num_nights,
      total_price
    })

    await createBooking({
      room_id,
      user_id: user.id,
      user_email: user.email,
      check_in_date,
      check_out_date,
      num_nights,
      total_price
    })

    revalidatePath('/suites')
    
    
  } catch (error) {
    console.error('Error in bookRoom:', error)
    throw error
  }
}