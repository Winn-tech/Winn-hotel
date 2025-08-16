import AddUserButton from '@/app/admin/components/addUserButton';

const UsersHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-600">Manage hotel users and registrations</p>
      </div>
      {/* <AddUserButton /> */}
    </div>
  );
};

export default UsersHeader;