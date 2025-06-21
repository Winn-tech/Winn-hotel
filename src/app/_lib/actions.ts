'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/app/utils/supabase/server'

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
  const { data: { session }, error } = await supabase.auth.getSession();
  

  if (error) {
    console.error('Error getting session:', error.message);
    return { isLoggedIn: false, user: null };
  }
  
  return { isLoggedIn: !!session, user: session?.user || null };
}


// signin with google
// export async function signInWithGoogle() {
//   const supabase = await createClient()
//   const { data, error } =await supabase.auth.signInWithOAuth({
//   provider: 'google',
//   options: {
//     redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
//   },
// })
//   if (error) {
//     console.error('Error signing in with Google:', error.message);
//     throw new Error(error.message);
//   }

  
// }