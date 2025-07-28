'use client';

import { Calendar, Bed, Users } from 'lucide-react';

const QuickActions = () => {
  const handleNewBooking = () => {
    // Handle new booking action
    console.log('New booking clicked');
  };

  const handleAddRoom = () => {
    // Handle add room action
    console.log('Add room clicked');
  };

  const handleRegisterUser = () => {
    // Handle register user action
    console.log('Register user clicked');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={handleNewBooking}
          className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
        >
          <Calendar className="mx-auto mb-2 text-gray-400" size={24} />
          <p className="text-sm font-medium text-gray-700">New Booking</p>
        </button>
        <button 
          onClick={handleAddRoom}
          className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
        >
          <Bed className="mx-auto mb-2 text-gray-400" size={24} />
          <p className="text-sm font-medium text-gray-700">Add Room</p>
        </button>
        <button 
          onClick={handleRegisterUser}
          className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
        >
          <Users className="mx-auto mb-2 text-gray-400" size={24} />
          <p className="text-sm font-medium text-gray-700">Register User</p>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;

