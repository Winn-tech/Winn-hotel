'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import AddUserForm from '@/app/admin/components/addUserForm';

const AddUserButton = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus size={20} className="mr-2" />
        Add User
      </button>

      {showAddForm && (
        <AddUserForm 
          onClose={() => setShowAddForm(false)}
          onSuccess={() => {
            setShowAddForm(false);
            // Refresh the page to show new user
            window.location.reload();
          }}
        />
      )}
    </>
  );
};

export default AddUserButton;
