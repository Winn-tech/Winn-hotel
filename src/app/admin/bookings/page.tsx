

// import { getAllBookings } from '@/app/_lib/services';
// import BookingsClient from './bookings-client';
// import type { AdminBooking } from '@/app/types';

// export default async function BookingsPage() {
//   try {
//     const bookings = await getAllBookings();
//     return <BookingsClient initialBookings={bookings} />;
//   } catch (error) {
//     console.error('Error loading bookings:', error);
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <p className="text-red-600 mb-4">Error loading bookings. Please try again later.</p>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Retry
//           </button>
//         </div> 
//       </div>
//     );
//   }
// }
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// import { Badge } from '@/components/ui/badge';
// import { format } from 'date-fns';
// import type { AdminBooking } from '@/app/types';

// // Mock data - replace with real data fetching
// const mockBookings: AdminBooking[] = [
//   {
//     id: '1',
//     check_in_date: '2025-08-01',
//     check_out_date: '2025-08-05',
//     total_price: 1200,
//     num_nights: 4,
//     status: 'confirmed',
//     num_guests: 2,
//     room: {
//       room_type: 'Deluxe',
//       title: 'Deluxe Room with Sea View',
//       room_image: '/room-deluxe.jpg'
//     },
//     user: {
//       email: 'guest@example.com'
//     },
//     created_at: '2025-07-20T10:00:00Z'
//   },
//   // Add more mock data as needed
// ];

// export default function BookingsClient({ initialBookings = [] }: { initialBookings: AdminBooking[] }) {
//   const [bookings, setBookings] = useState<AdminBooking[]>(initialBookings);
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');

//   // Load mock data if no initial bookings
//   useEffect(() => {
//     if (initialBookings.length === 0) {
//       setBookings(mockBookings);
//     }
//   }, [initialBookings]);

//   const filteredBookings = bookings.filter(booking => {
//     const matchesSearch = 
//       booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       booking.user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       booking.room?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    
//     const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
//     return matchesSearch && matchesStatus;
//   });

//   const refreshBookings = async () => {
//     try {
//       setIsLoading(true);
//       // TODO: Replace with actual API call
//       // const data = await getAllBookings();
//       // setBookings(data);
//       await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
//     } catch (error) {
//       console.error('Error refreshing bookings:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     const statusMap: Record<string, string> = {
//       confirmed: 'bg-green-100 text-green-800',
//       pending: 'bg-yellow-100 text-yellow-800',
//       cancelled: 'bg-red-100 text-red-800',
//       'checked-in': 'bg-blue-100 text-blue-800',
//       'checked-out': 'bg-gray-100 text-gray-800'
//     };
    
//     return (
//       <Badge className={`${statusMap[status] || 'bg-gray-100'} capitalize`}>
//         {status.replace('-', ' ')}
//       </Badge>
//     );
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex flex-col space-y-4">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <h1 className="text-2xl font-bold">Bookings</h1>
//           <div className="flex flex-col sm:flex-row gap-3">
//             <Button className="bg-blue-600 hover:bg-blue-700">
//               <Plus className="mr-2 h-4 w-4" />
//               New Booking
//             </Button>
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
//             <Input
//               placeholder="Search bookings..."
//               className="pl-10"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
          
//           <div className="flex gap-2">
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-[180px]">
//                 <Filter className="mr-2 h-4 w-4" />
//                 <SelectValue placeholder="Filter by status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Statuses</SelectItem>
//                 <SelectItem value="pending">Pending</SelectItem>
//                 <SelectItem value="confirmed">Confirmed</SelectItem>
//                 <SelectItem value="checked-in">Checked In</SelectItem>
//                 <SelectItem value="checked-out">Checked Out</SelectItem>
//                 <SelectItem value="cancelled">Cancelled</SelectItem>
//               </SelectContent>
//             </Select>
            
//             <Button 
//               variant="outline" 
//               size="icon" 
//               onClick={refreshBookings}
//               disabled={isLoading}
//             >
//               <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
//             </Button>
//           </div>
//         </div>

//         <div className="rounded-md border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Booking ID</TableHead>
//                 <TableHead>Guest</TableHead>
//                 <TableHead>Room</TableHead>
//                 <TableHead>Check-in</TableHead>
//                 <TableHead>Check-out</TableHead>
//                 <TableHead>Nights</TableHead>
//                 <TableHead>Total</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredBookings.length > 0 ? (
//                 filteredBookings.map((booking) => (
//                   <TableRow key={booking.id}>
//                     <TableCell className="font-medium">#{booking.id.substring(0, 8)}</TableCell>
//                     <TableCell>{booking.user?.email || 'N/A'}</TableCell>
//                     <TableCell>{booking.room?.title || 'N/A'}</TableCell>
//                     <TableCell>{format(new Date(booking.check_in_date), 'MMM d, yyyy')}</TableCell>
//                     <TableCell>{format(new Date(booking.check_out_date), 'MMM d, yyyy')}</TableCell>
//                     <TableCell>{booking.num_nights}</TableCell>
//                     <TableCell>${booking.total_price}</TableCell>
//                     <TableCell>{getStatusBadge(booking.status)}</TableCell>
//                     <TableCell className="text-right">
//                       <Button variant="ghost" size="sm">View</Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={9} className="h-24 text-center">
//                     No bookings found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// }
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Number of Guests
//                   </label>
//                   <select
//                     value={newBooking.guests}
//                     onChange={(e) => setNewBooking({...newBooking, guests: parseInt(e.target.value)})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     {[1, 2, 3, 4, 5, 6].map(num => (
//                       <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Status
//                   </label>
//                   <select
//                     value={newBooking.status}
//                     onChange={(e) => setNewBooking({...newBooking, status: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="confirmed">Confirmed</option>
//                     <option value="checked-in">Checked In</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Special Requests
//                 </label>
//                 <textarea
//                   rows="3"
//                   value={newBooking.special_requests}
//                   onChange={(e) => setNewBooking({...newBooking, special_requests: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Any special requests or notes..."
//                 />
//               </div>

