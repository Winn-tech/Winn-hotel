import { getAllRegisteredUsers } from '@/app/_lib/services';
import UsersHeader from '@/app/admin/components/usersHeader';
import UsersSearch from '@/app/admin/components/userSearch';
import UsersTable from '@/app/admin/components/usersTable';
import { Suspense } from 'react';
import { Users } from '@/app/types';
import { User } from '@supabase/supabase-js'; // or wherever your User type comes from

// Type assertion function to ensure user has required properties
const isValidUser = (user: User): user is Users => {
  return user.email !== undefined && user.email !== null && user.email.trim() !== '';
};

const UsersPage = async () => {
  let users: Users[] = [];
  let error = null;

  try {
    const fetchedUsers = await getAllRegisteredUsers();
    
    // Filter and assert valid users
    users = fetchedUsers.filter(isValidUser);
    
    // Log any users that were filtered out (optional)
    const invalidUsers = fetchedUsers.filter(user => !isValidUser(user));
    if (invalidUsers.length > 0) {
      console.warn(`Filtered out ${invalidUsers.length} users without valid email addresses`);
    }
      
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch users';
    console.error('Error fetching users:', err);
  }

  if (error) {
    return (
      <div className="space-y-6">
        <UsersHeader />
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-center py-8 text-red-600">
            Error loading users: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <UsersHeader />
      
      <Suspense fallback={
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-center py-4">Loading search...</div>
        </div>
      }>
        <UsersSearch />
      </Suspense>

      <Suspense fallback={
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-center py-8">Loading users...</div>
        </div>
      }>
        <UsersTable initialUsers={users} />
      </Suspense>
    </div>
  );
};

export default UsersPage;