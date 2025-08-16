'use client'
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Bed, Users, Wifi, Car, Coffee, Tv } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  type: string;
  capacity: number;
  price: number;
  description: string;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
}

interface NewRoom {
  name: string;
  type: string;
  capacity: number;
  price: number;
  description: string;
  amenities: string[];
  images: string[];
}

const RoomsAdmin: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: '1',
      name: 'Deluxe Ocean View',
      type: 'Deluxe',
      capacity: 2,
      price: 299,
      description: 'Spacious room with stunning ocean views and modern amenities.',
      amenities: ['wifi', 'tv', 'minibar', 'balcony'],
      images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400'],
      isAvailable: true
    },
    {
      id: '2',
      name: 'Standard City Room',
      type: 'Standard',
      capacity: 2,
      price: 149,
      description: 'Comfortable room with city views and essential amenities.',
      amenities: ['wifi', 'tv', 'coffee'],
      images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'],
      isAvailable: true
    },
    {
      id: '3',
      name: 'Presidential Suite',
      type: 'Suite',
      capacity: 4,
      price: 599,
      description: 'Luxurious suite with separate living area and premium amenities.',
      amenities: ['wifi', 'tv', 'minibar', 'balcony', 'jacuzzi'],
      images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400'],
      isAvailable: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newRoom, setNewRoom] = useState<NewRoom>({
    name: '',
    type: '',
    capacity: 1,
    price: 0,
    description: '',
    amenities: [],
    images: []
  });

  const amenityOptions = [
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'tv', label: 'TV', icon: Tv },
    { id: 'minibar', label: 'Mini Bar', icon: Coffee },
    { id: 'parking', label: 'Parking', icon: Car },
    { id: 'balcony', label: 'Balcony', icon: null },
    { id: 'jacuzzi', label: 'Jacuzzi', icon: null },
    { id: 'coffee', label: 'Coffee Machine', icon: Coffee }
  ];

  const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Presidential'];

  const handleAddRoom = () => {
    if (newRoom.name && newRoom.type && newRoom.price > 0) {
      const room: Room = {
        ...newRoom,
        id: Date.now().toString(),
        isAvailable: true
      };
      setRooms([...rooms, room]);
      setNewRoom({
        name: '',
        type: '',
        capacity: 1,
        price: 0,
        description: '',
        amenities: [],
        images: []
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteRoom = (id: string) => {
    setRooms(rooms.filter(room => room.id !== id));
  };

  const toggleAvailability = (id: string) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, isAvailable: !room.isAvailable } : room
    ));
  };

  const handleAmenityToggle = (amenityId: string) => {
    setNewRoom(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(a => a !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const getAmenityIcon = (amenityId: string) => {
    const amenity = amenityOptions.find(a => a.id === amenityId);
    if (amenity?.icon) {
      const IconComponent = amenity.icon;
      return <IconComponent className="w-4 h-4" />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
            <p className="text-gray-600 mt-2">Manage your hotel rooms and availability</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Room
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Bed className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Rooms</p>
                <p className="text-2xl font-bold text-gray-900">{rooms.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-gray-900">
                  {rooms.filter(room => room.isAvailable).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <Bed className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Occupied</p>
                <p className="text-2xl font-bold text-gray-900">
                  {rooms.filter(room => !room.isAvailable).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Room Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Add New Room</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room Name
                    </label>
                    <input
                      type="text"
                      value={newRoom.name}
                      onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter room name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room Type
                    </label>
                    <select
                      value={newRoom.type}
                      onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select type</option>
                      {roomTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capacity
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={newRoom.capacity}
                      onChange={(e) => setNewRoom({ ...newRoom, capacity: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price per Night ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={newRoom.price}
                      onChange={(e) => setNewRoom({ ...newRoom, price: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={newRoom.description}
                    onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter room description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {amenityOptions.map(amenity => (
                      <label key={amenity.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newRoom.amenities.includes(amenity.id)}
                          onChange={() => handleAmenityToggle(amenity.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{amenity.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddRoom}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Add Room
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              {room.images.length > 0 && (
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{room.name}</h3>
                    <p className="text-sm text-gray-500">{room.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">${room.price}</p>
                    <p className="text-sm text-gray-500">per night</p>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <Users className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Up to {room.capacity} guests</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{room.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.map(amenity => (
                    <div key={amenity} className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs">
                      {getAmenityIcon(amenity)}
                      <span className="ml-1 capitalize">{amenity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${room.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`text-sm font-medium ${room.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                      {room.isAvailable ? 'Available' : 'Occupied'}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleAvailability(room.id)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        room.isAvailable 
                          ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {room.isAvailable ? 'Mark Occupied' : 'Mark Available'}
                    </button>
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteRoom(room.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {rooms.length === 0 && (
          <div className="text-center py-12">
            <Bed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rooms yet</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first room.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Add Your First Room
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsAdmin;