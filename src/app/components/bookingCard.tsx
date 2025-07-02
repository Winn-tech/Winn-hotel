"use client";

import React from 'react'
import Image from 'next/image'
import { Calendar, MapPin, Users, Clock, Edit3, Trash2, CreditCard, CheckCircle, AlertCircle, ArrowLeft, Home } from 'lucide-react';
import { BookingWithRoom } from '../types';
import useImageShuffle from '@/app/components/imageShuffle';
import { deleteBookingAction } from '../_lib/actions';
import { useTransition } from 'react';

interface BookingCardProps {
  booking: BookingWithRoom;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const image = useImageShuffle(booking.room?.room_image || '', 3000);
 
  const handleEdit = (booking: BookingWithRoom): void => {
    
  };

  

  const handlePayment = async (bookingId: string): Promise<void> => {
    
  };

  const handleSaveEdit = async (): Promise<void> => {

  };

  const getStatusColor = (status: string): string => {
     switch (status) {
       case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
       case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
       case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
       default: return 'bg-gray-100 text-gray-800 border-gray-200';
     }
   };
 
   const getPaymentStatusColor = (status: string): string => {
     switch (status) {
       case 'paid': return 'text-green-600';
       case 'pending': return 'text-yellow-600';
       case 'failed': return 'text-red-600';
       default: return 'text-gray-600';
     }
   };  
   
   const [isPending, startTransition] = useTransition();
   const handleDelete = async (bookingId: string): Promise<void> => {
   if (confirm('Are you sure you want to delete this reservation? This action cannot be undone.')) {
      startTransition(() => {
        deleteBookingAction(bookingId);
      });
    }
    
  
  };
  
  return (
    <div>
      <article key={booking.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
        <div className="relative h-40">
          <Image 
            key={image} // Force re-render when image changes
            src={image} 
            alt='room image' 
            fill 
            className="object-cover transition-opacity duration-500"
            priority={false}
            unoptimized={true} // Disable Next.js optimization to prevent caching issues
          />
          <div className="absolute top-4 right-4">
            {/* <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>{booking.toUpperCase()}</span> */}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <h2 className="text-white text-lg font-bold">{}</h2>
            {/* <p className="text-white text-sm flex items-center"><MapPin className="w-4 h-4 mr-1" />{booking.location}</p> */}
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="text-sm text-primary-600">
            <p className='flex justify-between '><strong>Room:</strong> <strong>{booking.room?.title}</strong></p>
            <p className='flex justify-between '><strong>Check-in:</strong> {booking.check_in_date}</p>
            <p className='flex justify-between '><strong>Check-out:</strong> <span>{booking.check_out_date}</span></p>
            <p className='flex justify-between '><strong>Guests:</strong> {booking.num_guests}</p>
            <p className='flex justify-between '><strong>Nights:</strong> {booking.num_nights}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-lg font-bold text-primary-800">${booking.total_price}</p> 
             {/* <p className={`text-sm font-semibold ${getPaymentStatusColor(booking.paymentStatus)}`}>{booking.paymentStatus}</p> */}
          </div>

          <div className="flex gap-2">
            <button 
               onClick={() =>handleDelete(booking.id)}
               className="flex-1 bg-red-50 text-sm border-2 border-accent-400 px-3 rounded text-red-600 py-2 hover:bg-red-100 flex  items-center justify-center w-[50%]items-center gap-1">
              <Trash2 className="w-4 h-4" />Delete
            </button>
              <button onClick={() => handlePayment(booking.id)} className="flex-1cursor-pointer w-[50%] py-2 bg-gradient-to-r flex justify-center items-center from-primary-800 to-accent-500 hover:from-primary-900 hover:to-accent-400 text-white px-8 rounded font-semibold">
                <CreditCard className="w-4 h-4" />Pay
              </button>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BookingCard