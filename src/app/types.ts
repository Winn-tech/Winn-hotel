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
}