//               {/* Booking Summary */}
//               {newBooking.check_in_date && newBooking.check_out_date && newBooking.room_id && (
//                 <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//                   <h3 className="font-medium text-gray-900 mb-2">Booking Summary</h3>
//                   <div className="text-sm text-gray-700 space-y-1">
//                     <div>Nights: {calculateNights(newBooking.check_in_date, newBooking.check_out_date)}</div>
//                     <div>Room Rate: ${rooms.find(r => r.id === newBooking.room_id)?.price_per_night}/night</div>
//                     <div className="font-medium text-lg text-blue-700">
//                       Total Amount: ${calculateTotal().toLocaleString()}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="flex justify-end gap-4 mt-6">
//                 <button
//                   onClick={() => setShowNewBooking(false)}
//                   className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleCreateBooking}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Create Booking
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Booking Details Modal */}
//       {showBookingDetails && selectedBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6 border-b border-gray-200">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   Booking Details #{selectedBooking.id}
//                 </h2>
//                 <button
//                   onClick={() => setShowBookingDetails(false)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <XCircle className="w-6 h-6" />
//                 </button>
//               </div>
//             </div>
            
//             <div className="p-6 space-y-6">
//               {/* Status */}
//               <div>
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-lg font-semibold text-gray-900">Booking Status</h3>
//                   <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedBooking.status)}`}>
//                     {getStatusIcon(selectedBooking.status)}
//                     {selectedBooking.status.replace('-', ' ').toUpperCase()}
//                   </span>
//                 </div>
//                 {selectedBooking.status === 'pending' && (
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => updateBookingStatus(selectedBooking.id, 'confirmed')}
//                       className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
//                     >
//                       <CheckCircle className="w-4 h-4" />
//                       Confirm Booking
//                     </button>
//                     <button
//                       onClick={() => updateBookingStatus(selectedBooking.id, 'cancelled')}
//                       className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
//                     >
//                       <XCircle className="w-4 h-4" />
//                       Cancel Booking
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Guest Information */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">Guest Information</h3>
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-gray-600">Name</p>
//                       <p className="font-medium">{selectedBooking.user?.full_name}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Email</p>
//                       <p className="font-medium">{selectedBooking.user?.email}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Phone</p>
//                       <p className="font-medium">{selectedBooking.user?.phone || 'Not provided'}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Guests</p>
//                       <p className="font-medium">{selectedBooking.guests}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Room Information */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">Room Information</h3>
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-gray-600">Room Number</p>
//                       <p className="font-medium">{selectedBooking.room?.room_number}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Room Type</p>
//                       <p className="font-medium">{selectedBooking.room?.room_type}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Rate per Night</p>
//                       <p className="font-medium">${selectedBooking.room?.price_per_night}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Total Nights</p>
//                       <p className="font-medium">{calculateNights(selectedBooking.check_in_date, selectedBooking.check_out_date)}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Stay Information */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">Stay Information</h3>
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-gray-600">Check-in Date</p>
//                       <p className="font-medium">{new Date(selectedBooking.check_in_date).toLocaleDateString('en-US', { 
//                         weekday: 'long', 
//                         year: 'numeric', 
//                         month: 'long', 
//                         day: 'numeric' 
//                       })}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Check-out Date</p>
//                       <p className="font-medium">{new Date(selectedBooking.check_out_date).toLocaleDateString('en-US', { 
//                         weekday: 'long', 
//                         year: 'numeric', 
//                         month: 'long', 
//                         day: 'numeric' 
//                       })}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Total Amount</p>
//                       <p className="font-medium text-lg text-green-600">${selectedBooking.total_amount?.toLocaleString()}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Booking Date</p>
//                       <p className="font-medium">{new Date(selectedBooking.created_at).toLocaleDateString()}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Special Requests */}
//               {selectedBooking.special_requests && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-3">Special Requests</h3>
//                   <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
//                     <p className="text-gray-700">{selectedBooking.special_requests}</p>
//                   </div>
//                 </div>
//               )}

//               {/* Additional Actions */}
//               <div className="flex justify-between items-center pt-4 border-t border-gray-200">
//                 <div className="flex gap-2">
//                   {selectedBooking.status === 'confirmed' && (
//                     <button
//                       onClick={() => updateBookingStatus(selectedBooking.id, 'checked-in')}
//                       className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
//                     >
//                       <CheckCircle className="w-4 h-4" />
//                       Check In
//                     </button>
//                   )}
//                   {selectedBooking.status === 'checked-in' && (
//                     <button
//                       onClick={() => updateBookingStatus(selectedBooking.id, 'checked-out')}
//                       className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
//                     >
//                       <CheckCircle className="w-4 h-4" />
//                       Check Out
//                     </button>
//                   )}
//                 </div>
//                 <button
//                   onClick={() => setShowBookingDetails(false)}
//                   className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
