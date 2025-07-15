import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createClient } from '../../utils/supabase/server';
import { updateBookingStatus } from '@/app/_lib/services';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')!;
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.booking_id;

      if (bookingId) {
        console.log(`Received bookingId from Stripe metadata: ${bookingId}`);
        const supabase = await createClient();

        // Update the booking status to true (or 'paid', 'completed', etc.)
        const { data, error } = await supabase
          .from('bookings')
          .update({ status: 'paid' })
          .eq('id', bookingId)
          .select();

        if (error) {
          console.error('Error updating booking:', error);
          return new NextResponse('Database update failed', { status: 500 });
        }

        console.log(`Successfully updated booking ${bookingId}, update result:`, data);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : typeof err === 'string'
        ? err
        : 'Webhook Error: An unknown error occurred';
    console.error('Webhook error:', message);
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }
}

// Add a new endpoint to handle successful payments
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'No session ID' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const bookingId = session.metadata?.booking_id;

      if (bookingId) {
       await updateBookingStatus(bookingId)
      }
    }

    return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
        ? error
        : 'An unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}