const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to Winn Hotels Admin Panel</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">Last updated</p>
        <p className="text-sm font-medium text-gray-900">
          {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;