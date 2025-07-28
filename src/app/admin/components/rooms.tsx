'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/app/_lib/supabase';
import { Plus, Edit2, ToggleLeft, ToggleRight, Bed, Users, Crown, Sparkles } from 'lucide-react';

type RoomType = 'Single' | 'Double' | 'Suite' | 'Deluxe';

interface Room {
  id: string;
  room_number: string;
  room_type: RoomType;
  price: number;
  is_available: boolean;
  created_at: string;
}

interface RoomFormData {
  room_number: string;
  room_type: RoomType;
  price: string;
}

const ROOM_TYPES: readonly RoomType[] = ['Single', 'Double', 'Suite', 'Deluxe'] as const;

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState<RoomFormData>({
    room_number: '',
    room_type: 'Single',
    price: '',
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async (): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('room_number');

      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    try {
      if (editingRoom) {
        const { error } = await supabase
          .from('rooms')
          .update({
            room_number: formData.room_number,
            room_type: formData.room_type,
            price: parseFloat(formData.price),
          })
          .eq('id', editingRoom.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('rooms')
          .insert([{
            room_number: formData.room_number,
            room_type: formData.room_type,
            price: parseFloat(formData.price),
            is_available: true,
          }]);

        if (error) throw error;
      }

      setFormData({ room_number: '', room_type: 'Single', price: '' });
      setShowAddForm(false);
      setEditingRoom(null);
      fetchRooms();
    } catch (error) {
      console.error('Error saving room:', error);
    }
  };

  const toggleAvailability = async (room: Room): Promise<void> => {
    try {
      const { error } = await supabase
        .from('rooms')
        .update({ is_available: !room.is_available })
        .eq('id', room.id);

      if (error) throw error;
      fetchRooms();
    } catch (error) {
      console.error('Error updating room availability:', error);
    }
  };

  const getRoomTypeIcon = (type: RoomType): JSX.Element => {
    switch (type) {
      case 'Single': return <Bed className="w-5 h-5" />;
      case 'Double': return <Users className="w-5 h-5" />;
      case 'Suite': return <Crown className="w-5 h-5" />;
      case 'Deluxe': return <Sparkles className="w-5 h-5" />;
      default: return <Bed className="w-5 h-5" />;
    }
  };

  const getRoomTypeColor = (type: RoomType): string => {
    switch (type) {
      case 'Single': return 'bg-blue-100 text-blue-800';
      case 'Double': return 'bg-green-100 text-green-800';
      case 'Suite': return 'bg-purple-100 text-purple-800';
      case 'Deluxe': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const startEdit = (room: Room): void => {
    setEditingRoom(room);
    setFormData({
      room_number: room.room_number,
      room_type: room.room_type,
      price: room.price.toString(),
    });
    setShowAddForm(true);
  };

  const cancelEdit = (): void => {
    setEditingRoom(null);
    setShowAddForm(false);
    setFormData({ room_number: '', room_type: 'Single', price: '' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold  text-gray-900">Rooms Management</h1>
          <p className="text-gray-600">Manage hotel rooms, pricing, and availability</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Room
        </button>
      </div>

      {/* Add/Edit Room Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingRoom ? 'Edit Room' : 'Add New Room'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Number
              </label>
              <input
                type="text"
                required
                value={formData.room_number}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setFormData({ ...formData, room_number: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 101"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Type
              </label>
              <select
                value={formData.room_type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                  setFormData({ ...formData, room_type: e.target.value as RoomType })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ROOM_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price per Night
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex-1"
              >
                {editingRoom ? 'Update' : 'Add'} Room
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Rooms Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-2xl font-bold text-gray-900">{rooms.length}</div>
          <div className="text-gray-600">Total Rooms</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-2xl font-bold text-green-600">
            {rooms.filter(r => r.is_available).length}
          </div>
          <div className="text-gray-600">Available</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-2xl font-bold text-red-600">
            {rooms.filter(r => !r.is_available).length}
          </div>
          <div className="text-gray-600">Occupied</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-2xl font-bold text-blue-600">
            ${Math.round((rooms.reduce((avg, r) => avg + r.price, 0) / rooms.length) * 100) / 100 || 0}
          </div>
          <div className="text-gray-600">Avg. Price</div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${
              room.is_available ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getRoomTypeIcon(room.room_type)}
                  <span className="font-semibold text-lg">Room {room.room_number}</span>
                </div>
                <button
                  onClick={() => startEdit(room)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Type</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoomTypeColor(room.room_type)}`}>
                    {room.room_type}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Price</span>
                  <span className="font-semibold text-lg">${room.price}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      room.is_available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {room.is_available ? 'Available' : 'Occupied'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => toggleAvailability(room)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    room.is_available
                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
                >
                  {room.is_available ? (
                    <>
                      <ToggleRight className="w-5 h-5" />
                      Mark as Occupied
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-5 h-5" />
                      Mark as Available
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {rooms.length === 0 && (
        <div className="text-center py-12">
          <Bed className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No rooms found</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first room</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Your First Room
          </button>
        </div>
      )}
    </div>
  );
}