import { getBookings } from '../_lib/services';
import BookingCard from '../components/bookingCard';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Bookings",
}

const ReservationPage: React.FC = async () => {

  const bookingList = await getBookings();
  // if (bookingList.length === 0) {
  //   return(
  //       <div>
  //           You have no booking yet.
  //       </div>
  //   )

  // }

  return (
    <div className="min-h-screen">
      <div className="bg-white shadow-lg mt-2 ">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center ">
          <div className="flex items-center gap-4 static top-0">
            
            <div>
              <h1 className="sm:text-3xl text-2xlfont-bold">My Reservations</h1>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-primary-700 px-4 py-2 rounded">{bookingList.length} Reservations</div>
            
          </div>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookingList.map((booking) => (
            <BookingCard booking={booking} key={booking.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ReservationPage;
