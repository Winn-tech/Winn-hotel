'use client';

import { useState, useEffect } from 'react';
import { Calendar, User, MapPin, CreditCard, Eye, Edit, Trash2, Filter, Search } from 'lucide-react';

// TypeScript interfaces
interface Booking {
  id: number;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  room_number: string;
  room_type: string;
  check_in: string;
  check_out: string;
  status: BookingStatus;
  total_amount: number;
  nights: number;
  created_at: string;
}

type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

interface BookingModalProps {
  booking: Booking;
  onClose: () => void;
}

// Mock data - replace with actual Supabase queries
const mockBookings: Booking[] = [
  {
    id: 1,
    guest_name: 'John Smith',
    guest_email: 'john.smith@email.com',
    guest_phone: '+1-555-0123',
    room_number: '101',
    room_type: 'Deluxe Suite',
    check_in: '2025-07-20',
    check_out: '2025-07-25',
    status: 'confirmed',
    total_amount: 750.00,
    nights: 5,
    created_at: '2025-07-15T10:30:00Z'
  },
  {
    id: 2,
    guest_name: 'Sarah Johnson',
    guest_email: 'sarah.j@email.com',
    guest_phone: '+1-555-0456',
    room_number: '205',
    room_type: 'Standard Room',
    check_in: '2025-07-22',
    check_out: '2025-07-24',
    status: 'pending',
    total_amount: 240.00,
    nights: 2,
    created_at: '2025-07-18T14:20:00Z'
  },
  {
    id: 3,
    guest_name: 'Michael Chen',
    guest_email: 'mchen@email.com',
    guest_phone: '+1-555-0789',
    room_number: '310',
    room_type: 'Executive Suite',
    check_in: '2025-07-19',
    check_out: '2025-07-21',
    status: 'cancelled',
    total_amount: 400.00,
    nights: 2,
    created_at: '2025-07-16T09:15:00Z'
  },
  {
    id: 4,
    guest_name: 'Emily Davis',
    guest_email: 'emily.davis@email.com',
    guest_phone: '+1-555-0321',
    room_number: '102',
    room_type: 'Deluxe Suite',
    check_in: '2025-07-25',
    check_out: '2025-07-30',
    status: 'confirmed',
    total_amount: 900.00,
    nights: 5,
    created_at: '2025-07-17T16:45:00Z'
  }
];

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<BookingStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Filter bookings based on status and search term
    let filtered: Booking[] = bookings;

    if (filterStatus !== 'all') {
      filtered = filtered.filter((booking: Booking) => booking.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter((booking: Booking) =>
        booking.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.guest_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.room_number.includes(searchTerm)
      );
    }

    setFilteredBookings(filtered);
  }, [bookings, filterStatus, searchTerm]);

  const getStatusColor = (status: BookingStatus): string => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleViewBooking = (booking: Booking): void => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleStatusChange = (bookingId: number, newStatus: BookingStatus): void => {
    setBookings((prev: Booking[]) =>
      prev.map((booking: Booking) =>
        booking.id === bookingId
          ? { ...booking, status: newStatus }
          : booking
      )
    );
  };

  const handleDeleteBooking = (bookingId: number): void => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings((prev: Booking[]) => prev.filter((booking: Booking) => booking.id !== bookingId));
    }
  };

  const BookingModal: React.FC<BookingModalProps> = ({ booking, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Booking Details - #{booking.id}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Guest Information</h4>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  {booking.guest_name}
                </div>
                <div className="text-gray-600">
                  Email: {booking.guest_email}
                </div>
                <div className="text-gray-600">
                  Phone: {booking.guest_phone}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Room Information</h4>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  Room {booking.room_number}
                </div>
                <div className="text-gray-600">
                  Type: {booking.room_type}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Stay Details</h4>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Check-in: {formatDate(booking.check_in)}
                </div>
                <div className="text-gray-600">
                  Check-out: {formatDate(booking.check_out)}
                </div>
                <div className="text-gray-600">
                  Nights: {booking.nights}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Booking Status</h4>
              <div className="space-y-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
                <div className="flex items-center text-gray-600">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Total: {formatCurrency(booking.total_amount)}
                </div>
                <div className="text-gray-600 text-sm">
                  Booked: {formatDate(booking.created_at)}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Edit Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const handleFilterStatusChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setFilterStatus(e.target.value as BookingStatus | 'all');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleStatusSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, bookingId: number): void => {
    handleStatusChange(bookingId, e.target.value as BookingStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterStatus}
              onChange={handleFilterStatusChange}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 flex-1">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by guest name, email, or room number..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm flex-1"
            />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking: Booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {booking.guest_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.guest_email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Room {booking.room_number}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.room_type}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(booking.check_in)}
                    </div>
                    <div className="text-sm text-gray-500">
                      to {formatDate(booking.check_out)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {booking.nights} nights
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusSelectChange(e, booking.id)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(booking.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(booking.total_amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewBooking(booking)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                        type="button"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        title="Edit Booking"
                        type="button"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Booking"
                        type="button"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            {searchTerm || filterStatus !== 'all' 
              ? 'No bookings found matching your criteria.'
              : 'No bookings available.'
            }
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <BookingModal
          booking={selectedBooking}
          onClose={() => {
            setShowModal(false);
            setSelectedBooking(null);
          }}
        />
      )}
    </div>
  );
};

export default Bookings;