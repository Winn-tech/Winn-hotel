'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Calendar } from 'lucide-react';
import { Users } from '@/app/types';


interface UsersTableProps {
  initialUsers: Users[];
}

const UsersTable = ({ initialUsers }: UsersTableProps) => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  const filteredUsers = useMemo(() => {
    if (!initialUsers) return [];
    if (!searchTerm) return initialUsers;
    
    return initialUsers.filter(user => {
      const fullName = user.user_metadata?.full_name || user.raw_user_meta_data?.full_name || '';
      return (
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [initialUsers, searchTerm]);

  if (filteredUsers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? 'No users found matching your search.' : 'No users found.'}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => {
              const fullName = user.user_metadata?.full_name || user.raw_user_meta_data?.full_name || '';
              
              return (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {fullName?.charAt(0) || user.email?.charAt(0).toUpperCase() || ''}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {fullName || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          User ID: {user.id?.slice(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Mail size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{user.email || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {new Date(user.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
