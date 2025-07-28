import { Users } from 'lucide-react';
export type Room = {
    id: string;
    title: string;
    description : string;
    price: number;
    room_type : string;
    amenities: string
    is_available : boolean;
    max_guests : number;
    room_image: string;
    max_booking_night: number;
}
export type Booking = {
    room_id: string;
    user_id?: string;
    check_in_date: string | undefined;
    check_out_date: string | undefined;
    total_price: number | undefined;
    status?: string | undefined;
    num_nights: number | undefined;
    user_email?: string | undefined;
    num_guests?: number | undefined;
}

export type BookingWithRoom = {
  id: string;
  check_in_date?: string;
  check_out_date?: string;
  total_price?: number;
  num_nights?: number;
  num_guests?: number;
  status: string;
  room?: {
    room_type?: string;
    title: string;
    room_image: string;
  } | null;
};

export type Users ={
   id:string;
  email: string; 
  created_at: string;
  user_metadata?: {
    full_name?: string;
  };
  raw_user_meta_data?: {
    full_name?: string;
  };
  // Add other required properties from User type
  app_metadata: Record<string, any>;
  aud: string;
}

export type StatCardProps = {
  stats:{
    title: string;
  value: string | number;
  icon?: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
  bgColor: string;
  textColor: string;
  }
};